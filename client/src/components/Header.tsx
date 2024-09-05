import { MountainIcon } from "lucide-react";
import { ThemeToggleButton } from "./ThemeToggleButton";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 dark:bg-slate-800 bg-background dark:bg-card">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-bold">Acme</span>
      </Link>
      <ThemeToggleButton />
    </header>
  );
};

export default Header;
