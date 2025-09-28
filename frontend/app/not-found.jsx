import Image from "next/image";
import Link from "next/link";
 
export default function NotFound() {
  return (
    <main className="relative w-full min-h-0 md:min-h-screen flex items-start md:items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#0f172a_0%,#1e3a8a_50%,#1e40af_100%)] py-2 sm:py-3 md:py-0">
      {/* Animated radial overlay layers (Tailwind arbitrary values) */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(8, 91, 37, 0.3)_0%,transparent_50%)] motion-safe:animate-pulse" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(30,64,175,0.3)_0%,transparent_50%)] motion-safe:animate-pulse" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,rgba(18, 171, 79, 0.2)_0%,transparent_50%)] motion-safe:animate-pulse" />

      {/* Content */}
      <section className="relative z-10 w-full max-w-[1000px] max-h-[800px] px-4">
       <Link href="/">
         <Image
          src="/image/not-found.svg"
          alt="Not found"
          width={1024}
          height={1024}
          priority
          cursor="pointer"
          className="mx-auto w-full max-w-[1000px] max-h-[600px] h-auto drop-shadow-xl transition-transform duration-300 ease-in-out hover:scale-[1.02]"
        />
       </Link>

      </section>
    </main>
  );
}
