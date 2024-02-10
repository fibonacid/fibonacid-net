import Image from "next/image";
import avatar from "@/assets/avatar.jpg";

export default function Avatar() {
  return (
    <Image
      src={avatar}
      alt="Avatar"
      width={128}
      height={128}
      placeholder="blur"
      quality={100}
      className="rounded-full overflow-hidden w-32 h-32"
    />
  );
}
