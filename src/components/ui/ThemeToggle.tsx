import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { Button } from "./Button";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />; // Prevents hydration mismatch
  }

  return (
    <Button
      onClick={toggleTheme}
      variant="outline"
      size="sm"
      className="rounded-full w-9 h-9 p-0"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === "dark" ? 180 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative w-4 h-4"
      >
        {theme === "light" ? (
          <Sun className="absolute top-0 left-0 w-4 h-4" />
        ) : (
          <Moon className="absolute top-0 left-0 w-4 h-4" />
        )}
      </motion.div>
    </Button>
  );
}
