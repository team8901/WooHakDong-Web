type TextSegment = {
  text: string;
  color?: string;
};

export type LineProps = {
  segments: TextSegment[];
};

type Title1Props = {
  lines: LineProps[];
};

const Title1 = ({ lines }: Readonly<Title1Props>) => {
  return (
    <div className="flex flex-col">
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="flex">
          {line.segments.map((segment, segmentIndex) => (
            <span
              key={segmentIndex}
              className="font-semiBold text-[2.4rem] leading-[3.2rem] whitespace-pre-wrap"
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

export default Title1;
