import { useEffect, useState } from "react";
import axios from "axios";
import { HeroSection } from "@/components/dashboard/HeroSection";
import { SessionCard } from "@/components/dashboard/SessionCard";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [suggestedConnections, setSuggestedConnections] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Get the current user's ID on component mount
  useEffect(() => {
    const fetchCurrentUserId = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:4000/api/user/id", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCurrentUserId(response.data.userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchCurrentUserId();
  }, []);

  // Handle connection request
  const handleConnect = async (requestedUserId) => {
    if (!currentUserId) return;

    try {
      const data = {
        userId: currentUserId,
        requestedUserId,
      };

      const response = await axios.post(
        "http://localhost:4000/api/connection/request",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.message === "Connection request sent.") {
        toast.success("Connection request sent!");
      } else {
        toast.error("Failed to send connection request.");
      }
    } catch (error) {
      console.error("Error sending connection request:", error);
      toast.error("Failed to send connection request.");
    }
  };

  // Save token from URL parameters to localStorage
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      console.log("Token stored in localStorage:", token);
    }
  }, []);

  // Fetch sessions from the API
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:4000/api/user/meeting", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fetchedSessions = response.data.map((session) => ({
          title: session.body,
          mentor: session.secondaryUser.name,
          date: new Date(session.startTime).toLocaleDateString(),
          time: new Date(session.startTime).toLocaleTimeString(),
          topics: session.skill.split(",").map((s) => s.trim()),
          meetingLink: session.meetingLink,
        }));
        setSessions(fetchedSessions);
      } catch (error) {
        console.error("Error fetching sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  // Fetch suggested connections from the API
  useEffect(() => {
    const fetchSuggestedConnections = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get("http://localhost:4000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const transformedConnections = response.data.map((user) => ({
          ...user,
          skillExchanges: user.skillExchanges.map((exchange) => ({
            ...exchange,
            offeredSkill: exchange.offeredSkill
              ? exchange.offeredSkill.split(",").map((skill) => skill.trim())
              : [],
          })),
        }));
        setSuggestedConnections(transformedConnections);
      } catch (error) {
        console.error("Error fetching suggested connections:", error);
      }
    };

    fetchSuggestedConnections();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <HeroSection />

          {/* Upcoming Sessions Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Upcoming Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sessions.map((session, index) => (
                <SessionCard key={index} {...session} />
              ))}
            </div>
          </div>

          {/* Suggested Connections Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Suggested Connections</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedConnections.map((user) => (
                <div
                  key={user.id}
                  className="bg-background rounded-lg shadow-md p-6 border border-border"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={user.avatar || "https://via.placeholder.com/96"}
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-semibold text-foreground">{user.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {user.role || "No role provided"}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {user.skillExchanges.length > 0 ? (
                        user.skillExchanges.map((exchange, idx) =>
                          exchange.offeredSkill.map((skill, skillIdx) => (
                            <span
                              key={`${idx}-${skillIdx}`}
                              className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          ))
                        )
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No skills listed
                        </span>
                      )}
                    </div>
                    <Button className="w-full" onClick={() => handleConnect(user.id)}>
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
