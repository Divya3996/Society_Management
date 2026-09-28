import { FaUserCircle } from "react-icons/fa";

function ProfileHeader() {
  return (
    <div className="mb-8">

      <div className="flex items-center gap-4">

        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 text-3xl">
          <FaUserCircle />
        </div>

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            My Profile
          </h1>

          <p className="text-slate-500 mt-1">
            Manage your account information and personal details.
          </p>

        </div>

      </div>

    </div>
  );
}

export default ProfileHeader;