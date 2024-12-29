import { useEffect, useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfileDetails } from "@/components/profile/ProfileDetails";
import { Education } from "@/components/profile/Education";
import { SocialMedia } from "@/components/profile/SocialMedia";
import { Reviews } from "@/components/profile/Reviews";
import { Skills } from "@/components/profile/Skills";
import axios from "axios";


const Profile = () => {

  const [user, setUser] = useState<any>({});
  const [education, setEducation] = useState<any>([]);
  const [socialMedia, setSocialMedia] = useState<any>([]);

  useEffect(() => {
    let data = JSON.stringify({
      "userId": "cm53ojiix0000ffmszuq27s93"
    });

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:4000/api/user',
      headers: {
        'user-id': 'cm519rtib0000ffy0llai5lc5',
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        setUser(response.data);
       
      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const config = {
          method: "get",
          url: "http://localhost:4000/api/user/education",
          headers: {
            "user-id": "cm519rtib0000ffy0llai5lc5",
          },
        };

        const response = await axios.request(config);
        if (Array.isArray(response.data)) {
          setEducation(response.data);
        } else {
          console.error("Invalid response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching education data:", error);
      }
    };

    fetchEducation();
  }, []);



  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProfileHeader  {...user} />
          <ProfileDetails {...user} />
          <Skills />
          <Education initialEducation={education} />
          <SocialMedia />
          <Reviews />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;