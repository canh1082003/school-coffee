import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
  renderPopover: React.ReactNode;
  className: string;
};
export default function Popover({ children, renderPopover, className }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnclick = () => {
    setIsOpen(!isOpen);
  };

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };
  return (
    <div className="relative w-full">
      <div className="cursor-pointer" onClick={handleOnclick}>
        {children}
      </div>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className={className}
        >
          {renderPopover}
        </motion.div>
      )}
    </div>
  );
}
