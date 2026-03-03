import { cn } from "@/lib/utils";

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "w-6 h-6 border-2 border-[#e0e0e0] border-t-[#6b8e23] rounded-full animate-spin",
        className
      )}
    />
  );
}
