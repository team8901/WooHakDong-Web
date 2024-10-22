type PaymentMethodButtonProps = {
  alt: string;
  onClick: () => void;
  src: string;
  className?: string;
};

const PaymentMethodButton = ({
  alt,
  onClick,
  src,
  className,
}: Readonly<PaymentMethodButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className={`h-[56px] border border-lightGray rounded-[8px] flex justify-center items-center ${className}`}
    >
      <img alt={alt} src={src} width={66} />
    </button>
  );
};

export default PaymentMethodButton;
