import Image from "next/image";
import { Reveal, Stagger, Item } from "@/components/motion";
import { Container, SectionHeader } from "@/components/ui/Section";
import { Smile, Kiosk, Clock, Shield } from "@/components/icons";

const CARDS = [
  {
    icon: Smile,
    title: "Premium Atmosphere",
    text: "Cozy, wellness-focused lounges that replace cold waiting rooms.",
  },
  {
    icon: Clock,
    title: "Zero Waiting Anxiety",
    text: "Smart queueing and automated routing that respects patients' time.",
  },
  {
    icon: Kiosk,
    title: "Omnichannel Care Links",
    text: "Health ATM pods and telemedicine terminals for instant specialist consults.",
  },
  {
    icon: Shield,
    title: "ABDM Secure Sync",
    text: "Vitals and consults sync securely to patients' ABHA health lockers.",
  },
];

// Smart clinic lounge: the lounge photo, then its four features as a ruled row.
export function SmartLoungeShowcase() {
  return (
    <section className="py-14 sm:py-20 lg:py-[120px]">
      <Container>
        <Reveal>
          <SectionHeader
            label="The Smart Clinic Lounge"
            title="Tomorrow's Care Experience, Today"
            description="We integrate premium aesthetics with advanced clinical endpoints. Step into a modern space where waiting is eliminated and diagnostics are seamless."
          />
        </Reveal>

        <Reveal className="mt-8 sm:mt-12 lg:mt-16">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[30px] bg-mist sm:aspect-[21/9]">
            <Image
              src="/lounge.jpeg"
              alt="Cloudspital Smart Clinic Lounge with Health ATM screening area, doctor consultation chamber, first aid station and medicine vending"
              fill
              sizes="(min-width: 1440px) 1320px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Stagger className="mt-8 grid border-t border-line sm:grid-cols-2 lg:mt-10 lg:grid-cols-4">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Item
                key={c.title}
                className={`border-b border-line py-6 sm:pr-8 lg:border-b-0 lg:py-8 ${i > 0 ? "lg:border-l lg:pl-8" : ""} ${i % 2 === 1 ? "sm:border-l sm:pl-8" : ""}`}
              >
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="mt-4 t-h6 text-ink">{c.title}</h3>
                <p className="mt-2 t-small text-muted">{c.text}</p>
              </Item>
            );
          })}
        </Stagger>
      </Container>
    </section>
  );
}
