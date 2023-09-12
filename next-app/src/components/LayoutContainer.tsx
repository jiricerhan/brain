import { useEffect, useState } from "react";
import Layout from "./Layout";

type Props = {
  children: React.ReactNode;
  title: string;
};

const LayoutContainer = ({ children, title }: Props) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const onThemeChange = (checked: boolean) => {
    const theme = checked ? "dark" : "light";
    localStorage.setItem("theme", theme);
    setTheme(theme);
  };

  useEffect(() => {
    const localStorageTheme =
      typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const defaultTheme: "light" | "dark" =
      typeof window !== "undefined"
        ? localStorageTheme &&
          (localStorageTheme === "light" || localStorageTheme === "dark")
          ? localStorageTheme
          : window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : "light";
    setTheme(defaultTheme);
  }, [setTheme]);

  if (typeof window !== "undefined") {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches: isDark }) => {
        localStorage.setItem("theme", isDark ? "dark" : "light");
        setTheme(isDark ? "dark" : "light");
      });
  }

  return (
    <Layout
      title={title}
      theme={theme}
      onThemeChange={onThemeChange}
      children={children}
    />
  );
};

export default LayoutContainer;
