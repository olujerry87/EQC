import Link from 'next/link'
import styles from './page.module.css'

export default function Home() {
    return (
        <main className={styles.main}>
            <header className={styles.header}>
                <div className="container">
                    <nav className={styles.nav}>
                        <div className={styles.logo}>Excellent Quality Care</div>
                        <div className={styles.navLinks}>
                            <Link href="/about">About</Link>
                            <Link href="/contact">Contact</Link>
                            <Link href="/login" className="btn btn-secondary">Portal Login</Link>
                        </div>
                    </nav>
                </div>
            </header>

            <section className={styles.hero}>
                <div className="container">
                    <h1 className={styles.title}>
                        Compassionate Care,<br />
                        <span className={styles.highlight}>Expect Excellence.</span>
                    </h1>
                    <p className={styles.subtitle}>
                        Connecting families with trusted caregivers and facilities with reliable staff.
                    </p>

                    <div className={styles.ctaGrid}>
                        <div className={`${styles.card} glass-panel`}>
                            <h2>For Families</h2>
                            <p>Find the perfect care for your loved ones at home.</p>
                            <Link href="/home-care" className="btn btn-primary">
                                I Need Care at Home
                            </Link>
                        </div>

                        <div className={`${styles.card} glass-panel`}>
                            <h2>For Facilities</h2>
                            <p>Reliable staffing solutions for your healthcare facility.</p>
                            <Link href="/staffing" className="btn btn-primary">
                                I Need Staff
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
