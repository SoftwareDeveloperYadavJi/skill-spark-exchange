import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { dummyUsers } from "@/lib/dummyData";
import { MapPin, Mail, Phone, Users, Star, BookOpen } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ProfileHeaderProps {
  onEdit: () => void;
}

export const ProfileHeader = ({ onEdit }: ProfileHeaderProps) => {
  const user = dummyUsers[0]; // Using first dummy user for demo

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Cover Image Section */}
      <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-lg" />
      
      {/* Profile Section */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start gap-6 relative">
          {/* Avatar - Made larger and positioned to overlap cover image */}
          <div className="-mt-16">
            <Avatar className="w-32 h-32 border-4 border-white">
              <img
                src="https://github.com/shadcn.png"
                alt={user.name}
                className="rounded-full"
              />
            </Avatar>
          </div>

          {/* Main Profile Info */}
          <div className="flex-1">
            <div className="flex justify-between items-start w-full">
              <div>
                <h1 className="text-2xl font-bold">{user.name}</h1>
                <p className="text-gray-600 text-lg">{user.role}</p>
                <p className="text-gray-500 mt-1">Full-stack developer passionate about creating impactful web applications. Experienced in React, Node.js, and cloud technologies.</p>
              </div>
              <Button onClick={onEdit}>Edit Profile</Button>
            </div>

            {/* Location and Contact */}
            <div className="mt-4 flex flex-wrap gap-4">
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
        </div>

        {/* Stats Section */}
        <Separator className="my-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5 text-blue-500" />
              <span className="text-xl font-semibold">128</span>
            </div>
            <p className="text-gray-500">Connections</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen className="w-5 h-5 text-green-500" />
              <span className="text-xl font-semibold">{user.sessions}</span>
            </div>
            <p className="text-gray-500">Sessions Conducted</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-gray-600">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-xl font-semibold">{user.rating}</span>
            </div>
            <p className="text-gray-500">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};