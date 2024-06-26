import React, { useEffect, useState } from 'react'
import {
  ArrowUturnLeftIcon,
  BuildingStorefrontIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Popover from "../popover";
import { Link } from 'react-router-dom';
type UserInfo = {
  fullName: string;
  role: string
}
export default function useAdminInfoHeader() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem('userInfo');
    if (userInfoFromStorage !== null) {
      const userInfoParsed = JSON.parse(userInfoFromStorage);
      setUserInfo(userInfoParsed);
    }
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    setUserInfo(null);
    window.location.href = '/auth';
  };
  const handleUserInfoClick = () => {
    if (!userInfo || !userInfo.fullName) {
      window.location.href = '/auth';
    }
  };


  return (
    <div className='text-xl text-white' onClick={handleUserInfoClick}>
      <div className="relative">
        <Popover
          className="absolute  z-10  flex mt-5  max-w-max -translate-x-1/2"
          children={
            <div className="flex items-center text-[18px]  ">
              {userInfo && userInfo.fullName}
              <ChevronDownIcon className="lg:w-6 lg:h-6 w-5 h-5" />
            </div>
          }

          renderPopover={
            <div className="lg:w-[300px] md:w-[250px]  bg-white leading-6 shadow-lg ml-[100px] ">
              <div className="text-xl bg-mainColor-colorsCustom  pl-5 py-7 font-bold text-xl text-white">
                Xin Chào Admin Của Tôi
              </div>
              <Link to="List-User">
                <div className="font-text flex space-x-5 pl-5 py-5 font-bold text-xl hover:opacity-40">
                  <UserIcon className="w- h-5 stroke-text-red-950 text-blue-900" />
                  <p className=" text-sm text-red-950">Danh Sách Khách Hàng</p>
                </div>
              </Link>
              <Link to="List-Product">
                <div className="font-text flex space-x-5 pl-5 py-5 font-bold text-xl hover:opacity-40">
                  <BuildingStorefrontIcon className="w-5 h-5 stroke-text-red-950 text-blue-900" />
                  <p className=" text-sm text-red-950">Danh Sách Sản Phẩm</p>
                </div>
              </Link>
              <Link to="history">
                <div className="font-text flex space-x-5 pl-5 py-5 font-bold text-xl hover:opacity-40">
                  <CurrencyDollarIcon className="w-5 h-5 stroke-text-red-950 text-blue-900" />
                  <p className=" text-sm text-red-950">Lịch Sử Giao Dịch</p>
                </div>
              </Link>
              <div className="font-text flex  pl-6 py-5 font-bold text-sm text-blue-900 hover:cursor-pointer" onClick={handleLogout}>
                Log Out
                <ArrowUturnLeftIcon className=" absolute right-5 w-5 h-5 stroke-text-red-950 " />
              </div>
            </div>}
        />
      </div>
    </div>
  )
}

