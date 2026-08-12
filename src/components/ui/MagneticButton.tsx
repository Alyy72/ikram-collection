"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

interface MagneticButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline" | "ghost";
  type?: "button" | "submit";
}

export function MagneticButton({
  href,
  onClick,
  children,
  className = "",
  variant = "solid",
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 16 });
  const springY = useSpring(y, { stiffness: 180, damping: 16 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.22);
    y.set(dy * 0.22);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center px-8 py-3.5 text-[11px] tracking-[0.28em] uppercase transition-colors duration-300";
  const variants = {
    solid: "bg-gold text-white hover:bg-champagne border border-gold",
    outline:
      "border border-gold/60 text-ink hover:bg-gold/10 hover:border-gold",
    ghost: "text-gold hover:text-champagne",
  };

  const inner = (
    <motion.div style={{ x: springX, y: springY }} className="relative z-10">
      {children}
    </motion.div>
  );

  const shared = `${base} ${variants[variant]} ${className}`;
  const isFull = className.includes("w-full") || className.includes("flex-1");

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={isFull ? "block w-full" : "inline-block"}
    >
      {href ? (
        <Link href={href} className={shared} onClick={onClick}>
          {inner}
        </Link>
      ) : (
        <button type={type} className={shared} onClick={onClick}>
          {inner}
        </button>
      )}
    </div>
  );
}
