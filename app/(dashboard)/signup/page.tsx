"use client";
import { Signup } from "@/app/actions/signup";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [serverError, setServerError] = useState("");
  const router = useRouter();

  const validatePassword = (password: string) => {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!password) return "Password is required";
    if (!strongRegex.test(password)) {
      return "Use uppercase, lowercase, number & special char (8+ chars)";
    }
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      const strength = validatePassword(value);
      setErrors((prev) => ({ ...prev, password: strength }));
      setPasswordStrength(strength ? "Weak" : "Strong");
    }

    if (name === "confirmPassword") {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: value !== form.password ? "Passwords do not match" : "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = form.name ? "" : "Name is required";
    const emailError = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
      ? ""
      : "Valid email required";

    const passwordError = validatePassword(form.password);
    const confirmError =
      form.password === form.confirmPassword ? "" : "Passwords do not match";

    const formHasErrors =
      nameError || emailError || passwordError || confirmError;

    setErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmError,
    });

    if (formHasErrors) return;

    const res = await Signup({
      name: form.name,
      email: form.email,
      password: form.password,
    });

    if (res.success) {
      router.push("/login");
    } else {
      setServerError(res.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">
          Sign Up
        </h2>
        {serverError && (
          <p className="text-red-500 mb-4 text-center">{serverError}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            {form.password && (
              <p
                className={`text-sm ${
                  passwordStrength === "Strong"
                    ? "text-green-600"
                    : "text-orange-500"
                }`}
              >
                Strength: {passwordStrength}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-blue-500"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            className="text-blue-600 hover:underline"
            onClick={() => router.push("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
