"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";
import Papa from "papaparse";

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

type FilterType = "all" | "today" | "yesterday" | "last7days" | "custom";

export default function RecordPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [customStart, setCustomStart] = useState<Date | null>(null);
  const [customEnd, setCustomEnd] = useState<Date | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, filter, customStart, customEnd]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('https://skyscale-be.onrender.com/api/get-orders3');
      const result = await response.json();
      if (result.success) {
        const sorted = result.data.sort((a: Order, b: Order) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
        setOrders(sorted);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (err: any) {
      setError('Error fetching orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const isWithin = (date: Date, from: Date, to: Date) => {
    return date >= from && date <= to;
  };

  const applyFilters = () => {
    const now = new Date();
    let filtered = [...orders];

    switch (filter) {
      case "today":
        filtered = filtered.filter(order => new Date(order.orderDate).toDateString() === now.toDateString());
        break;
      case "yesterday":
        const y = new Date();
        y.setDate(y.getDate() - 1);
        filtered = filtered.filter(order => new Date(order.orderDate).toDateString() === y.toDateString());
        break;
      case "last7days":
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(now.getDate() - 6);
        filtered = filtered.filter(order => {
          const d = new Date(order.orderDate);
          return isWithin(d, sevenDaysAgo, now);
        });
        break;
      case "custom":
        if (customStart && customEnd) {
          filtered = filtered.filter(order => {
            const d = new Date(order.orderDate);
            return isWithin(d, customStart, customEnd);
          });
        }
        break;
      default:
        break;
    }

    filtered.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
    setFilteredOrders(filtered);
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString();
  const formatDateTime = (dateTimeString: string) => new Date(dateTimeString).toLocaleString();
  const isNewOrder = (orderDate: string) => (Date.now() - new Date(orderDate).getTime()) / (1000 * 60) < 60;

  const totalAmount = filteredOrders.reduce((sum, order) => sum + order.amount, 0);

  const exportToCSV = () => {
    const csvData = filteredOrders.map((order) => ({
      OrderID: order.orderId,
      Name: order.fullName,
      Email: order.email,
      Phone: order.phoneNumber,
      Gender: order.gender,
      DOB: formatDate(order.dob),
      PlaceOfBirth: order.placeOfBirth,
      AdditionalProducts: order.additionalProducts.join(", "),
      Amount: order.amount,
      OrderDate: formatDateTime(order.orderDate),
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Order Records
              </span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Total Orders: <span className="font-semibold">{filteredOrders.length}</span>
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-3 justify-between items-center">
            <div className="flex gap-2 flex-wrap">
              {["all", "today", "yesterday", "last7days", "custom"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as FilterType)}
                  className={clsx(
                    "px-3 py-1 rounded-full border text-sm",
                    filter === f
                      ? "bg-primary text-white border-primary"
                      : "bg-muted text-foreground border-border"
                  )}
                >
                  {f === "all" && "All"}
                  {f === "today" && "Today"}
                  {f === "yesterday" && "Yesterday"}
                  {f === "last7days" && "Last 7 Days"}
                  {f === "custom" && "Custom Range"}
                </button>
              ))}
            </div>

            <button
              onClick={exportToCSV}
              className="bg-primary text-white text-sm px-4 py-1.5 rounded-full shadow hover:bg-primary/90 transition"
            >
              Export CSV
            </button>
          </div>

          {filter === "custom" && (
            <div className="mb-6 flex gap-4 items-center">
              <DatePicker
                selected={customStart}
                onChange={(date) => setCustomStart(date)}
                selectsStart
                startDate={customStart}
                endDate={customEnd}
                placeholderText="Start Date"
                className="border rounded px-2 py-1"
              />
              <DatePicker
                selected={customEnd}
                onChange={(date) => setCustomEnd(date)}
                selectsEnd
                startDate={customStart}
                endDate={customEnd}
                placeholderText="End Date"
                className="border rounded px-2 py-1"
              />
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            {loading ? (
              <Card className="bg-card border-border">
                <CardContent className="p-8 text-center">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading orders...</p>
                </CardContent>
              </Card>
            ) : error ? (
              <Card className="bg-card border-border">
                <CardContent className="p-8 text-center">
                  <p className="text-destructive font-medium">{error}</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card border-border overflow-hidden">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/50 border-b border-border">
                          <th className="px-4 py-3 text-left font-medium">Order ID</th>
                          <th className="px-4 py-3 text-left font-medium">Name</th>
                          <th className="px-4 py-3 text-left font-medium">Email</th>
                          <th className="px-4 py-3 text-left font-medium">Phone</th>
                          <th className="px-4 py-3 text-left font-medium">Gender</th>
                          <th className="px-4 py-3 text-left font-medium">DOB</th>
                          <th className="px-4 py-3 text-left font-medium">Place of Birth</th>
                          <th className="px-4 py-3 text-left font-medium">Additional Products</th>
                          <th className="px-4 py-3 text-left font-medium">Amount</th>
                          <th className="px-4 py-3 text-left font-medium">Order Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr
                            key={order._id}
                            className={clsx(
                              "border-b border-border transition-colors",
                              isNewOrder(order.orderDate)
                                ? "bg-green-50 hover:bg-green-100"
                                : "hover:bg-muted/30"
                            )}
                          >
                            <td className="px-4 py-3">{order.orderId}</td>
                            <td className="px-4 py-3 font-medium">{order.fullName}</td>
                            <td className="px-4 py-3">{order.email}</td>
                            <td className="px-4 py-3">{order.phoneNumber}</td>
                            <td className="px-4 py-3 capitalize">{order.gender}</td>
                            <td className="px-4 py-3">{formatDate(order.dob)}</td>
                            <td className="px-4 py-3">{order.placeOfBirth}</td>
                            <td className="px-4 py-3">
                              <div className="flex flex-wrap gap-1">
                                {order.additionalProducts.map((product, i) => (
                                  <span key={i} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                                    {product}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-4 py-3 font-semibold text-primary">₹{order.amount}</td>
                            <td className="px-4 py-3 text-muted-foreground">{formatDateTime(order.orderDate)}</td>
                          </tr>
                        ))}
                      </tbody>
                      {filteredOrders.length > 0 && (
                        <tfoot>
                          <tr className="bg-muted/50 border-t border-border font-semibold">
                            <td colSpan={8} className="px-4 py-3 text-right">Total</td>
                            <td className="px-4 py-3 text-primary">₹{totalAmount}</td>
                            <td></td>
                          </tr>
                        </tfoot>
                      )}
                    </table>

                    {filteredOrders.length === 0 && (
                      <div className="p-8 text-center text-muted-foreground">No orders found</div>
                    )}
                  </div>
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
