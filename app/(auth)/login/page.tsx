// pages/LoginPage.tsx
"use client";

import { postMethod } from "@/utils/api/postMethod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    strEmailOrPhone: "",
    strPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await postMethod({
        route: `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
        postData: formData,
      });
      if (response?.data) {
        const data = await signIn("credentials", {
          email: formData.strEmailOrPhone,
          name: response?.data?.data?.name,
          accessToken: response?.data?.data?.accessToken,
          phone: response?.data?.data?.phone,
          refreshToken: response?.data?.data?.refreshToken,
          access_token_expiresIn: response?.data?.data?.access_token_expiresIn,
          refresh_token_expiresIn:
            response?.data?.data?.refresh_token_expiresIn,
          redirect: false,
        });
        if (data?.ok) {
          router.push("/");
        }
      }
    } catch (error) {
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="strEmailOrPhone"
                value={formData.strEmailOrPhone}
                onChange={handleChange}
                className="border-gray-300 border w-full rounded-md px-3 py-2 text-black"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="strPassword"
                  value={formData.strPassword}
                  onChange={handleChange}
                  className="border-gray-300 border w-full rounded-md px-3 py-2 text-black"
                />
                {formData.strPassword && (
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 px-4 py-2 text-black"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                )}
              </div>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                "Login"
              )}
            </button>
          </form>
          <p className="mt-4 text-gray-600 text-sm">
            New User?{" "}
            <a href="/registration" className="text-blue-500 hover:underline">
              Registration here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
