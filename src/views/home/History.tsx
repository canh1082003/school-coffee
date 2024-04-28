import React, { useEffect, useState } from 'react'
import api from '../../api/Api';
import { formatPrice } from '../../helpers/formatprice';
import { formatDate } from 'date-fns';
type Order = {
  orderId: number,
  deliveredAt: Date,
  totalPrice: number,
  paymentStatus: string,
  status: string
}
type OrderItem = {
  orderId: number,
  productName: string;
};
export default function History() {
  const [transactions, setTransactions] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  //order => orderitem

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get(`order/all`)
        const allTransactions = response.data.data

        const pendingTransactions = allTransactions.filter(transaction => (transaction.status === 'pending' && transaction.paymentStatus !== 'online-pending'));

        setTransactions(pendingTransactions)
      } catch (error) {
        console.log(error)
      }
    }
    fetchTransactions()
  }, [])
  useEffect(() => {
    const fetchProductNames = async () => {
      try {
        const responseProduct = await api.get(`/product/all`);
        const products = responseProduct.data.data;

        console.log(products)
      } catch (error) {
        console.log("Error fetching product names:", error);
      }
    };
    fetchProductNames();
  })
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const itemsPromises = transactions.map(async (transaction) => {
          const orderItemsResponse = await api.get(`/order/${transaction.orderId}/orderitems`);

          console.log(orderItemsResponse.data.data);
          return {
            orderId: transaction.orderId,
            status: transaction.status,
            productName: orderItemsResponse.data.data
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

  const renderNavHistory = () => {
    return (
      <div>
        <h3 className='pt-10 text-3xl font-bold '>Lịch Sử Giao Dịch</h3>
        <div className='flex mt-6 bg-zinc-400 rounded-lg text-center py-5 text-2xl'>
          <p className='flex-1 font-bold'>User Id</p>
          <p className='flex-1 font-bold'>Tên Sản Phẩm</p>
          <p className='flex-1 font-bold'>Ngày</p>
          <p className='flex-1 font-bold'>Số Lượng</p>
          <p className='flex-1 font-bold'>Tổng Tiền</p>
          <p className='flex-1 font-bold'>Thanh Toán</p>
          <p className='flex-1 font-bold'>Giao Hàng</p>
        </div>
      </div>
    )
  }
  const renderInfoHistory = () => {
    return (
      <>
        {orderItems.map((orderItem, index) => {
          const productNames = orderItem.productName || [];
          const { orderId } = orderItem;
          let totalQuantity = 0;
          const quantity = productNames.length;
          totalQuantity += quantity;
          const transaction = transactions.find(transaction => transaction.orderId === orderId);
          if (!transaction) return null;
          return (
            <div key={index} className='flex py-5 text-2xl text-center hover:bg-white hover:rounded-lg'>
              <p className='flex-1 font-bold'>{transaction.userId}</p>
              <div className='flex-1'>
                {productNames.map((name, nameIndex) => (
                  <p key={nameIndex} className='font-bold'>{name}</p>
                ))}
              </div>
              <p className='flex-1 font-bold'>{formatDate(transaction.createdAt, 'yyyy-MM-dd HH:mm:ss')}</p>

              <p className='flex-1 font-bold'>{totalQuantity}</p>
              <p className='flex-1 font-bold'>{formatPrice(transaction.totalPrice)}</p>
              <p className='flex-1 font-bold'>{transaction.paymentStatus}</p>
              <p className='flex-1 font-bold'>{transaction.status}</p>
            </div>
          );
        })}
      </>
    );
  };
  const orderQuantity = () => {
    const totalOrderQuantity = orderItems.length
    return (
      <div className='bg-sky-800 rounded-lg block p-4 text-white text-2xl flex'>
        <p className='flex-1'>Tổng Số Lượng đơn hàng</p>
        <p className='flex'>{totalOrderQuantity}</p>
      </div>
    )
  }

  return (
    <div className='mt-[100px] px-20 bg-zinc-200'>
      {orderQuantity()}
      {renderNavHistory()}
      {renderInfoHistory()}
    </div>
  )
}
