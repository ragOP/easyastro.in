import React from 'react';
import SisterCartPage from '@/components/sister/sister-cart-page';
import SisterCartLayout from '@/components/sister/sister-cart-layout';

export default function SisterCartPageRoute() {
  return (
    <SisterCartLayout>
      <SisterCartPage />
    </SisterCartLayout>
  );
} 