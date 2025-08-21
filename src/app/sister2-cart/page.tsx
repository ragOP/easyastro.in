"use client";
import React from 'react';
import Sister2CartLayout from '@/components/sister2/sister2-cart-layout';
import Sister2CartPage from '@/components/sister2/sister2-cart-page';

export default function Sister2CartPageRoute() {
  return (
    <Sister2CartLayout>
      <Sister2CartPage />
    </Sister2CartLayout>
  );
} 