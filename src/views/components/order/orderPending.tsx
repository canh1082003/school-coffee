import React, { useEffect, useState } from 'react'
import api from '../../../api/Api';
import { formatPrice } from '../../../helpers/formatprice';
import { formatDate } from 'date-fns';
type Order = {
  orderId: number,
  deliveredAt: Date,
  totalPrice: number,
  paymentStatus: string,
  paymentMethod: string,
  status: string,
}
type OrderItem = {
  orderId: number,
  productName: string;
  paymentMethod: string,
};
export default function OrderPending() {
  const [transactions, setTransactions] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  //order => orderitem

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get(`order/all`)
        console.log(response)
        const allTransactions = response.data.data
        console.log(allTransactions)
        const pendingTransactions = allTransactions.filter(transaction => (transaction.status === 'pending' && transaction.paymentStatus !== 'online-pending'));
        setTransactions(pendingTransactions);
      } catch (error) {
        console.log(error)
      }
    }
    fetchTransactions()
  }, [])

  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const itemsPromises = transactions.map(async (transaction) => {
          const orderItemsResponse = await api.get(`/order/${transaction.orderId}/orderitems`);

          console.log(orderItemsResponse.data.data);
          return {
            orderId: transaction.orderId,
            paymentMethod: transaction.paymentMethod,
            productName: orderItemsResponse.data.data,
          }
        });
        const allOrderItems = await Promise.all(itemsPromises);
        console.log(allOrderItems);
        setOrderItems(allOrderItems);
        console.log(setOrderItems);
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };

    fetchOrderItems();
  }, [transactions]);
  const handleSuccessButtonClick = async (orderId: number) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đánh dấu đơn hàng này là thành công?");
    if (confirmed) {
      try {
        await api.put(`/order/updateSuccess/${orderId}`);
        window.location.reload();
      } catch (error) {
        console.error('Error updating order:', error);
      }
    }
  };
  const handleFailedButtonClick = async (orderId: number) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn đánh dấu đơn hàng này là thất bại?");
    if (confirmed) {
      try {
        await api.put(`/order/updateFailed/${orderId}`);
        window.location.reload();
      } catch (error) {
        console.error('Error updating order:', error);
      }
    }
  };
  const renderNavHistory = () => {
    return (
      <div>
        <h3 className='pt-10 text-3xl font-bold '>Lịch Sử Giao Dịch</h3>
        <div className='flex mt-6 bg-zinc-400 rounded-lg text-center py-5 text-2xl'>
          <p className='flex-1 text-xl font-bold'>User Id</p>
          <p className='flex-1  text-xl font-bold'>Thanh Toán</p>
          <p className='flex-1  text-xl font-bold'>Tên</p>
          <p className='flex-1  text-xl font-bold'>Ngày</p>
          <p className='flex-1  text-xl font-bold'>Tổng Tiền</p>
          <p className='flex-1  text-xl font-bold'>Thanh toán</p>
          <p className='flex-1  text-xl font-bold'>Giao hàng</p>
          <p className='flex-1  text-xl font-bold'>Status</p>
        </div>
      </div>
    )
  }

  const renderInfoHistory = () => {
    return (
      <>
        {orderItems.map((orderItem, index) => {
          const productNames = orderItem.productName || [];
          const { orderId, paymentMethod } = orderItem;
          const transaction = transactions.find(transaction => transaction.orderId === orderId);
          if (!transaction) return null;
          return (
            <div key={index} className='flex py-5 text-2xl text-center hover:bg-white hover:rounded-lg'>
              <p className='flex-1  text-xl font-bold'>{transaction.userId}</p>
              <p className='flex-1  text-xl font-bold'>{paymentMethod}</p>
              <div className='flex-1  text-xl'>
                {productNames.map((name, nameIndex) => (
                  <p key={nameIndex} className='font-bold'>{name}</p>
                ))}
              </div>
              <p className='flex-1 font-bold'>{formatDate(transaction.createdAt, 'yyyy-MM-dd HH:mm:ss')}</p>

              <p className='flex-1  text-xl font-bold'>{formatPrice(transaction.totalPrice)}</p>
              <p className='flex-1  text-xl font-bold'>{transaction.paymentStatus}</p>
              <p className='flex-1  text-xl font-bold'>{transaction.status}</p>

              <div className='flex-1  text-xl flex text-center my-auto'>
                <button className='flex-1  text-xl text-white bg-orange-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1  dark:bg-blue-600 dark:hover:bg-orange-700 font-bold text-xl dark:focus:ring-blue-800 mr-3'
                  onClick={() => handleSuccessButtonClick(orderItem.orderId)}>Thành Công</button>
                <button className='flex-1  text-xl text-white bg-orange-700 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1  dark:bg-blue-600 dark:hover:bg-orange-700 font-bold text-xl dark:focus:ring-blue-800 mr-3'
                  onClick={() => handleFailedButtonClick(orderItem.orderId)}>Thất Bại</button>

              </div>
            </div>
          );
        })}
      </>
    );
  };


  return (
    <div className='mt-[100px] px-20 bg-zinc-200'>
      {renderNavHistory()}
      {renderInfoHistory()}
    </div>
  )
}
