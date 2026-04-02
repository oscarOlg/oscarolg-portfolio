import React from "react";

interface InlineBoldTextProps {
  text: string;
  boldClassName?: string;
}

export default function InlineBoldText({ text, boldClassName = "font-semibold" }: InlineBoldTextProps) {
  const parts = text.split(/(\*\*.+?\*\*)/g);

  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={idx} className={boldClassName}>
              {part.slice(2, -2)}
            </strong>
          );
        }

        return <React.Fragment key={idx}>{part}</React.Fragment>;
      })}
    </>
  );
}