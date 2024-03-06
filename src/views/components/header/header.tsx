import { useEffect, useState } from "react";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { Link } from 'react-router-dom'
import LogoHan from "../../../img/main/Logo.svg"
import { motion } from 'framer-motion'
import { HeaderRoutes } from '../../../router/HeaderRouter'
import { Modal } from "../../home/components/modal/ModalStyle";
import UseInfoHeader from "./useInfoHeader";
import UseAdminInfoHeader from "./adminInfoHeader";
type UserInfo = {
  fullName: string;
  role: string
}
export default function Header() {
  const [activeTab, setActiveTab] = useState(HeaderRoutes[0].id);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem('userInfo');
    if (userInfoFromStorage !== null) {
      const userInfoParsed = JSON.parse(userInfoFromStorage);
      setUserInfo(userInfoParsed);
    }
  }, []);

  const isActiveModal = () => {
    return isModalOpen ? "active" : "";
  };
  const renderLogoHeader = () => {
    return (
      <Link to={"/"}>
        <img src={LogoHan} className='w-18 h-18'></img>
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
                className="leading-[100px] whitespace-nowrap text-center text-xl ml-10 mr-10 flex-1  "
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
      <div className="relative" onClick={() => setIsModalOpen((pre) => !pre)}>
        <ShoppingCartIcon className='w-10 h-10 m-auto mt-7' />
      </div>
    )
  }
  const renderModalCartHeader = () => {
    return (
      <Modal>
        <div className={`modal ${isActiveModal()}`}>
          <div className={`modal-content   py-4  flex`}>
            <div>
              <div className="absolute left-7 font-text text-2xl">Cart</div>
              <XMarkIcon
                className="w-7 h-7 absolute right-7"
                onClick={() => setIsModalOpen(false)}
              />
              <div className="w-full h-[1px] bg-black absolute top-[70px]"></div>
            </div>

            <div className="mt-20">
              <p className=" ml-4 font-body">Shopping cart is empty</p>
              <div className="w-full pt-10 ml-[50%] ">
                <Link to="shop" onClick={() => setIsModalOpen(false)}>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    );
  };
  const isAdmin = userInfo?.role === "admin"
  const renderInforHeader = () => {

    return (
      <div className="m-auto ">
        <div className=" flex mr-10 ">
          {isAdmin ? <UseAdminInfoHeader /> : <UseInfoHeader />}
          <UserIcon className=" lg:w-6 lg:h-6 w-5 h-5 leading-10 " />
        </div>
      </div>
    )
  };
  return (
    <>
      {renderModalCartHeader()}
      <div className=' fixed h-[100px] bg-mainColor-main font-bold w-full pr-10 pl-20 top-0 z-50 '>
        <div className=' flex h-[100px]'>
          <div className=' '>
            {renderLogoHeader()}
          </div>
          <div className='flex-1 flex ml-60'>
            {renderNav()}
          </div>
          <div className="flex">
            {renderInforHeader()}
          </div>
          <div className='flex mr-20'>
            {renderCartHeader()}
          </div>
        </div>
      </div>
    </>
  )
}
