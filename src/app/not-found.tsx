import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0A0E27] text-[#F5F7FA]">
      <h1 className="mb-4 text-8xl font-bold text-[#FF006E]">404</h1>
      <p className="mb-8 text-xl text-[#A0AEC0]">Page not found</p>
      <Link
        href="/"
        className="rounded-lg bg-[#FF006E] px-6 py-3 font-semibold text-white transition-all hover:shadow-[0_0_20px_rgba(255,0,110,0.5)]"
      >
        Back to Home
      </Link>
    </div>
  );
}
