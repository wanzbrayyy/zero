"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // MENCEGAH REFRESH HALAMAN
    setError("");
    setIsLoading(true);

    try {
      await authService.register(formData);
      // Redirect ke login setelah sukses
      router.push("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1519638399535-1b036603ac77?q=80&w=2000')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
      
      <div className="relative z-10 w-full max-w-md bg-black/80 p-8 md:p-12 rounded-lg shadow-2xl border border-gray-800">
        <h2 className="text-3xl font-bold mb-6 text-white">Create Account</h2>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input 
              name="firstName"
              placeholder="First Name" 
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Input 
              name="lastName"
              placeholder="Last Name" 
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <Input 
            name="username"
            placeholder="Username" 
            value={formData.username}
            onChange={handleChange}
            required
          />
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
            className="w-full mt-6" 
            isLoading={isLoading}
          >
            Register
          </Button>
        </form>

        <div className="mt-8 text-gray-400 text-sm text-center">
          <p>
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:underline font-medium">
              Sign in here
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
