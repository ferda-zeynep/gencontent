"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  title: string;
  value: string | number;
  description: string;
  icon: string;
}

export default function DashboardCards({ cards }: { cards: CardProps[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
              {card.title}
            </span>
            <span className="text-2xl">{card.icon}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-950 tracking-tight">
              {card.value}
            </span>
            <span className="text-xs text-gray-400 mt-1">
              {card.description}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
