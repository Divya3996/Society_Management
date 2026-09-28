import logo from "../assets/images/logo.png";
import loginBg from "../assets/images/login-bg.jpg";

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">

        {/* Left Section */}
        <div
  className="hidden lg:flex relative items-center justify-center bg-cover bg-center"
  style={{ backgroundImage: `url(${loginBg})` }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-blue-900/70"></div>

  {/* Content */}
  <div className="relative z-10 flex flex-col items-center text-center text-white px-10">

    <img
      src={logo}
      alt="Logo"
      className="w-32 h-32 object-contain mb-6"
    />

    <h1 className="text-5xl font-bold mb-4">
      Digital Society
    </h1>

    <h2 className="text-2xl font-semibold mb-6">
      Management System
    </h2>

    <p className="max-w-md leading-8 text-lg">
      Manage visitors, complaints, maintenance,
      parking, notices and polls from one smart platform.
    </p>

  </div>
</div>


        {/* Right Section */}
        <div className="p-10 md:p-14">

          <h2 className="text-4xl font-bold text-slate-800">
            {title}
          </h2>

          <p className="text-slate-500 mt-2 mb-8">
            {subtitle}
          </p>

          {children}

        </div>

      </div>

    </div>
  );
}

export default AuthLayout;