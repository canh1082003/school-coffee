import { AnimationButtonStyle } from "./animationButtonStyle";

type Props = {
  label: string;
  style?: string;
};

const AnimationButton = ({ label, style }: Props) => {
  const renderButton = () => {
    return (
      <AnimationButtonStyle>
        <button title="submit" className="w-full">
          <div className={`temp h-[40px] relative  ${style}`}>
            <div className="absolute test-box text-center"></div>
            <div className=" w-full border border-black h-[40px] "></div>
            <p className="w-full  text-center h-[40px] hover:text-white font-text font-semibold absolute top-0 leading-10 ">
              {label}
            </p>
          </div>
        </button>
      </AnimationButtonStyle>
    );
  };
  return renderButton();
};
export default AnimationButton;
