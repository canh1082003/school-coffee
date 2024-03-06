import React, { useEffect, useState } from 'react'
import {
  ArrowUturnLeftIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Popover from "../popover";
import { Link } from 'react-router-dom';
type UserInfo = {
  fullName: string;
}
export default function useInfoHeader() {
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
    <div className='text-xl text-blue-900' onClick={handleUserInfoClick}>
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
              <div className="text-xl bg-red-950 pl-5 py-7 font-bold text-xl text-white">
                Hello {userInfo ? userInfo.fullName : 'New User'}!
              </div>
              <div className="font-text flex space-x-5 pl-5 py-5 font-bold text-xl hover:opacity-40">
                <UserIcon className="w- h-5 stroke-text-red-950 " />
                <p className=" text-sm text-red-950">Profilo</p>
              </div>
              <div className="font-text flex space-x-5 pl-5 py-5 font-bold text-xl hover:opacity-40">
                <CurrencyDollarIcon className="w-5 h-5 stroke-text-red-950 " />
                <p className=" text-sm text-red-950">Order</p>
              </div>
              <div className="font-text flex  pl-6 py-5 font-bold text-sm  hover:cursor-pointer" onClick={handleLogout}>
                Log Out
                <ArrowUturnLeftIcon className=" absolute right-5 w-5 h-5 stroke-text-red-950 " />
              </div>
            </div>}
        />
      </div>
    </div>
  )
}

