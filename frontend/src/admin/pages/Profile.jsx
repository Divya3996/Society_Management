
import ProfileHeader from "../components/ProfileHeader";
import ProfileCard from "../components/ProfileCard";
import ProfileForm from "../components/ProfileForm";
import { useState } from "react";
import ChangePasswordModal from "../components/ChangePasswordModal";

function Profile() {
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  return (
    <>

      {/* Page Header */}
      <ProfileHeader />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Side */}
        <ProfileCard />

        {/* Right Side */}
       <ProfileForm
  onChangePassword={() => setShowPasswordModal(true)}
/>

      </div>
      <ChangePasswordModal
  isOpen={showPasswordModal}
  onClose={() => setShowPasswordModal(false)}
/>

    </>
  );
}

export default Profile;