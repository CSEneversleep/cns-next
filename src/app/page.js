import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <p>와! 새 페이지!!</p>
      </main>
    </div>
  );
}
