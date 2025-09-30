import { useEffect, useState } from "react";

export default function Dashboard() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await fetch("http://localhost:3000/api/me", {
          credentials: "include", // send cookies with request
        });

        if (!res.ok) throw new Error("Failed to fetch /api/me");

        const data = await res.json();
        setSession(data);
      } catch (err) {
        console.error("Error fetching /api/me:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!session) return <p>No session found</p>;

  return (
    <div>
      <h2>User Info</h2>
      <p><strong>Name:</strong> {session.user?.name}</p>
      <p><strong>Email:</strong> {session.user?.email}</p>
      <p><strong>Token:</strong> {session.session?.token}</p>
      <p><strong>Expires:</strong> {session.session?.expiresAt}</p>
    </div>
  );
}
