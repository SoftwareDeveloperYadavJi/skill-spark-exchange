import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { Education } from "@/components/profile/Education";
import { SocialMedia } from "@/components/profile/SocialMedia";
import { Reviews } from "@/components/profile/Reviews";
import { ProfileEdit } from "@/components/profile/ProfileEdit";
import { useState } from "react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProfileHeader onEdit={() => setIsEditing(true)} />
          <ProfileDetails />
          <Education />
          <SocialMedia />
          <Reviews />
        </div>
      </main>
      <Footer />
      {isEditing && <ProfileEdit onClose={() => setIsEditing(false)} />}
    </div>
  );
};

export default Profile;