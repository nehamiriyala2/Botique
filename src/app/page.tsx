import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS, INSTAGRAM_GALLERY_ITEMS, OCCASIONS } from "@/data/catalog";
import { getFeaturedProducts } from "@/lib/db/repository";
import { BRAND_CONFIG, buildWhatsAppEnquiryUrl } from "@/lib/brand";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { CollectionRail } from "@/components/CollectionRail";
import { ContactEnquirySection } from "@/components/ContactEnquirySection";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as React.CSSProperties;

const PROMISES = [
  { title: "Curated weaves", text: "Mul cotton, georgette, semi pattu, designer and work sarees, chosen piece by piece." },
  { title: "Tradition, refined", text: "Classic borders and motifs, with a contemporary eye for drape and colour." },
  { title: "Quality first", text: "Every saree is checked for fall, border finish and how it wears over the years." },
  { title: "Personal guidance", text: "Help with colours, fabrics and occasions in our Guntur store or on WhatsApp." },
];

const FAQS = [
  {
    q: "Where is Aliveli Vasthralaya?",
    a: `Our boutique is at ${BRAND_CONFIG.address.full} You are welcome to visit and see the sarees in person.`,
  },
  {
    q: "Which sarees do you carry?",
    a: "Five collections: Mul Cotton, Georgette, Semi Pattu, Designer and Work Sarees, for everyday wear through weddings and festive occasions.",
  },
  {
    q: "Can I enquire before visiting?",
    a: "Yes. Message us on WhatsApp with the saree, colour or occasion you have in mind and our team will help you with availability and options.",
  },
  {
    q: "Why do some pieces say “Price on enquiry”?",
    a: "Select designer pieces are priced personally, after an availability check. Ask on WhatsApp or through the enquiry form and we will share details.",
  },
  {
    q: "Do you ship outside Guntur?",
    a: "Store pickup in Guntur and domestic shipping are both available. Dispatch timelines and courier charges are confirmed when your order is reviewed.",
  },
];

