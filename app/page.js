'use client'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Categories from './components/Categories'
import Products from './components/Products'
import Footer from './components/Footer'
import VRFloatingButton from './components/VRFloatingButton'

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