import { useEffect, useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import Education from "@/components/profile/Education.tsx";
import { SocialMedia } from "@/components/profile/SocialMedia";
import { Reviews } from "@/components/profile/Reviews";
import { Skills } from "@/components/profile/Skills";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    const token = localStorage.getItem("authToken");  // Retrieve token from localStorage

    if (token) {
      let data = JSON.stringify({
        "userId": "cm53ojiix0000ffmszuq27s93"
      });

      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'http://localhost:4000/api/user',
        headers: {
          'Authorization': `Bearer ${token}`,  // Send token in Authorization header
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(response.data);
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("No token found in localStorage");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProfileHeader {...user} />
          <ProfileDetails {...user} />
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
