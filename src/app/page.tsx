import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import GradientBlobs from '@/components/GradientBlobs';
import LenisProvider from '@/components/LenisProvider';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import StoryScroll from '@/components/StoryScroll';
import Services from '@/components/Services';
import Process from '@/components/Process';
import HorizonIndex from '@/components/HorizonIndex';
import ProjectIndex from '@/components/ProjectIndex';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />
      <GradientBlobs />
      <LenisProvider>
        <Header />
        <main>
          <Hero />
          <StoryScroll />
          <Services />
          <Process />
          <HorizonIndex />
          <ProjectIndex />
          <About />
          <Contact />
        </main>
        <Footer />
      </LenisProvider>
    </>
  );
}
