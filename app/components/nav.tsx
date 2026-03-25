import Link from 'next/link';
import styles from './components.module.css';

export default function Nav() {
    return (
        <div className={styles.nav}>
            <Link href="/" className={styles.link}>Home</Link>
            <Link href="/slope" className={styles.link}>Slope</Link>
            <Link href="/chess" className={styles.link}>Chess</Link>
        </div>
    );
}