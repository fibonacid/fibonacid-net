import Avatar from "@/components/Avatar";

export default function Home() {
  return (
    <main className="min-h-full grid gap-4 place-content-center">
      <div className="flex flex-col items-center gap-4">
        <Avatar />
        <LoginForm />
      </div>
    </main>
  );
}

function LoginForm() {
  return (
    <form>
      <input
        type="password"
        placeholder="Type hello to enter"
        className="bg-neutral-950 rounded-sm border-none text-center"
      />
    </form>
  );
}
