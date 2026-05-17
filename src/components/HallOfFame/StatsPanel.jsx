import { formatPrice } from '../../data/sponsors';
import styles from './HallOfFame.module.css';

export default function StatsPanel({ total, average, count }) {
  return (
    <div className={styles.stats}>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>Total Sponsored</span>
        <span className={styles.statValue}>{formatPrice(total)}</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>Average Meal Value</span>
        <span className={styles.statValue}>{formatPrice(average)}</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>Patron Count</span>
        <span className={styles.statValue}>{count}명</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statLabel}>ROI</span>
        <span className={`${styles.statValue} ${styles.statRoi}`}>Infinite</span>
      </div>
    </div>
  );
}
