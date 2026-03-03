import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@/lib/supabase/client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <h1 className="font-playfair text-3xl font-normal italic text-[#2d3436] mb-2">
            Admin Portal
          </h1>
          <p className="text-xs text-[#95a5a6] uppercase tracking-widest">
            JBS Soaps & Co
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-[#e0e0e0] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#2d3436] transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest mb-2 text-[#2d3436]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-[#e0e0e0] bg-white px-4 py-3 text-sm focus:outline-none focus:border-[#2d3436] transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-[#2d3436] text-white py-4 text-xs uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-60"
          >
            {loading && <LoadingSpinner className="w-4 h-4" />}
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
