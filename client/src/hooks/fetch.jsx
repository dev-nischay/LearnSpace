import { useState } from "react";
import { useAuthStore } from "../store/authStore";
export const useFetch = (url, method, body) => {
  const [data, setData] = useState("");
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      setData(json);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  return {
    data: data,
    err: err,
    loading: loading,
    request: request,
  };
};
