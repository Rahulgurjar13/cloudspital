import type { Metadata } from "next";
import Image from "next/image";
import { pageMetadata } from "@/lib/seo";
import { CollectionPageSchema } from "@/components/schema/CollectionPageSchema";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, Panel, SectionLabel, SectionHeader } from "@/components/ui/Section";
import { ArrowButton } from "@/components/ui/ArrowButton";

export const revalidate = 3600;

const PATH = "/press/";

export const metadata: Metadata = pageMetadata({
  title:"Press and Media Coverage",
  description:"Cloudspital in the news, coverage, media mentions, press releases and press kit downloads.",
  path: PATH,
});

const MEDIA_LOGOS = [
  { src: "/m1.webp", alt:"Cloudspital at IMA MATCON 2025" },
  { src: "/m2.webp", alt:"Cloudspital Health ATM kiosk installation with the team" },
  { src: "/m3.webp", alt:"Cloudspital Health ATM kiosk featured in media coverage" },
  { src: "/m4.webp", alt:"Ribbon-cutting at the launch of a Cloudspital Health ATM kiosk" },
  { src: "/m5.webp", alt:"Newspaper report: state hospitals roll out health ATMs for quick diagnostic tests" },
  { src: "/m6.webp", alt:"Hindi newspaper coverage of Cloudspital Health ATM services" },
  { src: "/m7.webp", alt:"Ribbon-cutting at a Cloudspital Health ATM kiosk inauguration" },
  { src: "/m8.webp", alt:"Bareilly Cantonment Board inauguration of an instant healthcare kiosk" },
  { src: "/m9.webp", alt:"Cloudspital team and local officials beside a deployed Health ATM kiosk" },
  { src: "/m10.webp", alt:"Cloudspital deployment at P.H.C Gadhavi, Dang, Gujarat" },
];

// Media logos mapped to Hindustan, Dainik Jagran, AIM2Flourish, NITI Aayog, Radio Mirchi, Times of India
const SLIDER_LOGOS = [
  { src: "/c1.webp", alt:"98.3 FM Radio Mirchi" },
  { src: "/c2.webp", alt:"The Times of India" },
  { src: "/c3.webp", alt:"Prabhat Khabar" },
  { src: "/c4.webp", alt:"Hindustan" },
  { src: "/c5.webp", alt:"Dainik Jagran" },
  { src: "/c6.webp", alt:"NITI Aayog | Atal Innovation Mission" }
];

// Collection Page (SOP Part A) — press photos, outlet logos and the media-relations contact.
export default function PressPage() {
  return (
    <>
      <CollectionPageSchema
        name="Press and Media Coverage"
        description="Cloudspital in the news, coverage, media mentions, press releases and press kit downloads."
        path={PATH}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", path: "/" },
          { name: "Press", path: PATH },
        ]}
      />

      {/* Header */}
      <section className="pt-10 lg:pt-16">
        <Container>
          <Reveal>
            <SectionHeader
              as="h1"
              label="News and Publications"
              title="Press and Media Room"
              description="Follow Cloudspital's growth, product innovations, regulatory achievements, and deployments as we shape the future of medical technology."
            />
          </Reveal>
        </Container>
      </section>

      {/* Featured outlets and mentions (press photos) */}
      <section className="pb-20 pt-12 lg:pb-[120px] lg:pt-16">
        <Container>
          <Reveal>
            <h2 className="t-h4 text-ink">Featured Outlets and Mentions</h2>
          </Reveal>

          <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:mt-10 lg:grid-cols-5 lg:gap-4">
            {MEDIA_LOGOS.map((logo, idx) => (
              <Item key={idx} className="relative aspect-square overflow-hidden rounded-[20px] bg-white">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 260px"
                />
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Featured media coverage (outlet logos) */}
      <section className="bg-white py-14 sm:py-20 lg:py-[120px]">
        <Container>
          <Reveal>
            <h2 className="t-h4 text-ink">Featured Media Coverage</h2>
          </Reveal>

          <Stagger className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-10 lg:grid-cols-6 lg:gap-4">
            {SLIDER_LOGOS.map((logo, idx) => (
              <Item key={idx} className="relative h-24 rounded-[20px] bg-canvas sm:h-28">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain p-4"
                  sizes="220px"
                />
              </Item>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Press kit / PR contact */}
      <section className="py-10 lg:py-16">
        <Panel className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/10" />
          <Reveal className="relative grid gap-10 px-6 py-14 sm:px-10 lg:grid-cols-12 lg:px-[60px] lg:py-24">
            <div className="flex flex-col gap-6 lg:col-span-7">
              <SectionLabel onDark>Press kit</SectionLabel>
              <h2 className="t-h2 text-white">Media Relations and Press Kit</h2>
            </div>
            <div className="flex flex-col items-start justify-end gap-8 lg:col-span-4 lg:col-start-9">
              <p className="t-lead text-white/80">
                For media inquiries, interview requests, or to download our official media kit (containing logos, product photography, and executive bios), please get in touch with our relations team.
              </p>
              <ArrowButton href="/contact/" variant="light">
                Contact Media Team
              </ArrowButton>
            </div>
          </Reveal>
        </Panel>
      </section>
    </>
  );
}
