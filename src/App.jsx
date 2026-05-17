import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EnvelopeScene from './components/EnvelopeScene/EnvelopeScene';
import ProposalLetter from './components/ProposalLetter/ProposalLetter';
import HallOfFame from './components/HallOfFame/HallOfFame';
import './styles/globals.css';

export default function App() {
  const [phase, setPhase] = useState('envelope'); // 'envelope' | 'letter' | 'hall'

  const handleOpen = () => {
    setPhase('letter');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleApprove = () => {
    setPhase('hall');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <main>
      <AnimatePresence mode="wait">
        {phase === 'envelope' && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5 }}
          >
            <EnvelopeScene onOpen={handleOpen} />
          </motion.div>
        )}

        {phase === 'letter' && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <ProposalLetter onApprove={handleApprove} />
          </motion.div>
        )}

        {phase === 'hall' && (
          <motion.div
            key="hall"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <HallOfFame />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
