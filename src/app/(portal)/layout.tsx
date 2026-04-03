import Link from 'next/link'
import styles from './portal.module.css'
import { auth } from '@/auth'

export default async function PortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <Link href="/" className={styles.brand}>EQC Portal</Link>
                <div className={styles.userMenu}>
                    <span>{session?.user?.email}</span>
                    <Link href="/api/auth/signout" className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Logout</Link>
                </div>
            </header>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    )
}
