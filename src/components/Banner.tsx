import type { ReactNode } from "react";

type BannerProps = {
  backgroundColor?: string;
  fontColor?: string;
  textAlign?: string;
  emoji?: string;
  align?: string;
  children?: ReactNode;
};

export default function Banner({
  backgroundColor = "#FFF",
  fontColor = "#000",
  emoji = "",
  children
}: BannerProps) {
  // const bannerContent = `${emoji} ${text} ${emoji}`.trim();
  console.log(children)
  return (
    <div className="banner" style={{ backgroundColor: backgroundColor, color: fontColor }}>
      {emoji &&
        <span>{emoji}</span>
      }
      {children}
      {emoji &&
        <span>{emoji}</span>
      }
    </div>
  );
}
