"use client";

import React, { useState, useEffect } from 'react';
import Sister2Header from '@/components/sister2/sister2-header';
import { Card, CardContent } from "@/components/ui/card";
import { BACKEND_URL } from "@/lib/backendUrl";
import { Heart, Eye, Download, Calendar, Clock, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
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

export default function Sister2RecordsPage() {
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
      const response = await fetch(`${BACKEND_URL}/api/lander3/get-orders`);
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
    link.setAttribute("download", "sister2-orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(236,72,153,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Sister2 Header */}
      <Sister2Header />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto py-8 px-4">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
            <Heart className="w-8 h-8 text-pink-400" />
            <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-slate-300 bg-clip-text text-transparent">
              Sister2 Order Records
            </span>
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Total Orders: <span className="font-semibold text-white">{filteredOrders.length}</span>
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-wrap gap-3 justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {["all", "today", "yesterday", "last7days", "custom"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as FilterType)}
                className={clsx(
                  "px-3 py-1 rounded-full border text-sm",
                  filter === f
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-slate-800/50 text-gray-300 border-white/20"
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
            className="bg-pink-500 text-white text-sm px-4 py-1.5 rounded-full shadow hover:bg-pink-600 transition"
          >
            Export CSV
          </button>
        </div>

        {/* Custom Date Range */}
        {filter === "custom" && (
          <div className="mb-6 flex gap-4 items-center">
            <input
              type="date"
              value={customStart ? customStart.toISOString().split("T")[0] : ""}
              onChange={(e) => setCustomStart(new Date(e.target.value))}
              className="border border-white/20 px-2 py-1 rounded-md text-sm text-white bg-slate-800/50"
            />
            <input
              type="date"
              value={customEnd ? customEnd.toISOString().split("T")[0] : ""}
              onChange={(e) => setCustomEnd(new Date(e.target.value))}
              className="border border-white/20 px-2 py-1 rounded-md text-sm text-white bg-slate-800/50"
            />
          </div>
        )}

        {/* Orders Table */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <Card className="bg-slate-800/50 border-white/20">
              <CardContent className="p-8 text-center">
                <div className="w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-300">Loading orders...</p>
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="bg-slate-800/50 border-white/20">
              <CardContent className="p-8 text-center">
                <p className="text-red-400 font-medium">{error}</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-800/50 border-white/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-700/50 border-b border-white/20">
                        <th className="px-4 py-3 text-left font-medium text-white">Order ID</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Name</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Email</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Phone</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Gender</th>
                        <th className="px-4 py-3 text-left font-medium text-white">DOB</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Place of Birth</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Additional Products</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Amount</th>
                        <th className="px-4 py-3 text-left font-medium text-white">Order Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr
                          key={order._id}
                          className={clsx(
                            "border-b border-white/10 transition-colors",
                            isNewOrder(order.orderDate)
                              ? "bg-green-900/20 hover:bg-green-900/30"
                              : "hover:bg-slate-700/30"
                          )}
                        >
                          <td className="px-4 py-3 text-gray-300">{order.orderId}</td>
                          <td className="px-4 py-3 font-medium text-white">{order.fullName}</td>
                          <td className="px-4 py-3 text-gray-300">{order.email}</td>
                          <td className="px-4 py-3 text-gray-300">{order.phoneNumber}</td>
                          <td className="px-4 py-3 capitalize text-gray-300">{order.gender}</td>
                          <td className="px-4 py-3 text-gray-300">{formatDate(order.dob)}</td>
                          <td className="px-4 py-3 text-gray-300">{order.placeOfBirth}</td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {order.additionalProducts.map((product, i) => (
                                <span key={i} className="px-2 py-1 bg-pink-900/30 text-pink-300 text-xs rounded-full border border-pink-500/30">
                                  {product} - ₹199
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 font-semibold text-pink-300">₹{order.amount}</td>
                          <td className="px-4 py-3 text-gray-400">{formatDateTime(order.orderDate)}</td>
                        </tr>
                      ))}
                    </tbody>
                    {filteredOrders.length > 0 && (
                      <tfoot>
                        <tr className="bg-slate-700/50 border-t border-white/20 font-semibold">
                          <td colSpan={8} className="px-4 py-3 text-right text-white">Total</td>
                          <td className="px-4 py-3 text-pink-300">₹{totalAmount}</td>
                          <td></td>
                        </tr>
                      </tfoot>
                    )}
                  </table>

                  {filteredOrders.length === 0 && (
                    <div className="p-8 text-center text-gray-400">No orders found</div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
} 