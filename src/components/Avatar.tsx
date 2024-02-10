import Image from "next/image";
import avatar from "@/assets/avatar.jpg";

export default function Avatar() {
  return (
    <div className="overflow-hidden relative w-40 h-40 rounded-full shadow-sm">
      <Image
        src={avatar}
        alt="Avatar"
        placeholder="blur"
        quality={100}
        layout="fill"
      />
    </div>
  );
}
