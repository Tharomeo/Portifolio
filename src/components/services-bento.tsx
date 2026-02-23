'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Code2, Cloud, Sparkles, Bot, Server } from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Engenharia de Software',
    description: 'Desenvolvimento de sistemas sob medida e ferramentas de alta performance usando código limpo e as melhores tecnologias do mercado.',
    icon: <Code2 className="w-8 h-8 text-violet-400" />,
    className: 'md:col-span-2 md:row-span-2', // Bloco Grande (2x2)
    src: 'https://i.postimg.cc/1XvhGcb3/PROGRAMACAO.jpg',
  },
  {
    id: 2,
    title: 'SaaS & Web',
    description: 'Criação de plataformas completas, do painel administrativo ao ecossistema do cliente final, prontas para escalar.',
    icon: <Cloud className="w-8 h-8 text-violet-400" />,
    className: 'md:col-span-1 md:row-span-1', // Quadrado Menor (1x1)
    src: 'https://i.postimg.cc/FFp4XNzW/SAAS.jpg',
  },
  {
    id: 3,
    title: 'Inteligência Artificial',
    description: 'Integração de agentes inteligentes para automatizar atendimento e otimizar a tomada de decisões na sua empresa.',
    icon: <Sparkles className="w-8 h-8 text-violet-400" />,
    className: 'md:col-span-1 md:row-span-1', // Quadrado Menor (1x1)
    src: 'https://i.postimg.cc/G3KCndtG/IA.jpg',
  },
  {
    id: 4,
    title: 'Automação & Bots',
    description: 'Criação de fluxos n8n e chatbots avançados, transformando tarefas e atendimentos manuais em processos instantâneos.',
    icon: <Bot className="w-8 h-8 text-violet-400" />,
    className: 'md:col-span-1 md:row-span-1', // Quadrado Menor (1x1)
    src: 'https://i.postimg.cc/yxL4mX2x/BOT.jpg',
  },
  {
    id: 5,
    title: 'Cloud & M365',
    description: 'Gestão, migração e arquitetura em nuvem (Microsoft 365 e Google Cloud) garantindo segurança e eficiência corporativa.',
    icon: <Server className="w-8 h-8 text-violet-400" />,
    className: 'md:col-span-2 md:row-span-1', // Retângulo Largo (2x1)
    src: 'https://i.postimg.cc/3JwHKV0V/M365.jpg',
  },
];

export function ServicesBento() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section className="py-24 w-full relative overflow-hidden bg-black">
      {/* Fundo com Grid sutil */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-violet-500 font-semibold tracking-widest uppercase text-sm mb-3">
            O que eu faço
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Motor Invisível para seu Negócio
          </h2>
        </motion.div>

        {/* Grid ajustado para 3 colunas e alinhamento perfeito.
          Adicionei auto-rows para garantir que todos tenham a mesma base de altura.
        */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6 w-full max-w-5xl"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {services.map((service, index) => (
            <BentoCard key={service.id} service={service} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function BentoCard({ service, index }: { service: any; index: number }) {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Rotação sutil inicial para o efeito Polaroid
    setRotation(Math.random() * 4 - 2); 
  }, []);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { type: 'spring', stiffness: 70, damping: 12 },
        },
      }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      dragSnapToOrigin={true} // Isso garante que o card sempre volte pro lugar e não quebre o grid!
      whileHover={{ scale: 1.02, rotateZ: 0, zIndex: 50 }}
      whileTap={{ scale: 0.98, zIndex: 50 }}
      animate={{ rotate: rotation }}
      className={cn(
        'group relative overflow-hidden rounded-3xl cursor-grab active:cursor-grabbing border border-zinc-800 bg-zinc-900 h-full w-full',
        service.className
      )}
      style={{
        transformPerspective: 1000,
        zIndex: 10,
      }}
    >
      <img
        src={service.src}
        alt={service.title}
        className="absolute inset-0 w-full h-full object-cover opacity-50 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-10"
        draggable={false}
      />

      {/* Gradiente de Base para garantir leitura sobre a imagem */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />

      {/* Conteúdo Visível por padrão */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end transition-opacity duration-500 group-hover:opacity-0">
        <div className="bg-zinc-950/60 p-3 rounded-xl w-fit mb-4 backdrop-blur-md border border-zinc-700/50">
          {service.icon}
        </div>
        <h3 className="text-2xl font-bold text-white tracking-tight drop-shadow-md">
          {service.title}
        </h3>
      </div>

      {/* OVERLAY DE HOVER (Aparece a descrição quando passa o mouse) */}
      <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center bg-violet-900/60 backdrop-blur-md opacity-0 transition-all duration-500 group-hover:opacity-100">
        <div className="transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
          <div className="flex justify-center mb-4">
            <div className="bg-zinc-950/50 p-3 rounded-xl w-fit border border-violet-500/30">
              {service.icon}
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white tracking-tight mb-3 drop-shadow-md">
            {service.title}
          </h3>
          <p className="text-zinc-100 text-sm md:text-base leading-relaxed font-medium">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}