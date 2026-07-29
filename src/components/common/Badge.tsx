// components/common/Badge.tsx

type BadgeProps = {
  children: React.ReactNode;
  variant?: "dark" | "gold";
};

export default function Badge({ children, variant = "dark" }: BadgeProps) {
  return (
    <span
      className={
        variant === "dark"
          ? "rounded-full bg-black px-3 py-1 text-xs font-medium text-white"
          : "rounded-full border border-[#D7C29A] bg-[#FFF7E7] px-3 py-1 text-xs font-medium text-[#8A6A1E]"
      }
    >
      {children}
    </span>
  );
}
