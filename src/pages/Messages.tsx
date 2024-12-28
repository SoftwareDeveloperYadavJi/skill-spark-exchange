import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send, Check, X, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("messages"); // messages, requests, connected

  // Dummy data
  const connectionRequests = [
    { id: 1, name: "Sarah Wilson", role: "Python Developer" },
    { id: 2, name: "Mike Johnson", role: "React Expert" },
  ];

  const connectedPeople = [
    { id: 1, name: "John Doe", role: "JavaScript Developer", status: "online" },
    { id: 2, name: "Jane Smith", role: "UI/UX Designer", status: "offline" },
  ];

  const dummyMessages = [
    { id: 1, sender: "John Doe", message: "Hey, when can we start our session?", time: "10:30 AM" },
    { id: 2, sender: "You", message: "How about tomorrow at 2 PM?", time: "10:35 AM" },
    { id: 3, sender: "John Doe", message: "Sounds good! Looking forward to it.", time: "10:36 AM" },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      toast.success("Message sent!");
      setMessage("");
    }
  };

  const handleAcceptRequest = (id: number) => {
    toast.success("Connection request accepted!");
    console.log("Accepting request:", id);
  };

  const handleRejectRequest = (id: number) => {
    toast.error("Connection request rejected!");
    console.log("Rejecting request:", id);
  };

  const handleScheduleMeeting = () => {
    toast.success("Meeting scheduled successfully!");
    console.log("Scheduling meeting");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <Card className="p-4 md:col-span-1">
            <div className="flex gap-2 mb-4">
              <Button
                variant={activeTab === "messages" ? "default" : "outline"}
                onClick={() => setActiveTab("messages")}
                className="flex-1"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Messages
              </Button>
              <Button
                variant={activeTab === "requests" ? "default" : "outline"}
                onClick={() => setActiveTab("requests")}
                className="flex-1"
              >
                <User className="w-4 h-4 mr-2" />
                Requests
              </Button>
            </div>

            {activeTab === "messages" && (
              <div className="space-y-2">
                {connectedPeople.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg cursor-pointer"
                  >
                    <div className="bg-primary/10 p-2 rounded-full">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-medium">{person.name}</span>
                      <p className="text-sm text-gray-500">{person.role}</p>
                    </div>
                    <div className={`ml-auto w-2 h-2 rounded-full ${person.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`} />
                  </div>
                ))}
              </div>
            )}

            {activeTab === "requests" && (
              <div className="space-y-4">
                {connectionRequests.map((request) => (
                  <div key={request.id} className="border rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{request.name}</h3>
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
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Chat Window */}
          <Card className="p-4 md:col-span-2 flex flex-col h-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Chat with John Doe</h3>
              <Button variant="outline" onClick={handleScheduleMeeting}>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </div>
            
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4">
              {dummyMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      msg.sender === "You"
                        ? "bg-primary text-white"
                        : "bg-secondary"
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <span className="text-xs opacity-70">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button type="submit">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;