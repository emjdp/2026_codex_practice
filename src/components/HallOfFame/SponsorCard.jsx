import { motion } from 'framer-motion';
import { TIER_CONFIG, formatPrice } from '../../data/sponsors';
import styles from './HallOfFame.module.css';

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
};

// Initials avatar
function Avatar({ initials, tier }) {
  const cfg = TIER_CONFIG[tier];
  return (
    <div
      className={styles.avatar}
      style={{ background: cfg.gradient }}
      aria-hidden="true"
    >
      <span style={{ color: cfg.textColor }}>{initials}</span>
    </div>
  );
}

// Sponsor power meter
function PowerMeter({ price, maxPrice }) {
  const pct = Math.min(100, (price / maxPrice) * 100);
  return (
    <div className={styles.meterWrap}>
      <span className={styles.meterLabel}>Sponsor Power</span>
      <div className={styles.meterTrack}>
        <div className={styles.meterFill} style={{ width: `${pct}%` }} />
      </div>
      <span className={styles.meterPct}>{Math.round(pct)}%</span>
    </div>
  );
}

const MAX_PRICE = 213000;

export default function SponsorCard({ sponsor, rank, isFirst, onClick }) {
  const cfg = TIER_CONFIG[sponsor.tier];

  return (
    <motion.article
      variants={cardVariants}
      className={`${styles.card} ${isFirst ? styles.cardFirst : ''}`}
      style={{
        background: cfg.gradient,
        border: `1.5px solid ${cfg.borderColor}`,
        boxShadow: isFirst ? cfg.glow : undefined,
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`${sponsor.name} 선배님 상세 보기`}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* Shimmer for legendary */}
      {sponsor.tier === 'legendary' && (
        <div className={styles.shimmer} aria-hidden="true" />
      )}

      {/* Rank badge */}
      <div className={styles.rankBadge} style={{ color: cfg.badgeText, background: cfg.badgeBg }}>
        #{rank}
      </div>

      {/* Tier badge */}
      <div className={styles.tierBadge} style={{ color: cfg.badgeText, background: cfg.badgeBg }}>
        {sponsor.tierEmoji} {cfg.label}
      </div>

      {/* Avatar + name */}
      <div className={styles.cardTop}>
        <Avatar initials={sponsor.initials} tier={sponsor.tier} />
        <div className={styles.nameBlock}>
          <h3 className={styles.cardName} style={{ color: cfg.textColor }}>
            {sponsor.name}
          </h3>
          <p className={styles.cardHonorific} style={{ color: cfg.textColor, opacity: 0.7 }}>
            {sponsor.honorific}
          </p>
        </div>
      </div>

      {/* Food & price */}
      <div className={styles.cardMeal}>
        <span className={styles.cardMealLabel} style={{ color: cfg.textColor, opacity: 0.65 }}>
          Sponsored Meal
        </span>
        <span className={styles.cardMealFood} style={{ color: cfg.textColor }}>
          {sponsor.food}
        </span>
        <span className={styles.cardMealPrice} style={{ color: cfg.textColor }}>
          {formatPrice(sponsor.price)}
        </span>
      </div>

      {/* Power meter */}
      <PowerMeter price={sponsor.price} maxPrice={MAX_PRICE} />

      {/* Tagline */}
      <p className={styles.cardTagline} style={{ color: cfg.textColor, opacity: 0.55 }}>
        {sponsor.tagline}
      </p>

      {/* Tap hint */}
      <p className={styles.tapHint} style={{ color: cfg.textColor, opacity: 0.4 }}>
        Click for details →
      </p>
    </motion.article>
  );
}
