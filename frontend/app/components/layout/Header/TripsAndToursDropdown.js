"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import tripsAndToursMenu from '../../../data/trips-and-tours-menu.json';

const TripsAndToursDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 text-slate-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium focus:outline-none"
      >
        Trips & Tours <FiChevronDown />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-2"
          >
            {tripsAndToursMenu.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="block px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-100 hover:text-indigo-600">
                  {item.title}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TripsAndToursDropdown;
