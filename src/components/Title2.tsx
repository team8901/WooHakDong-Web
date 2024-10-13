import { LineProps } from "@components/Title1";

type Title2Props = {
  lines: LineProps[];
};

const Title2 = ({ lines }: Readonly<Title2Props>) => {
  return (
    <div className="flex flex-col">
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="flex">
          {line.segments.map((segment, segmentIndex) => (
            <span
              key={segmentIndex}
              className="font-semiBold text-[2rem] leading-[3.2rem] whitespace-pre-wrap"
              style={{ color: segment.color }}
            >
              {segment.text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Title2;
