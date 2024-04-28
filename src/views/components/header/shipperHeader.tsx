import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Popover from '../popover'
import { ArrowUturnLeftIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/24/outline';
type UserInfo = {
  fullName: string;
}
export default function UseShipperHeader() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  useEffect(() => {
    const userInfoFromStorage = localStorage.getItem('userInfo');
    if (userInfoFromStorage !== null) {
      const userInfoParsed = JSON.parse(userInfoFromStorage);
      setUserInfo(userInfoParsed);
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('userInfo')
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
            <div className="flex items-center text-[18px]  text-white  ">
              {userInfo && userInfo.fullName}
              <ChevronDownIcon className="lg:w-6 lg:h-6 w-5 h-5" />
            </div>
          }
          renderPopover={
            <div className="lg:w-[300px] md:w-[250px]  bg-white leading-6 shadow-lg ml-[100px] ">
              <div className="text-xl bg-mainColor-colorsCustom pl-5 py-7 font-bold text-xl text-white">
                Hello {userInfo ? userInfo.fullName : 'New User'} shipper!
              </div>
              <Link to="/shipperPending">
                <div className="font-text flex space-x-5 pl-5 py-5 font-bold text-xl hover:opacity-40">
                  <UserIcon className="w- h-5 stroke-text-red-950 text-blue-900 " />
                  <p className=" text-sm text-red-950">Danh sách sản phẩm đang giao</p>
                </div>
              </Link>
              <Link to="/shipperPaid">
                <div className="font-text flex space-x-5 pl-5 py-5 font-bold text-xl hover:opacity-40">
                  <UserIcon className="w- h-5 stroke-text-red-950 text-blue-900 " />
                  <p className=" text-sm text-red-950">Danh sách sản phẩm đã giao thành công</p>
                </div>
              </Link>
              <Link to="/shipperFailed">
                <div className="font-text flex space-x-5 pl-5 py-5 font-bold text-xl hover:opacity-40">
                  <UserIcon className="w- h-5 stroke-text-red-950 text-blue-900 " />
                  <p className=" text-sm text-red-950">Danh sách sản phẩm đã giao thất bại</p>
                </div>
              </Link>


              <div className="font-text flex  pl-6 py-5 font-bold text-sm  text-blue-900 hover:cursor-pointer" onClick={handleLogout}>
                Log Out
                <ArrowUturnLeftIcon className=" absolute right-5 w-5 h-5 stroke-text-red-950 " />
              </div>
            </div>}
        />
      </div>
    </div>
  )
}
