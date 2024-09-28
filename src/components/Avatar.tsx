import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export default function Avatar({ className }: { className?: string }) {
  return (
    <motion.div
      layoutId="avatar"
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
