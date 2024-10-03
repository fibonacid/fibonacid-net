import { Header } from "./Header";

export default function HelloLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-full grid gap-4 place-content-center">
      <Header />
      <main>{children}</main>
    </div>
  );
}
