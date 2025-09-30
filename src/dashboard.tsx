import { useEffect, useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch("http://localhost:3000/api/session"); // your backend route
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Error fetching session:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No session data found</p>;

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold">User Session</h2>
      <p><strong>Name:</strong> {data.user?.name}</p>
      <p><strong>Email:</strong> {data.user?.email}</p>
      <p><strong>Token:</strong> {data.session?.token}</p>
      <p><strong>Expires At:</strong> {data.session?.expiresAt}</p>
    </div>
  );
}
