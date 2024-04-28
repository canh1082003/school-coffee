import React, { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/24/outline'
import api from '../../../api/Api';
import { formatPrice } from '../../../helpers/formatprice';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../../helpers/addToCart';
type Product = {
  id: number,
  imgUrl: string,
  name: string,
  price: number,
  categoryId: number,
  description: string
}
export default function Inforproduct() {
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams<{ id: string }>();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(id)
        const responseProduct = await api.get(`/product/${id}`);
        setProduct(responseProduct.data.data);
        const categoryId = responseProduct.data.data.categoryId;
        const responseRelatedProducts = await api.get(`/product/category/${categoryId}`);
        setRelatedProducts(responseRelatedProducts.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }

    };
    fetchProducts();
  }, [id]);
  const renderProductmain = (product: Product | null) => {
    if (!product) return null;

    return (
      <div className='flex mt-[100px]'>
        <div className='w-[40%] h-[70%]'>
          <img src={product.imgUrl} alt="" className='w-full ' />
        </div>
        <div className='w-[60%] h-full'>
          <div className='m-7'>
            <h2 className='font-bold text-2xl mb-3'>{product.name}</h2>
            <p className='font-bold text-xl mb-3'>{formatPrice(product.price)}</p>
            <div className='mt-8 '>
              <h4 className='p-2 italic'> Mô Tả Sản Phẩm </h4>
              <p className='font-bold mb-3 p-3  border border-black border-solid mr-6'>{product.description}</p>
            </div>
            <button className='font-bold mt-8 text-xl bg-mainColor-main px-[38%] py-4 hover:bg-cyan-900 hover:text-white' onClick={() => {

              addToCart(product.id + '');

            }}>Thêm vào giỏ hàng</button>
          </div>
        </div>
      </div>
    )
  }
  const renderProductRelated = () => {
    return (
      <div className='mx-10'>
        <h3 className='font-bold mt-9 text-2xl underline mb-4'>Sản Phẩm Có Liên Quan</h3>
        <div className='flex'>
          {relatedProducts.map((relatedProduct) => (
            <div key={relatedProduct.id} className="flex-1 w-[15%] mr-2" >
              {/* <Link to={`/InfoProduct/${product.id}`}  > */}
              <div className="bg-white shadow rounded-sm hover:translate-y-1 hover:shadow-md duration-75 transition-transform">
                <div className="">
                  <img
                    src={relatedProduct.imgUrl}
                    className="top-0 left-0 w-full h-full"
                  />
                </div>
                <div className="p-2 overflow-hidden mx-3 my-5">
                  <div className="flex items-center justify-between">
                    <p className="font-text text-2xl font-bold text-orange-700 uppercase lg:text-lg text-md line-clamp-2">
                      {relatedProduct.name}
                    </p>
                    <HeartIcon className="w-6 h-6 hover:fill-mainColor-icon hover:stroke-none" />
                  </div>
                  <p className="mt-3 opacity-75 text-base lg:text-md font-bold">{formatPrice(relatedProduct.price)}</p>
                </div>
              </div>
              {/* </Link> */}
            </div>
          ))}

        </div>
      </div >
    )
  }
  return (
    <>
      {renderProductmain(product)}
      {renderProductRelated()}
    </>
  )
}