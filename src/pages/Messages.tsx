import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Messages = () => {
  const [message, setMessage] = useState("");

  // Dummy messages for demonstration
  const dummyMessages = [
    { id: 1, sender: "John Doe", message: "Hey, when can we start our session?", time: "10:30 AM" },
    { id: 2, sender: "You", message: "How about tomorrow at 2 PM?", time: "10:35 AM" },
    { id: 3, sender: "John Doe", message: "Sounds good! Looking forward to it.", time: "10:36 AM" },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending message:", message);
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Contacts List */}
          <Card className="p-4 md:col-span-1">
            <h2 className="text-xl font-bold mb-4">Messages</h2>
            <div className="space-y-2">
              {["John Doe", "Jane Smith", "Mike Johnson"].map((contact) => (
                <div
                  key={contact}
                  className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg cursor-pointer"
                >
                  <div className="bg-primary/10 p-2 rounded-full">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <span>{contact}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Window */}
          <Card className="p-4 md:col-span-2 flex flex-col h-[600px]">
            <h3 className="text-lg font-semibold mb-4">Chat with John Doe</h3>
            
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