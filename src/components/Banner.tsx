import { Children, ReactNode } from "react";

type BannerProps = {
  backgroundColor?: string;
  fontColor?: string;
  textAlign?: string;
  emoji?: string;
  text: string;
  align?: string;
  children: ReactNode;
};

export default function Banner({
  backgroundColor = "#FFF",
  fontColor = "#000",
  textAlign = "center",
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
