import React, { useEffect, useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useAllProduct } from '../../../hooks/product/useAllProduct';
import { formatPrice } from '../../../helpers/formatprice';
import PayButton from '../../home/components/Payment';


type CartItem = {
  productId: string;
  quantity: number;
}


export default function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const products = useAllProduct()
  const [cartString, setCartString] = useState(localStorage.getItem('cart'))
  const [userId, setUserId] = useState<any>(null);
  const handleLocalStorage = (newCart: string) => {
    window.localStorage.setItem("cart", newCart);
    window.dispatchEvent(new Event("cart"));
  };
  useEffect(() => {
    const userInfoString = localStorage.getItem('userInfo');
    console.log(userInfoString)
    if (userInfoString !== null) {
      const userInfo = JSON.parse(userInfoString);
      setUserId(userInfo.userId);

      console.log(setUserId);
    }
  }, []);
  useEffect(() => {
    if (cartString) {
      const cartArr = cartString.split('-');
      const items = cartArr.map(item => {
        const [productId, quantity] = item.split(':');
        return { productId, quantity: parseInt(quantity) };
      });
      console.log(items)
      setCartItems(items);

    }
    else {
      setCartItems([])
    }
  }, [cartString]);

  const handleAddQuantity = (index: number, productId: string) => {
    const setCharAt = (str: string, index: number, chr: string) => {
      if (index > str.length - 1) return str;
      return str.substring(0, index) + chr + str.substring(index + 1);
    };
    const cartString = localStorage.getItem('cart');
    if (!cartString) {
      return "not Found product"
    }
    const cartArr = cartString.toString().split('-');
    let isFound = false;
    for (let i = 0; i < cartArr.length; i++) {
      const idInCart = cartArr[i].charAt(0);
      const quantityInCart = cartArr[i].charAt(2);
      if (productId == idInCart) {
        cartArr[i] = setCharAt(cartArr[i], 2, Number(quantityInCart) + 1 + '');
        isFound = true;
        break;
      }
    }
    if (isFound) {
      let newCart = '';
      for (let j = 0; j < cartArr.length; j++) {
        console.log(j);
        console.log(j + ' ' + (j === cartArr.length - 1 && cartArr.length != 1));
        if (j === 0) {
          newCart = newCart.concat(cartArr[j]); //3:2
          console.log(newCart);
        } else {
          newCart = newCart.concat('-' + cartArr[j]);
          console.log(newCart);
          console.log('here3');
        }
        localStorage.removeItem('cart');
        handleLocalStorage(newCart)
      }
    }
    const newCartItems = [...cartItems];
    newCartItems[index].quantity += 1;
    setCartItems(newCartItems);
  };
  const handleDeleteQuantity = (index: number, productId: string) => {
    const setCharAt = (str: string, index: number, chr: string) => {
      if (index > str.length - 1) return str;
      return str.substring(0, index) + chr + str.substring(index + 1);
    };
    const cartString = localStorage.getItem('cart');
    if (!cartString) {
      return "not Found product"
    }
    const cartArr = cartString.toString().split('-');
    let isFound = false;
    for (let i = 0; i < cartArr.length; i++) {
      const idInCart = cartArr[i].charAt(0);
      const quantityInCart = cartArr[i].charAt(2);
      if (productId == idInCart) {
        cartArr[i] = setCharAt(cartArr[i], 2, Number(quantityInCart) - 1 + '');
        isFound = true;
        break;
      }
    }
    if (isFound) {
      let newCart = '';
      for (let j = 0; j < cartArr.length; j++) {
        console.log(j);
        console.log(j + ' ' + (j === cartArr.length - 1 && cartArr.length != 1));
        if (j === 0) {
          newCart = newCart.concat(cartArr[j]);
          console.log(newCart);
        } else {
          newCart = newCart.concat('-' + cartArr[j]);
          console.log(newCart);
          console.log('here3');
        }
        localStorage.removeItem('cart');
        handleLocalStorage(newCart)
      }
    }
    const newCartItems = [...cartItems];
    if (newCartItems[index].quantity > 0) {
      newCartItems[index].quantity -= 1;
      setCartItems(newCartItems);
    }
  };
  const confirmDeleteItem = (productId: string) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?");
    if (!confirmDelete) {
      return;
    }
    const cartArr = cartString!.toString().split('-')
    if (cartArr.length === 1) {
      console.log('ok')
      localStorage.removeItem('cart')
      setCartString(null)
    }
    for (let i = 0; i < cartArr.length; i++) {
      const idInCart = cartArr[i].charAt(0);
      if (productId == idInCart) {
        cartArr.splice(i, 1);
        console.log(cartArr.join('-'))
        handleLocalStorage(cartArr.join('-'))
        setCartString(localStorage.getItem('cart'))
        break;
      }
    }
  };

  const renderInfoCart = () => {
    return (
      <div>
        <h3 className='pt-10 text-3xl font-bold '>Giỏ Hàng</h3>
        <div className='flex mt-6 bg-zinc-300 text-center py-5 text-2xl'>
          <p className='flex-1 font-bold'>Sản Phẩm</p>
          <p className='flex-1 font-bold'>Tên</p>
          <p className='flex-1 font-bold'>Giá</p>
          <p className='flex-1 font-bold'>Số Lượng</p>
          <p className='flex-1 font-bold'>Số Tiền</p>
          <p className='flex-1 font-bold'>Thao Tác</p>
        </div>

        {cartItems.map((item, index) => {
          const product = products.find(product => Number(product.id) === parseInt(item.productId));
          if (!product) return null;
          return (
            <div key={index} className='grid grid-cols-6 py-5 text-2xl text-center hover:bg-white hover:rounded-lg'>
              <div className='col-span-1'>
                <img src={product.imgUrl} alt="" className='w-[100px] h-[100px] rounded-lg inline-block' />
              </div>
              <div className="col-span-1">
                <p className=' font-bold inline-block mt-9 '>{product.name}</p>

              </div>
              <p className='col-span-1 my-auto font-bold'>{formatPrice(product.price)}</p>
              <div className='col-span-1 flex'>
                <button className=' m-auto p-3 mr-3 hover:bg-zinc-200' onClick={() => handleDeleteQuantity(index, (product.id.toString()))}>-</button>
                <p className='m-auto font-bold'>{item.quantity}</p>
                <button className='m-auto p-3 ml-3 hover:bg-zinc-200' onClick={() => handleAddQuantity(index, (product.id.toString()))}>+</button>
              </div>
              <p className='col-span-1 my-auto font-bold'>{formatPrice(product.price * item.quantity)}</p>
              <button className='col-span-1' onClick={() => confirmDeleteItem(product.id.toString())}>
                <TrashIcon className="w-6 h-6 mx-auto " />
              </button>
            </div>

          )

        })}


      </div>
    )
  }
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    for (const item of cartItems) {
      const product = products.find(product => Number(product.id) === parseInt(item.productId));
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }
    return totalPrice;
  };
  const [method, setMethod] = useState('online');
  const handleSelectPayMethod = (method: string) => {
    setMethod(method)
  }
  const renderPay = () => {
    return (
      <div className='font-bold text-2xl text-right mt-8 block'>
        <select onChange={(e) => handleSelectPayMethod(e.target.value)} id="paymentMethodSelect" className='p-3 pr-1 rounded-md'>
          <option defaultValue={'online'} value="online">Thanh Toán Trước Khi Giao Hàng</option>
          <option value="cash">Thanh Toán Sau Khi Giao Hàng</option>
        </select>
        <span className='mb-3 block'>Tổng Tiền</span>
        <p className='pb-6 italic'>{formatPrice(calculateTotalPrice())}</p>
        <PayButton method={method} cartItems={cartItems} userId={userId} />
      </div>
    )
  }
  return (
    <div className='mt-[100px] bg-zinc-200 px-20'>
      {renderInfoCart()}
      <div className="w-full h-[1px] bg-blue-600  mt-4"></div>
      {renderPay()}
    </div>
  )
}
