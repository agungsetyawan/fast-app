"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = ({
  mode = "checkbox",
}: {
  mode?: "button" | "checkbox";
}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  switch (mode) {
    case "button":
      return (
        <button
          type="button"
          className="btn btn-square btn-soft"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      );

    case "checkbox":
      return (
        <label className="swap swap-rotate">
          <input
            type="checkbox"
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
            checked={
              theme === "dark" ||
              (theme === "system" &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
            }
          />
          <Sun className="swap-on" size={16} />
          <Moon className="swap-off" size={16} />
        </label>
      );
  }
};

export { ThemeSwitcher };
