import { useForm } from "react-hook-form";
import { EyeIcon } from "@heroicons/react/24/outline";
import { getRule } from "../../../utils/rules";
import Input from "../../components/input";
import { useRegister } from "../../../hooks/auth/use/useRegsiter";
import AnimationButton from "../../components/button/AnimationButton";
import { useState } from "react";
type Props = { setIsLogin: (value: boolean) => void };
export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

const RegisterForm = ({ setIsLogin }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();
  const rule = getRule();
  const { mutate } = useRegister();
  const onsubmit = handleSubmit((data: RegisterFormData) => {
    mutate({ ...data, role: "user" });
  });

  return (
    <form onSubmit={onsubmit} className="pb-10" noValidate>
      <div className="relative flex justify-between">
        <span className="text-3xl   font-semibold font-bold mb-3">
          Register
        </span>
        <p className="mt-2">
          Already have an account?
          <span
            onClick={() => setIsLogin(true)}
            className=" pl-1 text-red-500 cursor-pointer hover:opacity-50"
          >
            Login
          </span>
        </p>
      </div>
      <div className="my-2 ">
        <div className="  ">
          <Input
            name="firstName"
            type="text"
            placeholder="First name "
            rule={rule.firstName}
            register={register}
            errorMessage={errors.firstName?.message}
          />
          <Input
            name="lastName"
            type="text"
            placeholder="Last name"
            rule={rule.lastName}
            register={register}
            errorMessage={errors.lastName?.message}
          />
        </div>
        <Input
          name="email"
          type="Email"
          placeholder="Email"
          rule={rule.email}
          register={register}
          errorMessage={errors.email?.message}
        />
        <div className="relative  flex">

          <Input
            name="password"
            style="flex-1"
            type={showPassword ? "text" : "password"}
            // type="password"
            placeholder="Password"
            autoComplete="on"
            rule={rule.password}
            register={register}
            errorMessage={errors.password?.message}
          />
          <EyeIcon
            className="absolute top-1/4 right-4 w-6 h-6 transform -translate-y-1/2 cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        </div>
        <div>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            autoComplete="on"
            rule={rule.confirmPassword}
            register={register}
            errorMessage={errors.confirmPassword?.message}
          />
        </div>
      </div>
      <div className=" my-3 flex items-center justify-between"></div>
      <div className="flex items-center justify-between"></div>
      <AnimationButton label="Sign up" />
    </form>
  );
};
export default RegisterForm;
