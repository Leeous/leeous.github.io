import { ReactNode } from "react";

type WIPBannerProps = {
  backgroundColor?: string;
  fontColor?: string;
  emoji?: string;
  text?: string;
  align?: string;
};

export default function WIPBanner({
  backgroundColor = "#FFF",
  fontColor = "#000",
  emoji = "",
  align = "center",
  text,
}: WIPBannerProps) {
  const bannerContent = `${emoji} ${text} ${emoji}`.trim();

  return (
    <div style={{ backgroundColor, color: fontColor ?? "#000", textAlign: align }}>
      <p>{bannerContent}</p>
    </div>
  );
}
