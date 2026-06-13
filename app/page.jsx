import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StatsBar from '@/components/StatsBar';
import SelectedWork from '@/components/SelectedWork';
import Services from '@/components/Services';
import Process from '@/components/Process';
import About from '@/components/About';
import TechStack from '@/components/TechStack';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MotionProvider from '@/components/MotionProvider';

export default function Home() {
  return (
    <main>
      <MotionProvider />
      <Header />
      <Hero />
      <StatsBar />
      <SelectedWork />
      <Services />
      <Process />
      <About />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  );
}
