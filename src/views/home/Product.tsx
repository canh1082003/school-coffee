import { HeartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { formatPrice } from '../../helpers/formatprice';
import api from '../../api/Api';
import { useAllProduct } from '../../hooks/product/useAllProduct';
import { addToCart } from '../../helpers/addToCart';
type Category = {
  id: number,
  name: string,
}

interface HeartHoveredState {
  [key: number]: boolean;
}
export default function Product() {
  const products = useAllProduct();
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  const [categorys, setCategorys] = useState<Category[]>([]);
  const productsFilter = products?.filter((product => {
    return activeCategoryId == 0 ? true : activeCategoryId == product.categoryId
  }));
  const [heartHovered, setHeartHovered] = useState<HeartHoveredState>({});
  const handleHeartClick = (productId: number) => {
    setHeartHovered(prevState => {
      const nextState = { ...prevState };
      nextState[productId] = !nextState[productId];
      return nextState;
    });
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const responseCategory = await api.get('/product/category');
        setCategorys(responseCategory.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }

    };
    fetchCategory();
  }, []);

  const renderTitleProductsAndFind = () => {
    return (
      <>
        <div className=' flex-1 flex mt-8'>
          <div >
            <div
              onClick={() => {
                setActiveCategoryId(0)
              }}
              className={`whitespace-nowrap  px-5 py-3  rounded-md text-center text-xl mx-6 hover:bg-mainColor-colorsCustom hover:text-white ${activeCategoryId == 0 ? 'bg-mainColor-colorsCustom text-white' : 'text-mbg-mainColor-colorsCustom bg-white'}`}
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
                className={`whitespace-nowrap  px-5 py-3  rounded-md text-center text-xl mx-6 hover:bg-mainColor-colorsCustom hover:text-white ${activeCategoryId === category.id ? 'bg-mainColor-colorsCustom text-white' : 'text-mbg-mainColor-colorsCustom bg-white'}`}
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
      <div className="col-span-3 px-20 bg-mainColor-main">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {productsFilter?.map(product => (
            <div className="col-span-1" key={product.id}>
              <div className="bg-white shadow rounded-sm hover:translate-y-1 hover:shadow-md duration-75 transition-transform">
                <Link to={`/InfoProduct/${product.id}`}  >
                  <div className="">
                    <img
                      src={product.imgUrl}
                      alt={product.name}
                      className="top-0 left-0 w-full h-full"
                    />
                  </div>
                </Link>
                <div className="p-2 overflow-hidden mx-3 my-5">
                  <div className="flex items-center justify-between">
                    <p className="font-text text-2xl font-bold text-orange-700 uppercase lg:text-lg text-md line-clamp-2">
                      {product.name}
                    </p>
                    <HeartIcon
                      key={product.id}
                      className={`w-6 h-6 ${heartHovered[product.id] ? `fill-mainColor-icon stroke-none` : ''
                        } hover:fill-mainColor-icon hover:stroke-none`}
                      onClick={() => {
                        handleHeartClick(product.id);
                        addToCart(product.id + '');

                      }}
                    />
                  </div>
                  <p className="mt-3 opacity-75 text-base lg:text-md font-bold">{formatPrice(product.price)}</p>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div >

    )
  }


  return (
    <div>
      < div className="flex pt-[150px] px-14 bg-mainColor-main" >
        {renderTitleProductsAndFind()}
      </div>
      {renderProducts()}
    </div>
  )
}