"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger } from "../Motion";
import { featureSet } from "./featureSetData";

/** Clean white feature cards — matches the provided mock; append items in featureSetData. */
export function FeatureSet() {
  return (
    <motion.ul
      variants={stagger(0.07)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6"
    >
      {featureSet.map((f) => (
        <motion.li key={f.title} variants={fadeUp}>
          <article className="h-full rounded-2xl bg-white p-7 shadow-[0_10px_30px_-12px_rgba(15,23,42,0.12)] ring-1 ring-slate-900/[0.04] min-[380px]:p-8 sm:rounded-[1.25rem] sm:p-9">
            {f.icon}
            <h3 className="mt-6 text-lg font-bold tracking-tight text-slate-950 sm:text-xl">{f.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500 sm:text-[15px] sm:leading-relaxed">
              {f.body}
            </p>
          </article>
        </motion.li>
      ))}
    </motion.ul>
  );
}
