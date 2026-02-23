'use client';

import { cn } from '@/lib/utils';
import { ArrowRight, Code2, Copy, Zap } from 'lucide-react';
import { useState } from 'react';

export interface CardFlipProps {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: string[];
}

export default function CardFlip({
  title = 'Projeto',
  subtitle = 'Subtítulo',
  description = 'Descrição do projeto.',
  features = ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative h-[360px] w-full max-w-[320px] cursor-pointer [perspective:2000px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={cn(
          'relative h-full w-full',
          '[transform-style:preserve-3d]',
          'transition-all duration-700 ease-out',
          isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]',
        )}
      >
        {/* ── FRENTE DO CARD ── */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(0deg)] [backface-visibility:hidden]',
            'overflow-hidden rounded-2xl',
            'bg-zinc-950 border border-zinc-800', 
            'transition-all duration-700',
            'group-hover:border-violet-500/50 group-hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]',
            isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          {/* Efeito de luz interna roxa bem suave */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-violet-500/10" />

          {/* Área das Barrinhas Flutuantes */}
          <div className="absolute top-0 left-0 right-0 bottom-[110px] flex flex-col justify-between py-6 px-4 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-transparent to-zinc-950 z-10 pointer-events-none" />
            
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  // Mudei para h-[2px] para deixar a linha bem mais fina
                  'h-[2px] w-full rounded-full relative z-0',
                  'bg-gradient-to-r from-violet-500/0 via-violet-500/60 to-violet-500/0',
                  'animate-[slideIn_4s_linear_infinite]',
                  'opacity-10 group-hover:opacity-100 transition-opacity duration-700',
                )}
                style={{
                  width: `${20 + Math.random() * 60}%`, 
                  marginLeft: `${Math.random() * 30}%`, 
                  // Velocidade muito mais rápida, variando aleatoriamente entre 3 e 7 segundos
                  animationDuration: `${3 + Math.random() * 4}s`, 
                  // Atraso ajustado proporcionalmente
                  animationDelay: `-${Math.random() * 5}s`, 
                }}
              />
            ))}
          </div>

          {/* Textos Inferiores */}
          <div className="absolute right-0 bottom-0 left-0 p-6 bg-gradient-to-t from-zinc-950 via-zinc-950/95 to-transparent z-20 pointer-events-none">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-xl leading-snug font-bold tracking-tight text-white transition-transform duration-500 ease-out group-hover:-translate-y-1">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm tracking-tight text-zinc-400 transition-transform delay-75 duration-500 ease-out group-hover:-translate-y-1">
                  {subtitle}
                </p>
              </div>
              <div className="group/icon relative pointer-events-auto">
                <div className="absolute inset-[-8px] rounded-lg bg-violet-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <ArrowRight className="relative z-10 h-5 w-5 text-violet-500 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>

        {/* ── VERSO DO CARD ── */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-2xl p-6',
            'bg-zinc-950 border border-zinc-800',
            'flex flex-col',
            'transition-all duration-700',
            'group-hover:border-violet-500/50 group-hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]',
            !isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500/5 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 flex-1 space-y-6">
            <div className="space-y-2">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-violet-400">
                  <Code2 className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg leading-snug font-bold text-white">
                  {title}
                </h3>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {description}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {features.map((feature, index) => {
                const icons = [Copy, Code2, Zap];
                const IconComponent = icons[index % icons.length];

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm text-zinc-300 transition-all duration-500"
                    style={{
                      transform: isFlipped ? 'translateX(0)' : 'translateX(10px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                    }}
                  >
                    <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-violet-500/20">
                      <IconComponent className="h-3.5 w-3.5 text-violet-400" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}