import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordField({ label, placeholder, icon, name, value, onChange, error }) {
  const [show, setShow] = useState(false);

  return (
    <div className="mb-4">
      <label className="block mb-1.5 text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div
        className={`flex items-center border rounded-xl px-4 bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all ${
          error ? "border-red-400 focus-within:ring-red-400" : "border-slate-300"
        }`}
      >
        <span className={`${error ? "text-red-400" : "text-gray-400"} shrink-0`}>
          {icon}
        </span>

        <input
          type={show ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full p-3 outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="text-gray-400 hover:text-blue-600 transition shrink-0"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>
      )}
    </div>
  );
}

export default PasswordField;