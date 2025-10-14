export function Statistics({ locale }: { locale: string }) {
  const stats = [
    {
      value: '$50M+',
      label: 'Properties Sold',
      description: 'Total value of investment properties facilitated'
    },
    {
      value: '500+',
      label: 'Happy Investors',
      description: 'Satisfied clients from around the world'
    },
    {
      value: '12.5%',
      label: 'Average ROI',
      description: 'Average annual return on investment'
    },
    {
      value: '100+',
      label: 'Active Projects',
      description: 'Verified properties available for investment'
    }
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Track Record</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Numbers that speak to our commitment to excellence and client success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-xl font-semibold mb-2">
                {stat.label}
              </div>
              <p className="text-sm text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
