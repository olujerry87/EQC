import styles from '../portal.module.css'

export default function ClientDashboard() {
    return (
        <div>
            <h1 className={styles.pageTitle}>Hello, Client</h1>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>Upcoming Visits</h2>
                    </div>
                    <ul className={styles.list}>
                        <li className={styles.listItem}>
                            <div><strong>Tomorrow, 10:00 AM</strong></div>
                            <div style={{ color: 'var(--muted)' }}>Bathing Assistance</div>
                            <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Staff: John Doe</div>
                        </li>
                    </ul>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <h2 className={styles.cardTitle}>My Care Support</h2>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#ccc' }}></div>
                        <div>
                            <div style={{ fontWeight: 600 }}>John Doe</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>PSW • English, Spanish</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Recent Visit History</h2>
                </div>
                <ul className={styles.list}>
                    <li className={styles.listItem} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: 600 }}>Yesterday, 2:00 PM</div>
                            <div style={{ fontSize: '0.875rem' }}>Companionship</div>
                        </div>
                        <div>
                            <span className={styles.status}>Completed</span>
                            <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', marginLeft: '1rem' }}>Rate</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
