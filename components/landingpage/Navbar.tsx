import React from "react";
import { ThemeSwitcher } from "../theme/theme-switcher";

const Navbar = () => {
  return (
    <nav className="py-3 border-b sm:px-0 px-5">
      <div className="flex items-center justify-between container mx-auto">
        <span className="font-mono font-semibold text-primary text-xl">
          LeetInsight
        </span>
        <ThemeSwitcher />
      </div>
    </nav>
  );
};

export default Navbar;
