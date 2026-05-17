import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import ScrollIndicator from '../ScrollIndicator/ScrollIndicator';
import styles from './EnvelopeScene.module.css';

export default function EnvelopeScene({ onOpen }) {
  const containerRef = useRef(null);

  // Track scroll relative to the sticky container's parent
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Flap: opens as user scrolls to ~35%
  const flapRotateX = useTransform(scrollYProgress, [0, 0.38], [0, -185]);
  const flapOpacity = useTransform(scrollYProgress, [0.3, 0.42], [1, 0]);

  // Paper: rises from 30% → 70%
  const paperY = useTransform(scrollYProgress, [0.28, 0.68], ['60px', '-150px']);
  const paperOpacity = useTransform(scrollYProgress, [0.62, 0.75], [1, 0]);

  // Envelope fades at end
  const envelopeScale = useTransform(scrollYProgress, [0.65, 0.82], [1, 0.88]);
  const envelopeOpacity = useTransform(scrollYProgress, [0.68, 0.85], [1, 0]);

  // Open button appears at ~75%
  const openBtnOpacity = useTransform(scrollYProgress, [0.72, 0.85], [0, 1]);
  const openBtnY = useTransform(scrollYProgress, [0.72, 0.85], ['16px', '0px']);

  // Scroll indicator fades out early
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section
      ref={containerRef}
      className={styles.scrollContainer}
      aria-label="편지 봉투 열기 인터랙션"
    >
      <div className={styles.sticky}>
        {/* Decorative blobs */}
        <div className={styles.blobA} aria-hidden="true" />
        <div className={styles.blobB} aria-hidden="true" />

        {/* Main envelope group */}
        <motion.div
          className={styles.envelopeGroup}
          style={{ scale: envelopeScale, opacity: envelopeOpacity }}
        >
          {/* Envelope body */}
          <div className={styles.envelope}>
            <div className={styles.envelopeBody}>
              {/* Fold lines */}
              <div className={styles.foldLeft} />
              <div className={styles.foldRight} />
              <div className={styles.foldBottom} />

              {/* Wax seal */}
              <div className={styles.waxSeal} aria-hidden="true">
                <svg viewBox="0 0 44 44" fill="none" width="44" height="44">
                  <circle cx="22" cy="22" r="20" fill="#cc785c" />
                  <circle cx="22" cy="22" r="16" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                  <text
                    x="22" y="22"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize="16"
                    fontFamily="serif"
                  >✦</text>
                </svg>
              </div>

              {/* Paper rising out */}
              <motion.div
                className={styles.paper}
                style={{ y: paperY, opacity: paperOpacity }}
                aria-hidden="true"
              >
                <div className={styles.paperContent}>
                  <div className={styles.paperLine} style={{ width: '45%', height: '9px' }} />
                  <div className={styles.paperLine} style={{ width: '80%' }} />
                  <div className={styles.paperLine} style={{ width: '90%' }} />
                  <div className={styles.paperLine} style={{ width: '65%' }} />
                  <div style={{ height: '8px' }} />
                  <div className={styles.paperLine} style={{ width: '88%' }} />
                  <div className={styles.paperLine} style={{ width: '72%' }} />
                  <div className={styles.paperLine} style={{ width: '55%' }} />
                </div>
              </motion.div>
            </div>

            {/* Flap */}
            <motion.div
              className={styles.flapContainer}
              style={{ rotateX: flapRotateX, opacity: flapOpacity }}
            >
              <div className={styles.flap} />
            </motion.div>
          </div>
        </motion.div>

        {/* "열어보기" CTA — appears at end of scroll */}
        <motion.div
          className={styles.openCta}
          style={{ opacity: openBtnOpacity, y: openBtnY }}
          aria-live="polite"
        >
          <p className={styles.openCtaHint}>준비됐나요?</p>
          <button
            id="btn-open-letter"
            className={styles.openBtn}
            onClick={onOpen}
            aria-label="제안서 열어보기"
          >
            제안서 열어보기
            <span className={styles.openBtnArrow}>→</span>
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className={styles.indicatorWrapper}
          style={{ opacity: indicatorOpacity }}
        >
          <ScrollIndicator />
        </motion.div>
      </div>
    </section>
  );
}
