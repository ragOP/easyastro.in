import React from 'react';

interface Sister2CartLayoutProps {
  children: React.ReactNode;
}

export default function Sister2CartLayout({ children }: Sister2CartLayoutProps) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 