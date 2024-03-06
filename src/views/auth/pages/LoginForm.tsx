import { Link } from "react-router-dom";
import { getRule } from "../../../utils/rules";
import { useForm } from "react-hook-form";
import Input from "../../components/input";
import Social from "../components/Social";
import AnimationButton from "../../components/button/AnimationButton";
import { useLogin } from "../../../hooks/auth/use/useLogin";

type Props = { setIsLogin: (value: boolean) => void };

export interface LoginFormData {
  email: string;
  password: string;
}
const LoginForm = ({ setIsLogin }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const rule = getRule();
  const { mutate } = useLogin();
  const onsubmit = handleSubmit((data) => {
    mutate(data);
  });
  return (
    <form onSubmit={onsubmit} noValidate>
      <div className="relative flex justify-between">
        <span className="text-3xl font-bold font-semibold">
          Login
        </span>
        <p className="mt-2">
          Create an account?
          <span
            onClick={() => setIsLogin(false)}
            className=" pl-1 text-red-500 cursor-pointer  hover:opacity-50"
          >
            Register
          </span>
        </p>
      </div>
      <div className="mt-7 ">
        <Input
          name="email"
          type="Email"
          placeholder="Email"
          rule={rule.email}
          register={register}
          errorMessage={errors.email?.message}
        />

        <Input
          name="password"
          type="password"
          placeholder="password"
          autoComplete="on"
          rule={rule.password}
          register={register}
          errorMessage={errors.password?.message}
        />

        <Link
          to={"/forgot-password"}
          className="  text-sm underline hover:underline-offset-4"
        >
          Forgot Password?
        </Link>
      </div>

      <AnimationButton label="Login" style="mt-3" />

      <p className="mt-2 font-body text-sm">Or sign up with</p>
      <Social />
    </form>
  );
};
export default LoginForm;
