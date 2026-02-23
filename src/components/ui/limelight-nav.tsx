'use client';

import React, { useState, useRef, useLayoutEffect, cloneElement } from 'react';

type NavItem = {
  id: string | number;
  icon: React.ReactElement;
  label: string;
  onClick?: () => void;
};

type LimelightNavProps = {
  items: NavItem[];
  defaultActiveIndex?: number;
  onTabChange?: (index: number) => void;
  className?: string;
};

export const LimelightNav = ({
  items,
  defaultActiveIndex = 0,
  onTabChange,
  className,
}: LimelightNavProps) => {
  const [activeIndex, setActiveIndex] = useState(defaultActiveIndex);
  const [isReady, setIsReady] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const limelightRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (items.length === 0) return;

    const limelight = limelightRef.current;
    const activeItem = navItemRefs.current[activeIndex];
    
    if (limelight && activeItem) {
      const newLeft = activeItem.offsetLeft + activeItem.offsetWidth / 2 - limelight.offsetWidth / 2;
      limelight.style.left = `${newLeft}px`;

      if (!isReady) {
        setTimeout(() => setIsReady(true), 50);
      }
    }
  }, [activeIndex, isReady, items]);

  if (items.length === 0) return null; 

  const handleItemClick = (index: number, itemOnClick?: () => void) => {
    setActiveIndex(index);
    onTabChange?.(index);
    itemOnClick?.();
  };

  return (
    <nav className={`relative inline-flex items-center h-16 rounded-full bg-zinc-900 border border-zinc-800 px-2 ${className}`}>
      {items.map(({ id, icon, label, onClick }, index) => (
          <a
            key={id}
            ref={el => { navItemRefs.current[index] = el; }}
            className="relative z-20 flex h-full cursor-pointer items-center justify-center px-6 gap-2"
            onClick={() => handleItemClick(index, onClick)}
          >
            {cloneElement(icon, {
              className: `w-5 h-5 transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'text-white' : 'text-zinc-500'
              }`,
            })}
            <span className={`text-sm font-medium transition-all duration-300 ${activeIndex === index ? 'text-white' : 'text-zinc-500'}`}>
              {label}
            </span>
          </a>
      ))}

      <div 
        ref={limelightRef}
        className={`absolute top-0 z-10 w-16 h-[2px] rounded-full bg-violet-500 shadow-[0_10px_20px_rgba(139,92,246,0.5)] ${
          isReady ? 'transition-[left] duration-300 ease-out' : ''
        }`}
        style={{ left: '-999px' }}
      >
        <div className="absolute left-[-50%] top-[2px] w-[200%] h-12 bg-gradient-to-b from-violet-500/20 to-transparent pointer-events-none blur-sm" />
      </div>
    </nav>
  );
};