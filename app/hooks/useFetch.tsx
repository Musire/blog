// hooks/useFetch.ts
import { useState, useEffect, useRef } from "react";

interface UseFetchOptions extends RequestInit {
  immediate?: boolean; // if false, fetch won't start automatically
}

export default function useFetch<T = any>(url: string, options: UseFetchOptions = {}) {
  const { immediate = true, ...fetchOptions } = options;
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(immediate);
  const abortRef = useRef<AbortController | null>(null);

  const execute = async (overrideUrl?: string) => {
    setLoading(true);
    setError(null);
    abortRef.current = new AbortController();

    try {
      const res = await fetch(overrideUrl || url, {
        ...fetchOptions,
        signal: abortRef.current.signal,
      });
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
      const json = await res.json();
      setData(json);
      return json;
    } catch (err: any) {
      if (err.name !== "AbortError") setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (immediate) execute();

    return () => {
      abortRef.current?.abort(); // cancel on unmount
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const cancel = () => {
    abortRef.current?.abort();
  };

  return { data, error, loading, execute, cancel };
}
