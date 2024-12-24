import { HeroSection } from "@/components/dashboard/HeroSection";
import { SessionCard } from "@/components/dashboard/SessionCard";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Send, User } from "lucide-react";
import { dummySessions, dummyUsers } from "@/lib/dummyData";
import { toast } from "sonner";

const Dashboard = () => {
  const handleConnect = (userId: number) => {
    toast.success("Connection request sent!");
    console.log("Sending connection request to user:", userId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <HeroSection />
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Upcoming Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummySessions.map((session) => (
                <SessionCard key={session.id} {...session} />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Suggested Connections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyUsers.filter(user => user.username !== "admin").map((user) => (
                <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className="text-sm text-gray-600">{user.role}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-secondary rounded-full text-sm text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600">
                      <span>{user.sessions} sessions completed</span>
                      <span>{user.rating} ⭐</span>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleConnect(user.id)}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;