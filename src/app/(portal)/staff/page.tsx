import styles from '../portal.module.css'

export default function StaffDashboard() {
    return (
        <div>
            <h1 className={styles.pageTitle}>My Schedule</h1>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Today's Assignments</h2>
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <strong>10:00 AM - 12:00 PM</strong>
                                <span className={styles.status} style={{ background: '#DBEAFE', color: '#2563EB' }}>Scheduled</span>
                            </div>
                            <div>Client: Jane Smith</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '1rem' }}>123 Main St (Bathing Assistance)</div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                                <button className="btn btn-primary">Check In</button>
                                <button className="btn btn-secondary">Check Out</button>
                            </div>
                        </li>
                    </ul>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Available Shifts</h2>
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <div><strong>Sat Oct 25 • 8h Shift</strong></div>
                            <div style={{ color: 'var(--secondary)' }}>Sunnyvale Retirement</div>
                            <div style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>PSW • $22/hr</div>
                            <button className="btn btn-secondary" style={{ width: '100%', marginTop: '0.5rem' }}>Accept</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
