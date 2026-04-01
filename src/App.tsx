import { useState, useEffect } from 'react'
import { Mail, Phone, ChevronLeft, ChevronRight, Users } from 'lucide-react'
import { SITE_DATA } from './types'

const ACCENT = '#FF385C'

const ROOM_GALLERY: Record<string, number[]> = {
  'Living Room': [10, 11, 12],
  'Bedroom':     [13, 14, 15],
  'Kitchen':     [16, 17, 18],
  'Bathroom':    [19, 20, 21],
  'Bath':        [22, 23, 24],
  'Balcony':     [25, 26, 27],
  'Street View': [28, 29, 30],
}

const HERO_SEEDS = [1, 31, 32, 33]

function picsum(seed: number, w = 800, h = 600): string {
  return `https://picsum.photos/${w}/${h}?random=${seed}`
}

function HeroCarousel() {
  const { siteName, currency, properties } = SITE_DATA
  const prop = properties[0] as any
  const [idx, setIdx] = useState(0)
  const n = HERO_SEEDS.length

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % n), 5000)
    return () => clearInterval(t)
  }, [n])

  return (
    <div className="relative overflow-hidden" style={{ height: '520px', marginTop: '64px' }}>
      {HERO_SEEDS.map((seed, i) => (
        <img
          key={seed}
          src={picsum(seed, 1600, 900)}
          alt={siteName}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: i === idx ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl sm:text-5xl font-bold drop-shadow-lg mb-2">{prop.name || siteName}</h1>
        {prop.pricePerNight && (
          <p className="text-2xl font-semibold mt-2 drop-shadow" style={{ color: ACCENT }}>
            {currency}{prop.pricePerNight}<span className="text-lg font-normal text-white/80">/night</span>
          </p>
        )}
        {prop.location && <p className="text-white/75 mt-2">{prop.location}</p>}
      </div>
      <button
        onClick={() => setIdx(i => (i - 1 + n) % n)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>
      <button
        onClick={() => setIdx(i => (i + 1) % n)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_SEEDS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className="w-2 h-2 rounded-full transition-colors"
            style={{ background: i === idx ? ACCENT : 'rgba(255,255,255,0.6)' }}
          />
        ))}
      </div>
    </div>
  )
}

function GallerySection() {
  const rooms = Object.keys(ROOM_GALLERY)
  const [activeRoom, setActiveRoom] = useState(rooms[0])
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => { setImgIdx(0) }, [activeRoom])

  const seeds = ROOM_GALLERY[activeRoom]
  const n = seeds.length

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Photo Gallery</h2>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4" style={{ scrollbarWidth: 'none' }}>
        {rooms.map(room => (
          <button
            key={room}
            onClick={() => setActiveRoom(room)}
            className="px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-colors border"
            style={activeRoom === room
              ? { background: ACCENT, color: '#fff', borderColor: ACCENT }
              : { background: '#fff', color: '#6b7280', borderColor: '#e5e7eb' }
            }
          >
            {room}
          </button>
        ))}
      </div>
      <div className="relative overflow-hidden rounded-xl" style={{ height: '400px' }}>
        {seeds.map((seed, i) => (
          <img
            key={seed}
            src={picsum(seed)}
            alt={`${activeRoom} ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: i === imgIdx ? 1 : 0 }}
          />
        ))}
        <button
          onClick={() => setImgIdx(i => (i - 1 + n) % n)}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <button
          onClick={() => setImgIdx(i => (i + 1) % n)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {seeds.map((_, i) => (
            <button
              key={i}
              onClick={() => setImgIdx(i)}
              className="w-2 h-2 rounded-full transition-colors"
              style={{ background: i === imgIdx ? ACCENT : 'rgba(255,255,255,0.6)' }}
            />
          ))}
        </div>
      </div>
      <p className="text-center text-sm text-gray-500 mt-3 font-medium">{activeRoom}</p>
    </section>
  )
}

function BookingCard() {
  const { currency, properties } = SITE_DATA
  const prop = properties[0] as any
  return (
    <div className="border border-gray-200 rounded-2xl shadow-lg p-6 sticky top-20">
      {prop.pricePerNight && (
        <div className="text-2xl font-bold text-gray-900 mb-1">
          <span style={{ color: ACCENT }}>{currency}{prop.pricePerNight}</span>
          <span className="text-base font-normal text-gray-500">/night</span>
        </div>
      )}
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-5">
        {prop.bedrooms && <span>{prop.bedrooms} bed{prop.bedrooms !== 1 ? 's' : ''}</span>}
        {prop.maxGuests && (
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" /> up to {prop.maxGuests}
          </span>
        )}
      </div>
      <a
        href="#contact"
        className="block w-full text-center text-white font-semibold py-3 px-6 rounded-xl transition-opacity hover:opacity-90 mb-3"
        style={{ background: ACCENT }}
      >
        Book Now
      </a>
      <p className="text-center text-gray-400 text-xs">No charge until you confirm</p>
    </div>
  )
}

export default function App() {
  const { siteName, contactEmail, contactPhone, currency, properties } = SITE_DATA
  const prop = properties[0] as any

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <span className="font-semibold text-gray-900 text-lg">{siteName}</span>
          <a href={`mailto:${contactEmail}`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
            {contactEmail}
          </a>
          <a
            href="#contact"
            className="text-sm text-white font-medium px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
            style={{ background: ACCENT }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* Hero */}
      <HeroCarousel />

      {/* Gallery */}
      <GallerySection />

      {/* Main 2-col */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-8 border-t border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{prop.name || siteName}</h2>
              {prop.location && <p className="text-gray-500 text-sm mt-1">{prop.location}</p>}
            </div>
            <hr className="border-gray-100" />
            {prop.description && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About this space</h3>
                <p className="text-gray-600 leading-relaxed">{prop.description}</p>
              </div>
            )}
            {prop.amenities && prop.amenities.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {prop.amenities.map((a: string) => (
                    <span key={a} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">{a}</span>
                  ))}
                </div>
              </div>
            )}
            {prop.location && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                <p className="text-gray-600">{prop.location}</p>
              </div>
            )}
          </div>
          <div className="lg:col-span-1">
            <BookingCard />
          </div>
        </div>
      </section>

      {/* Additional properties */}
      {properties.length > 1 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 border-t border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">More Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(properties as any[]).slice(1).map((p: any, i: number) => (
              <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img src={`https://picsum.photos/800/600?random=${40 + i}`} alt={p.name} className="w-full h-44 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{p.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{p.location}</p>
                  {p.pricePerNight && (
                    <span className="font-bold text-gray-900">
                      {currency}{p.pricePerNight}
                      <span className="text-gray-400 text-sm font-normal">/night</span>
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="contact" className="bg-gray-50 py-16 mt-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Get in Touch</h2>
          <p className="text-gray-500 mb-8">Ready to book? Reach out and we'll get back to you quickly.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-2 text-white font-medium px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
              style={{ background: ACCENT }}
            >
              <Mail className="w-4 h-4" /> {contactEmail}
            </a>
            {contactPhone && (
              <a
                href={`tel:${contactPhone}`}
                className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-medium px-6 py-3 rounded-xl transition-colors"
              >
                <Phone className="w-4 h-4" /> {contactPhone}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <span className="text-gray-200 font-medium">{siteName}</span>
          <span>Generated by <a href="https://mcp.clawshow.ai" className="hover:text-gray-200 transition-colors">ClawShow</a></span>
        </div>
      </footer>

    </div>
  )
}
