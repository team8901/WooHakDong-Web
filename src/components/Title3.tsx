type Title3Props = {
  text: string;
  className?: string;
};

const Title3 = ({ text, className }: Readonly<Title3Props>) => {
  return (
    <span className={`leading-[2.2rem] font-semiBold ${className}`}>
      {text}
    </span>
  );
};

export default Title3;
