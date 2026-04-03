import styles from '../admin.module.css'

export default function AdminDashboard() {
    return (
        <div>
            <header className={styles.header}>
                <h1 className={styles.title}>Dashboard</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-primary">New Assignment</button>
                </div>
            </header>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Pending Requests</div>
                    <div className={styles.cardValue}>12</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Active Shifts Today</div>
                    <div className={styles.cardValue}>8</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Available Staff</div>
                    <div className={styles.cardValue}>24</div>
                </div>
                <div className={styles.card}>
                    <div className={styles.cardTitle}>Total Clients</div>
                    <div className={styles.cardValue}>145</div>
                </div>
            </div>

            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Recent Requests</h2>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Home Care</td>
                            <td>Sarah Connor</td>
                            <td><span className={`${styles.badge} ${styles.badgePending}`}>Pending</span></td>
                            <td>Oct 24, 2026</td>
                            <td><button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>View</button></td>
                        </tr>
                        <tr>
                            <td>Staffing</td>
                            <td>Sunnyvale Retirement</td>
                            <td><span className={`${styles.badge} ${styles.badgeScheduled}`}>Scheduled</span></td>
                            <td>Oct 24, 2026</td>
                            <td><button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>View</button></td>
                        </tr>
                        <tr>
                            <td>Home Care</td>
                            <td>John Wick</td>
                            <td><span className={`${styles.badge} ${styles.badgeCompleted}`}>Completed</span></td>
                            <td>Oct 23, 2026</td>
                            <td><button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>View</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
