import type { ReactNode } from "react";
import { motion } from "framer-motion";

export const Content = (props: { title: string; children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="p-5 text-center flex flex-col gap-5 justify-center items-center"
  >
    <h1 className="text-3xl text-balance">{props.title}</h1>
    {props.children}
  </motion.div>
);
