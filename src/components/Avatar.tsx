import avatar from "@/assets/avatar.jpg";
import { cn } from "@/utils/cn";
import { easeOut, motion } from "framer-motion";
import Image from "next/image";

export default function Avatar({ className }: { className?: string }) {
  return (
    <motion.div
      layoutId="avatar"
      transition={{ layout: { ease: "easeOut", duration: 0.2 } }}
      className={cn(
        "overflow-hidden relative w-32 h-32 rounded-full shadow-sm border border-neutral-500/80",
        className,
      )}
    >
      <Image
        src={avatar}
        alt="Avatar"
        placeholder="blur"
        quality={100}
        className="object-fill h-full w-full"
      />
    </motion.div>
  );
}
