import Link from "next/link";
import styles from "./layout.module.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav>
        <Link href="/">
          <a>
            <li className={styles.listItem}>Home</li>
          </a>
        </Link>
      </nav>
      {children}
    </div>
  );
}

export default Layout;
