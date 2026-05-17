import { motion } from 'framer-motion';
import { TIER_CONFIG, formatPrice } from '../../data/sponsors';
import styles from './HallOfFame.module.css';

const METRICS = [
  { label: '후배 행복 지수', key: 'happinessBoost', unit: '+', color: '#4a7c59' },
  { label: '도덕적 우월감', key: 'moralSuperiority', unit: '+', color: '#cc785c' },
  { label: '감사 지수 (Gratitude Index)', key: 'gratitudeIndex', unit: '', color: '#5db8a6' },
];

export default function SponsorModal({ sponsor, onClose }) {
  const cfg = TIER_CONFIG[sponsor.tier];

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal — centering wrapper keeps Framer Motion transforms from overriding translate(-50%,-50%) */}
      <div className={styles.modalWrapper}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${sponsor.name} 상세 정보`}
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', stiffness: 340, damping: 28 }}
      >
        {/* Header gradient */}
        <div
          className={styles.modalHeader}
          style={{ background: cfg.gradient }}
        >
          <div className={styles.modalAvatar} style={{ background: cfg.gradient }}>
            <span style={{ color: cfg.textColor, fontSize: 28, fontWeight: 700 }}>
              {sponsor.initials}
            </span>
          </div>
          <div>
            <p className={styles.modalTier} style={{ color: cfg.textColor, opacity: 0.75 }}>
              {sponsor.tierEmoji} {cfg.label} Patron
            </p>
            <h3 className={styles.modalName} style={{ color: cfg.textColor }}>
              {sponsor.name} {sponsor.honorific}
            </h3>
            <p className={styles.modalTagline} style={{ color: cfg.textColor, opacity: 0.6 }}>
              {sponsor.tagline}
            </p>
          </div>
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="닫기"
            style={{ color: cfg.textColor }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          <div className={styles.modalMealRow}>
            <div className={styles.modalMealItem}>
              <span className={styles.modalMealKey}>Sponsored Meal</span>
              <span className={styles.modalMealVal}>{sponsor.food}</span>
            </div>
            <div className={styles.modalMealItem}>
              <span className={styles.modalMealKey}>Investment Amount</span>
              <span className={styles.modalMealVal}>{formatPrice(sponsor.price)}</span>
            </div>
            <div className={styles.modalMealItem}>
              <span className={styles.modalMealKey}>Date of Contribution</span>
              <span className={styles.modalMealVal}>{sponsor.date}</span>
            </div>
          </div>

          <p className={styles.modalDesc}>{sponsor.description}</p>

          {/* Metrics */}
          <div className={styles.modalMetrics}>
            <p className={styles.modalMetricsTitle}>Contribution Impact Report</p>
            {METRICS.map((m) => (
              <div key={m.key} className={styles.modalMetric}>
                <div className={styles.modalMetricTop}>
                  <span className={styles.modalMetricLabel}>{m.label}</span>
                  <span className={styles.modalMetricVal} style={{ color: m.color }}>
                    {m.unit}{sponsor[m.key]}
                  </span>
                </div>
                <div className={styles.modalMetricBar}>
                  <motion.div
                    className={styles.modalMetricFill}
                    style={{ background: m.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(100, (sponsor[m.key] / 999) * 100)}%` }}
                    transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Perks */}
          <div className={styles.modalPerks}>
            <p className={styles.modalPerksTitle}>Included Perks</p>
            <ul className={styles.modalPerkList}>
              <li>칭찬 리액션 무제한 제공 (Unlimited Praise Reactions)</li>
              <li>식사 내내 고품격 찬양 서비스 (Premium Glorification Service)</li>
              <li>Lifetime Gratitude Certificate 발급 예정</li>
            </ul>
          </div>
        </div>
      </motion.div>
      </div>
    </>
  );
}
