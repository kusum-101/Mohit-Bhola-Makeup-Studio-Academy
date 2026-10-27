import { useMemo, useState } from 'react';
import { About } from './components/About';
import { Academy } from './components/Academy';
import { Bridal } from './components/Bridal';
import { Contact } from './components/Contact';
import { EnquiryModal } from './components/EnquiryModal';
import { CtaBand, FloatingContact, Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero, Marquee } from './components/Hero';
import { Instagram } from './components/Instagram';
import { Portfolio } from './components/Portfolio';
import { Reviews } from './components/Reviews';
import { Services } from './components/Services';
import { EnquiryContext } from './lib/enquiry';
import { useReveal } from './lib/useReveal';

export default function App() {
  const [modal, setModal] = useState<{ open: boolean; interest: string }>({ open: false, interest: '' });
  const api = useMemo(() => ({ open: (interest = '') => setModal({ open: true, interest }) }), []);
  useReveal();

  return (
    <EnquiryContext.Provider value={api}>
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Bridal />
        <Academy />
        <Portfolio />
        <Reviews />
        <Instagram />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <FloatingContact />
      <EnquiryModal open={modal.open} interest={modal.interest} onClose={() => setModal((m) => ({ ...m, open: false }))} />
    </EnquiryContext.Provider>
  );
}
