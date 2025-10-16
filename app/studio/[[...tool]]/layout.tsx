export const metadata = {
  title: 'SOLO Estate CMS - Admin Panel',
  description: 'Content Management System for SOLO Estate',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
