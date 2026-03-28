import React from "react";

interface CardProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  padding?: boolean;
}

export function Card({
  children,
  header,
  footer,
  className = "",
  padding = true,
}: CardProps) {
  return (
    <div
      className={[
        "bg-wisdom-surface rounded-card shadow-sm border border-wisdom-border",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {header && (
        <div className="px-6 py-4 border-b border-wisdom-border">{header}</div>
      )}
      <div className={padding ? "p-6" : ""}>{children}</div>
      {footer && (
        <div className="px-6 py-4 border-t border-wisdom-border">{footer}</div>
      )}
    </div>
  );
}
