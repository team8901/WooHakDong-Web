type PaymentMethodButtonProps = {
  onClick: () => void;
  icon: JSX.Element;
  className?: string;
};

const PaymentMethodButton = ({
  onClick,
  icon,
  className,
}: Readonly<PaymentMethodButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className={`h-[56px] border border-lightGray rounded-[8px] flex justify-center items-center ${className}`}
    >
      {icon}
    </button>
  );
};

export default PaymentMethodButton;
