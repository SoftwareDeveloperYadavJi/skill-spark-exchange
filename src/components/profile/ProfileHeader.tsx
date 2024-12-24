import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { dummyUsers } from "@/lib/dummyData";
import { MapPin, Mail, Phone } from "lucide-react";

interface ProfileHeaderProps {
  onEdit: () => void;
}

export const ProfileHeader = ({ onEdit }: ProfileHeaderProps) => {
  const user = dummyUsers[0]; // Using first dummy user for demo

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="w-24 h-24">
          <img
            src="https://github.com/shadcn.png"
            alt={user.name}
            className="rounded-full"
          />
        </Avatar>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.role}</p>
          <div className="mt-2 flex flex-wrap gap-4 justify-center md:justify-start">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>admin@example.com</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>+1 234 567 890</span>
            </div>
          </div>
        </div>
        <Button onClick={onEdit}>Edit Profile</Button>
      </div>
    </div>
  );
};