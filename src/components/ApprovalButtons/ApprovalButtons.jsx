import { useState, useEffect } from 'react';
import styles from './ApprovalButtons.module.css';

function ConfettiPiece({ style }) {
  return <div className={styles.confetti} style={style} aria-hidden="true" />;
}

const CONFETTI_COLORS = [
  '#cc785c', '#f0c040', '#5db8a6', '#e8a55a', '#c8d0d8', '#e8c87a',
];

export default function ApprovalButtons({ onApprove }) {
  const [confetti, setConfetti] = useState([]);
  const [isApproved, setIsApproved] = useState(false);

  const handleApprove = () => {
    if (isApproved) return;
    setIsApproved(true);

    // Generate confetti pieces
    const pieces = Array.from({ length: 48 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * -20 - 10,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.8,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      velocityX: (Math.random() - 0.5) * 180,
      velocityY: 80 + Math.random() * 120,
      delay: Math.random() * 0.3,
    }));
    setConfetti(pieces);

    setTimeout(() => {
      setConfetti([]);
      onApprove?.();
    }, 1800);
  };

  return (
    <div className={styles.wrapper}>
      {/* Confetti */}
      <div className={styles.confettiContainer} aria-hidden="true">
        {confetti.map((p) => (
          <ConfettiPiece
            key={p.id}
            style={{
              left: `${p.x}%`,
              top: '50%',
              background: p.color,
              transform: `rotate(${p.rotation}deg) scale(${p.scale})`,
              '--vx': `${p.velocityX}px`,
              '--vy': `${p.velocityY}px`,
              animationDelay: `${p.delay}s`,
              width: Math.random() > 0.5 ? '8px' : '6px',
              height: Math.random() > 0.5 ? '8px' : '14px',
              borderRadius: Math.random() > 0.5 ? '2px' : '50%',
            }}
          />
        ))}
      </div>

      {/* Label */}
      <p className={styles.sectionLabel}>Sponsorship Confirmation Required</p>

      {/* Buttons */}
      <div className={styles.buttons}>
        <button
          id="btn-approve"
          className={`${styles.btn} ${styles.btnApprove}`}
          onClick={handleApprove}
          disabled={isApproved}
          aria-label="스폰서십 승인"
        >
          {isApproved ? '✓ 승인 완료' : '승인'}
        </button>

        <button
          id="btn-accept"
          className={`${styles.btn} ${styles.btnAccept}`}
          onClick={handleApprove}
          disabled={isApproved}
          aria-label="스폰서십 수락"
        >
          {isApproved ? '✓ 수락 완료' : '수락'}
        </button>
      </div>

      {/* Micro-copy */}
      <p className={styles.microcopy}>
        거절 옵션은 현재 서버 점검 중입니다.{' '}
        <span className={styles.microcopyEn}>Rejection module — maintenance in progress.</span>
      </p>
    </div>
  );
}
