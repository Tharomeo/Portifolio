'use client';

import { useState } from 'react';
import { Settings, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LimelightNav } from '@/components/ui/limelight-nav';
import CardFlip from '@/components/ui/flip-card';
import { CardSwiper } from '@/components/ui/card-swiper';

const automationsData = [
  {
    title: 'Planilha Clean',
    subtitle: 'Automação e Higienização de Dados',
    description: 'Sistema em Python projetado para processamento, limpeza e organização automatizada de planilhas complexas.',
    features: ['Processamento em Lote', 'Filtros Inteligentes', 'Exportação Otimizada', 'Script Python Customizado'],
  },
  {
    title: 'Sistema AgPhoto',
    subtitle: 'Substituição de CRM para Fotografia',
    description: 'Desenvolvimento de um sistema completo de gestão de clientes e arquivos para estúdio de formatura, substituindo plataforma legado.',
    features: ['Gestão de Contratos', 'Painel do Fotógrafo', 'Integração de Pagamento', 'Hospedagem em Nuvem'],
  },
  {
    title: 'Fluxos n8n',
    subtitle: 'Automação de Tarefas Repetitivas',
    description: 'Criação de webhooks e integrações utilizando n8n para conectar Google Services, CRMs e APIs externas.',
    features: ['Integração OAuth2', 'Tratamento de Dados', 'Respostas Automáticas', 'Disparo de Alertas'],
  }
];

const websitesData = [
  {
    title: 'Harmonia Formaturas',
    subtitle: 'Painel Web e Atendimento IA',
    description: 'Plataforma administrativa integrada a um chatbot inteligente no WhatsApp para automação do atendimento aos formandos.',
    features: ['Integração WhatsApp API', 'Chatbot n8n', 'Dashboard Administrativo', 'Interface Responsiva'],
  },
  {
    title: 'Meu Portfólio',
    subtitle: 'Design de Alta Conversão',
    description: 'Desenvolvimento de uma vitrine digital imersiva, utilizando Next.js, Framer Motion e modelos 3D.',
    features: ['Renderização 3D', 'Animações Avançadas', 'Tailwind CSS', 'Performance Otimizada'],
  }
];

