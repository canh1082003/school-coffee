
import goicaphe from "../../img/main/goicaphe.png";
import tuicaphe from "../../img/main/tuicaphe.png";
import cuahangmain from "../../img/main/cuahangmain.png";
import cuahangphu from "../../img/main/cuahangphu.png";
import caphesua from "../../img/product/caphesua.webp";
import caphesuasaigon from "../../img/product/caphesuasaigon.webp";
import caphemuoi from "../../img/product/caphemuoi.webp";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
export default function Home() {

  const renderWelcome = () => {
    return (
      <div className='bg-mainColor-main px-20 pt-28'>
        <div className="flex">

          <div className=" flex-1 w-60%">
            <h1 className="text-mainColor-text font-bold text-8xl mb-10"> Han Coffee</h1>
            <p className="font-sans text-white text-3xl mb-10">Chào mừng bạn đến với HAN Coffee, nơi kết nối đam mê cà phê và không gian đẳng cấp.</p>
            <Link to='/sanpham'>
              <button className="text-white text-3xl font-bold bg-orange-700  rounded-lg p-2 hover:underline ">Mua Ngay</button>
            </Link>
          </div>
          <div className=' w-[40%]'>
            <div className="flex">
              <p className="bg-orange-500 w-[400px] h-[400px] mb-[82px] ml-16 rounded-full relative"></p>
              <img src={goicaphe} alt="" className="absolute ml-10 " />
            </div>
          </div>
        </div>
        <p className="text-center font-bold text-white text-3xl mb-5">@HanCoffee 2023-2024</p>
      </div>

    )
  }
  const renderIntroduce = () => {
    return (
      <div className="bg-mainColor-colorsCustom  text-center px-20">
        <h3 className="font-bold text-5xl text-white pt-10 mb-10">Kết Nối Với Chúng Tôi</h3>
        <p className="text-white text-3xl leading-relaxed ">Chào mừng bạn đến với quán cà phê độc đáo và ấn tượng - HAN Coffee! Chúng tôi tự hào là địa điểm mang đến không gian thoải mái và trải nghiệm cà phê độc đáo tại trung tâm thành phố. Với tên thương hiệu "HAN," chúng tôi kết hợp không khí ấm cúng và phong cách hiện đại, tạo nên một không gian đặc biệt, nơi khách hàng có thể thư giãn và tận hưởng hương vị cà phê tinh tế.</p>
      </div>
    )
  }
  const renderImg = () => {
    return (
      <img src={tuicaphe} alt="" className="w-full" />
    )
  }
  const renderProduct = () => {
    return (
      <div className="px-20 py-28">
        <h3 className="text-mainColor-text font-bold text-5xl">Sản Phẩm Mới</h3>
        <div className="flex mt-10">
          <div className="flex-1 bg-mainColor-colorsCustom rounded-lg p-4 mx-2">
            <div className="">
              <img className="rounded-lg" src={caphesua} alt="" />
            </div>
            <div className="text-center text-mainColor-text font-bold text-3xl">
              <p className="my-5">Cà Phê Sữa</p>
              <p>45.000đ ~ 60.000đ</p>
            </div>
          </div>
          <div className="flex-1 bg-mainColor-colorsCustom rounded-lg p-4 mx-2">
            <div className="">
              <img className="rounded-lg" src={caphesuasaigon} alt="" />
            </div>
            <div className="text-center text-mainColor-text font-bold text-3xl">
              <p className="my-5">Cà Phê Sài Gòn</p>
              <p>65.000đ ~ 80.000đ</p>
            </div>
          </div>
          <div className="flex-1 bg-mainColor-colorsCustom rounded-lg p-4 mx-2">
            <div className="">
              <img className="rounded-lg" src={caphemuoi} alt="" />
            </div>
            <div className="text-center text-mainColor-text font-bold text-3xl">
              <p className="my-5">Cà Phê Muối</p>
              <p>55.000đ ~ 70.000đ</p>
            </div>
          </div>

        </div>
        <Link to='/sanpham'>
          <button className="bg-mainColor-button text-mainColor-text font-bold text-4xl w-full rounded-lg mt-10 mb-[200px] py-3 hover:bg-mainColor-colorsCustom">Xem Thêm</button>
        </Link>
        <div className="flex">
          <div className="flex-1 w-[60%] ml-20">
            <img src={cuahangmain} alt="" />
            <div className="border-b border-orange-500 mt-10"></div>
          </div>
          <div className=" flex-1">
            <p className="text-mainColor-text font-bold text-7xl text-center mb-5">Cửa Hàng</p>
            <img src={cuahangphu} alt="" />
            <div className="border-b border-orange-500 mt-10"></div>

          </div>
        </div>
      </div>
    )
  }
  return (
    <motion.div>


      <div className='mt-[100px] bg-mainColor-main border-b border-orange-500' >
        {renderWelcome()}
        {renderIntroduce()}
        {renderImg()}
        {renderProduct()}
      </div >
    </motion.div>


  )
}