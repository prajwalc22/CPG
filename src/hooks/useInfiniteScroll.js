import { useState, useEffect, useCallback } from "react";

const useInfiniteScroll = (callback, options = {}) => {
  const { initialPage = 1, pageSize = 12, threshold = 400 } = options;
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;

    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollHeight - scrollTop - clientHeight < threshold) {
      loadMore();
    }
  }, [loading, hasMore]);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const newData = await callback(page, pageSize);

      if (!newData || newData.length === 0 || newData.length < pageSize) {
        setHasMore(false);
      } else {
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      setError(err);
      console.error("Error loading more data:", err);
    } finally {
      setLoading(false);
    }
  }, [callback, loading, hasMore, page, pageSize]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return {
    loading,
    hasMore,
    error,
    loadMore,
    page,
    resetPage: () => setPage(initialPage),
  };
};

export default useInfiniteScroll;