export default async function HomePage() {
  const featured = (await getFeaturedProducts()).slice(0, 4);
  const whatsapp = buildWhatsAppEnquiryUrl(
    "Hello Aliveli Vasthralaya, I would like to enquire about your sarees."
  );

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="relative bg-ivory overflow-hidden">
        <div className="relative md:absolute md:inset-0 aspect-[1.16] md:aspect-auto overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero-saree.jpg"
            alt="Woman in a wine and gold zari silk saree in a sunlit colonnade"
            className="hero-img absolute inset-0 w-full h-full object-cover object-[78%_40%] md:object-[70%_35%]"
          />
          <div
            aria-hidden="true"
            className="hidden md:block absolute inset-0 bg-gradient-to-r from-ivory via-ivory/80 via-35% to-transparent to-65%"
          />
        </div>

        <div
          className="relative shell flex items-center md:min-h-[clamp(620px,calc(100svh-var(--header-height)-36px),880px)]"
        >
          <div className="max-w-[560px] py-10 md:py-20">
            <p className="section-label hero-label hero-fade" style={{ ["--d" as string]: "0.15s" }}>
              <span />
              Saree boutique · Guntur
            </p>
            <h1 className="mt-7 mb-6 text-[clamp(52px,6.6vw,104px)] leading-[0.96] tracking-[-0.055em] text-ink">
              <span className="hero-line">
                <span style={{ ["--i" as string]: 0 }}>Elegance, woven</span>
              </span>
              <span className="hero-line">
                <span style={{ ["--i" as string]: 1 }}>
                  in every <em>thread.</em>
                </span>
              </span>
            </h1>
            <p className="hero-fade lede max-w-[430px] !text-[#413932]" style={{ ["--d" as string]: "0.75s" }}>
              Timeless sarees that celebrate the beauty, tradition and grace of Indian women — chosen with
              care, and offered with personal guidance.
            </p>
            <div className="hero-fade mt-6 flex flex-wrap items-center gap-x-8 gap-y-2" style={{ ["--d" as string]: "0.9s" }}>
              <Link href="/collections" className="text-link">
                Explore the collections
                <ArrowRight className="w-4 h-4 stroke-[1.4]" />
              </Link>
              <Link href="/shop" className="quiet-link">
                Shop all sarees
              </Link>
            </div>
            <p className="hero-fade micro text-ink-muted mt-8" style={{ ["--d" as string]: "1.05s" }}>
              Mul Cotton · Georgette · Semi Pattu · Designer · Work
            </p>
          </div>
        </div>
      </section>

      {/* ───────────── POINT OF VIEW ───────────── */}
      <section className="section bg-paper">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-[28%_1fr] gap-10 lg:gap-[6%]">
            <div className="flex flex-col justify-between gap-8 py-2">
              <p data-reveal="label" className="section-label">
                <span />
                Our point of view
              </p>
              <p data-reveal className="micro text-ink-muted hidden lg:block" style={d(120)}>
                Est. in Guntur, Andhra Pradesh
              </p>
            </div>
            <div>
              <h2
                data-reveal
                className="text-[clamp(42px,4.8vw,76px)] leading-[1.06] tracking-[-0.048em] text-ink [text-wrap:balance]"
              >
                Tradition. Comfort. <em>Grace.</em> A saree should feel like it was always yours.
              </h2>
              <p data-reveal className="lede max-w-[440px] mt-8 lg:ml-auto" style={d(120)}>
                We begin with the woman, not the shelf — the occasion, the colours she loves, how she wants
                to move. Then we find the weave that fits.
              </p>
            </div>
          </div>

          <div className="relative mt-16 lg:mt-20">
            <div data-reveal="rule" className="rule absolute top-0 inset-x-0" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {PROMISES.map((p, i) => (
                <div
                  key={p.title}
                  data-reveal
                  style={d(120 + i * 110)}
                  className={`pt-7 pb-8 sm:pr-8 ${i > 0 ? "lg:pl-8 lg:border-l lg:border-line/70" : ""} ${
                    i % 2 === 1 ? "sm:pl-8 sm:border-l sm:border-line/70 lg:border-l" : ""
                  } border-b border-line/70 lg:border-b-0`}
                >
                  <div className="flex items-baseline gap-5">
                    <span className="micro text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-[clamp(24px,2vw,32px)] tracking-[-0.03em]">{p.title}</h3>
                  </div>
                  <p className="mt-3 pl-10 text-[14px] leading-[1.75] text-ink-muted">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── COLLECTIONS RAIL ───────────── */}
      <section id="collections" className="section bg-ivory overflow-hidden">
        <div className="shell grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-[8%] items-end mb-14">
          <div>
            <p data-reveal="label" className="section-label">
              <span />
              The collections
            </p>
            <h2 data-reveal style={d(80)} className="display-lg mt-8 text-ink">
              Five weaves. <em>One you.</em>
            </h2>
          </div>
          <div data-reveal style={d(160)}>
            <p className="lede max-w-[420px]">
              From featherlight mul cotton for sunlit mornings to lustrous semi pattu for the days you will
              remember — each collection is gathered for how it drapes, not just how it looks.
            </p>
            <Link href="/collections" className="text-link mt-5">
              View all collections
              <ArrowRight className="w-4 h-4 stroke-[1.4]" />
            </Link>
          </div>
        </div>
        <CollectionRail collections={COLLECTIONS} />
      </section>

      {/* ───────────── SIGNATURE PIECES ───────────── */}
      <section id="signature" className="section bg-paper">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-[8%] items-end">
            <div>
              <p data-reveal="label" className="section-label">
                <span />
                Signature pieces
              </p>
              <h2 data-reveal style={d(80)} className="display-lg mt-8 text-ink">
                Chosen once. <em>Worn forever.</em>
              </h2>
            </div>
            <div data-reveal style={d(160)}>
              <p className="lede max-w-[420px]">
                A few pieces we keep coming back to. Sample listings are shown while live inventory is
                being added.
              </p>
              <Link href="/shop" className="text-link mt-5">
                Shop the full catalogue
                <ArrowRight className="w-4 h-4 stroke-[1.4]" />
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
            {featured.map((product, i) => (
              <div
                key={product.id}
                data-reveal
                style={d(i * 120)}
                className={i % 2 === 1 ? "lg:mt-20" : ""}
              >
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── OCCASIONS ───────────── */}
      <section id="occasions" className="section bg-ivory">
        <div className="shell grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-12 lg:gap-[6%]">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+40px)] self-start">
            <p data-reveal="label" className="section-label">
              <span />
              Draped for every moment
            </p>
            <h2 data-reveal style={d(80)} className="text-[clamp(44px,4.6vw,74px)] leading-[1.02] tracking-[-0.048em] mt-8">
              For the day, <em>and the occasion.</em>
            </h2>
            <p data-reveal style={d(160)} className="lede mt-7 max-w-[320px]">
              Weddings, festivals, rituals, and the quieter everyday — find the silhouette that suits the
              moment.
            </p>
            <p data-reveal style={d(220)} className="micro text-ink-muted mt-8">
              Wedding · Festive · Traditional · Everyday · Evening
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {OCCASIONS.map((o, i) => (
              <Link
                key={o.id}
                href={`/shop?occasion=${o.slug}`}
                className={`group relative block ${i === 0 ? "col-span-2" : ""} ${i === 2 || i === 4 ? "sm:mt-16" : ""}`}
              >
                <div
                  data-reveal="curtain"
                  style={d(i * 90)}
                  className={`relative overflow-hidden bg-ivory-deep zoom ${i === 0 ? "aspect-[16/10]" : "aspect-[4/5]"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.image} alt={o.name} loading="lazy" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <p className="hover-caption absolute left-5 right-5 bottom-5 text-paper text-[14px] leading-snug">
                    {o.description}
                  </p>
                </div>
                <div className="pt-4 flex items-baseline justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="micro text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-[clamp(20px,1.8vw,28px)] tracking-[-0.03em] group-hover:text-maroon transition-colors">
                      {o.name}
                    </h3>
                  </div>
                  {i === 0 && <span className="micro text-ink-muted hidden sm:inline">{o.subtitle}</span>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── CLIENT STORIES ───────────── */}
      <section id="stories" className="bg-paper py-[clamp(80px,7vw,120px)]">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] gap-x-[9%] gap-y-8 mb-14">
            <div>
              <p data-reveal="label" className="section-label">
                <span />
                Client stories
              </p>
              <h2 data-reveal style={d(80)} className="mt-8 text-[clamp(50px,5.9vw,92px)] leading-[1.02] tracking-[-0.045em]">
                Draped by her. <em>Remembered</em> by her.
              </h2>
              <p data-reveal style={d(160)} className="mt-6 text-[13px] tracking-[0.1em] text-ink-muted">
                Real women. Real occasions. A little more grace.
              </p>
            </div>
            <div data-reveal style={d(200)} className="self-end">
              <p className="micro text-ink-muted border-l border-line pl-5 max-w-[300px]">
                Placeholder stories shown — replace with genuine reviews from Aliveli Vasthralaya clients.
              </p>
            </div>
          </div>
          <div data-reveal style={d(120)}>
            <TestimonialSlider />
          </div>
          <p data-reveal className="micro text-ink-muted mt-14 ml-auto w-fit relative pb-4 after:absolute after:left-0 after:bottom-0 after:w-10 after:h-px after:bg-ink-muted">
            Different women. Same feeling.
          </p>
        </div>
      </section>

      {/* ───────────── ABOUT (DARK) ───────────── */}
      <section className="section bg-dark text-paper overflow-hidden">
        <div className="shell grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-[8%] items-center">
          <div data-reveal="curtain" className="relative aspect-[4/5] overflow-hidden order-1 lg:order-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/brand-story.jpg"
              alt="Woman in a red and gold checked saree leaning in a wooden doorway"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p data-reveal="label" className="section-label !text-sand">
              <span />
              The Aliveli way
            </p>
            <h2 data-reveal style={d(80)} className="mt-8 mb-8 text-[clamp(46px,5vw,78px)] leading-[1] tracking-[-0.048em] [&_em]:text-rose">
              Choosing a saree begins with <em>listening.</em>
            </h2>
            <div data-reveal style={d(160)} className="space-y-4 max-w-[440px] text-[16px] leading-[1.85] text-[#ded2c8]">
              <p>
                At Aliveli Vasthralaya, every saree is an ode to Indian femininity — enduring cultural grace
                met with thoughtful contemporary styling.
              </p>
              <p>
                We believe choosing a saree should feel unhurried and personal, guided by attentive
                assistance and a real love for the craft.
              </p>
            </div>
            <blockquote data-reveal style={d(220)} className="mt-10 pl-6 border-l border-[#65464a] font-serif italic text-[clamp(22px,2vw,28px)] leading-[1.3] tracking-[-0.02em] text-[#eadfd5] max-w-[460px]">
              “The right saree doesn’t change who you are. It lets everyone see it.”
            </blockquote>
            <div data-reveal style={d(280)} className="mt-8 flex flex-wrap gap-x-8 items-center">
              <Link href="/about" className="text-link !text-paper">
                Read our story
                <ArrowRight className="w-4 h-4 stroke-[1.4]" />
              </Link>
              <Link href="/contact" className="quiet-link text-sand">
                Visit the Guntur boutique
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── LOOKBOOK MARQUEE ───────────── */}
      <section id="instagram-gallery" className="pt-[var(--space)] pb-12 bg-paper overflow-hidden">
        <div className="shell flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p data-reveal="label" className="section-label">
              <span />
              Off the shelf
            </p>
            <h2 data-reveal style={d(80)} className="display-md mt-7">
              Styled in <em>grace.</em>
            </h2>
          </div>
          <div data-reveal style={d(160)}>
            {BRAND_CONFIG.instagramUrl ? (
              <a href={BRAND_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-link">
                Follow {BRAND_CONFIG.instagramHandle}
                <ArrowRight className="w-4 h-4 stroke-[1.4]" />
              </a>
            ) : (
              <span className="micro text-ink-muted">{BRAND_CONFIG.instagramHandle}</span>
            )}
          </div>
        </div>

        <div className="marquee" style={{ ["--marquee-duration" as string]: "60s" }}>
          {[false, true].map((dup) => (
            <div key={String(dup)} className="marquee__track gap-5 pr-5" aria-hidden={dup || undefined}>
              {INSTAGRAM_GALLERY_ITEMS.map((item) => (
                <figure key={item.id + String(dup)} className="group shrink-0 w-[62vw] sm:w-[34vw] lg:w-[22vw]">
                  <div className="aspect-[4/5] overflow-hidden zoom bg-ivory-deep">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={dup ? "" : item.caption} loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <figcaption className="pt-3 flex justify-between gap-4">
                    <span className="font-serif italic text-[16px] text-ink/80 truncate">{item.caption}</span>
                    <span className="micro text-ink-muted shrink-0">{item.collection}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── CONTACT ───────────── */}
      <ContactEnquirySection />

      {/* ───────────── FAQ ───────────── */}
      <section className="bg-paper pb-[var(--space)]">
        <div className="shell">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-[8%] pt-[clamp(48px,4.5vw,72px)] border-t border-line">
            <div>
              <p data-reveal="label" className="section-label">
                <span />
                Good to know
              </p>
              <h3 data-reveal style={d(80)} className="mt-7 text-[clamp(34px,3.2vw,52px)] leading-[1.08] tracking-[-0.04em]">
                A saree boutique in <em>Guntur,</em> Andhra Pradesh.
              </h3>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer" data-reveal style={d(160)} className="text-link mt-6">
                Ask us anything
                <ArrowRight className="w-4 h-4 stroke-[1.4]" />
              </a>
            </div>
            <div data-reveal style={d(120)}>
              {FAQS.map((f, i) => (
                <details key={f.q} className="faq-item border-b border-line first:border-t">
                  <summary className="grid grid-cols-[32px_1fr_18px] items-center gap-3.5 min-h-[64px] py-4">
                    <span className="micro text-ink-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="faq-q font-serif text-[clamp(19px,1.5vw,23px)] leading-[1.3] tracking-[-0.015em] transition-colors">
                      {f.q}
                    </span>
                    <span className="faq-mark" aria-hidden="true" />
                  </summary>
                  <p className="faq-answer max-w-[620px] pb-6 pl-[46px] text-[15px] leading-[1.8] text-ink-muted">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
