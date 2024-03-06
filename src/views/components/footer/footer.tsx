import React from 'react'
import { GlobeAltIcon, MapIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
export default function footer() {
  return (
    <>
      <div className="border border-gray"></div>
      <div className="h-[100px]  pt-3">
        <div className="  md:mx-5 lg:mx-32 grid grid-cols-3   ">
          <div>
            <Link to="/map" className="flex space-x-3 ">
              <MapIcon className="w-5 h-5 fill-none stroke-1 stroke-black" />

              <p className="font-text font-bold">Store location</p>
            </Link>
            <p className="font-text">Standard Store : Hoi An, VietNam</p>
          </div>
          <div>
            <span className="flex space-x-2">
              <p className="font-text font-bold">HostLine </p>
              <p className="font-text">*********</p>
            </span>
            <span className="flex space-x-2">
              <p className="font-text font-bold">Email: </p>
              <p className="font-text">Hanvn@gmail.com</p>
            </span>
          </div>
          <div className="flex space-x-4">
            <span className=" flex space-x-1 ">
              <GlobeAltIcon className="w-5 h-5 fill-none stroke-0.5 stroke-black " />
              <div>
                <select className="appearance-none text-sm hover:text-slate-500 ">
                  <option>English </option>
                  <option>VietNam</option>
                </select>
              </div>
            </span>
            <div className="space-x-2 text-sm">
              <a className="hover:text-slate-500" href="">
                instagram
              </a>
              <a className="hover:text-slate-500" href="">
                facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
