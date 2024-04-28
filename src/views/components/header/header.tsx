import { useEffect, useState } from "react";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline"
import { Link } from 'react-router-dom'
import LogoHan from "../../../img/main/Logo.svg"
import { motion } from 'framer-motion'
import { HeaderRoutes } from '../../../router/HeaderRouter'
import UseInfoHeader from "./useInfoHeader";
import UseAdminInfoHeader from "./adminInfoHeader";
import UseShipperHeader from "./shipperHeader";
type UserInfo = {
  fullName: string;
  role: string
}

export default function Header() {
  const [activeTab, setActiveTab] = useState(HeaderRoutes[0].id);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [cartString, setCartString] = useState(localStorage.getItem('cart'))
  window.addEventListener('cart', () => {
    setCartString(localStorage.getItem('cart'))
  })
  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem('userInfo');
    if (userInfoFromStorage !== null) {
      const userInfoParsed = JSON.parse(userInfoFromStorage);
      setUserInfo(userInfoParsed);
    }
  }, []);



  const renderLogoHeader = () => {
    return (
      <Link to={"/"}>
        <img src={LogoHan} className='w-[100px] h-[100px]'></img>
      </Link>
    )
  }

  const renderNav = () => {
    return (
      <>
        {HeaderRoutes.map((route) => {
          return (
            <motion.div key={route.id} whileHover={{ scale: 1.1 }}>
              <Link
                to={route.path}
                onClick={() => setActiveTab(route.id)}
                className={`leading-[100px] whitespace-nowrap text-white text-center text-2xl ml-32  ${activeTab === route.id ? 'active' : ''}`}
              >
                <span className=" ">{route.title}</span>
              </Link>
            </motion.div>
          );
        })}
      </>
    )
  }

  const renderCartHeader = () => {
    return (
      <Link to="/cart">
        <div className="relative" >
          <p className="text-white absolute ml-8 text-xl ">{cartString?.split("-").length}</p>
          <ShoppingCartIcon className='w-10 h-10 m-auto' />
        </div>
      </Link>
    )
  }

  const renderInfoHeader = () => {
    const role = userInfo?.role;
    const HeaderComponent = () => {
      switch (role) {
        case 'admin':
          return <UseAdminInfoHeader />;
        case 'shipper':
          return <UseShipperHeader />;
        default:
          return <UseInfoHeader />;
      }
    };

    return (
      <div className="m-auto">
        <div className="flex mr-10">
          <HeaderComponent />
          <UserIcon className="lg:w-6 lg:h-6 w-5 h-5 leading-10" />
        </div>
      </div>
    );
  };

  return (
    <>

      <div className='fixed h-[100px] bg-mainColor-main font-bold w-full px-20 top-0 z-50 text-mainColor-text border-b border-orange-500'>
        <div className='flex items-center justify-between h-full'>
          <div className='flex-shrink-0'>
            {renderLogoHeader()}
          </div>
          <div className='flex flex-wrap ml-4'>
            {renderNav()}
          </div>
          <div className='ml-auto mr-4'>
            {renderInfoHeader()}
          </div>
          <div className='flex-shrink-0'>
            {renderCartHeader()}
          </div>
        </div>
      </div>

    </>
  )
}

