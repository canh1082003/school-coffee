// import { useSelector } from "react-redux"
import config from "../../../api/config"
import axios from "axios"

const PayButton = ({ cartItems, userId, method }: any) => {
  const HandleClick = async () => {
    console.log(config)
    console.log(userId)
    try {
      const response = await axios.post(`${config.baseUrl}/api/coffee/order/create`, {
        cartItems,
        userId: userId,
        paymentMethod: method

      })


      const sessionUrl = response.data.data.url;
      window.location.href = sessionUrl;


      console.log("ok")


    } catch (error) {
      console.log(error)
      console.log("lỗi nè")

    }
    console.log(cartItems)
  }

  return (
    <>
      <button className="bg-blue-700 text-2xl text-white font-bold p-4 rounded-lg mb-3" onClick={() => HandleClick()}>Thanh Toán</button>
    </>
  )
}
export default PayButton