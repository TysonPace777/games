import styles from './app.module.css';
import Image from "next/image"
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <h1 className={styles.h1}>Games</h1>
      <div className={styles.container}>
        <Link href="/slope"><Image src="/slope.webp" alt="logo" width={200} height={200}></Image></Link>
      </div>
    </div>
  );
}
