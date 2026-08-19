import Image from "next/image";
import { ArrowUpRight, Camera } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { instagramPosts } from "@/lib/data/editorial";

/**
 * Social grid. Currently rendered from static seed posts — connect it to the
 * Instagram Basic Display API (or your CMS) to show live content.
 */
export function InstagramGrid({ images }: { images: string[] }) {
  return (
    <section className="py-20 lg:py-32">
      <Container size="wide">
        <SectionHeading
          eyebrow="@hebeibailin"
          title="Follow the Collection"
        />

        <div className="mt-12 grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 lg:mt-16 lg:grid-cols-6">
          {instagramPosts.map((post, index) => (
            <Reveal key={post.id} delay={(index % 6) * 0.06}>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-square overflow-hidden bg-warm"
              >
                <Image
                  src={images[index % images.length]}
                  alt={post.caption}
                  fill
                  sizes="(min-width: 1024px) 17vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all duration-500 group-hover:bg-ink/40 group-hover:opacity-100">
                  <Camera className="size-5 text-ivory" aria-hidden />
                  <span className="sr-only">View post: {post.caption}</span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-12 flex justify-center">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center gap-2.5 border border-line-strong px-9 font-sans text-[0.6875rem] tracking-luxe text-ink uppercase transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-ivory"
          >
            <ArrowUpRight className="size-3.5" aria-hidden />
            Follow Us
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
