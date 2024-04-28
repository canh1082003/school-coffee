import React, { useEffect, useState } from 'react'
import bx from "../../../img/main/user.jpg"
import api from '../../../api/Api';
import { formatPrice } from '../../../helpers/formatprice';
import { formatDate } from 'date-fns';
type Order = {
  deliveredAt: Date,
  createdAt: Date,
  orderId: number,
  totalPrice: number,
  paymentStatus: string,
  status: string
}
type OrderItem = {
  totalQuantity: number,
  orderId: number,
  productName: string;
};
export default function Userprofile() {
  const [transactions, setTransactions] = useState<Order[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  console.log(imageUrl)
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString !== null) {
          const userInfo = JSON.parse(userInfoString);
          const userId = userInfo.userId;
          const response = await api.get(`/order/${userId}`);
          setTransactions(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);
  useEffect(() => {
    const fetchOrderItems = async () => {
      try {
        const itemsPromises = transactions.map(async (transaction) => {
          const orderItemsResponse = await api.get(`/order/${transaction.orderId}/orderitems`);
          console.log(orderItemsResponse)
          return {
            orderId: transaction.orderId,
            status: transaction.status,
            productName: orderItemsResponse.data.data
          }
        });
        const allOrderItems = await Promise.all(itemsPromises);
        console.log("alllll", allOrderItems);
        setOrderItems(allOrderItems);
      } catch (error) {
        console.error('Error fetching order items:', error);
      }
    };

    fetchOrderItems();
  }, [transactions]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUploadClick = async (event: any) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("imgUrl", file as any);
    const headers = {
      headers: {
        'Content-Type': `multipart/form-data`,
      }
    }


    const userInfoString = localStorage.getItem('userInfo');
    console.log(userInfoString)
    if (userInfoString !== null) {
      const userInfo = JSON.parse(userInfoString);
      const id = userInfo.userId;
      console.log(id)
      const response = await api.put(`/user/updateUser/${id}`, formData, headers)
      console.log(response.data.data.updatedUser.imgUrl)
      setImageUrl(response.data.data.updatedUser.imgUrl);
      console.log(setImageUrl)
    }


  };


  const renderProfile = () => {
    return (
      <div>
        <h3 className='text-3xl font-bold my-10 pt-10' >ProFile</h3>
        <div className='flex'>
          <div className=' w-[70%] bg-white rounded-lg'>
            <div className='p-3'>
              <p className='text-xl py-5'>Tên Đầy Đủ:</p>
              <p className='font-bold italic'>Nguyễn Công Anh</p>
              <p className='text-xl py-5'>Email :</p>
              <p className='font-bold italic'>anhnbk113@gmail.com</p>
              <p className='text-xl py-5'>Role :</p>
              <p className='font-bold italic'>User</p>
              <p className='text-xl py-5'>Số Điện Thoại :</p>
              <p className='font-bold italic'>0775500478</p>
              <p className='text-xl py-5'>Địa Chỉ :</p>
              <p className='font-bold italic'>362 Nguyễn Tất Thành , Thành Phố Hội An ,Tỉnh Quảng Nam, Việt Nam</p>
            </div>
          </div>
          <div className=' w-[30%] bg-white ml-4 rounded-lg'>
            <h3 className='text-2xl p-3 font-bold'>Profile Photo</h3>
            <form onSubmit={handleUploadClick}>
              <div className='text-center p-10'>
                <img src={imageUrl || bx} alt="" className='w-[300px] h-[300px]' />
                <input type="file" onChange={handleImageChange} />
                <button type="submit" className='text-blue-600 font-bold text-2xl mt-3'>UpLoad</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  const renderHistory = () => {
    return (
      <div className='pb-8'>
        <h3 className='pt-10 text-3xl font-bold '>Lịch Sử Giao Dịch</h3>
        <div className='flex mt-6 bg-zinc-300 text-center py-5 text-2xl'>
          <p className='flex-1 font-bold'>Tên Sản Phẩm</p>
          <p className='flex-1 font-bold'>Thời gian</p>
          <p className='flex-1 font-bold'>Giá</p>
          <p className='flex-1 font-bold'>Số Lượng</p>
          <p className='flex-1 font-bold'>Thanh toán</p>
          <p className='flex-1 font-bold'>Trạng Thái giao hàng</p>
        </div>
        {orderItems.map((orderItem, index) => {
          let totalQuantity = 0;
          const productNames = orderItem.productName || [];
          console.log(productNames)
          const { orderId } = orderItem;
          const transaction = transactions.find(transaction => transaction.orderId === orderId);
          if (!transaction) return null;
          const quantity = productNames.length;
          totalQuantity += quantity;
          return (
            <div key={index} className='flex py-5 text-2xl text-center hover:bg-white hover:rounded-lg'>
              <div className='flex-1'>
                {productNames.map((name, nameIndex) => (
                  <p key={nameIndex} className='font-bold'>{name}</p>
                ))}
              </div>
              <p className='flex-1 font-bold'>{formatDate(transaction.createdAt, 'yyyy-MM-dd HH:mm:ss')}</p>
              <p className='flex-1 font-bold'>{formatPrice(transaction.totalPrice)}</p>
              <p className='flex-1 font-bold'>{totalQuantity}</p>
              <p className='flex-1 font-bold'>{transaction.paymentStatus}</p>
              <p className='flex-1 font-bold'>{transaction.status}</p>
            </div>
          );
        })}

      </div>
    )
  }


  return (
    <div className='bg-zinc-200 mt-[100px] px-20'>
      {renderProfile()}
      {renderHistory()}
    </div>
  )
}
