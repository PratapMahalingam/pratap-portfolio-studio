import Link from "next/link";
export default function NotFound() {
  return (
    <section data-tone="dark" className="wrap min-h-[80svh] pt-40">
      <p className="mono dim">404</p>
      <h1 className="display mt-4 text-[clamp(3rem,10vw,9rem)]">Not found.</h1>
      <Link href="/work" className="btn mt-10">See the work</Link>
    </section>
  );
}
