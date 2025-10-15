export function BackgroundDecoration({ variant = 'default' }: { variant?: 'default' | 'accent' | 'minimal' }) {
  if (variant === 'minimal') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="geometric-circle w-64 h-64 bg-accent top-10 -right-32 float-slow" />
        <div className="geometric-circle w-96 h-96 bg-primary bottom-20 -left-48 float-medium" />
      </div>
    )
  }

  if (variant === 'accent') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="geometric-circle w-72 h-72 bg-accent top-20 right-10 float-slow" />
        <div className="geometric-circle w-48 h-48 bg-accent bottom-40 left-20 float-medium" />
        <div className="geometric-square w-32 h-32 bg-primary top-1/2 right-1/4" />
        <div className="geometric-square w-24 h-24 bg-accent bottom-1/4 left-1/3 float-slow" />
      </div>
    )
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="geometric-circle w-96 h-96 bg-accent -top-48 -right-48 float-slow" />
      <div className="geometric-circle w-64 h-64 bg-primary top-1/3 -left-32 float-medium" />
      <div className="geometric-circle w-48 h-48 bg-accent bottom-20 right-1/4" />
      <div className="geometric-square w-40 h-40 bg-accent top-1/4 right-1/3 float-slow" />
      <div className="geometric-square w-28 h-28 bg-primary bottom-1/3 left-1/4" />
    </div>
  )
}
