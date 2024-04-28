import React from 'react'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { getRule } from '../../../utils/rules';
import Input from '../../components/input';
import { useVerifyEmail } from '../../../hooks/auth/use/useVerifyEmail';
import AnimationButton from '../../components/button/AnimationButton';

export default function ConfirmEmail() {
  const { email } = useParams();
  console.log(email)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ verifyEmail: string }>();
  const rule = getRule();
  const { mutate, isLoading } = useVerifyEmail();

  const onsubmit = handleSubmit((data) => {
    mutate(data.verifyEmail);
  });
  const renderForm = () => {
    return (
      <form
        onSubmit={onsubmit}
        noValidate
        className=" flex flex-col items-center  lg:w-[500px] md:w-[400px] mx-auto py-24 lg:py-40"
      >
        <p className="font-text text-center text-hover md:text-xl lg:text-2xl font-bold mb-10">
          Your verify token is sent to
        </p>
        <div className="w-full px-10">
          <Input
            style="h-10"
            name="verifyEmail"
            type="text"
            placeholder="verify token... "
            rule={rule.verifyEmail}
            register={register}
            errorMessage={errors.verifyEmail?.message}
          />
          {isLoading ? (
            <AnimationButton label="...Loading" />
          ) : (
            <AnimationButton label="Confirm" style="mt-3 mx-20 " />
          )}
        </div>
      </form>
    );
  };
  return renderForm();
}
