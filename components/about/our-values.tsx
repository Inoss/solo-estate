export function OurValues({ locale }: { locale: string }) {
  const values = [
    {
      title: 'Transparency',
      description: 'We believe in complete honesty and openness with our clients. No hidden fees, no unrealistic promises—just clear, factual information.'
    },
    {
      title: 'Excellence',
      description: 'We hold ourselves to the highest standards in property selection, client service, and market analysis.'
    },
    {
      title: 'Integrity',
      description: 'Your trust is our most valuable asset. We operate with unwavering ethical standards and put your interests first.'
    },
    {
      title: 'Innovation',
      description: 'We continuously improve our processes, leverage technology, and find new ways to deliver value to our clients.'
    }
  ]

  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-background rounded-xl p-8 border-l-4 border-accent">
                <h3 className="text-2xl font-bold mb-3 text-primary">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
