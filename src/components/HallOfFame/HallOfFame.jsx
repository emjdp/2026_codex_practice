import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SponsorCard from './SponsorCard';
import StatsPanel from './StatsPanel';
import SponsorModal from './SponsorModal';
import {
  SPONSORS,
  TIER_ORDER,
  getTotalSponsored,
  getAverageMeal,
  formatPrice,
} from '../../data/sponsors';
import styles from './HallOfFame.module.css';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'legendary', label: 'Legendary' },
  { key: 'gold', label: 'Gold' },
  { key: 'silver', label: 'Silver' },
  { key: 'bronze', label: 'Bronze' },
  { key: 'starter', label: 'Starter' },
  { key: 'survival', label: 'Survival' },
];

export default function HallOfFame() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedSponsor, setSelectedSponsor] = useState(null);

  const sorted = [...SPONSORS].sort((a, b) => b.price - a.price);
  const filtered =
    activeFilter === 'all'
      ? sorted
      : sorted.filter((s) => s.tier === activeFilter);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
      aria-label="후배와 밥약한 선배 명예의 전당"
    >
      {/* Background */}
      <div className={styles.bgDark} aria-hidden="true" />
      <div className={styles.bgBlob} aria-hidden="true" />

      <div className={styles.container}>

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <p className={styles.headerEn}>Hall of Legendary Meal Sponsors</p>
          <h2 className={styles.headerKo}>
            후배와 밥약한 선배<br />명예의 전당
          </h2>
          <p className={styles.headerSub}>
            아래의 위대한 선배님들은 본인의 위장 발전에 지대한 공헌을 하셨습니다.<br />
            역사는 영원히 기억할 것입니다.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <StatsPanel
            total={getTotalSponsored()}
            average={getAverageMeal()}
            count={SPONSORS.length}
          />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className={styles.filterRow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          role="tablist"
          aria-label="티어 필터"
        >
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={activeFilter === f.key}
              className={`${styles.filterBtn} ${activeFilter === f.key ? styles.filterBtnActive : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Card grid */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeFilter}
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map((sponsor, idx) => {
              const globalRank = sorted.findIndex((s) => s.id === sponsor.id) + 1;
              return (
                <SponsorCard
                  key={sponsor.id}
                  sponsor={sponsor}
                  rank={globalRank}
                  isFirst={globalRank === 1}
                  onClick={() => setSelectedSponsor(sponsor)}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <p>해당 티어의 스폰서가 없습니다.</p>
          </div>
        )}

        {/* Footer CTA */}
        <motion.div
          className={styles.footerCta}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className={styles.footerCtaInner}>
            <p className={styles.footerCtaLabel}>Premium Senior Capital Allocation</p>
            <p className={styles.footerCtaText}>
              당신도 이 영광스러운 명예의 전당에 이름을 올리고 싶다면,<br />
              지금 바로 후배에게 연락하십시오.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedSponsor && (
          <SponsorModal
            sponsor={selectedSponsor}
            onClose={() => setSelectedSponsor(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}
