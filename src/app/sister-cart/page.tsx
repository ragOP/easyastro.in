'use client';
import React, { useEffect } from 'react';
import SisterCartPage from '@/components/sister/sister-cart-page';
import SisterCartLayout from '@/components/sister/sister-cart-layout';
import './sister-cart.css';
import { BACKEND_URL } from '@/lib/backendUrl';

export default function SisterCartPageRoute() {
  useEffect(() => {
    const logPath = async () => {
      try {
        const indianTime = new Date().toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });
        await fetch(`${BACKEND_URL}/api/log3/log-path`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            path: "cart",
            timestamp: indianTime,
          }),
        });
      } catch (error) {
        console.error("Error logging path:", error);
      }
    };

    logPath();
  }, []);
  return (
    <SisterCartLayout>
      <SisterCartPage />
    </SisterCartLayout>
  );
} 