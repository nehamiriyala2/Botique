import React from "react";
import Link from "next/link";
import { ArrowRight, Gem, HandHeart, Instagram, Sparkles, Scissors } from "lucide-react";
import {
  COLLECTIONS,
  INSTAGRAM_GALLERY_ITEMS,
  OCCASIONS,
  PLACEHOLDER_TESTIMONIALS,
} from "@/data/catalog";
import { getFeaturedProducts } from "@/lib/db/repository";
import { BRAND_CONFIG, buildWhatsAppEnquiryUrl } from "@/lib/brand";
import { ProductCard } from "@/components/ProductCard";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { ContactEnquirySection } from "@/components/ContactEnquirySection";

/** One-line descriptions for the collection tiles. */
const COLLECTION_LINES: Record<string, string> = {
  "mul-cotton": "Breathable, featherlight drapes for everyday grace.",
  georgette: "Fluid drapes with delicate borders for celebrations.",
  "semi-pattu": "Lustrous weaves and zari borders for festive days.",
  designer: "Statement pieces with refined embroidery.",
  "work-sarees": "Stone, cutwork and embellished borders for big occasions.",
};

const VALUES = [
  { icon: Gem, title: "Curated weaves", text: "Mul cotton, georgette, semi pattu, designer and work sarees, chosen piece by piece." },
  { icon: Scissors, title: "Tradition, refined", text: "Classic borders and motifs, with a contemporary eye for drape and colour." },
  { icon: Sparkles, title: "Quality first", text: "Every saree is checked for fall, border finish and how it wears over the years." },
  { icon: HandHeart, title: "Personal guidance", text: "Help with colours, fabrics and occasions in our Guntur store or on WhatsApp." },
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

function SectionHead({
  eyebrow,
  title,
  text,
  link,
}: {
  eyebrow: string;
  title: React.ReactNode;
  text?: string;
  link?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12">
      <div className="max-w-[620px]">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h-section mt-4 text-ink">{title}</h2>
        {text && <p className="mt-4 text-[17px] leading-[1.7] text-ink-muted">{text}</p>}
      </div>
      {link && (
        <Link href={link.href} className="btn-ghost self-start md:self-auto shrink-0">
          {link.label}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}

export default async function HomePage() {
  const featured = (await getFeaturedProducts()).slice(0, 4);
  const reviews = PLACEHOLDER_TESTIMONIALS.filter((t) => !t.isPlaceholder);

  return (
    <>
      {/* ───────────── 3. HERO ───────────── */}
      <section className="bg-paper overflow-hidden">
        <div className="shell grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] items-center gap-10 lg:gap-16 py-10 md:py-16 lg:py-20">
          <div className="max-w-[600px]">
            <p className="eyebrow">Saree boutique · Guntur</p>
            <h1 className="h-display mt-5 text-ink">
              Elegance, woven in every <em>thread.</em>
            </h1>
            <p className="mt-6 text-[18px] leading-[1.7] text-ink-muted max-w-[480px]">
              Timeless sarees that celebrate the beauty, tradition and grace of Indian women — chosen with
              care, and offered with personal guidance.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/collections" className="btn-solid">
                Explore collections
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/shop" className="btn-ghost">
                Shop all sarees
              </Link>
            </div>
            <p className="mt-8 text-[14px] text-ink-muted">
              Mul Cotton <span className="text-gold">·</span> Georgette <span className="text-gold">·</span> Semi
              Pattu <span className="text-gold">·</span> Designer <span className="text-gold">·</span> Work Sarees
            </p>
          </div>

          <div className="justify-self-center w-full max-w-[440px] lg:max-w-[480px]">
            <div className="gold-frame hero-fade" style={{ ["--d" as string]: "0.1s" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/aliveli-poster.webp"
                alt="Aliveli Vasthralaya — Celebrating Indian Elegance. Exclusive sarees, 2-piece and 3-piece sets, designer blouse customization, maggam work and computer embroidery, elegant collections for every occasion, and step-to-door service. Call 8977754414 or 9347492414."
                width={1024}
                height={1536}
                fetchPriority="high"
                className="w-full h-auto rounded-[20px]"
              />
            </div>
          </div>
        </div>
        <div className="zari" aria-hidden="true" />
      </section>

      {/* ───────────── 4. COLLECTIONS ───────────── */}
      <section id="collections" className="section bg-ivory">
        <div className="shell">
          <SectionHead
            eyebrow="The collections"
            title={<>Five weaves. <em>One you.</em></>}
            text="From featherlight mul cotton for sunlit mornings to lustrous semi pattu for the days you will remember."
            link={{ href: "/collections", label: "View all collections" }}
          />
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {COLLECTIONS.map((c, i) => (
              <Link
                key={c.id}
                href={`/shop?collection=${c.slug}`}
                className={`card woven group flex flex-col hover:-translate-y-1 ${i === 0 ? "col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.image}
                    alt={`${c.name} at Aliveli Vasthralaya`}
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-[50%_20%] transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="zari" aria-hidden="true" />
                <div className="p-4 md:p-5 flex-1 flex flex-col">
                  <h3 className="font-serif text-[20px] md:text-[22px] leading-tight text-ink group-hover:text-maroon transition-colors">
                    {c.name.replace(" Sarees", "")}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-[1.55] text-ink-muted">{COLLECTION_LINES[c.slug]}</p>
                  <span className="mt-auto pt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-maroon">
                    Shop now <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 5. SIGNATURE PIECES ───────────── */}
      <section id="signature" className="section bg-paper">
        <div className="shell">
          <SectionHead
            eyebrow="Signature pieces"
            title={<>Chosen once. <em>Worn forever.</em></>}
            text="A few pieces we keep coming back to. Sample listings are shown while live inventory is being added."
            link={{ href: "/shop", label: "Shop the full catalogue" }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 6. SHOP BY OCCASION ───────────── */}
      <section id="occasions" className="section bg-ivory">
        <div className="shell">
          <SectionHead
            eyebrow="Shop by occasion"
            title={<>For the day, <em>and the occasion.</em></>}
            text="Weddings, festivals, rituals and the quieter everyday — find the drape that suits the moment."
          />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {OCCASIONS.map((o, i) => (
              <Link
                key={o.id}
                href={`/shop?occasion=${o.slug}`}
                className={`group relative block overflow-hidden rounded-[20px] border border-line bg-paper hover:shadow-[0_22px_40px_-26px_rgba(58,13,20,0.45)] transition-shadow ${
                  i === 0 ? "col-span-2 md:col-span-1" : ""
                }`}
              >
                <div className={`relative ${i === 0 ? "aspect-[16/11] md:aspect-[3/4]" : "aspect-[3/4]"}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={o.image}
                    alt={`${o.name} sarees`}
                    width={800}
                    height={1066}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover object-[50%_25%] transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3a0d14]/85 via-[#3a0d14]/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 text-paper">
                    <p className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-sand/90">{o.subtitle}</p>
                    <h3 className="font-serif text-[22px] md:text-[24px] leading-tight mt-1 flex items-center gap-2">
                      {o.name}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 7. STORY ───────────── */}
      <section id="stories" className="section bg-paper">
        <div className="shell grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center">
          <div className="gold-frame max-w-[460px] w-full justify-self-center lg:justify-self-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/aliveli-portrait.webp"
              alt="Woman in a deep plum saree with an embroidered blouse and gold temple jewellery"
              width={630}
              height={1130}
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/5] object-cover object-[50%_35%] rounded-[20px]"
            />
          </div>
          <div>
            <p className="eyebrow">The Aliveli way</p>
            <blockquote className="mt-5">
              <p className="font-serif text-[clamp(28px,3.6vw,44px)] leading-[1.2] tracking-[-0.025em] text-ink">
                “The right saree doesn’t change who you are. <em>It lets everyone see it.</em>”
              </p>
            </blockquote>
            <p className="mt-6 text-[17px] leading-[1.75] text-ink-muted max-w-[560px]">
              At Aliveli Vasthralaya, every saree is an ode to Indian femininity — enduring cultural grace met
              with thoughtful contemporary styling. Choosing a saree should feel unhurried and personal.
            </p>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-[20px] border border-line bg-paper p-5">
                  <span className="w-10 h-10 rounded-full bg-ivory border border-gold/60 flex items-center justify-center text-maroon">
                    <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                  </span>
                  <h3 className="font-serif text-[20px] mt-3 text-ink">{title}</h3>
                  <p className="mt-1 text-[14.5px] leading-[1.6] text-ink-muted">{text}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-ghost mt-8">
              Read our story
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── 8. GALLERY ───────────── */}
      <section id="instagram-gallery" className="section bg-ivory">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow">Styled in grace</p>
              <h2 className="h-section mt-4 text-ink">
                From our <em>gallery.</em>
              </h2>
            </div>
            {BRAND_CONFIG.instagramUrl ? (
              <a href={BRAND_CONFIG.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost self-start">
                <Instagram className="w-4 h-4" aria-hidden="true" />
                Follow {BRAND_CONFIG.instagramHandle}
              </a>
            ) : (
              <p className="inline-flex items-center gap-2 text-[15px] font-semibold text-maroon">
                <Instagram className="w-4 h-4" aria-hidden="true" />
                {BRAND_CONFIG.instagramHandle}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {INSTAGRAM_GALLERY_ITEMS.map((item) => (
              <figure key={item.id} className="group relative overflow-hidden rounded-[20px] border border-line aspect-square bg-paper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.caption}
                  width={600}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-[50%_25%] transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#3a0d14]/80 to-transparent text-paper text-[12.5px] leading-snug opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── 9. REVIEWS (only real reviews; hidden until added) ───────────── */}
      {reviews.length > 0 && (
        <section id="reviews" className="section bg-paper">
          <div className="shell">
            <SectionHead eyebrow="Customer reviews" title={<>Draped by her. <em>Remembered by her.</em></>} />
            <TestimonialSlider items={reviews} />
          </div>
          <div className="shell mt-[var(--space)]">
            <div className="zari" aria-hidden="true" />
          </div>
        </section>
      )}

      {/* ───────────── 10. VISIT & ENQUIRE ───────────── */}
      <ContactEnquirySection />

      {/* ───────────── 11. FAQ ───────────── */}
      <section className="section bg-ivory">
        <div className="shell grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 lg:gap-16">
          <div>
            <p className="eyebrow">Good to know</p>
            <h2 className="h-section mt-4 text-ink">
              Questions, <em>answered.</em>
            </h2>
            <p className="mt-4 text-[17px] leading-[1.7] text-ink-muted max-w-[380px]">
              Anything else? Ask us on WhatsApp and we will help.
            </p>
            <a
              href={buildWhatsAppEnquiryUrl("Hello Aliveli Vasthralaya, I have a question about your sarees.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-solid mt-6"
            >
              Ask on WhatsApp
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
          <div className="space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="faq-item group rounded-[20px] border border-line bg-paper open:shadow-[0_18px_36px_-28px_rgba(58,13,20,0.45)]">
                <summary className="flex items-center justify-between gap-4 min-h-[64px] px-5 sm:px-6 py-4">
                  <span className="faq-q font-serif text-[18px] sm:text-[20px] leading-[1.35] text-ink transition-colors">{f.q}</span>
                  <span className="faq-mark" aria-hidden="true" />
                </summary>
                <p className="faq-answer px-5 sm:px-6 pb-5 text-[15.5px] leading-[1.75] text-ink-muted max-w-[640px]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
