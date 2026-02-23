import { Suspense, lazy } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  onLoad?: () => void; // Adicionamos a função de aviso aqui
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full bg-transparent" />
      }
    >
      <Spline 
        scene={scene} 
        className={className} 
        onLoad={onLoad} // Repassamos o aviso para o Spline original
      />
    </Suspense>
  );
}