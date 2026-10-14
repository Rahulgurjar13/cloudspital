import Image from "next/image";
import { Container } from "@/components/ui/Section";

// Seals carry a caption (they are hard to recognise in greyscale); wordmarks
// already spell their name, so they stand alone at a wider size.
const LOGOS = [
  { src: "/t1.webp", name: "AIIMS Patna", box: "h-12 w-12" },
  { src: "/t2.webp", name: "Uttar Pradesh Govt.", box: "h-12 w-12" },
  { src: "/t3.webp", name: "Bihar Sarkar", box: "h-12 w-11" },
  { src: "/t4.webp", name: "Indian Railways", box: "h-12 w-12" },
  { src: "/t5.webp", name: "Adani", box: "h-7 w-20", wordmark: true },
  { src: "/t6.webp", name: "NTPC", box: "h-14 w-20", wordmark: true },
];

// "Trusted by" strip, open on the page: hairlines above and below, the
// statement on the left, a divider, then an endless logo marquee.
export function TrustedBy() {
  return (
    <section className="py-6 sm:py-8 lg:py-6">
      <Container>
        <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-5 border-y border-line py-6 sm:gap-6 lg:grid-cols-12 lg:gap-0 lg:py-8">
          <p className="t-h5 max-w-[360px] text-muted lg:col-span-4 lg:pr-10">
            Trusted by amazing global companies and govt.
          </p>

          <div className="min-w-0 lg:col-span-8 lg:border-l lg:border-line lg:pl-8">
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
              <div className="animate-marquee items-center">
                {[0, 1].map((copy) => (
                  <ul
                    key={copy}
                    aria-hidden={copy === 1}
                    className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14"
                  >
                    {LOGOS.map((logo) => (
                      <li key={logo.name} className="group flex shrink-0 items-center gap-3">
                        <span className={`relative shrink-0 ${logo.box}`}>
                          <Image
                            src={logo.src}
                            alt={copy === 0 && logo.wordmark ? logo.name : ""}
                            fill
                            sizes="96px"
                            className="object-contain opacity-70 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                          />
                        </span>
                        {!logo.wordmark && (
                          <span className="whitespace-nowrap t-small text-muted transition-colors duration-300 group-hover:text-ink">
                            {logo.name}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
