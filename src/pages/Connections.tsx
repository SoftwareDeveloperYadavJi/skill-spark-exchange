import { useState, useEffect } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Check, X, User } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import axios from "axios";

const Connections = () => {
  const [connectedPeople, setConnectedPeople] = useState([]);
  const [connectionRequests, setConnectionRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleAcceptRequest = async (id: string) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      toast.error("Authentication token not found!");
      return;
    }

    try {
      // Make the POST request to accept the connection request
      const response = await axios.post(
        "http://localhost:4000/api/connection/accept",
        { requestId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Connection request accepted!");

        // Update states to reflect the accepted request
        setConnectionRequests((prevRequests) => prevRequests.filter(request => request.id !== id));
        const acceptedRequest = connectionRequests.find(request => request.id === id);
        if (acceptedRequest) {
          setConnectedPeople((prevConnections) => [...prevConnections, acceptedRequest]);
        }

        console.log("Request accepted:", response.data);
      } else {
        toast.error("Failed to accept the request.");
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      toast.error("Failed to accept the request.");
    }
  };

  const handleRejectRequest = async (id: string) => {
    toast.error("Connection request rejected!");
    console.log("Rejecting request:", id);

    // Update state to remove rejected request
    setConnectionRequests((prevRequests) => prevRequests.filter(request => request.id !== id));
  };

  useEffect(() => {
    const fetchConnections = async () => {
      setLoading(true);
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Authentication token not found!");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:4000/api/connection/connected",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const connections = response.data.map((item: any) => ({
          id: item.id,
          name: item.connection.name,
          role: item.connection.role,
          email: item.connection.email,
        }));

        setConnectedPeople(connections);
        toast.success("Connections loaded successfully!");
      } catch (error) {
        console.error("Error fetching connections:", error);
        toast.error("Failed to load connections.");
      } finally {
        setLoading(false);
      }
    };

    const fetchConnectionRequests = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        toast.error("Authentication token not found!");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:4000/api/connection/requests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const requests = response.data.map((request: any) => ({
          id: request.id,
          name: request.receiver.name,
          role: request.receiver.role,
          email: request.receiver.email,
        }));

        setConnectionRequests(requests);
        toast.success("Connection requests loaded successfully!");
      } catch (error) {
        console.error("Error fetching connection requests:", error);
        toast.error("Failed to load connection requests.");
      }
    };

    fetchConnections();
    fetchConnectionRequests();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="connections" className="flex-1">
              Connections
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex-1">
              Requests
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connections">
            {loading ? (
              <p>Loading connections...</p>
            ) : (
              <div className="grid md:grid-cols-3 gap-4">
                {connectedPeople.map((person: any) => (
                  <Card key={person.id} className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{person.name}</h3>
                        <p className="text-sm text-gray-500">{person.role}</p>
                      </div>
                    </div>
                    <Button className="w-full" variant="outline" asChild>
                      <Link to="/messages">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </Link>
                    </Button>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="requests">
            <div className="grid md:grid-cols-3 gap-4">
              {connectionRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{request.name}</h3>
                      <p className="text-sm text-gray-500">{request.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="flex-1"
                      variant="default"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Accept
                    </Button>
                    <Button
                      onClick={() => handleRejectRequest(request.id)}
                      className="flex-1"
                      variant="outline"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Connections;
