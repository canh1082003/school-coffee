import React from 'react'

import cuahangmain from "../../img/main/cuahangmain.png";
export default function Posts() {
  return (
    <div className='mt-[100px]'>
      <h3 className='bg-mainColor-colorsCustom text-mainColor-text text-5xl px-20 py-10 '>Giới Thiệu</h3>
      <div className='bg-mainColor-colorsCustom text-white px-20 flex'>
        <img src={cuahangmain} alt="" className='flex-1 w-[60%]' />
        <p className='flex-1 w-[40%] px-5 text-xl'>Tiếng chuông nhỏ reo lên bên ngoài cửa kính sáng bóng của Han Coffee, tạo nên một không gian yên bình và thư thái giữa trung tâm của thành phố. Bước vào quán, bạn sẽ được chìm đắm trong không gian sang trọng, đậm chất văn hóa Hàn Quốc với một chút sự hiện đại.

          Với không gian trang trí tinh tế và màu sắc ấm áp, Han Coffee không chỉ là nơi lý tưởng để thưởng thức cà phê mà còn là điểm đến lý tưởng cho những buổi gặp gỡ bạn bè, làm việc hoặc đơn giản là thư giãn vào cuối tuần.

          Không gian quán được thiết kế đặc biệt để tạo ra sự thoải mái và tiện nghi cho khách hàng. Ghế sofa êm ái, góc ngồi riêng tư và ánh sáng dịu dàng tạo ra một môi trường lý tưởng để thảo luận, đọc sách hoặc thậm chí là làm việc từ xa.

          Han Coffee không chỉ nổi tiếng với những ly cà phê tinh tế và đậm đà, mà còn với menu đa dạng của mình. Từ những ly cà phê cổ điển đến các loại thức uống sáng tạo được lấy cảm hứng từ văn hóa Hàn Quốc, bạn sẽ luôn có nhiều lựa chọn thú vị.

          Ngoài ra, Han Coffee cũng chú trọng vào việc sử dụng các nguyên liệu chất lượng cao và phương pháp pha chế chuyên nghiệp, giúp mỗi cốc cà phê mang lại hương vị độc đáo và đầy cảm hứng.

          Không chỉ là một quán cà phê, Han Coffee còn là một điểm đến đặc biệt, nơi bạn có thể tận hưởng không gian đẹp và thư thái, cùng nhau thưởng thức hương vị tuyệt vời của cà phê và tạo ra những kỷ niệm đáng nhớ.</p>
      </div>
    </div>
  )
}
