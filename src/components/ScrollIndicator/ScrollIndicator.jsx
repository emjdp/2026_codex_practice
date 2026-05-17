import styles from './ScrollIndicator.module.css';

export default function ScrollIndicator() {
  return (
    <div className={styles.wrapper} aria-hidden="true">
      <svg className={styles.icon} width="20" height="32" viewBox="0 0 20 32" fill="none">
        <rect x="1" y="1" width="18" height="30" rx="9" stroke="currentColor" strokeWidth="1.5"/>
        <rect className={styles.dot} x="9" y="7" width="2" height="6" rx="1" fill="currentColor"/>
      </svg>
      <span className={styles.label}>Scroll to open</span>
    </div>
  );
}
