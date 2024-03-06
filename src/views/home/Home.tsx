import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, HeartIcon } from "@heroicons/react/24/outline";
import main from "../../img/main/main.jpg";
import { motion } from 'framer-motion'
import { Link, Outlet } from 'react-router-dom'
import api from "../../api/Api";
import { formatPrice } from "../../helpers/formatprice";
// import posster from "../../img/main/postter.jpg"
type Product = {
  id: number,
  img: string,
  name: string,
  price: number,
  categoryId: number,
}
type Category = {
  id: number,
  name: string,
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const productsFilter = products?.filter((product => {
    return activeCategoryId == 0 ? true : activeCategoryId == product.categoryId
  }));
  console.log(activeCategoryId)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseProduct = await api.get('/product/all');
        setProducts(responseProduct.data.data);
        setIsLoading(true)

      } catch (error) {
        console.error('Error fetching products:', error);
      }

    };
    fetchProducts();
    setIsLoading(false)
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const responseCategory = await api.get('/product/category');
        setCategorys(responseCategory.data.data);
        // setIsLoading(true)
      } catch (error) {
        console.error('Error fetching products:', error);
      }

    };
    fetchCategory();
    // setIsLoading(false)
  }, []);

  const renderWelcomeImage = () => {
    return (
      <div className='relative'>
        <div>
          <img src={main} alt="" className=' w-full h-[600px] object-center' />
        </div>
        <div className='absolute  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-slate-50 text-2xl font-bold '>
          <p className='text-center mr-5 text-3xl tracking-wide'>The Local Han | 362 Nguyễn Tất Thành</p>
          <p>Địa Chỉ : 362 Nguyễn Tất Thành, Thành Phố Hội An , Tỉnh Quảng Nam</p>
        </div>
      </div>

    )
  }
  const renderTitleProductsAndFind = () => {
    return (
      <>
        <div className=' flex-1 flex mt-10'>
          <div >
            <div
              onClick={() => {
                setActiveCategoryId(0)
              }}
              className={`whitespace-nowrap  px-5 py-3  rounded-md text-center text-xl mx-6 hover:bg-cyan-950 hover:text-yellow-500 ${activeCategoryId == 0 ? 'bg-cyan-950 text-yellow-500' : 'text-cyan-950 bg-yellow-500'}`}
            >
              <span className=" ">Tất Cả</span>
            </div>
          </div>
          {categorys.map(category => (

            <div key={category.id} >
              <div
                onClick={() => {
                  setActiveCategoryId(category.id)
                }}
                className={`whitespace-nowrap  px-5 py-3  rounded-md text-center text-xl mx-6 hover:bg-cyan-950 hover:text-yellow-500 ${activeCategoryId === category.id ? 'bg-cyan-950 text-yellow-500' : 'text-cyan-950 bg-yellow-500'}`}
              >
                <span className=" ">{category.name}</span>
              </div>
            </div>

          ))}
        </div>
        <div className="relative ">
          <div className="flex ">
            <input
              id="search"
              type="text"
              placeholder="Tìm Sản Phẩm"
              className=" mt-7 my-10 mr-[30px]  px-5 py-3 border rounded-md border-gray-500"
            />
            <div className="absolute w-6 h-6 right-[50px] mt-[41px]">
              <MagnifyingGlassIcon />
            </div>
          </div>
        </div>
      </>
    )
  }
  const renderProducts = () => {
    return (
      <div className="col-span-3 px-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {productsFilter?.map(product => (
            <div className="col-span-1" key={product.id}>
              <Link to={`/product/${product.id}`}>
                <div className="bg-white shadow rounded-sm hover:translate-y-1 hover:shadow-md duration-75 transition-transform">
                  <div className="">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="top-0 left-0 w-full h-full"
                    />
                  </div>
                  <div className="p-2 overflow-hidden mx-3 my-5">
                    <div className="flex items-center justify-between">
                      <p className="font-text text-2xl font-bold text-orange-700 uppercase lg:text-lg text-md line-clamp-2">
                        {product.name}
                      </p>
                      <HeartIcon className="w-6 h-6 hover:fill-mainColor-icon hover:stroke-none" />
                    </div>
                    <p className="mt-3 opacity-75 text-base lg:text-md font-bold">{formatPrice(product.price)}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

    )
  }
  return (
    <motion.div>

      {
        isLoading ? (<div className='mt-[100px] bg-slate-200' >
          {renderWelcomeImage()}
          < div className="flex mt-10 mx-20" >
            {renderTitleProductsAndFind()}
          </div>
          <Outlet />
          {renderProducts()}
        </div >) : "loading..."}
    </motion.div>


  )
}