import Link from "next/link";
export default function NotFound() {
  return (
    <section data-tone="dark" className="wrap min-h-[80svh] pt-40">
      <p className="mono dim">404</p>
      <h1 className="display mt-4 text-[clamp(2.28rem,7.6vw,6.84rem)]">Not found.</h1>
      <Link href="/work" className="btn mt-10">See the work</Link>
    </section>
  );
}
