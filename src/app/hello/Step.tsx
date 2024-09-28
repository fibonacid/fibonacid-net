import { createContext, useContext, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const StepContext = createContext<{
  index: number;
  setIndex: (index: number) => void;
} | null>(null);

export function useStep() {
  const context = useContext(StepContext);
  if (!context) throw new Error("useStep must be used within a StepProvider");
  return context;
}

export function StepsProvider(props: { children: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  return (
    <StepContext.Provider value={{ index, setIndex }}>
      {props.children}
    </StepContext.Provider>
  );
}

export type StepRenderProp = (props: { next: () => void }) => ReactNode;
export type StepProps = {
  children: ReactNode | StepRenderProp;
};

export function Step(props: StepProps) {
  const { index, setIndex } = useStep();
  const next = () => setIndex(index + 1);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {typeof props.children === "function"
        ? props.children({ next })
        : props.children}
    </motion.div>
  );
}

export type StepsProps = {
  content: StepProps["children"][];
};

export function Steps(props: StepsProps) {
  const { index } = useStep();
  const Content = props.content[index];
  return (
    <AnimatePresence mode="wait">
      <Step key={index}>{Content}</Step>;
    </AnimatePresence>
  );
}
