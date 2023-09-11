import { useState } from "react";
import Layout from "./Layout";

type Props = {
  children: React.ReactNode;
  title: string;
};

const LayoutContainer = ({ children, title }: Props) => {
  const localStorageTheme =
    typeof window !== "undefined" ? localStorage.getItem("theme") : null;
  const [theme, setTheme] = useState<"light" | "dark">(
    typeof window !== "undefined" &&
      localStorageTheme &&
      (localStorageTheme === "light" || localStorageTheme === "dark")
      ? localStorageTheme
      : typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  if (typeof window !== "undefined") {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", ({ matches: isDark }) => {
        setTheme(isDark ? "dark" : "light");
      });
  }

  const onThemeChange = (checked: boolean) => {
    const theme = checked ? "dark" : "light";
    setTheme(theme);
    document && document?.firstElementChild?.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  };

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
