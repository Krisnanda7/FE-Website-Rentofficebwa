import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/customer/login",
        { email, password },
        {
          headers: {
            "X-API-KEY": "wkwkwkwkjj0901",
          },
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("customer", JSON.stringify(res.data.customer));
      alert("Login berhasil!");
      window.location.href = "/";
    } catch {
      alert("Login gagal, periksa email atau password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1F44] to-[#0E2A5A] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-500 mt-2 text-sm">
            Login untuk melanjutkan pengalaman bisnis Anda
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A1F44] text-white font-semibold py-3 rounded-xl hover:bg-[#0E2A5A] transition duration-300 shadow-md"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="font-semibold text-[#0A1F44] hover:underline"
          >
            Register di sini
          </Link>
        </div>
      </div>
    </div>
  );
}
