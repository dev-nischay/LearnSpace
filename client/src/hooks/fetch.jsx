import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = "http://localhost:3000/api/v1/users/";

/**
 * Custom hook for making API requests with authentication and error handling
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} options - The fetch options
 * @param {('GET'|'POST'|'PUT'|'DELETE'|'PATCH')} options.method - HTTP method
 * @param {Object} [options.body] - Request body
 * @param {boolean} [options.requiresAuth] - Whether to include auth token
 * @param {Object} [options.headers] - Additional headers
 * @returns {Object} Hook state and methods
 */
export const useFetch = (endpoint, options) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = useAuthStore((state) => state.token);

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  /**
   * Make the API request
   * @param {Object} [bodyOverride] - Optional body that overrides options.body
   */
  const request = async (bodyOverride) => {
    try {
      setLoading(true);
      setError(null);

      const headers = {
        "Content-Type": "application/json",
        ...options.headers,
      };

      if (options.requiresAuth && token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: options.method,
        headers,
        body:
          bodyOverride || options.body
            ? JSON.stringify(bodyOverride ?? options.body)
            : undefined,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || "Request failed");
      }

      setData(json);
      return json;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
    reset,
    setError,
  };
};
