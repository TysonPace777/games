import styles from './app.module.css';
import Image from "next/image"
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className={styles.h1}>Games</h1>
      <div className={styles.container}>
        <Link href="/slope"><Image src="/slope.webp" alt="logo" width={200} height={200} className={styles.image}></Image></Link>
        <Link href="/chess"><Image src="/4363846.png" alt="logo" width={200} height={200} className={styles.image}></Image></Link>
      </div>
    </div>
  );
}
