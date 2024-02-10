import Image from "next/image";
import avatar from "@/assets/avatar.jpg";

export default function Avatar() {
  return (
    <Image
      src={avatar}
      alt="Avatar"
      width={160}
      height={160}
      placeholder="blur"
      quality={100}
      className="rounded-full overflow-hidden w-40 h-40 shadow-sm"
    />
  );
}
