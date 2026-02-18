import { motion } from 'framer-motion';
import { Bot, Code2, Zap, ArrowRight, ExternalLink } from 'lucide-react';
import { SplineScene } from '@/components/ui/splite';
import { SpotlightCard } from '@/components/ui/spotlight';
import { Button } from '@/components/ui/button';

const featureBadges = [
  { icon: Code2, label: 'Frontend' },
  { icon: Bot, label: 'Automações' },
  { icon: Zap, label: 'Performance' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export function HeroAutomation() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background flex items-center">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Radial glow from center-left */}
      <div className="absolute inset-0 gradient-radial-glow" />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen">

          {/* ── LEFT: Text Content ── */}
          <motion.div
            className="flex flex-col gap-8 lg:pr-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Role tag */}
            <motion.div variants={itemVariants}>
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-widest"
                style={{
                  borderColor: 'hsl(var(--primary) / 0.3)',
                  background: 'hsl(var(--primary) / 0.05)',
                  color: 'hsl(var(--primary))',
                }}
              >
                <motion.span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'hsl(var(--primary))' }}
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                FULLSTACK_DEVELOPER
              </span>
            </motion.div>

            {/* Heading */}
            <motion.div variants={itemVariants} className="space-y-1">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight text-foreground">
                Sites &
              </h1>
              <h1
                className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[0.95] tracking-tight text-glow"
                style={{ color: 'hsl(var(--primary))' }}
              >
                Automação.
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg leading-relaxed max-w-md"
              style={{ color: 'hsl(var(--muted-foreground))' }}
            >
              Desenvolvo interfaces modernas e fluxos automatizados que transformam
              processos manuais em sistemas inteligentes e escaláveis.
            </motion.p>

            {/* Feature badges */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {featureBadges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border"
                  style={{
                    background: 'hsl(var(--muted))',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--muted-foreground))',
                  }}
                >
                  <Icon size={12} />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="group gap-2 font-semibold"
                style={{
                  background: 'hsl(var(--primary))',
                  color: 'hsl(var(--primary-foreground))',
                }}
              >
                Ver Projetos
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 font-semibold"
                style={{
                  borderColor: 'hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                }}
              >
                <Zap size={16} style={{ color: 'hsl(var(--primary))' }} />
                Automações
                <ExternalLink size={14} className="opacity-50" />
              </Button>
            </motion.div>
          </motion.div>

          {/* ── RIGHT: 3D Scene ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative"
          >
            <SpotlightCard className="relative overflow-hidden" spotlightColor="hsl(186 100% 50% / 0.06)">
              {/* Scene container */}
              <div className="relative h-[400px] md:h-[520px] lg:h-[600px]">
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                />

                {/* Overlay gradient at bottom */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, hsl(var(--card)), transparent)',
                  }}
                />
              </div>

              {/* Status bar */}
              <div
                className="px-5 py-3 flex items-center justify-between border-t"
                style={{ borderColor: 'hsl(var(--border))' }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'hsl(var(--primary))' }}
                    animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <span
                    className="text-xs font-mono tracking-widest"
                    style={{ color: 'hsl(var(--primary))' }}
                  >
                    SISTEMA DE AUTOMAÇÃO ATIVO
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full"
                      style={{ background: 'hsl(var(--primary) / 0.6)', height: `${8 + i * 4}px` }}
                      animate={{ scaleY: [1, 1.8, 1] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: 'easeInOut',
                      }}
                    />
                  ))}
                </div>
              </div>
            </SpotlightCard>

            {/* Glow behind card */}
            <div
              className="absolute -inset-px rounded-xl pointer-events-none"
              style={{
                boxShadow: '0 0 60px -10px hsl(var(--primary) / 0.15)',
              }}
            />
          </motion.div>

        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to top, hsl(var(--background)), transparent)' }}
      />
    </section>
  );
}
