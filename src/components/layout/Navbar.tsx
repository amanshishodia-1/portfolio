'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Container } from './Container';
import { Text } from '@/components/ui/Text';
import { Magnetic } from '@/components/ui/Magnetic';

const navItems = [
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on page changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full"
        style={{
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(10,10,10,0.8)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-mono font-bold text-base hover:text-accent transition-colors flex items-center select-none text-foreground">
                <span>aman</span>
                <span className="text-accent animate-pulse font-extrabold ml-[1px]">_</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
            <nav 
              className="flex items-center space-x-1"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {navItems.map((item, idx) => {
                const isActive = pathname === item.href;
                return (
                  <Magnetic key={item.href} range={40} strength={0.25}>
                    <Link
                      href={item.href}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      className={`hover:text-foreground relative px-3.5 py-1.5 text-sm font-medium transition-colors rounded-md select-none ${
                        isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {item.label}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="bg-accent absolute right-3.5 -bottom-[21px] left-3.5 h-[2px]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                      {hoveredIndex === idx && (
                        <motion.div
                          layoutId="hoverNav"
                          className="bg-white/[0.03] border border-white/[0.05] absolute inset-0 rounded-md -z-10 shadow-sm backdrop-blur-[2px]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </Magnetic>
                );
              })}
            </nav>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <Magnetic range={45} strength={0.3}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-muted-foreground hover:bg-secondary hover:text-foreground inline-flex items-center justify-center rounded-md p-2.5 transition-colors focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </Magnetic>
          </div>
        </Container>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-background/60 fixed inset-0 z-40 backdrop-blur-sm md:hidden"
            />

            {/* Sliding Sidebar Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="border-border bg-card fixed top-0 right-0 bottom-0 z-50 flex w-full max-w-xs flex-col border-l p-6 shadow-xl md:hidden"
            >
              <div className="flex items-center justify-between pb-6">
                <Text family="mono" weight="bold" size="base">
                  navigation
                </Text>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-muted-foreground hover:bg-secondary hover:text-foreground rounded-md p-2.5 transition-colors focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`hover:text-foreground text-base font-medium transition-colors ${
                        isActive ? 'text-foreground font-semibold' : 'text-muted-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
