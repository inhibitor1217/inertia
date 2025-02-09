import styles from "./Nav.module.css";

export interface NavProps {
  children?: React.ReactNode
}

export default function Nav({
  children,
}: NavProps) {
  return (
    <nav className={styles.container}>
      {children}
    </nav>
  );
}
