import React from "react";

interface NotificationBadgeProps {
  count: number;
  children: React.ReactNode;
  max?: number;
  className?: string;
}

export function NotificationBadge({
  count,
  children,
  max = 99,
  className = "",
}: NotificationBadgeProps) {
  const display = count > max ? `${max}+` : String(count);
  const hasUnread = count > 0;

  return (
    <span className={["relative inline-flex", className].join(" ")}>
      {children}
      {hasUnread && (
        <span
          aria-label={`${count} unread notification${count !== 1 ? "s" : ""}`}
          className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold leading-none"
        >
          {display}
        </span>
      )}
    </span>
  );
}
