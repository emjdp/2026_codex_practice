import { motion } from 'framer-motion';
import ApprovalButtons from '../ApprovalButtons/ApprovalButtons';
import styles from './ProposalLetter.module.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  }),
};

export default function ProposalLetter({ onApprove }) {
  return (
    <motion.section
      className={styles.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      aria-label="식대 스폰서 제안서 본문"
    >
      {/* Background blobs */}
      <div className={styles.blobLeft} aria-hidden="true" />
      <div className={styles.blobRight} aria-hidden="true" />

      <div className={styles.container}>
        <motion.div className={styles.letter} initial="hidden" animate="visible">

          {/* Letterhead */}
          <motion.div className={styles.letterhead} variants={fadeUp} custom={0}>
            <div className={styles.spikeMarkRow}>
              <span className={styles.spikeMark} aria-hidden="true">✦</span>
              <span className={styles.spikeLabel}>Strategic Nourishment Initiative</span>
            </div>
            <div className={styles.docMeta}>
              <span>문서번호: SNI-2026-H1-001</span>
              <span>기안일: 2026. 05. 14.</span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.div className={styles.titleBlock} variants={fadeUp} custom={1}>
            <p className={styles.subTitle}>Meal Sponsorship Proposal</p>
            <h1 className={styles.mainTitle}>
              2026년도 상반기 유망주(본인) 육성을 위한<br />
              식대 스폰서십 제안의 건
            </h1>
          </motion.div>

          <motion.div className={styles.divider} variants={fadeUp} custom={2} />

          {/* Salutation */}
          <motion.p className={styles.salutation} variants={fadeUp} custom={3}>
            존경하는 <strong>선배님</strong>께,
          </motion.p>

          {/* Body paragraphs */}
          <motion.p className={styles.paragraph} variants={fadeUp} custom={4}>
            안녕하십니까. 바쁘신 일상 중에도 귀중한 시간을 내어 스크롤을 내리고,
            이 불우한 <strong>후배</strong>의 제안서를 열람해 주셔서 무한한{' '}
            <strong>영광</strong>으로 생각합니다.
          </motion.p>

          <motion.p className={styles.paragraph} variants={fadeUp} custom={5}>
            다름이 아니오라, 최근 지속적인 고물가와 스트레스로 인해 제 체내의 영양소 및
            행복 지수가 심각한 하락장을 맞이하였습니다. 이에 평소 우러러보던{' '}
            <strong>선배님</strong>의 눈부신 지갑... 아니, 하해와 같은{' '}
            <strong>은혜</strong>에 기대어 이 위기를 타개하고자 본{' '}
            <strong>제안서</strong>를 결재 올립니다.
          </motion.p>

          <motion.p className={styles.paragraph} variants={fadeUp} custom={6}>
            이것은 단순한 밥 구걸이나 갈취가 아닙니다. <strong>선배님</strong>의
            소중한 자본을 제 위장에 기탁하시는, 아주 미래지향적이고 가치 있는{' '}
            <strong>투자</strong>입니다. 본 스폰서십에 참여하실 경우,{' '}
            <strong>선배님</strong>이 얻으실 수 있는{' '}
            <strong>기대효과 (ROI)</strong>는 다음과 같습니다.
          </motion.p>

          {/* ROI List */}
          <motion.ul className={styles.roiList} variants={fadeUp} custom={7}>
            <li>
              <div className={styles.roiBadge}>명예</div>
              <p>
                '밥 잘 사주는 훌륭하고 지적인 선배'라는 독보적 <strong>타이틀</strong> 획득
              </p>
            </li>
            <li>
              <div className={styles.roiBadge}>엔터테인먼트</div>
              <p>
                식사 시간 내내 제공되는 후배의 진심 어린 찬양과 고품격 리액션 무제한{' '}
                <strong>이용권</strong>
              </p>
            </li>
            <li>
              <div className={styles.roiBadge}>뿌듯함</div>
              <p>
                굶주린 영혼을 구제했다는 압도적인 도덕적 <strong>우월감</strong>
              </p>
            </li>
          </motion.ul>

          <motion.p className={styles.paragraph} variants={fadeUp} custom={8}>
            비록 단기적으로는 선배님의 계좌 잔고가 미세하게 감소하는 뼈아픈{' '}
            <strong>지출</strong>로 보일 수 있으나, 장기적으로는 훌륭한 인재를 양성하는
            위대한 <strong>업적</strong>이 될 것임을 감히 확신합니다.
          </motion.p>

          <motion.p className={styles.paragraph} variants={fadeUp} custom={9}>
            부디 긍정적인 <strong>검토</strong>를 부탁드리며, 하단의 버튼을 통해
            스폰서십 <strong>승인</strong>을 완료해 주시길 간곡히 바랍니다.
          </motion.p>

          <motion.p className={styles.closing} variants={fadeUp} custom={10}>
            감사합니다.
          </motion.p>

          {/* Signature */}
          <motion.div className={styles.signature} variants={fadeUp} custom={11}>
            <div className={styles.signatureLines}>
              <div className={styles.sigLine} />
              <div className={styles.sigLine} style={{ width: '60%' }} />
            </div>
            <p className={styles.sigName}>2026년도 상반기 유망주 일동</p>
            <p className={styles.sigSub}>Junior Happiness Growth Division</p>
          </motion.div>

          <motion.div className={styles.divider} variants={fadeUp} custom={12} />

          {/* Approval Buttons */}
          <motion.div variants={fadeUp} custom={13}>
            <ApprovalButtons onApprove={onApprove} />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
