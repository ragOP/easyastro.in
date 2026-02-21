"use client";

import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "@/lib/backendUrl";

interface LogEntry {
    _id: string;
    path: string;
    timestamp: string;
}

interface LogStats {
    totalLogs: number | null;
    pathCount: number | null;
    searchedPath: string;
}

const LogsPage = () => {
    const [stats, setStats] = useState<LogStats>({
        totalLogs: null,
        pathCount: null,
        searchedPath: "",
    });
    const [pathInput, setPathInput] = useState("");
    const [loading, setLoading] = useState({
        total: true,
        path: false,
        allData: false,
    });
    const [error, setError] = useState<string | null>(null);
    const [allLogs, setAllLogs] = useState<LogEntry[] | null>(null);
    const [showTable, setShowTable] = useState(false);

    // Fetch total logs on mount
    useEffect(() => {
        const fetchTotalLogs = async () => {
            try {
                setLoading((prev) => ({ ...prev, total: true }));
                const response = await fetch(`${BACKEND_URL}/api/log3/get-logs`);
                const data = await response.json();

                if (data.success) {
                    setStats((prev) => ({ ...prev, totalLogs: data.data }));
                } else {
                    setError("Failed to fetch total logs");
                }
            } catch (err) {
                setError("Error connecting to server");
                console.error("Fetch total logs error:", err);
            } finally {
                setLoading((prev) => ({ ...prev, total: false }));
            }
        };

        fetchTotalLogs();
    }, []);

    // Search logs by path
    const handleSearchByPath = async () => {
        if (!pathInput.trim()) {
            setError("Please enter a path to search");
            return;
        }

        try {
            setLoading((prev) => ({ ...prev, path: true }));
            setError(null);

            const response = await fetch(
                `${BACKEND_URL}/api/log/get-log-by-path?path=${encodeURIComponent(pathInput)}`
            );
            const data = await response.json();

            if (data.success) {
                setStats((prev) => ({
                    ...prev,
                    pathCount: data.data,
                    searchedPath: pathInput,
                }));
            } else {
                setError(data.message || "Failed to fetch logs by path");
            }
        } catch (err) {
            setError("Error connecting to server");
            console.error("Fetch logs by path error:", err);
        } finally {
            setLoading((prev) => ({ ...prev, path: false }));
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSearchByPath();
        }
    };

    // Fetch all logs data
    const handleFetchAllData = async () => {
        if (allLogs !== null) {
            // Toggle visibility if data already loaded
            setShowTable(!showTable);
            return;
        }

        try {
            setLoading((prev) => ({ ...prev, allData: true }));
            setError(null);

            const response = await fetch(`${BACKEND_URL}/api/log/get-all-data`);
            const data = await response.json();

            if (data.success) {
                setAllLogs(data.data);
                setShowTable(true);
            } else {
                setError("Failed to fetch all logs data");
            }
        } catch (err) {
            setError("Error connecting to server");
            console.error("Fetch all data error:", err);
        } finally {
            setLoading((prev) => ({ ...prev, allData: false }));
        }
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        📊 Logs Dashboard
                    </h1>
                    <p className="text-gray-400">Monitor and track your application logs</p>
                </div>

                {/* Error Alert */}
                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Total Logs Card */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Total Logs</h2>
                            <span className="text-2xl">📝</span>
                        </div>
                        {loading.total ? (
                            <div className="flex items-center justify-center h-16">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            </div>
                        ) : (
                            <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                {stats.totalLogs?.toLocaleString() ?? "N/A"}
                            </p>
                        )}
                        <p className="text-gray-400 text-sm mt-2">All recorded entries</p>
                    </div>

                    {/* Path Search Result Card */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-white">Path Logs</h2>
                            <span className="text-2xl">🔍</span>
                        </div>
                        {loading.path ? (
                            <div className="flex items-center justify-center h-16">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            </div>
                        ) : stats.pathCount !== null ? (
                            <>
                                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                                    {stats.pathCount.toLocaleString()}
                                </p>
                                <p className="text-gray-400 text-sm mt-2 truncate">
                                    Path: {stats.searchedPath}
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-4xl font-bold text-gray-500">—</p>
                                <p className="text-gray-400 text-sm mt-2">Search a path below</p>
                            </>
                        )}
                    </div>
                </div>

                {/* Search Section */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
                    <h2 className="text-xl font-semibold text-white mb-4">
                        🔎 Search Logs by Path
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={pathInput}
                            onChange={(e) => setPathInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter path (e.g., /api/users)"
                            className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                        <button
                            onClick={handleSearchByPath}
                            disabled={loading.path}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-purple-500/25"
                        >
                            {loading.path ? "Searching..." : "Search"}
                        </button>
                    </div>

                    {/* Quick Path Buttons */}
                    <div className="mt-4">
                        <p className="text-gray-400 text-sm mb-2">Quick search:</p>
                        <div className="flex flex-wrap gap-2">
                            {["landing", "cart", "order"].map(
                                (path) => (
                                    <button
                                        key={path}
                                        onClick={() => {
                                            setPathInput(path);
                                        }}
                                        className="px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 border border-white/20 rounded-full text-gray-300 hover:text-white transition-all"
                                    >
                                        {path}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* All Data Section */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold text-white">
                            📋 All Logs Data
                        </h2>
                        <button
                            onClick={handleFetchAllData}
                            disabled={loading.allData}
                            className="px-4 py-2 bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                        >
                            {loading.allData
                                ? "Loading..."
                                : allLogs !== null
                                    ? showTable
                                        ? "Hide Data"
                                        : "Show Data"
                                    : "Load All Data"}
                        </button>
                    </div>

                    {showTable && allLogs && (
                        <div className="overflow-x-auto">
                            <div className="max-h-96 overflow-y-auto rounded-lg">
                                <table className="w-full text-left">
                                    <thead className="sticky top-0 bg-white/20 backdrop-blur-lg">
                                        <tr>
                                            <th className="px-4 py-3 text-white font-semibold">#</th>
                                            <th className="px-4 py-3 text-white font-semibold">Path</th>
                                            <th className="px-4 py-3 text-white font-semibold">Time</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/10">
                                        {allLogs.length === 0 ? (
                                            <tr>
                                                <td colSpan={3} className="px-4 py-8 text-center text-gray-400">
                                                    No logs found
                                                </td>
                                            </tr>
                                        ) : (
                                            allLogs.map((log, index) => (
                                                <tr
                                                    key={log._id}
                                                    className="hover:bg-white/5 transition-colors"
                                                >
                                                    <td className="px-4 py-3 text-gray-300">{index + 1}</td>
                                                    <td className="px-4 py-3 text-white font-mono text-sm">
                                                        {log.path}
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-300 text-sm">
                                                        {log.timestamp || '-'}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-gray-400 text-sm mt-3">
                                Total entries: {allLogs.length.toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>

                {/* Refresh Button */}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => window.location.reload()}
                        className="text-gray-400 hover:text-white text-sm underline transition-colors"
                    >
                        Refresh Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LogsPage;