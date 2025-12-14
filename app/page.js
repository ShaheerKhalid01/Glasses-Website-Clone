'use client'
import dynamic from 'next/dynamic'
import Header from './components/Header'
import Hero from './components/Hero'

// Optimizing performance: Lazy load below-the-fold components
// Imports fixed to point to root 'components' folder relative to 'app/page.js'
const Features = dynamic(() => import('./components/Features'))
const Categories = dynamic(() => import('./components/Categories'))
const Products = dynamic(() => import('./components/Products'))
const Footer = dynamic(() => import('./components/Footer'))

// Load VR Button only on client side to avoid hydration issues and speed up initial HTML
const VRFloatingButton = dynamic(() => import('./components/VRFloatingButton'), { ssr: false })

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <Categories />
      <Products />
      <Footer />
      <VRFloatingButton />
    </main>
  )
}
