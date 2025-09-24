import * as React from "react";

type LinkButtonVariant =
  | "primary"
  | "secondary"
  | "default"
  | "outline"
  | "link";
type LinkButtonSize = "default" | "sm" | "lg" | "icon";

export interface LinkButtonProps {
  href: string;
  className?: string;
  ariaLabel?: string;
  title?: string;
  disabled?: boolean;
  variant?: LinkButtonVariant;
  size?: LinkButtonSize;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

const resolveVariant = (
  variant?: LinkButtonVariant
): "default" | "outline" | "secondary" | "link" => {
  if (!variant) return "default";
  if (variant === "primary") return "default";
  if (variant === "secondary") return "secondary";
  return variant as any as "default" | "outline" | "secondary" | "link";
};

const variantStyles: Record<
  "default" | "outline" | "secondary" | "link",
  string
> = {
  default: "bg-[#466CB2] text-white shadow hover:bg-[#466CB2]/90",
  outline:
    "border-2 border-[#466CB2] bg-transparent text-[#466CB2] hover:bg-[#466CB2]/10",
  secondary: "bg-white text-[#466CB2] shadow-sm hover:bg-white/90",
  link: "py-6 text-sm font-bold text-[#466CB2] underline decoration-solid decoration-from-font underline-offset-auto hover:text-[#466CB2]/80",
};

export default function LinkButton({
  href,
  className,
  ariaLabel,
  title,
  disabled = false,
  variant = "primary",
  size = "lg",
  target,
  rel,
  children,
}: LinkButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[6px] font-sans text-base font-semibold leading-[20px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0";

  const sizeStyles: Record<LinkButtonSize, string> = {
    default: "px-3 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-10 rounded-md px-4",
    icon: "h-9 w-9",
  };

  const resolvedVariant = resolveVariant(variant);
  const buttonStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[resolvedVariant]} ${className || ""}`;

  if (disabled) {
    return (
      <span
        className={`${buttonStyles} cursor-not-allowed opacity-50`}
        aria-label={ariaLabel}
        title={title}
        aria-disabled={disabled}
      >
        {children}
      </span>
    );
  }

  return (
    <a
      href={href}
      className={buttonStyles}
      aria-label={ariaLabel}
      title={title}
      target={target}
      rel={rel}
    >
      {children}
    </a>
  );
}
