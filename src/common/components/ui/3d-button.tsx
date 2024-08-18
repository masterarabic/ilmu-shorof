import { cva, VariantProps } from "class-variance-authority";
import React, { FC } from "react";

import { cn } from "@/common/utils";

const button3DVariants = cva(
  "relative border-none transform bg-transparent p-0 cursor-pointer outline-none transition-filter duration-250 select-none touch-manipulation hover:brightness-110 focus:outline-none focus-visible:outline-offset-4 active:outline-none group",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
        white: "",
      },
      size: {
        default: "translate-y-0.5",
        sm: "translate-y-0",
        lg: "",
        icon: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const FrontVariants = cva(
  "relative inline-flex w-full items-center justify-center text-white rounded-md transform -translate-y-1 transition-transform duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] group-hover:-translate-y-1.5 group-active:translate-y-0",
  {
    variants: {
      variant: {
        default: "bg-violet-600",
        destructive: "bg-red-600",
        white: "bg-white text-black",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

const MiddleVariants = cva("absolute top-0 left-0 w-full h-full rounded-md", {
  variants: {
    variant: {
      default: "bg-violet-700",
      destructive: "bg-red-700",
      white: "bg-neutral-300",
    },
    size: {
      default: "",
      sm: "",
      lg: "",
      icon: "",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

const ShadowVariants = cva(
  "absolute top-0 left-0 w-full h-full rounded-md bg-black/25 transform translate-y-[2px] transition-transform duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] group-hover:translate-y-1 group-active:translate-y-1",
  {
    variants: {
      variant: {
        default: "",
        destructive: "",
        white: "",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
        icon: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type Size = VariantProps<typeof FrontVariants>["size"];
type Variant = VariantProps<typeof FrontVariants>["variant"];
type Button3DProps = {
  children?: React.ReactNode;
  className?: string;
  size?: Size;
  variant?: Variant;
  type?: JSX.IntrinsicElements["button"]["type"];
  onClick?: JSX.IntrinsicElements["button"]["onClick"];
};

const Button3D: FC<Button3DProps> = ({
  size,
  variant,
  className,
  children,
}) => {
  return (
    <button className={cn(button3DVariants({ variant, className }))}>
      <span className={cn(ShadowVariants({ variant }))}></span>
      <span className={cn(MiddleVariants({ variant }))}></span>
      <span className={cn(FrontVariants({ size, variant }))}>{children}</span>
    </button>
  );
};

export default Button3D;
