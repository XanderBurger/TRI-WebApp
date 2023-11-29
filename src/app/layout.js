import './globals.css'


export const metadata = {
  title: 'Toxic Release Inventory',
  description: 'Data Design',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={"bg-black-green"}>{children}</body>
    </html>
  )
}
