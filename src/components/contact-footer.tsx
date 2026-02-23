'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Terminal, MessageCircle } from 'lucide-react';

export function ContactFooter() {
  const [text, setText] = useState('');
  const fullText = '> python initiate_scale.py --target="seu_negocio"';

  // Efeito de digitação no terminal
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    // Removida a classe "border-t border-zinc-900" que causava a linha divisória
    <footer className="relative w-full bg-black pt-32 pb-24 overflow-hidden flex flex-col items-center">
      
      {/* Luz de fundo roxa vindo do FIM da tela */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/20 blur-[150px] rounded-full pointer-events-none translate-y-1/2" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col items-center text-center w-full">
        
        {/* Terminal Window */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden mb-12 shadow-2xl shadow-violet-900/10"
        >
          {/* Header do Terminal */}
          <div className="bg-zinc-900 px-4 py-2 flex items-center gap-2 border-b border-zinc-800">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="mx-auto flex items-center gap-2 text-zinc-500 text-xs font-mono">
              <Terminal className="w-3 h-3" />
              <span>bash - sysadmin</span>
            </div>
          </div>
          {/* Corpo do Terminal */}
          <div className="p-4 text-left font-mono text-sm md:text-base text-violet-400 min-h-[80px] flex items-center">
            <span>{text}</span>
            <motion.span 
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-5 bg-violet-400 ml-1 align-middle"
            />
          </div>
        </motion.div>

        {/* Textos Principais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Pronto para <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-violet-600">Escalar?</span>
          </h2>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Pare de perder tempo com processos manuais e sistemas que não conversam. 
            Vamos construir o ecossistema digital que a sua empresa merece.
          </p>
        </motion.div>

        {/* Links em Destaque */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 w-full max-w-4xl"
        >
          {/* Link WhatsApp - DESTAQUE TOTAL (Botão Primário) */}
          <a 
            href="https://wa.me/5519992536756" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-8 py-5 bg-violet-600 border border-violet-500 rounded-2xl hover:bg-violet-500 hover:border-violet-400 transition-all duration-300 hover:scale-105 w-full md:w-auto shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)] z-20"
          >
            <div className="p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors">
              <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-violet-200 font-bold tracking-wider uppercase group-hover:text-white transition-colors">Iniciar Projeto</span>
              <span className="text-xl font-black text-white">WhatsApp</span>
            </div>
          </a>

          {/* Link LinkedIn (Botão Secundário) */}
          <a 
            href="https://linkedin.com/in/thais-romeo-developer/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-8 py-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-800 hover:border-violet-500/50 transition-all duration-300 hover:scale-105 w-full md:w-auto backdrop-blur-sm z-10"
          >
            <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-violet-500/20 transition-colors">
              <Linkedin className="w-6 h-6 text-zinc-300 group-hover:text-violet-400 transition-colors" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-zinc-500 font-semibold tracking-wider uppercase group-hover:text-violet-500/80 transition-colors">Conexão Profissional</span>
              <span className="text-lg font-bold text-zinc-200 group-hover:text-white transition-colors">LinkedIn</span>
            </div>
          </a>

          {/* Link GitHub (Botão Secundário) */}
          <a 
            href="https://github.com/Tharomeo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center gap-4 px-8 py-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:bg-zinc-800 hover:border-violet-500/50 transition-all duration-300 hover:scale-105 w-full md:w-auto backdrop-blur-sm z-10"
          >
            <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-violet-500/20 transition-colors">
              <Github className="w-6 h-6 text-zinc-300 group-hover:text-violet-400 transition-colors" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs text-zinc-500 font-semibold tracking-wider uppercase group-hover:text-violet-500/80 transition-colors">Meus Códigos</span>
              <span className="text-lg font-bold text-zinc-200 group-hover:text-white transition-colors">GitHub</span>
            </div>
          </a>
        </motion.div>

      </div>
    </footer>
  );
}