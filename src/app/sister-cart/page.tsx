import React from 'react';
import SisterCartPage from '@/components/sister/sister-cart-page';
import SisterCartLayout from '@/components/sister/sister-cart-layout';
import './sister-cart.css';

export default function SisterCartPageRoute() {
  return (
    <SisterCartLayout>
      <SisterCartPage />
    </SisterCartLayout>
  );
} 