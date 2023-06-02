import './globals.css'


export const metadata = {
  title: 'Casual Games',
  description: 'Play Casual Games in Browser',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
