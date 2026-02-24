"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CardSwiper } from "@/components/ui/card-swiper";

// ── DADOS DOS SERVIÇOS ──
const services = [
  { id: 1, order: 0, x: "-320px", y: "40px", rotate: -12, zIndex: 10, title: 'Automação & Bots', description: 'Fluxos n8n e chatbots transformando atendimento manual em automático.', src: 'https://i.postimg.cc/rFDtcJXt/BOT.webp' },
  { id: 2, order: 1, x: "-160px", y: "-30px", rotate: 8, zIndex: 40, title: 'Inteligência Artificial', description: 'Agentes inteligentes para otimizar atendimento e decisões empresariais.', src: 'https://i.postimg.cc/gkx6dDF3/IA.webp' },
  { id: 3, order: 2, x: "0px", y: "50px", rotate: -6, zIndex: 20, title: 'Engenharia de Software', description: 'Sistemas sob medida e ferramentas web de alta performance.', src: 'https://i.postimg.cc/SNnzqrF8/PROGRAMACAO.webp' },
  { id: 4, order: 3, x: "160px", y: "-40px", rotate: 14, zIndex: 15, title: 'Cloud & M365', description: 'Arquitetura em nuvem e gestão Microsoft 365 para eficiência.', src: 'https://i.postimg.cc/sDbG2hsS/M365.webp' },
  { id: 5, order: 4, x: "320px", y: "20px", rotate: -16, zIndex: 50, title: 'SaaS & Web', description: 'Criação de plataformas completas, prontas para escalar.', src: 'https://i.postimg.cc/pXmnxZbF/SAAS.webp' },
];

export const PhotoGallery = ({ animationDelay = 0.5 }: { animationDelay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const visibilityTimer = setTimeout(() => setIsVisible(true), animationDelay * 1000);
    const animationTimer = setTimeout(() => setIsLoaded(true), (animationDelay + 0.4) * 1000);
    return () => { clearTimeout(visibilityTimer); clearTimeout(animationTimer); };
  }, [animationDelay]);

  const mobileCards = services.map((photo) => (
    <div key={photo.id} className="flex items-center justify-center w-full h-full">
      <PhotoCard src={photo.src} title={photo.title} description={photo.description} />
    </div>
  ));

  return (
    <section className="py-32 relative overflow-hidden bg-black w-full flex flex-col items-center">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="relative z-20 text-center mb-12">
        <p className="text-violet-500 font-semibold tracking-widest uppercase text-sm mb-3">
          O Que Eu Entrego
        </p>
        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight px-4">
          Como Transformo seu Negócio
        </h3>
      </div>

      {/* ── DESKTOP: MODO POLAROIDS (ULTRAMAX PERFORMANCE) ── */}
      <div className="relative mb-8 h-[450px] w-full items-center justify-center hidden md:flex">
        <motion.div className="relative mx-auto flex w-full max-w-7xl justify-center" animate={{ opacity: isVisible ? 1 : 0 }}>
            <div className="relative h-[300px] w-[240px]">
              {services.map((photo) => (
                <motion.div 
                  key={photo.id} 
                  className="absolute left-0 top-0 cursor-grab active:cursor-grabbing"
                  style={{ willChange: "transform, z-index" }}
                  initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                  animate={isLoaded ? { x: photo.x, y: photo.y, rotate: photo.rotate, zIndex: photo.zIndex } : {}}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }} // Animação bonita apenas na hora que carrega a página
                  
                  // A MÁGICA DE PERFORMANCE ACONTECE AQUI NO HOVER:
                  whileHover={{ 
                    scale: 1.15, 
                    rotate: 0, 
                    zIndex: 999,
                    transition: { 
                      scale: { duration: 0.15, ease: "easeOut" },
                      rotate: { duration: 0.15, ease: "easeOut" },
                      zIndex: { duration: 0 } // SNAP! O Z-Index pula em 0 segundos. Zero engasgos.
                    } 
                  }}
                  drag 
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} 
                  dragElastic={0}
                  dragSnapToOrigin
                >
                  <PhotoCard src={photo.src} title={photo.title} description={photo.description} />
                </motion.div>
              ))}
            </div>
        </motion.div>
      </div>

      {/* ── MOBILE: MODO SWIPER ── */}
      <div className="md:hidden w-full relative flex flex-col items-center z-20 px-6 overflow-visible">
        <p className="text-zinc-500 text-[10px] mb-4 font-mono uppercase tracking-[0.2em] animate-pulse text-center">
          Arraste para explorar
        </p>
        <div style={{ '--card-z-offset': '15px', '--card-y-offset': '12px', '--card-x-offset': '10px' } as React.CSSProperties}>
          <CardSwiper cards={mobileCards} />
        </div>
      </div>
    </section>
  );
};

export const PhotoCard = ({ src, title, description }: { src: string; title: string; description: string; }) => {
  return (
    <div 
      className="relative w-[240px] h-[300px] mx-auto overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-xl pointer-events-none"
      style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
    >
      <img
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        src={src}
        alt={title}
        draggable={false}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-x-0 bottom-0 h-3/4 flex flex-col justify-end items-center text-center p-5 z-10 pointer-events-none">
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent -z-10" />
         <h3 className="text-lg font-bold text-white mb-2 leading-tight">
           {title}
         </h3>
         <p className="text-xs text-zinc-300 font-medium leading-relaxed">
           {description}
         </p>
      </div>
    </div>
  );
};