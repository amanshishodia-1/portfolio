import React from 'react';
import { Container } from './Container';
import { Text } from '@/components/ui/Text';

export function Footer() {
  return (
    <footer className="border-border bg-background border-t py-6 md:px-8 md:py-0">
      <Container className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <Text size="sm" color="muted" className="text-center md:text-left">
          &copy; {new Date().getFullYear()} Aman Shishodia. All rights reserved. Powered by Next.js
          and Tailwind CSS.
        </Text>
      </Container>
    </footer>
  );
}
