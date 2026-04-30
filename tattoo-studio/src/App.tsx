import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';

import gustVideo from './assets/gust.mp4';
import backVideo from './assets/back.mp4';
import logo from './assets/logo.png';
import contactBackVideo from './assets/back2.mp4'; 

import destImg from './assets/dest.jpeg';
import recImg from './assets/rec.png';
import spaceImg from './assets/estudio.jpeg';
import perfil from './assets/perfil.png';

import img1 from './assets/img1.jpeg';
import img2 from './assets/img2.jpeg';
import img3 from './assets/img3.jpeg';
import img4 from './assets/img4.jpeg';
import img5 from './assets/img5.jpeg';
import img6 from './assets/img6.png';
import img7 from './assets/img7.png';

import gal1 from './assets/gal1.jpeg';
import gal2 from './assets/gal2.jpeg';
import gal3 from './assets/gal3.jpeg';
import gal4 from './assets/gal4.jpeg';
import gal5 from './assets/gal5.jpeg';
import gal6 from './assets/gal6.jpeg';
import gal7 from './assets/gal7.jpeg';
import gal8 from './assets/gal8.jpeg';
import gal9 from './assets/gal9.jpeg';
import gal10 from './assets/gal10.jpeg';
import gal11 from './assets/gal11.jpeg';
import gal12 from './assets/gal12.jpeg';
import gal13 from './assets/gal13.jpeg';
import gal14 from './assets/gal14.jpeg';
import gal15 from './assets/gal15.jpeg';

const heroElements = [
  { id: 1, src: img1, size: { width: '12rem', height: '16rem' }, top: "15vh", left: "10%", parallax: -150 },
  { id: 2, src: img2, size: { width: '14rem', height: '10rem' }, top: "35vh", left: "65%", parallax: 100 },
  { id: 3, src: img3, size: { width: '18rem', height: '14rem' }, top: "55vh", left: "20%", parallax: -200 },
  { id: 4, src: img4, size: { width: '12rem', height: '16rem' }, top: "75vh", left: "75%", parallax: 150 },
  { id: 5, src: img5, size: { width: '16rem', height: '12rem' }, top: "20vh", left: "40%", parallax: -50 },
  { id: 6, src: img6, size: { width: '10rem', height: '14rem' }, top: "90vh", left: "15%", parallax: -250 },
  { id: 7, src: img7, size: { width: '14rem', height: '18rem' }, top: "10vh", left: "80%", parallax: 200 },
];

const galleryData = [
  { id: 1, src: gal1, type: 'tatuagem' },
  { id: 2, src: gal2, type: 'tatuagem' },
  { id: 3, src: gal3, type: 'tatuagem' },
  { id: 4, src: gal4, type: 'geral' },
  { id: 5, src: gal5, type: 'tatuagem' },
  { id: 6, src: gal6, type: 'tatuagem' },
  { id: 7, src: gal7, type: 'geral' },
  { id: 8, src: gal8, type: 'tatuagem' },
  { id: 9, src: gal9, type: 'tatuagem' },
  { id: 10, src: gal10, type: 'geral' },
  { id: 11, src: gal11, type: 'tatuagem' },
  { id: 12, src: gal12, type: 'geral' },
  { id: 13, src: gal13, type: 'tatuagem' },
  { id: 14, src: gal14, type: 'tatuagem' },
  { id: 15, src: gal15, type: 'geral' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 150, filter: "blur(20px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 50, damping: 15 } }
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 40, damping: 20, delay: 0.8 } }
};

function LeafletMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (mapInstanceRef.current) return;

    const initMap = () => {
      const L = (window as any).L; 
      if (!L || !mapRef.current) return;

      const lat = -19.86997;
      const lng = -43.99384;

      const map = L.map(mapRef.current, {
        center: [lat, lng],
        zoom: 16,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
        attribution: '© Stadia Maps © OpenMapTiles © OpenStreetMap',
        maxZoom: 20,
      }).addTo(map);

      const icon = L.divIcon({
        className: '',
        html: `
          <div style="
            width: 16px; height: 16px;
            background: #E31C1C;
            border: 2px solid white;
            border-radius: 50%;
            box-shadow: 0 0 0 4px rgba(227,28,28,0.3);
          "></div>
        `,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      L.marker([lat, lng], { icon }).addTo(map);
      mapInstanceRef.current = map;
    };

    const L = (window as any).L;
    if (L) {
      initMap();
    } else {
      const interval = setInterval(() => {
        if ((window as any).L) {
          clearInterval(interval);
          initMap();
        }
      }, 100);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 0,
        filter: 'grayscale(30%) contrast(1.1)',
      }}
    />
  );
}

function Gallery({ onBack }: { onBack: () => void }) {
  const [filter, setFilter] = useState('tudo');
  const heroRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const bgX = useTransform(springX, [0, 1], ['-3%', '3%']);
  const bgY = useTransform(springY, [0, 1], ['-3%', '3%']);
  const fgX = useTransform(springX, [0, 1], ['4%', '-4%']);
  const fgY = useTransform(springY, [0, 1], ['4%', '-4%']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const filteredImages = filter === 'tudo' 
    ? galleryData 
    : galleryData.filter(img => img.type === filter);

  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', width: '100vw' }}>
      <style>{`
        .heavy-street-font {
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-style: italic;
          font-weight: 900;
          text-transform: uppercase;
        }

        .glitch-effect {
          transition: filter 0.1s;
        }
        .glitch-effect:hover {
          animation: glitch-anim 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
          filter: drop-shadow(3px 0 0 red) drop-shadow(-3px 0 0 cyan);
        }

        @keyframes glitch-anim {
          0% { transform: translate(0) skew(0deg); }
          20% { transform: translate(-2px, 2px) skew(2deg); }
          40% { transform: translate(-2px, -2px) skew(-2deg); }
          60% { transform: translate(2px, 2px) skew(2deg); }
          80% { transform: translate(2px, -2px) skew(-2deg); }
          100% { transform: translate(0) skew(0deg); }
        }

        .wave-bg {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          z-index: 0;
          background-image: repeating-radial-gradient(
            circle at 50% 150%, 
            transparent 0, 
            transparent 15px, 
            rgba(255,255,255,0.2) 16px, 
            rgba(255,255,255,0.2) 17px
          );
          animation: wave-move 20s linear infinite;
        }

        @keyframes wave-move {
          0% { background-position: 0 0; }
          100% { background-position: 0 -100px; }
        }

        .masonry-grid {
          column-count: 3;
          column-gap: 1.5rem;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }
        @media (max-width: 1024px) { .masonry-grid { column-count: 2; } }
        @media (max-width: 640px) { .masonry-grid { column-count: 1; } }

        .masonry-item {
          break-inside: avoid;
          margin-bottom: 1.5rem;
          position: relative;
        }

        .gallery-img {
          width: 100%;
          display: block;
          filter: grayscale(100%) contrast(1.2) brightness(0.7);
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border: 2px solid #1a1a1a;
          cursor: pointer;
        }
        .masonry-item:hover .gallery-img {
          filter: grayscale(0%) contrast(1.1) brightness(1);
          transform: scale(1.02);
          box-shadow: 12px 12px 0px #E31C1C;
          border-color: #E31C1C;
          z-index: 2;
        }

        .tape-filter {
          position: relative;
          background: #d4d4d4;
          color: #000;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          font-size: 1.2rem;
          text-transform: uppercase;
          padding: 0.5rem 2rem;
          border: none;
          cursor: pointer;
          transform: rotate(-2deg);
          box-shadow: 2px 2px 5px rgba(0,0,0,0.5);
          transition: all 0.3s ease;
          clip-path: polygon(2% 0%, 98% 2%, 100% 98%, 0% 100%);
        }
        .tape-filter:hover {
          transform: rotate(0deg) scale(1.05);
          background: #fff;
        }
        
        .tape-filter.active {
          background: #000;
          color: #E31C1C;
          border: 2px solid #E31C1C;
          box-shadow: 0 0 15px rgba(227,28,28,0.6), inset 0 0 10px rgba(227,28,28,0.4);
          text-shadow: 0 0 5px #E31C1C;
          clip-path: polygon(0% 2%, 100% 0%, 98% 98%, 2% 100%);
          transform: rotate(1deg);
        }
        
        .back-button {
          position: absolute;
          top: 2rem;
          left: 2rem;
          z-index: 1001;
          background: transparent;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 0.5rem 1rem;
          font-family: monospace;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
        }
        .back-button:hover {
          background: #E31C1C;
          border-color: #E31C1C;
        }
      `}</style>

      <button onClick={onBack} className="back-button">
        &larr; Voltar
      </button>

      <div style={{ position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
        <img src={logo} alt="Logo" style={{ height: '3.5rem', width: 'auto' }} />
      </div>

      <section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <motion.div 
          style={{
            position: 'absolute', inset: -50,
            x: bgX, y: bgY,
            backgroundImage: `url(${destImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'contrast(0.8) brightness(0.4)',
            zIndex: 1
          }}
        />

        <div style={{ position: 'absolute', zIndex: 2, textAlign: 'center', pointerEvents: 'none' }}>
          <h1 className="heavy-street-font" style={{ fontSize: 'clamp(5rem, 15vw, 15rem)', margin: 0, color: 'transparent', WebkitTextStroke: '2px rgba(255,255,255,0.1)' }}>
            RUSS INK
          </h1>
        </div>

        <motion.div 
          className="glitch-effect"
          style={{
            position: 'absolute',
            bottom: '-15vh',
            height: '135vh',
            x: fgX, y: fgY,
            zIndex: 3,
            pointerEvents: 'none'
          }}
        >
          <img 
            src={recImg} 
            alt="Artista" 
            style={{ height: '100%', width: 'auto', objectFit: 'contain', filter: 'drop-shadow(0 30px 50px rgba(0,0,0,0.8))' }} 
          />
        </motion.div>

        <div style={{ position: 'absolute', bottom: '10%', left: '5%', zIndex: 4, pointerEvents: 'none' }}>
          <h2 className="heavy-street-font" style={{ fontSize: 'clamp(3rem, 6vw, 6rem)', margin: 0, lineHeight: 0.9 }}>
            THE <br/> <span style={{ color: '#E31C1C' }}>GALERY</span>
          </h2>
        </div>
      </section>

      <section style={{ position: 'relative', minHeight: '100vh', padding: '6rem 2rem', backgroundColor: '#0c0c0c', overflow: 'hidden' }}>
        
        <div className="wave-bg" />
        <div style={{ position: 'absolute', inset: 0, opacity: 0.05, backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)', zIndex: 1, pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', marginBottom: '4rem' }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <button 
                className={`tape-filter ${filter === 'tudo' ? 'active' : ''}`}
                onClick={() => setFilter('tudo')}
              >
                Geral
              </button>
              <button 
                className={`tape-filter ${filter === 'tatuagem' ? 'active' : ''}`}
                onClick={() => setFilter('tatuagem')}
                style={{ transform: filter === 'tatuagem' ? 'rotate(1deg)' : 'rotate(3deg)' }}
              >
                Tatuagens
              </button>
            </div>
          </div>

          <motion.div layout className="masonry-grid">
            {filteredImages.map((img) => (
              <motion.div 
                layout 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                key={img.id} 
                className="masonry-item"
              >
                <img 
                  src={img.src} 
                  alt={`Galeria ${img.id}`} 
                  className="gallery-img"
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [showGallery, setShowGallery] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [totalScroll, setTotalScroll] = useState(1);
  
  const contactCardRef = useRef<HTMLDivElement>(null);

  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const rotateX = useSpring(useTransform(yValue, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 20 });
  const rotateY = useSpring(useTransform(xValue, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 20 });

  const glowSpringX = useSpring(glowX, { stiffness: 150, damping: 15 });
  const glowSpringY = useSpring(glowY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    if (!showGallery) {
      setTotalScroll(window.innerHeight * 5);
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [showGallery]);

  if (showGallery) {
    return <Gallery onBack={() => setShowGallery(false)} />;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!contactCardRef.current) return;
    const rect = contactCardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    
    xValue.set(mouseX);
    yValue.set(mouseY);

    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    xValue.set(0);
    yValue.set(0);
  };

  const progress = Math.min(Math.max(scrollY / totalScroll, 0), 1);

  const section1Opacity = progress < 0.05 ? 1 : progress > 0.25 ? 0 : 1 - (progress - 0.05) / 0.20;
  const titleY = progress * 120;
  const section2Opacity = progress < 0.15 ? 0 
    : progress > 0.25 ? (progress > 0.45 ? Math.max(0, 1 - (progress - 0.45) / 0.10) : 1) 
    : (progress - 0.15) / 0.10;
  const section3Opacity = progress < 0.35 ? 0 
    : progress > 0.45 ? (progress > 0.65 ? Math.max(0, 1 - (progress - 0.65) / 0.10) : 1) 
    : (progress - 0.35) / 0.10;
  const section4Opacity = progress < 0.55 ? 0 
    : progress > 0.65 ? (progress > 0.85 ? Math.max(0, 1 - (progress - 0.85) / 0.10) : 1) 
    : (progress - 0.55) / 0.10;
  const section5Opacity = progress < 0.75 ? 0 : progress > 0.85 ? 1 : (progress - 0.75) / 0.10;

  return (
    <>
      <style>{`
        body { overflow-x: hidden; margin: 0; padding: 0; background-color: #000; }
        .leaflet-container { background: #09090b !important; }
        .leaflet-tile { filter: grayscale(20%); }
        .leaflet-control-zoom a {
          background: #1a1a1a !important;
          color: #fff !important;
          border-color: #2a2a2a !important;
        }
        .leaflet-control-attribution { display: none !important; }
        .contact-box { perspective: 1000px; }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .street-marquee {
          display: flex;
          white-space: nowrap;
          animation: marquee 30s linear infinite;
        }
      `}</style>

      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />

      <div style={{ height: '600vh', backgroundColor: '#000', color: '#fff' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

          <div style={{ position: 'absolute', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
            <img src={logo} alt="Logo" style={{ height: '3.5rem', width: 'auto' }} />
          </div>

          <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: section1Opacity > 0.5 ? 'auto' : 'none', opacity: section1Opacity }}>
            <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3, zIndex: 0 }}>
              <source src={backVideo} type="video/mp4" />
            </video>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
              <motion.div variants={titleVariants} style={{ position: 'absolute', top: '35vh', left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '0 1rem', transform: `translateY(${titleY}px)`, zIndex: 10 }}>
                <h1 style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.04em', color: '#fafafa', lineHeight: 1, margin: 0 }}>
                  RUSS <span style={{ color: '#E31C1C' }}>INK</span>
                </h1>
                <p style={{ marginTop: '1.5rem', fontSize: '1.25rem', fontFamily: 'monospace', color: '#71717a', maxWidth: '36rem' }}>
                  Onde a arte encontra a pele. Prepare-se pra deixar sua marca.
                </p>
              </motion.div>
              {heroElements.map((el) => (
                <motion.div key={el.id} variants={itemVariants} style={{ position: 'absolute', width: el.size.width, height: el.size.height, top: el.top, left: el.left, transform: `translateY(${scrollY * (el.parallax / totalScroll)}px)` }}>
                  <img src={el.src} alt="Tattoo" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2rem', boxShadow: '0 25px 50px rgba(0,0,0,0.5)' }} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div style={{ position: 'absolute', inset: 0, zIndex: 20, opacity: section2Opacity, pointerEvents: section2Opacity > 0.5 ? 'auto' : 'none', backgroundColor: '#09090b', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: '100%', height: '55vh', flexShrink: 0, overflow: 'hidden', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45, filter: 'grayscale(100%)' }}>
                <source src={gustVideo} type="video/mp4" />
              </video>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(9,9,11,0.05) 50%, #09090b 100%)' }} />
              <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                <span style={{ display: 'block', width: '2.5rem', height: '1px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
                <h2 style={{ margin: 0, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '0.6em', textTransform: 'uppercase', color: 'white' }}>Artists</h2>
              </div>
            </div>
            <div style={{ position: 'relative', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#09090b', boxSizing: 'border-box', paddingTop: '3rem' }}>
              <div style={{ position: 'absolute', top: '-7rem', left: '50%', transform: 'translateX(-50%)', width: '14rem', height: '14rem', overflow: 'hidden', border: '1px solid #2a2a2a', zIndex: 60, boxShadow: '0 30px 80px rgba(0,0,0,0.95)' }}>
                <img src={perfil} alt="Gustavo Silva" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)', transition: 'filter 0.6s ease' }} onMouseEnter={e => e.target.style.filter = 'grayscale(0%)'} onMouseLeave={e => e.target.style.filter = 'grayscale(100%)'} />
              </div>
              <h3 style={{ margin: '0 0 0.5rem', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffffff' }}>Gustavo Silva</h3>
              <span style={{ display: 'block', width: '3rem', height: '1px', backgroundColor: '#E31C1C', marginBottom: '0.75rem' }} />
              <p style={{ margin: '0 0 2rem', fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#E31C1C' }}>Tatuador / Fundador</p>
              
              <button 
                onClick={() => setShowGallery(true)}
                style={{ border: '1px solid #2a2a2a', background: 'transparent', color: '#a1a1aa', padding: '0.85rem 3.5rem', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.4s ease' }} 
                onMouseEnter={e => { e.target.style.background = 'white'; e.target.style.color = 'black'; e.target.style.borderColor = 'white'; }} 
                onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#a1a1aa'; e.target.style.borderColor = '#2a2a2a'; }}
              >
                Saiba Mais
              </button>
            </div>
          </div>

          <div style={{ 
            position: 'absolute', inset: 0, zIndex: 30, opacity: section3Opacity, 
            pointerEvents: section3Opacity > 0.5 ? 'auto' : 'none', 
            backgroundColor: '#050505', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url(https://grainy-gradients.vercel.app/noise.svg)' }} />
            
            <div style={{ position: 'absolute', top: '25%', left: 0, width: '200%', transform: 'rotate(-5deg)', zIndex: 0 }}>
              <div className="street-marquee">
                <span style={{ fontSize: '15vw', fontWeight: 900, color: 'rgba(255,255,255,0.03)', textTransform: 'uppercase', paddingRight: '2rem' }}>
                  UNDERGROUND x CULTURE x RUSS INK x STREET ART x
                </span>
                <span style={{ fontSize: '15vw', fontWeight: 900, color: 'rgba(255,255,255,0.03)', textTransform: 'uppercase', paddingRight: '2rem' }}>
                  UNDERGROUND x CULTURE x RUSS INK x STREET ART x
                </span>
              </div>
            </div>

            <div style={{ position: 'absolute', top: '65%', left: 0, width: '200%', transform: 'rotate(2deg)', zIndex: 0 }}>
              <div className="street-marquee" style={{ animationDirection: 'reverse', animationDuration: '40s' }}>
                <span style={{ fontSize: '12vw', fontWeight: 900, color: 'transparent', WebkitTextStroke: '2px rgba(227,28,28,0.1)', textTransform: 'uppercase', paddingRight: '2rem' }}>
                  NO RULES x ONLY INK x NO RULES x ONLY INK x 
                </span>
                <span style={{ fontSize: '12vw', fontWeight: 900, color: 'transparent', WebkitTextStroke: '2px rgba(227,28,28,0.1)', textTransform: 'uppercase', paddingRight: '2rem' }}>
                  NO RULES x ONLY INK x NO RULES x ONLY INK x 
                </span>
              </div>
            </div>

            <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10, padding: '0 5%' }}>
              <div style={{ position: 'absolute', left: '8%', top: '50%', transform: 'translateY(-50%)', zIndex: 20, pointerEvents: 'none' }}>
                <h2 style={{ fontSize: 'clamp(4rem, 10vw, 9rem)', margin: 0, lineHeight: 0.85, color: 'transparent', WebkitTextStroke: '2px #fff', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
                  THE<br/>
                  <span style={{ color: '#E31C1C', WebkitTextStroke: '0' }}>SPACE</span>
                </h2>
                <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ display: 'block', width: '3rem', height: '2px', backgroundColor: '#fff' }} />
                  <p style={{ margin: 0, fontFamily: 'monospace', color: '#a1a1aa', maxWidth: '300px', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Nosso local.<br/>Venha conhecer nosso estúdio pessoalmente.
                  </p>
                </div>
              </div>

              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                style={{
                  position: 'absolute', right: '12%', top: '45%', 
                  y: '-50%',
                  width: '40vw', maxWidth: '450px', aspectRatio: '4/5',
                  border: '3px solid #1f1f1f', padding: '0.75rem', backgroundColor: '#000',
                  zIndex: 15,
                  boxShadow: '20px 20px 0px #E31C1C' 
                }}
              >
                <div style={{ position: 'absolute', top: '-15px', left: '50%', width: '120px', height: '35px', backgroundColor: 'rgba(255,255,255,0.8)', transform: 'rotate(-4deg) translateX(-50%)', zIndex: 20, mixBlendMode: 'screen' }} />
                <img 
                  src={spaceImg} 
                  alt="Studio Space" 
                  style={{ 
                    width: '100%', height: '100%', objectFit: 'cover', 
                    filter: 'grayscale(100%) contrast(1.2)', transition: 'filter 0.5s ease' 
                  }} 
                  onMouseEnter={e => e.target.style.filter = 'grayscale(0%) contrast(1.1)'}
                  onMouseLeave={e => e.target.style.filter = 'grayscale(100%) contrast(1.2)'}
                />
                <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', backgroundColor: '#fff', color: '#000', padding: '0.5rem 1rem', fontFamily: 'monospace', fontWeight: 'bold', border: '2px solid #000', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  STUDIO. 2026 // BH
                </div>
              </motion.div>
            </div>
          </div>

          <div style={{ position: 'absolute', inset: 0, zIndex: 40, opacity: section4Opacity, pointerEvents: section4Opacity > 0.5 ? 'auto' : 'none', backgroundColor: '#09090b', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', width: '100%', height: '35vh', flexShrink: 0, overflow: 'hidden', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1600" alt="Location background" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35, filter: 'grayscale(100%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(9,9,11,0.1) 50%, #09090b 100%)' }} />
              <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
                <span style={{ display: 'block', width: '2.5rem', height: '1px', backgroundColor: 'rgba(255,255,255,0.4)' }} />
                <h2 style={{ margin: 0, fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 200, letterSpacing: '0.6em', textTransform: 'uppercase', color: 'white' }}>Location</h2>
              </div>
            </div>
            <div style={{ position: 'relative', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#09090b', gap: '1.5rem', padding: '1rem 2rem 2rem', boxSizing: 'border-box' }}>
              <div style={{ width: '100%', maxWidth: '52rem', height: '100%', maxHeight: '32rem', border: '1px solid #1f1f1f', overflow: 'hidden', flexShrink: 1 }}>
                <LeafletMap />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ display: 'block', width: '2rem', height: '1px', backgroundColor: '#E31C1C' }} />
                <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.75rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#a1a1aa', textAlign: 'center' }}>
                  R. Póvoa de Varzim, 240 — Paquetá, Belo Horizonte
                </p>
              </div>
            </div>
          </div>

          <div style={{ 
            position: 'absolute', inset: 0, zIndex: 50, 
            opacity: section5Opacity, pointerEvents: section5Opacity > 0.5 ? 'auto' : 'none',
            backgroundColor: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden'
          }} className="contact-box">

            <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.15, zIndex: 0 }}>
              <source src={contactBackVideo} type="video/mp4" />
            </video>

            <motion.div 
              ref={contactCardRef}
              style={{
                position: 'relative', zIndex: 10,
                width: '90%', maxWidth: '52rem',
                padding: '5rem 3rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem',
                backgroundColor: 'rgba(255, 255, 255, 0.01)',
                backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                borderRadius: '24px', border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 50px 100px rgba(0,0,0,0.6)',
                overflow: 'hidden',
                rotateX: rotateX, rotateY: rotateY,
                transformStyle: 'preserve-3d',
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >

              <motion.div style={{
                position: 'absolute', top: 0, left: 0,
                width: '400px', height: '400px',
                background: 'radial-gradient(circle, rgba(227,28,28,0.8) 0%, rgba(227,28,28,0) 70%)',
                borderRadius: '50%', filter: 'blur(60px)', zIndex: -1,
                x: glowSpringX, y: glowSpringY,
                translateX: '-50%', translateY: '-50%',
                pointerEvents: 'none'
              }} />

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', transform: 'translateZ(50px)' }}>
                <h2 style={{ margin: 0, fontSize: 'clamp(2rem, 4vw, 2.5rem)', fontWeight: 300, letterSpacing: '0.5em', textTransform: 'uppercase', color: 'white' }}>
                  Contact
                </h2>
                <span style={{ display: 'block', width: '4rem', height: '3px', backgroundColor: '#E31C1C' }} />
              </div>

              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '2.5rem', width: '100%', transform: 'translateZ(30px)' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '0.15em', color: '#fff' }}>RUSS INK</h3>
                  <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '1rem', color: '#a1a1aa', letterSpacing: '0.05em', lineHeight: 1.6 }}>
                    Não deixe de fazer o seu agendamento!<br/>E veja mais detalhes em nosso Instagram.
                  </p>
                </div>

                <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%', alignItems: 'center' }}>
                  
                  <motion.a 
                    href="https://wa.me/553198127551" 
                    target="_blank" rel="noreferrer"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem',
                      width: '100%', maxWidth: '24rem', padding: '1.25rem',
                      backgroundColor: '#E31C1C', color: '#fff', textDecoration: 'none',
                      borderRadius: '16px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontSize: '1rem',
                      boxShadow: '0 15px 30px rgba(227,28,28,0.4)', transition: 'all 0.3s ease'
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                    </svg>
                    Agendar Horário
                  </motion.a>

                  <motion.a 
                    href="https://instagram.com/russ__ink" 
                    target="_blank" rel="noreferrer"
                    whileHover={{ color: '#fff', borderColor: 'rgba(255,255,255,0.5)', scale: 1.02 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                      width: '100%', maxWidth: '24rem', padding: '1.1rem',
                      background: 'transparent', color: '#a1a1aa', textDecoration: 'none',
                      borderRadius: '16px', border: '1px solid rgba(255,255,255,0.15)',
                      fontFamily: 'monospace', fontSize: '1rem', letterSpacing: '0.12em', transition: 'all 0.3s ease'
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                    @russ__ink
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </>
  );
}