"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";

interface Order {
  _id: string;
  orderId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dob: string;
  placeOfBirth: string;
  prefferedDateAndTime: string;
  additionalProducts: string[];
  amount: number;
  orderDate: string;
}

export default function RecordPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://skyscale-be.onrender.com/api/get-orders3');
      const result = await response.json();
      
      if (result.success) {
        setOrders(result.data);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err: any) {
      setError('Error fetching orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatDateTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleString();
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Order Records
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Track and manage all soulmate sketch orders with detailed customer information
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            {loading ? (
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading orders...</p>
                  </div>
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="bg-card border-border">
                <CardContent className="p-8">
                  <div className="text-center">
                    <p className="text-destructive font-medium">{error}</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-muted/50 border-b border-border">
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Order ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Name</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Email</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Phone</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Gender</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">DOB</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Place of Birth</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Additional Products</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Amount</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-foreground">Order Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr key={order._id} className="border-b border-border hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-3 text-sm text-foreground">{order.orderId}</td>
                            <td className="px-4 py-3 text-sm text-foreground font-medium">{order.fullName}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{order.email}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{order.phoneNumber}</td>
                            <td className="px-4 py-3 text-sm text-foreground capitalize">{order.gender}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{formatDate(order.dob)}</td>
                            <td className="px-4 py-3 text-sm text-foreground">{order.placeOfBirth}</td>
                            <td className="px-4 py-3 text-sm text-foreground">
                              <span className="inline-flex flex-wrap gap-1">
                                {order.additionalProducts.map((product, index) => (
                                  <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                    {product}
                                  </span>
                                ))}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm font-semibold text-primary">₹{order.amount}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">{formatDateTime(order.orderDate)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {orders.length === 0 && (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No orders found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 