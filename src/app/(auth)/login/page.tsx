"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authService.login(formData);
      // Simpan token (bisa di localStorage atau cookie)
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=2000')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      <div className="relative z-10 w-full max-w-md bg-black/80 p-8 md:p-12 rounded-lg shadow-2xl border border-gray-800">
        <h2 className="text-3xl font-bold mb-8 text-white">Sign In</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input 
            name="email"
            type="email"
            placeholder="Email Address" 
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input 
            name="password"
            type="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <Button 
            type="submit" 
            className="w-full mt-4" 
            isLoading={isLoading}
          >
            Sign In
          </Button>
          
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded bg-gray-600 border-none" />
              Remember me
            </label>
            <Link href="#" className="hover:underline">Need help?</Link>
          </div>
        </form>

        <div className="mt-10 text-gray-400 text-center">
          <p>
            New to ZERO-W-ANIME?{" "}
            <Link href="/register" className="text-white hover:underline font-medium">
              Sign up now
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
