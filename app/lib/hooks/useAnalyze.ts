"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useAnalyze = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState<any>(null);

    const analyze = async (inputUrl: string) => {
        try {
            setLoading(true);
            setError("");

            if (!inputUrl) {
                setError("URL is required");
                return;
            }

            const res = await axios.post("/api/analyze", { url: inputUrl });
            const data = res.data;

            if (data?.error) {
                setError(data.error.message || "Something went wrong");
                return;
            }
            setData(data);
            return data;

        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Something went wrong";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return {
        loading,
        error,
        setError,
        analyze,
        data
    };
};