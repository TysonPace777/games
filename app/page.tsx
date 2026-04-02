import styles from './app.module.css';
import Image from "next/image"
import Link from 'next/link'

export default function Home() {
  return (
    <div className={styles.page}>
      <h1 className={styles.h1}>Games</h1>
      <div className={styles.container}>
        <div className={styles.card}>
          <Link href="/slope">
            <Image src="/slope.webp" alt="Slope Game" width={200} height={200} className={styles.image}/>
          </Link>
        </div>

        <div className={styles.card}>
          <Link href="/chess">
            <Image src="/4363846.png" alt="Chess Game" width={200} height={200} className={styles.image}/>
          </Link>
        </div>
      </div>
    </div>
  );
}
