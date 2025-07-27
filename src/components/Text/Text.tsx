import style from "./Text.module.css";

interface TextProps {
  children: React.ReactNode;
  textAlign?: string;
  marginBottom?: string;
  variant?: string;
}

export default function Text({
  children,
  textAlign = "",
  marginBottom = "0",
  variant = "",
}: TextProps) {
  return (
    <p
      className={[
        style["text"],
        style[textAlign],
        style[`marginBottom${marginBottom}`],
        style[variant],
      ].join(" ")}
    >
      {children}
    </p>
  );
}
