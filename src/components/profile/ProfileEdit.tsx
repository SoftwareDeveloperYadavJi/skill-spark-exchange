import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

interface ProfileEditProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ProfileEdit = ({ open, onOpenChange }: ProfileEditProps) => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Full-stack developer passionate about creating impactful web applications.",
    phone: "+1 234 567 890",
    gender: "male",
    dob: "1990-01-01",
    city: "San Francisco",
    state: "California",
    country: "United States",
    language: "English",
    preferredLanguage: "English"
  });

  const handleSave = async () => {
    const data = JSON.stringify({
      mobileNumber: profile.phone,
      gender: profile.gender,
      city: profile.city,
      state: profile.state,
      country: profile.country,
      dob: profile.dob,
      phone: profile.phone,
      language: profile.language,
      preferredLanguage: profile.preferredLanguage,
      about: profile.bio
    });

    const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

    console.log("Retrieved token:", token); // Debugging: Check if token is retrieved

    if (!token) {
      toast.error("Token not found. Please log in again.");
      return;
    }

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/complete-profile",
      headers: {
        "user-id": "cm519rtib0000ffy0llai5lc5", // Replace with actual user-id if necessary
        "Authorization": `Bearer ${token}`, // Include token in Authorization header
        "Content-Type": "application/json"
      },
      data: data
    };

    try {
      const response = await axios.request(config);
      console.log("API Response:", response.data); // Log the response to debug
      toast.success("Profile updated successfully!");
      onOpenChange(false);
    } catch (error) {
      console.error("Error response:", error); // Log the full error to debug
      toast.error("Failed to update profile.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile information here.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="h-24"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={profile.gender}
              onValueChange={(value) => setProfile({ ...profile, gender: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              type="date"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input
              id="state"
              value={profile.state}
              onChange={(e) => setProfile({ ...profile, state: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              value={profile.country}
              onChange={(e) => setProfile({ ...profile, country: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Native Language</Label>
            <Input
              id="language"
              value={profile.language}
              onChange={(e) => setProfile({ ...profile, language: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredLanguage">Preferred Teaching Language</Label>
            <Input
              id="preferredLanguage"
              value={profile.preferredLanguage}
              onChange={(e) => setProfile({ ...profile, preferredLanguage: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
