import Link from "next/link";
import styles from "./Layout.module.css";
import Head from "next/head";
import React from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";

type Props = {
  children: React.ReactNode;
  title: string;
  theme: "light" | "dark";
  onThemeChange: (checked: boolean) => void;
};

const Layout = ({ children, title, theme, onThemeChange }: Props) => {
  const titleText = `${title} | Brain interview project`;

  return (
    <div className={styles.container} data-theme={theme}>
      <Head>
        <title>{titleText}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="site.webmanifest" />
      </Head>

      <header className={styles.header}>
        <div className={styles.brain}>🧠</div>

        <nav className={styles.nav}>
          <Link className={styles.nav__item} href="/">
            Home
          </Link>
          <Link className={styles.nav__item} href="/admin">
            Admin
          </Link>
          <Link className={styles.nav__item} href="/dashboard">
            Dashboard
          </Link>
          |
          <DarkModeSwitch
            checked={theme === "dark"}
            onChange={onThemeChange}
            size={30}
          />
        </nav>
      </header>
      <main className={styles.main}>{children}</main>

      <footer className={styles.footer}>Created by Jiří Cerhan</footer>
    </div>
  );
};
export default React.memo(Layout);
