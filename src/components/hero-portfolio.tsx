'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { Button } from '@/components/ui/button';
import { Spotlight } from '@/components/ui/spotlight';
import { GooeyText } from '@/components/ui/gooey-text-morphing';

export function HeroAutomation() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Função para Rolagem Suave
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Ajuste o block: 'start' para alinhar o topo da seção com o topo da tela
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
      } 
    }
  };

  return (
    <>
      {/* ── TELA DE CARREGAMENTO (PRELOADER) ── */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          >
            <div className="flex items-center gap-3 text-zinc-400 font-mono text-sm tracking-widest">
              <span className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
              SYSTEM INITIALIZING...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative w-full h-screen overflow-hidden bg-black">
        
        {/* ── 1. CAMADA DO ROBÔ ── */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-auto">
          <div className="relative w-full h-full lg:w-[160%] lg:-left-[55%] transition-all duration-1000 ease-out">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
                onLoad={() => setIsLoaded(true)}
              />
          </div>
        </div>

        {/* ── 2. GRADIENTE ── */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/20 to-black/90 z-0 pointer-events-none" />

        {/* ── 3. CAMADA DE CONTEÚDO ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center pointer-events-none">
          
          <div className="hidden lg:block h-full" />

          <motion.div
            className="flex flex-col gap-8 lg:pl-12 text-left"
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"} 
            variants={containerVariants}
          >
            <Spotlight className="-top-40 left-0 md:left-20 md:-top-20" fill="white" />

            <motion.div variants={itemVariants} className="relative h-24 md:h-32 w-full pointer-events-auto overflow-visible">
              <GooeyText
                texts={["Code.", "Automate.", "Scale."]}
                morphTime={0.6}
                cooldownTime={1.5}
                className="w-full h-full"
                textClassName="text-5xl md:text-7xl font-black tracking-tighter text-white"
              />
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-zinc-400 max-w-lg leading-relaxed pointer-events-auto"
            >
              Transformo processos lentos em softwares ágeis. 
              Do design do site à automação, eu crio o ecossistema que sua empresa precisa para escalar.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2 pointer-events-auto">
              <Button
                size="lg"
                onClick={() => scrollToSection('projetos')} // Ação para rolar até Projetos
                className="rounded-full px-8 py-6 text-base font-semibold bg-white text-black hover:bg-zinc-200 transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)] group cursor-pointer"
              >
                Projetos Ativos
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection('contato')} // Ação para rolar até Contato
                className="rounded-full px-8 py-6 text-base font-semibold border-zinc-800 text-white hover:bg-zinc-900 hover:border-violet-500/50 transition-all cursor-pointer"
              >
                Contato
              </Button>
            </motion.div>

          </motion.div>

        </div>
      </section>
    </>
  );
}