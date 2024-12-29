import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { Education } from "@/components/profile/Education";
import { SocialMedia } from "@/components/profile/SocialMedia";
import { Reviews } from "@/components/profile/Reviews";
import { Skills } from "@/components/profile/Skills";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProfileHeader />
          <ProfileDetails />
          <Skills />
          <Education />
          <SocialMedia />
          <Reviews />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;