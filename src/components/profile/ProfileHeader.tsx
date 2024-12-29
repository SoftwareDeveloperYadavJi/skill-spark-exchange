import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { dummyUsers } from "@/lib/dummyData";
import { MapPin, Mail, Phone, Users, Star, BookOpen, Moon, Sun } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ProfileEdit } from "./ProfileEdit";
import { useState } from "react";
import { useTheme } from "@/components/theme-provider";

export const ProfileHeader = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const user = dummyUsers[0];

  return (
    <div className="bg-background rounded-lg shadow-md">
      {/* Cover Image Section */}
      <div className="h-32 bg-gradient-to-r from-primary to-accent rounded-t-lg" />
      
      {/* Profile Section */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start gap-6 relative">
          {/* Avatar */}
          <div className="-mt-16">
            <Avatar className="w-32 h-32 border-4 border-background">
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
                <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
                <p className="text-muted-foreground text-lg">{user.role}</p>
                <p className="text-muted-foreground mt-1">
                  Full-stack developer passionate about creating impactful web applications. 
                  Experienced in React, Node.js, and cloud technologies.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="text-foreground"
                >
                  {theme === "light" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
                <Button onClick={() => setIsEditOpen(true)}>Edit Profile</Button>
              </div>
            </div>

            {/* Location and Contact */}
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>admin@example.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
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
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-xl font-semibold">128</span>
            </div>
            <p className="text-muted-foreground">Connections</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="w-5 h-5 text-accent" />
              <span className="text-xl font-semibold">{user.sessions}</span>
            </div>
            <p className="text-muted-foreground">Sessions Conducted</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-xl font-semibold">{user.rating}</span>
            </div>
            <p className="text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>
      <ProfileEdit open={isEditOpen} onOpenChange={setIsEditOpen} />
    </div>
  );
};