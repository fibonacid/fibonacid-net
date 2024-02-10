import Avatar from "@/components/Avatar";
import PassCode from "@/components/PassCode";

export default function Home() {
  return (
    <main className="min-h-full grid gap-4 place-content-center">
      <div className="flex flex-col items-center gap-4">
        <Avatar />
        <PassCode />
      </div>
    </main>
  );
}
