import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Check, X, User } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

const Connections = () => {
  // Dummy data (same as in Messages.tsx)
  const connectionRequests = [
    { id: 1, name: "Sarah Wilson", role: "Python Developer" },
    { id: 2, name: "Mike Johnson", role: "React Expert" },
  ];

  const connectedPeople = [
    { id: 1, name: "John Doe", role: "JavaScript Developer", status: "online" },
    { id: 2, name: "Jane Smith", role: "UI/UX Designer", status: "offline" },
    { id: 3, name: "Alex Brown", role: "Data Scientist", status: "online" },
  ];

  const handleAcceptRequest = (id: number) => {
    toast.success("Connection request accepted!");
    console.log("Accepting request:", id);
  };

  const handleRejectRequest = (id: number) => {
    toast.error("Connection request rejected!");
    console.log("Rejecting request:", id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="connections" className="flex-1">Connections</TabsTrigger>
            <TabsTrigger value="requests" className="flex-1">Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="connections">
            <div className="grid md:grid-cols-3 gap-4">
              {connectedPeople.map((person) => (
                <Card key={person.id} className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{person.name}</h3>
                      <p className="text-sm text-gray-500">{person.role}</p>
                    </div>
                    <div className={`ml-auto w-2 h-2 rounded-full ${person.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`} />
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