import { cn } from "@/lib/utils"

interface ActionButtonProps {
  children: React.ReactNode
  icon: React.ReactNode
  className?: string
  onClick?: () => void
}

export function ActionButton({ children, icon, className, onClick }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-2 rounded-full bg-[#FBC004] px-6 py-3",
        "text-black font-medium transition-transform hover:scale-105",
        "shadow-lg hover:shadow-xl",
        className
      )}
    >
      <span className="relative z-10">{icon}</span>
      <span className="relative z-10">{children}</span>
    </button>
  )
}

