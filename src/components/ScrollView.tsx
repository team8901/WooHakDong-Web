type FadingScrollViewProps = {
  children: React.ReactNode;
  fadeTop?: boolean;
  fadeBottom?: boolean;
  className?: string;
};

const ScrollView = ({ children, fadeTop = false, fadeBottom = false, className }: Readonly<FadingScrollViewProps>) => {
  const maskImageContentTop = `linear-gradient(to bottom, transparent, white var(--mask-height), white 100%)`;
  const maskImageContentBottom = `linear-gradient(white 0, white calc(100% - var(--mask-height)), transparent)`;
  const maskImageContentAll = `linear-gradient(to bottom, transparent, white var(--mask-height), white calc(100% - var(--mask-height)), transparent)`;

  let maskImageContent = null;

  if (fadeTop && fadeBottom) {
    maskImageContent = maskImageContentAll;
  } else if (fadeTop) {
    maskImageContent = maskImageContentTop;
  } else if (fadeBottom) {
    maskImageContent = maskImageContentBottom;
  }

  return (
    <div
      className={`masked-overflow scrollbar-hide ${className}`}
      style={
        {
          '--mask-image-content': maskImageContent,
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default ScrollView;
