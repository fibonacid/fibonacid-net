import Image from "next/image";
import avatar from "@/assets/avatar.jpg";

export default function Avatar() {
  return (
    <div className="overflow-hidden relative w-32 h-32 rounded-full shadow-sm border border-neutral-500">
      <Image
        src={avatar}
        alt="Avatar"
        placeholder="blur"
        quality={100}
        className="object-fill h-full w-full"
      />
    </div>
  );
}
