'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Minus, Plus } from 'lucide-react';

type AccordionProps = {
  i: number;
  expanded: number | null;
  setExpanded: React.Dispatch<React.SetStateAction<number | null>>;
  title: string;
  description: string;
}

const FAQ = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const accordionData = [
    {
      title: "What is GrindCode",
      description: "GrindCode is a platform that provides developers with a wide range of connectivity around the world and resources to help them build better websites and applications.",
    },
    {
      title: "How it works?",
      description: "You will create rooms and invite your friends to join. You can share your screen, code together, and have video calls.",
    },
    {
      title: "Is it free?",
      description: "Yes, GrindCode is free to use. You can create unlimited rooms and invite unlimited friends.",
    },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl mx-auto p-6"
    >
      <div className="text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-gray-400"
        >
          Everything you need to know about our platform
        </motion.p>
      </div>

      <motion.div 
        className="space-y-4"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        initial="hidden"
        animate="show"
      >
        {accordionData.map((item, i) => (
          <Accordion
            key={i}
            i={i}
            expanded={expanded}
            setExpanded={setExpanded}
            title={item.title}
            description={item.description}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const Accordion = ({ i, expanded, setExpanded, title, description }: AccordionProps) => {
  const isOpen = i === expanded;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
      }}
      className="rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <motion.button
        className="w-full flex justify-between items-center p-3 cursor-pointer"
        onClick={() => setExpanded(isOpen ? null : i)}
        initial={false}
        animate={{ 
          backgroundColor: isOpen ? "" : "",
        }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold text-gray-100 text-left">{title}</h3>
        <motion.div
          initial={false}
          animate={{ 
        rotate: isOpen ? 180 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center w-8 h-8 rounded-full"
        >
          {isOpen ? (
        <Minus className="w-5 h-5 text-gray-100" />
          ) : (
        <Plus className="w-5 h-5 text-gray-100" />
          )}
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden "
          >
            <motion.div 
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-5 pt-0 text-gray-400"
            >
              <p className="text-base leading-relaxed max-w-md">{description}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQ;