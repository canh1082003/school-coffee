/* eslint-disable @typescript-eslint/no-explicit-any */
// import { type } from "os";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface Props {
  type: React.HTMLInputTypeAttribute;
  errorMessage?: string;
  placeholder: string;
  name: string;
  register: UseFormRegister<any>;
  rule?: RegisterOptions;
  autoComplete?: string;
  style?: string;
}

export const Input = ({
  type,
  errorMessage,
  placeholder,
  name,
  register,
  autoComplete,
  rule,
  style,
}: Props) => {
  return (
    <div className="group relative z-0 mb-6 w-full">
      <input
        type={type}
        autoComplete={autoComplete}
        {...register(name, rule)}
        className={`peer block w-full appearance-none border-0 border-b-2 border-gray-500 bg-transparent py-2.5 px-0 text-sm font-bold  focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-mainColor-border ${style}`}
        placeholder=" "
        required
      />
      <label
        htmlFor="avatar"
        className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm font-bold duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-mainColor-border dark:text-gray-400 peer-focus:dark:text-mainColor-border"
      >
        {placeholder}
      </label>
      <p className="mt-1 text-xs  text-red-500">{errorMessage}</p>
    </div>
  );
};
