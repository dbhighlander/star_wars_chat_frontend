import Chat from './chat/chat';
import Background from './page/Background';
import HeroSection from './page/sections/HeroSection';
import InfoSection from './page/sections/InfoSection';
import CTASection from './page/sections/CTASection';

export default async function Home() {

  
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <Background />

      <main className="relative z-10 h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        
        <HeroSection />
        <InfoSection />
        <CTASection />
        <Chat />

      </main>

    </div>
  );
}
