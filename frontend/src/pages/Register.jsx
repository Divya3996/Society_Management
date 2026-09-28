import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaLock,
  FaSpinner,
} from "react-icons/fa";

import AuthLayout from "../components/AuthLayout";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    flatNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let sanitized = value;
    if (name === "phone") sanitized = value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, [name]: sanitized }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Full name is required.";
    if (!formData.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Enter a valid email.";
    if (!formData.phone) e.phone = "Phone number is required.";
    else if (formData.phone.length !== 10) e.phone = "Phone must be 10 digits.";
    if (!formData.flatNumber.trim()) e.flatNumber = "Flat number is required.";
    if (!formData.password) e.password = "Password is required.";
    else if (formData.password.length < 6)
      e.password = "Password must be at least 6 characters.";
    if (!formData.confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword)
      e.confirmPassword = "Passwords do not match.";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        flatNumber: formData.flatNumber,
        password: formData.password,
      });
      navigate("/resident/dashboard", { replace: true });
    } catch {
      // Error toast handled in AuthContext
    }
  };

  return (
    <AuthLayout
      title="Create Your Account"
      subtitle="Join your society management system"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <InputField
          label="Full Name"
          type="text"
          placeholder="Enter your full name"
          icon={<FaUser />}
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        <InputField
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          icon={<FaEnvelope />}
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <InputField
          label="Phone Number"
          type="tel"
          placeholder="10-digit mobile number"
          icon={<FaPhone />}
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          maxLength={10}
        />

        <InputField
          label="Flat Number"
          type="text"
          placeholder="e.g. A-101"
          icon={<FaHome />}
          name="flatNumber"
          value={formData.flatNumber}
          onChange={handleChange}
          error={errors.flatNumber}
        />

        <PasswordField
          label="Password"
          placeholder="Create a password (min. 6 chars)"
          icon={<FaLock />}
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Confirm your password"
          icon={<FaLock />}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 mt-2"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <p className="text-center text-sm text-slate-600 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold ml-1 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default Register;