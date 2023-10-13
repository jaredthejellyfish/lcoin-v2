"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import React from "react";

const tabs = [
  { id: "accounts", label: "Accounts" },
  { id: "cards", label: "Cards" },
  { id: "vaults", label: "Vaults" },
];

export default function AnimatedTabs() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className="flex space-x-1 mt-3">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`${
            activeTab === tab.id ? "" : "dark:hover:text-white/60"
          } relative rounded-full px-3 py-1.5 text-sm dark:text-white/90 outline-sky-400 transition focus-visible:outline-2`}
          style={{
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {activeTab === tab.id && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 dark:bg-neutral-500/20 border border-neutral-200 dark:border-transparent"
              style={{ borderRadius: 9999 }}
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
