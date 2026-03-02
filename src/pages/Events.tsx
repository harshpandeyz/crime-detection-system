import React from 'react';
import EventTable from '../components/EventTable';
import { motion } from 'motion/react';

const Events: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">Event History</h1>
        <p className="text-slate-400 mt-1">Browse and audit all detected security events and blockchain logs.</p>
      </div>

      <EventTable />
    </motion.div>
  );
};

export default Events;
