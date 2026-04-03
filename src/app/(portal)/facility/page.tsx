import styles from '../portal.module.css'
import Link from 'next/link'

export default function FacilityDashboard() {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1 className={styles.pageTitle} style={{ marginBottom: 0 }}>Facility Dashboard</h1>
                <Link href="/staffing" className="btn btn-primary">Post New Shift</Link>
            </div>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Open Shifts</h2>
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <div><strong>Oct 25 (Sat), 7:00 AM - 3:00 PM</strong></div>
                            <div style={{ color: 'var(--muted)' }}>2 PSWs needed</div>
                            <div style={{ marginTop: '0.5rem' }}><span className={styles.status} style={{ background: '#FEF3C7', color: '#D97706' }}>Pending</span></div>
                        </li>
                    </ul>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Filled Shifts</h2>
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <div><strong>Today, 3:00 PM - 11:00 PM</strong></div>
                            <div style={{ color: 'var(--muted)' }}>RN (Wing B)</div>
                            <div style={{ marginTop: '0.5rem' }}>Assigned: Sarah Jenkins</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
