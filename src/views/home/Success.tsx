import React, { useEffect, useState } from 'react'
import api from '../../api/Api';
import { formatPrice } from '../../helpers/formatprice';
import { useParams } from 'react-router-dom';
type Order = {
  totalPrice: number,
  orderId: number
}

export default function Success() {
  const [transactions, setTransactions] = useState<Order[]>([]);
  const { orderId } = useParams()
  console.log(orderId)
  useEffect(() => {
    const fetchTransactions = async () => {
      try {

        const response = await api.put(`/order/updateSuccess/${orderId}`);
        console.log(response)
        setTransactions(response.data.data);

      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className='mt-[150px]'>
      <div key={transactions.orderId} >
        <p className='text-4xl text-red-800 font-bold  text-center'>{`Bạn Đã Thanh Toán Đơn Hàng này thành công với giá trị là ${formatPrice(transactions.totalPrice)}`}</p>
        <p className='text-4xl text-red-800 font-bold pb-[350px] text-center'>{`Phương Thức Thanh Toán  ${(transactions.paymentMethod)}`}</p>
      </div>

    </div>
  )
}
