import { cn } from "@/lib/utils";

interface BadgeProps {
  label: string;
  className?: string;
}

export default function Badge({ label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block bg-white px-3 py-1 text-[0.65rem] uppercase tracking-widest font-semibold",
        className
      )}
    >
      {label}
    </span>
  );
}
