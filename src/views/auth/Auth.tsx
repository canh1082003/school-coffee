import { useState } from "react";
import LoginForm from "./pages/LoginForm";
import RegisterForm from "./pages/RegsterForm";

export default function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const handleSetLoginState = (value: boolean) => {
    setIsLogin(value);
  };

  return (
    <div className="   lg:px-[35%] md:px-[20%] pb-[5%] pt-[100px] mt-[100px]">
      <div className="border  px-5 py-3 w-[470px] shadow-mainColor-text shadow-md">
        {isLogin ? (
          <LoginForm setIsLogin={handleSetLoginState} />
        ) : (
          <RegisterForm setIsLogin={handleSetLoginState} />
        )}
      </div>
    </div>
  );
}