const techStack = [
  {
    name: 'n8n',
    icon: <span className="font-black text-2xl tracking-tighter text-zinc-300">n8n</span>
  },
  {
    name: 'Python',
    icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-zinc-300"><path d="M12.1 2.5c-4.8 0-4.6 2.1-4.6 2.1l.1 2.2h4.5v.7H7.3c-2.4 0-4.1 1.5-4.1 4.5s1.4 4.8 4 4.8h.9v-2.3c0-2.6 2.1-4.7 4.7-4.7h2.8c1.3 0 2.4-1.1 2.4-2.4V4.9c0-1.4-1-2.4-2.4-2.4h-3.5zm-1.8 1.4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zM16.7 9.8c-2.4 0-4.1 1.5-4.1 4.5s1.4 4.8 4 4.8h.9v-2.3c0-2.6 2.1-4.7 4.7-4.7h2.8c1.3 0 2.4-1.1 2.4-2.4V7.4c0-1.4-1-2.4-2.4-2.4h-3.5zm-1.8 1.4c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9z"/></svg>
  },
  {
    name: 'React',
    icon: <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-8 h-8 fill-none stroke-zinc-300 stroke-[1.5]"><circle cx="0" cy="0" r="2.05" fill="currentColor" stroke="none"/><g><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
  },
  {
    name: 'Next.js',
    icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-zinc-300"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.35 15.02v-6.6l5.77 7.76c-.76.35-1.57.53-2.42.53-1.41 0-2.73-.42-3.86-1.14l.51-.55zm6.81-1.34L11.3 7.37h1.68l4.9 6.54v-6.54h1.49v8.31l-1.91-1.34zM9.16 7.37v9.26H7.67V7.37h1.49z"/></svg>
  },
  {
    name: 'Tailwind CSS',
    icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-zinc-300"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.605,15.021,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.195,14.982,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.181,2.532,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.395,8.982,12,6.001,12z"/></svg>
  },
  {
    name: 'Node.js',
    icon: <svg viewBox="0 0 24 24" className="w-8 h-8 fill-zinc-300"><path d="M12 2L3.5 6.9v9.8L12 21.6l8.5-4.9V6.9L12 2zm6.9 13.5l-6.9 4-6.9-4V8.4l6.9-4 6.9 4v7.1zM12 5.9L6.5 9v5.8l5.5 3.2 5.5-3.2V9L12 5.9zm4.2 8.4l-4.2 2.4-4.2-2.4v-4.8l4.2-2.4 4.2 2.4v4.8z"/></svg>
  },
  {
    name: 'TypeScript',
    icon: <span className="font-bold text-xl tracking-tight text-zinc-300 border-[2px] border-zinc-300 p-0.5 rounded-sm px-1">TS</span>
  }
];

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState(0);

  const navItems = [
    { id: 'automations', icon: <Settings />, label: 'Automações' },
    { id: 'websites', icon: <Monitor />, label: 'Sites e Sistemas' },
  ];

  const currentProjects = activeTab === 0 ? automationsData : websitesData;
  const duplicatedTech = [...techStack, ...techStack];

  // Prepara os componentes de CardFlip para jogar dentro do Swiper (Mobile)
  const projectCards = currentProjects.map((project, index) => (
    <CardFlip 
      key={`${activeTab}-${index}`}
      title={project.title}
      subtitle={project.subtitle}
      description={project.description}
      features={project.features}
    />
  ));

  return (
    <section className="min-h-screen w-full bg-black pt-12 pb-24 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-8 px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Projetos Ativos
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mb-12 px-6"
        >
          <LimelightNav 
            items={navItems} 
            defaultActiveIndex={0}
            onTabChange={(index) => setActiveTab(index)}
          />
        </motion.div>

        {/* ── DESKTOP: GRID CLÁSSICO LADO A LADO ── */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full justify-items-center mb-32 px-6">
          <AnimatePresence mode="popLayout">
            {currentProjects.map((project, index) => (
              <motion.div 
                key={`${activeTab}-${project.title}`}
                layout
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
                className="w-full flex justify-center"
              >
                <CardFlip 
                  title={project.title}
                  subtitle={project.subtitle}
                  description={project.description}
                  features={project.features}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── MOBILE: MODO SWIPER DIAGONAL (ESCONDIDO NO PC) ── */}
        <div className="md:hidden w-full mb-12 relative flex flex-col items-center z-20 px-6">
          <p className="text-zinc-500 text-xs mb-4 font-mono uppercase tracking-widest animate-pulse">
            Arraste as cartas para o lado
          </p>
          {/* CardSwiper foi ajustado em seu arquivo para aplicar a diagonal */}
          <CardSwiper cards={projectCards} />
        </div>

        {/* ── STACK DE TECNOLOGIAS ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full relative flex flex-col items-center overflow-hidden pt-8 border-t border-zinc-900"
        >
          <p className="text-zinc-500 text-sm font-semibold tracking-widest uppercase mb-10">
            Stack & Tecnologias
          </p>
          
          <div className="w-full max-w-5xl overflow-hidden relative [mask-image:_linear-gradient(to_right,transparent_0,_black_15%,_black_85%,transparent_100%)]">
            <div className="flex w-max animate-marquee gap-24 pr-24 items-center">
              {duplicatedTech.map((tech, index) => (
                <div 
                  key={index} 
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="text-zinc-600 transition-colors duration-300 group-hover:text-violet-500">
                    {tech.icon}
                  </div>
                  <span className="text-xl font-medium text-zinc-600 transition-colors duration-300 group-hover:text-violet-500">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}