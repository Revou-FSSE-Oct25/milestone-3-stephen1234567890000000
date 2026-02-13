"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@/component/Container";
import useAuthStore from "@/store/useAuthStore";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Fetch users dari API
      const res = await fetch("https://api.escuelajs.co/api/v1/users");
      const users = await res.json();

      // Cari user berdasarkan email
      const user = users.find((u) => u.email === email);

      if (!user) {
        setError("Email tidak ditemukan");
        setLoading(false);
        return;
      }

      // Validasi password (simple check - password default adalah email)
      if (password !== user.password) {
        setError("Password salah");
        setLoading(false);
        return;
      }

      // Simpan auth state
      const token = `token_${user.id}`;
      login(user, token);

      // Set cookie
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;

      // Redirect ke checkout atau home
      router.push("/checkout");
    } catch (err) {
      setError("Terjadi kesalahan saat login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="max-w-md mx-auto py-12">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">Login</h1>

        {error && (
          <div className="mb-4 p-4 bg-red-900/20 border border-red-500/50 rounded-lg">
            <p className="text-red-300">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              required
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-accent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 rounded-lg bg-accent text-black font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        <p className="text-neutral-400 text-sm text-center mt-6">
          Demo: Gunakan email dari API. Password = Email.
        </p>
      </div>
    </Container>
  );
}
