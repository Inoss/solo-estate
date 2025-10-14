export function AboutHero({ locale }: { locale: string }) {
  return (
    <section className="relative bg-gradient-to-br from-primary to-primary/80 text-white py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Trusted Partner in Georgian Real Estate
          </h1>
          <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
            We specialize in verified investment properties with transparent metrics,
            helping international investors build wealth through Georgian real estate.
          </p>
        </div>
      </div>

      {/* Decorative element */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
