type SubtitleProps = {
  text: string | string[];
};

const Subtitle = ({ text }: Readonly<SubtitleProps>) => {
  if (Array.isArray(text)) {
    return (
      <div className="flex flex-col">
        {text.map((line, index) => (
          <span key={index} className="text-darkGray text-[1.2rem]">
            {line}
          </span>
        ))}
      </div>
    );
  }
  return <span className="text-darkGray text-[1.2rem]">{text}</span>;
};

export default Subtitle;
