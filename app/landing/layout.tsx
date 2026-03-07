import Footer from '../components/Footer'
import Background from '../components/Background'

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Background />
      </div>
      <div className="relative z-10">
        {children}
        <Footer />
      </div>
    </div>
  )
}
