import { Button } from "@/components/ui/button";
import Link from "next/link";

import { cn } from "@/lib/utils";

type Props = {
  href: string;
  label: string;
  isActive?: boolean;
};

export const NavButton = ({ href, label, isActive }: Props) => {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        "w-full lg:w-auto justify-between font-normal text-st hover:bg-stone-800 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-stone-900 focus:bg-stone-300 focus:text-stone-900 transition",
        isActive ? "bg-stone-900 text-white" : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};
