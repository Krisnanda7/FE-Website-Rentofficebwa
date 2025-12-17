import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/customer/register",
        { name, email, password },
        {
          headers: {
            "X-API-KEY": "wkwkwkwkjj0901",
          },
        }
      );

      console.log("Register success:", response.data);
      alert("Registrasi berhasil! Silakan login.");
      window.location.href = "/login";
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Gagal registrasi, mungkin email sudah terdaftar."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1F44] to-[#0E2A5A] px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Daftar untuk mulai mengelola bisnis Anda
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Nama lengkap"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                placeholder="nama@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#0A1F44]"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0A1F44] text-white font-semibold py-3 rounded-xl hover:bg-[#0E2A5A] transition duration-300 shadow-md disabled:opacity-60"
            >
              {isLoading ? "Mendaftar..." : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="font-semibold text-[#0A1F44] hover:underline"
            >
              Login di sini
            </Link>
          </div>
        </div>

        {/* Legal */}
        <p className="text-center text-xs text-gray-300 mt-6">
          Dengan mendaftar, Anda menyetujui{" "}
          <span className="underline cursor-pointer">Syarat & Ketentuan</span>{" "}
          dan{" "}
          <span className="underline cursor-pointer">Kebijakan Privasi</span>
        </p>
      </div>
    </div>
  );
}
