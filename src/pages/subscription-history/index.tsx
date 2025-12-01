import "./index.scss";
import { useEffect, useState, useRef, useCallback } from "react";
import mpesa_logo from "../../assets/images/mpesa.png";
import { FiFileText, FiHash, FiCalendar, FiRefreshCcw } from "react-icons/fi";
import { notification_api } from "../../utils/api";

interface SubscriptionItem {
  id: string;
  start_date?: string;
  end_date?: string;
  mpesa_reference: string;
  invoice_id: string;
  amount: number;
  status: string;
  provider?: string;
}

interface Pagination {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export const SubscriptionHistoryPage = () => {
  const [history, setHistory] = useState<SubscriptionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchingMore, setFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  const fetchHistory = async (page = 1, per_page = 15, append = false) => {
    try {
      if (!append) setLoading(true);
      else setFetchingMore(true);

      const { response, data } = await notification_api(
        `/subscription/history?page=${page}&per_page=${per_page}`
      );

      if (!response.ok || !data.success) {
        throw new Error(
          data?.message || "Failed to fetch subscription history"
        );
      }

      const list = data?.data?.Subscription || [];

      const formatted = list.map((item: any) => ({
        id: item.id,
        start_date: item.start_date,
        end_date: item.end_date,
        reference: item.mpesa_reference || item.reference || "-",
        invoice_id: item.invoice_id || "-",
        amount: Number(item.amount) || 0,
        status: item.status || "Unknown",
        provider: item.provider || "M-PESA",
      }));

      setHistory((prev) => (append ? [...prev, ...formatted] : formatted));
      setPagination(data.pagination || null);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setFetchingMore(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchHistory();
  }, []);

  // Infinite scroll intersection observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && pagination) {
        if (pagination.page < pagination.total_pages && !fetchingMore) {
          fetchHistory(pagination.page + 1, pagination.per_page, true);
        }
      }
    },
    [pagination, fetchingMore]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [handleObserver]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="subscription-history-page">
      <h1>
        Subscription History{" "}
        <FiRefreshCcw
          className="refresh-icon"
          onClick={() => fetchHistory(1, 15, false)}
        />
      </h1>

      {loading && <p>Loading subscription history...</p>}
      {error && <p className="error">{error}</p>}

      <div className="history-list">
        {history.map((item) => (
          <div className="history-card" key={item.id}>
            <div className="top">
              <img src={mpesa_logo} alt="provider" className="provider-logo" />
              <span className={`status ${item.status.toLowerCase()}`}>
                {item.status}
              </span>
            </div>

            <div className="details-column">
              <div className="detail-row">
                <FiFileText className="icon" />
                <span>Invoice: {item.invoice_id}</span>
              </div>

              <div className="detail-row">
                <FiHash className="icon" />
                <span>Reference: {item.mpesa_reference || "N/A"}</span>
              </div>

              <div className="detail-row">
                <FiCalendar className="icon" />
                <span>{formatDate(item.start_date)}</span>
              </div>
            </div>

            <p className="amount">Ksh {item.amount}</p>
          </div>
        ))}

        {/* Infinite Scroll Loader */}
        <div ref={loaderRef} className="infinite-loader">
          {fetchingMore && <p>Loading more...</p>}
        </div>
      </div>
    </div>
  );
};
