import { TopBar } from "@/components/top-bar";
import { Footer } from "@/components/footer";
import { SeoContent } from "@/components/seo-content";
import { GeoContent } from "@/components/geo-content";
import { ProfessionalUseCases } from "@/components/professional-use-cases";
import { ResolverClient } from "@/components/resolver-client";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-200">
      <TopBar />
      <main id="main-content" className="flex-1">
        <section
          className="text-center"
          style={{ backgroundColor: '#2a2825', padding: '80px 24px 64px' }}
        >
          <div className="max-w-2xl mx-auto">
            <h1
              className="font-display text-4xl sm:text-5xl mb-4"
              style={{ color: '#f5f0e8' }}
            >
              Understand any time reference
            </h1>
            <p
              className="text-lg mb-10 mx-auto"
              style={{ color: '#a09890', maxWidth: '480px' }}
            >
              Paste ambiguous abbreviations, relative expressions, or Unix timestamps.
              Get a plain-English interpretation with every assumption shown.
            </p>
            <ResolverClient />
          </div>
        </section>
        <div
          style={{ backgroundColor: '#fafaf6', padding: '64px 24px' }}
          className="dark:bg-background"
        >
          <div className="max-w-[900px] mx-auto">
            <SeoContent />
            <GeoContent />
            <ProfessionalUseCases />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
