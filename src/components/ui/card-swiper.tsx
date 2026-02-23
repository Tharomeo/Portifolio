'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface CardSwiperProps {
  cards: React.ReactNode[];
  className?: string;
}

export const CardSwiper: React.FC<CardSwiperProps> = ({
  cards,
  className = ''
}) => {
  const cardStackRef = useRef<HTMLDivElement>(null);
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  const [cardOrder, setCardOrder] = useState<number[]>(() =>
    Array.from({ length: cards.length }, (_, i) => i)
  );

  useEffect(() => {
    setCardOrder(Array.from({ length: cards.length }, (_, i) => i));
  }, [cards.length]);

  const getDurationFromCSS = useCallback((
    variableName: string,
    element?: HTMLElement | null
  ): number => {
    const targetElement = element || document.documentElement;
    const value = getComputedStyle(targetElement)
      ?.getPropertyValue(variableName)
      ?.trim();
    if (!value) return 0;
    if (value.endsWith("ms")) return parseFloat(value);
    if (value.endsWith("s")) return parseFloat(value) * 1000;
    return parseFloat(value) || 0;
  }, []);

  const getCards = useCallback((): HTMLElement[] => {
    if (!cardStackRef.current) return [];
    return [...cardStackRef.current.querySelectorAll('.swipe-card')] as HTMLElement[];
  }, []);

  const getActiveCard = useCallback((): HTMLElement | null => {
    const domCards = getCards();
    return domCards[0] || null;
  }, [getCards]);

  const updatePositions = useCallback(() => {
    const domCards = getCards();
    domCards.forEach((card, i) => {
      card.style.setProperty('--i', i.toString());
      card.style.setProperty('--swipe-x', '0px');
      card.style.setProperty('--swipe-rotate', '0deg');
      card.style.opacity = '1';
    });
  }, [getCards]);

  const applySwipeStyles = useCallback((deltaX: number) => {
    const card = getActiveCard();
    if (!card) return;
    card.style.setProperty('--swipe-x', `${deltaX}px`);
    card.style.setProperty('--swipe-rotate', `${deltaX * 0.05}deg`);
    card.style.opacity = (1 - Math.min(Math.abs(deltaX) / 200, 1) * 0.5).toString();
  }, [getActiveCard]);

  const handleStart = useCallback((clientX: number) => {
    if (isSwiping.current) return;
    isSwiping.current = true;
    startX.current = clientX;
    currentX.current = clientX;
    const card = getActiveCard();
    if (card) card.style.transition = 'none';
  }, [getActiveCard]);

  const handleEnd = useCallback(() => {
    if (!isSwiping.current) return;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }

    const deltaX = currentX.current - startX.current;
    const threshold = 70;
    const duration = getDurationFromCSS('--card-swap-duration', cardStackRef.current) || 300;
    const card = getActiveCard();

    if (card) {
      card.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;

      if (Math.abs(deltaX) > threshold) {
        const direction = Math.sign(deltaX);
        card.style.setProperty('--swipe-x', `${direction * 400}px`);
        card.style.setProperty('--swipe-rotate', `${direction * 20}deg`);
        card.style.opacity = '0';

        setTimeout(() => {
          if (getActiveCard() === card) {
            card.style.setProperty('--swipe-rotate', `${-direction * 20}deg`);
          }
        }, duration * 0.5);

        setTimeout(() => {
          setCardOrder(prev => {
            if (prev.length === 0) return [];
            return [...prev.slice(1), prev[0]];
          });
        }, duration);
      } else {
        applySwipeStyles(0);
      }
    }

    isSwiping.current = false;
    startX.current = 0;
    currentX.current = 0;
  }, [getDurationFromCSS, getActiveCard, applySwipeStyles]);

  const handleMove = useCallback((clientX: number) => {
    if (!isSwiping.current) return;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    animationFrameId.current = requestAnimationFrame(() => {
      currentX.current = clientX;
      const deltaX = currentX.current - startX.current;
      applySwipeStyles(deltaX);
    });
  }, [applySwipeStyles]);

  useEffect(() => {
    const cardStackElement = cardStackRef.current;
    if (!cardStackElement) return;

    const handlePointerDown = (e: PointerEvent) => handleStart(e.clientX);
    const handlePointerMove = (e: PointerEvent) => handleMove(e.clientX);
    const handlePointerUp = () => handleEnd();
    const handlePointerLeave = () => handleEnd();

    cardStackElement.addEventListener('pointerdown', handlePointerDown);
    cardStackElement.addEventListener('pointermove', handlePointerMove);
    cardStackElement.addEventListener('pointerup', handlePointerUp);
    cardStackElement.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      cardStackElement.removeEventListener('pointerdown', handlePointerDown);
      cardStackElement.removeEventListener('pointermove', handlePointerMove);
      cardStackElement.removeEventListener('pointerup', handlePointerUp);
      cardStackElement.removeEventListener('pointerleave', handlePointerLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleStart, handleMove, handleEnd]);

  useEffect(() => {
    updatePositions();
  }, [cardOrder, updatePositions]);

  return (
    <div
      className={`relative grid place-content-center w-full max-w-md mx-auto h-[550px] ${className}`}
      ref={cardStackRef}
      style={{
        touchAction: 'none',
        transformStyle: 'preserve-3d',
        '--card-perspective': '1000px',
        '--card-z-offset': '30px',
        '--card-y-offset': '20px',
        '--card-x-offset': '20px',
        '--card-swap-duration': '0.3s',
      } as React.CSSProperties}
    >
      {cardOrder.map((originalIndex, displayIndex) => (
        <div
          key={`${originalIndex}`}
          /* AQUI ESTÁ A CORREÇÃO: Altura e largura fixas adicionadas (w-[320px] h-[450px]) para o card não amassar */
          className="swipe-card absolute cursor-grab active:cursor-grabbing place-self-center will-change-transform w-[320px] h-[420px]"
          style={{
            '--i': displayIndex.toString(),
            zIndex: cards.length - displayIndex,
            transform: `perspective(var(--card-perspective))
                        translateZ(calc(-1 * var(--card-z-offset) * var(--i)))
                        translateY(calc(var(--card-y-offset) * var(--i)))
                        translateX(calc(-1 * var(--card-x-offset) * var(--i) + var(--swipe-x, 0px)))
                        rotateZ(var(--swipe-rotate, 0deg))`
          } as React.CSSProperties}
        >
          <div className="w-full h-full pointer-events-none">
            {cards[originalIndex]}
          </div>
        </div>
      ))}
    </div>
  );
};