"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState(199);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [logs, setLogs] = useState<string[]>([]);
  const [orderIdFromUrl, setOrderIdFromUrl] = useState<string | null>(null);

  const API_BASE = "https://skyscale-be-cr0i.onrender.com";

  const log = (...args: any[]) => {
    const time = new Date().toISOString().split("T")[1].replace("Z", "");
    setLogs((prev) => [
      ...prev,
      `[${time}] ${args
        .map((x) => (typeof x === "string" ? x : JSON.stringify(x, null, 2)))
        .join(" ")}`,
    ]);
  };

  const isValidMobile = (m: string) => /^\d{10}$/.test(m);

  const badge = (text: string, cls?: string) => {
    const colors: Record<string, string> = {
      ok: "bg-green-600",
      bad: "bg-red-600",
      warn: "bg-yellow-500",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs text-white ${
          colors[cls || "warn"] || ""
        }`}
      >
        {text}
      </span>
    );
  };

  const createPayment = async () => {
    if (!amount || amount < 1) return alert("Enter valid amount (>= 1).");
    if (!isValidMobile(mobile)) return alert("Enter a valid 10-digit mobile.");

    try {
      setStatus("Creating payment…");
      const res = await fetch(`${API_BASE}/api/phonepe-v2/pay`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, name, mobile, description }),
      });
      const json = await res.json();
      log("POST /pay response:", json);

      if (!json.success) {
        setStatus("Create payment failed");
        return alert(
          json.error?.message || json.error || "Create payment failed"
        );
      }

      const { redirectUrl, merchantOrderId } = json.data || {};
      if (merchantOrderId)
        localStorage.setItem("pp_last_order_id", merchantOrderId);
      setStatus(`Order: ${merchantOrderId}`);

      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        setStatus("No redirect URL from server");
      }
    } catch (e: any) {
      log("Client error:", e.message);
      setStatus("Client error");
    }
  };

  const checkStatus = async (oid: string, loud?: boolean) => {
    try {
      setStatus("Checking status…");
      const res = await fetch(
        `${API_BASE}/api/phonepe-v2/status/${encodeURIComponent(oid)}`
      );
      const json = await res.json();
      if (loud) log("GET /status response:", json);

      if (!json.success) {
        setStatus("Status error");
        if (loud) alert(json.error?.message || json.error || "Status error");
        return null;
      }

      const data = json.data || {};
      const state = data.state || data.paymentState || data.code || "UNKNOWN";
      const cls = state.toUpperCase().includes("SUCCESS")
        ? "ok"
        : state.toUpperCase().includes("FAIL")
        ? "bad"
        : "warn";

      setStatus(`${state} ${data.amount ? `• amount=${data.amount}` : ""}`);
      return state.toUpperCase();
    } catch (e: any) {
      log("Status error:", e.message);
      setStatus("Client error");
      if (loud) alert(e.message);
      return null;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlOrderId = new URLSearchParams(window.location.search).get(
        "orderId"
      );
      if (urlOrderId) {
        setOrderIdFromUrl(urlOrderId);
        localStorage.setItem("pp_last_order_id", urlOrderId);
        checkStatus(urlOrderId, true);
      } else {
        const last = localStorage.getItem("pp_last_order_id");
        if (last) setOrderIdFromUrl(last);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0b12] text-[#eaf0ff] p-6">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl mb-4">PhonePe v2 – Minimal Payment</h1>

        <div className="bg-[#121425] border border-[#23263c] rounded-xl p-4 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-400">Name</label>
              <input
                className="w-full p-2 rounded-lg bg-[#0e1020] border border-[#262a3f]"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Raghib Najmi"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400">Mobile</label>
              <input
                className="w-full p-2 rounded-lg bg-[#0e1020] border border-[#262a3f]"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="9999999999"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400">Amount (INR)</label>
            <input
              type="number"
              className="w-full p-2 rounded-lg bg-[#0e1020] border border-[#262a3f]"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </div>

          <div>
            <label className="text-xs text-gray-400">Description</label>
            <textarea
              className="w-full p-2 rounded-lg bg-[#0e1020] border border-[#262a3f]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-400 text-black font-bold"
            onClick={createPayment}
          >
            Pay with PhonePe
          </button>

          {status && <div className="text-sm">{status}</div>}

          <div className="bg-[#0c0d18] border border-[#23263c] rounded-lg p-2 text-xs h-40 overflow-auto">
            {logs.map((l, i) => (
              <div key={i}>{l}</div>
            ))}
          </div>
        </div>

        <div className="bg-[#121425] border border-[#23263c] rounded-xl p-4 space-y-3 mt-6">
          <div className="text-sm">
            {orderIdFromUrl
              ? `OrderId: ${orderIdFromUrl}`
              : "No orderId found in URL or local storage"}
          </div>
          {orderIdFromUrl && (
            <button
              className="w-full py-2 rounded-lg bg-[#0e1020] border border-[#262a3f]"
              onClick={() => checkStatus(orderIdFromUrl, true)}
            >
              Check Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
