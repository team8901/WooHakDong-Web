type PaymentMethodButtonProps = {
  onClick: () => void;
  icon: JSX.Element;
  className?: string;
};

const PaymentMethodButton = ({ onClick, icon, className }: Readonly<PaymentMethodButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className={`flex h-[56px] items-center justify-center rounded-[8px] border border-lightGray ${className}`}
    >
      {icon}
    </button>
  );
};

export default PaymentMethodButton;
