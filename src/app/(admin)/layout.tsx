import Link from 'next/link'
import styles from './admin.module.css'

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.brand}>EQC Admin</div>
                <nav className={styles.nav}>
                    <Link href="/admin" className={styles.navItemActive + " " + styles.navItem}>Dashboard</Link>
                    <Link href="/admin/requests" className={styles.navItem}>Requests</Link>
                    <Link href="/admin/schedule" className={styles.navItem}>Schedule</Link>
                    <Link href="/admin/staff" className={styles.navItem}>Staff</Link>
                    <Link href="/admin/clients" className={styles.navItem}>Clients</Link>
                    <Link href="/admin/facilities" className={styles.navItem}>Facilities</Link>
                    <div style={{ marginTop: 'auto' }}>
                        <Link href="/" className={styles.navItem}>Logout</Link>
                    </div>
                </nav>
            </aside>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}
