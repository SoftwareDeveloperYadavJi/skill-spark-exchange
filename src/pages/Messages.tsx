import { useEffect, useState } from "react";
import axios from "axios";
import websocketService from "@/lib/websocketService"; // Import WebSocket Service
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User } from "lucide-react";
import { toast } from "sonner";

const Messages = () => {
  const [connectedPeople, setConnectedPeople] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [userId, setUserId] = useState(null); // State to hold the user ID
  const [conversationId, setConversationId] = useState(null); // For storing the conversation ID

  // Fetch user ID from the API
  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get("http://localhost:4000/api/user/id", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setUserId(response.data.userId); // Set the userId state with the response
      } catch (error) {
        console.error("Error fetching user ID:", error);
        toast.error("Failed to load user ID.");
      }
    };

    fetchUserId();
  }, []);

  // Fetch connected people from the API
  useEffect(() => {
    const fetchConnectedPeople = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await axios.get("http://localhost:4000/api/connection/connected", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const connections = response.data.map((item) => ({
          id: item.connection.id,
          name: item.connection.name,
          role: item.connection.role,
          email: item.connection.email,
          status: "online", // Example status; replace with actual logic
        }));
        setConnectedPeople(connections);
      } catch (error) {
        console.error("Error fetching connected people:", error);
        toast.error("Failed to load connected people.");
      }
    };

    fetchConnectedPeople();
  }, []);

  // WebSocket Initialization
  useEffect(() => {
    if (userId) {
      websocketService.connect(userId); // Pass dynamic userId to WebSocket

      // Handle incoming messages
      websocketService.socket?.on("receive_message", (newMessage) => {
        console.log('New message received:', newMessage);  // Log the message
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => {
        websocketService.disconnect();
      };
    }
  }, [userId]);

  // Fetch conversation messages for selected person
  useEffect(() => {
    if (selectedPerson && userId) {
      const fetchConversation = async () => {
        const token = localStorage.getItem("authToken");
        try {
          const response = await axios.post(
            `http://localhost:4000/api/user/conversion/${userId}/${selectedPerson.id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("API Response:", response.data); // Log full response to check the structure
          const sortedMessages = response.data.sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
          console.log("Sorted Messages:", sortedMessages);  // Log sorted messages
          setMessages(sortedMessages || []); // Set messages from conversation
          setConversationId(response.data.conversationId); // Set the conversation ID
        } catch (error) {
          console.error("Error fetching conversation:", error);
          toast.error("Failed to load conversation.");
        }
      };

      fetchConversation();
    }
  }, [selectedPerson, userId]);

  // Send message via WebSocket and API
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && selectedPerson && userId) {
      const msgData = {
        senderId: userId,
        receiverId: selectedPerson.id,
        content: message,
        conversationId: conversationId, // Include conversation ID
      };

      try {
        // Send message via API first
        await axios.post("http://localhost:4000/api/user/sendmessage", msgData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        });

        // Then send message via WebSocket
        websocketService.sendMessage(msgData);

        // Update local state with the sent message
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            ...msgData,
            content: message,
            senderId: userId,
          },
        ]);

        toast.success("Message sent!");
        setMessage(""); // Clear input field after sending message
      } catch (error) {
        console.error("Error sending message:", error);
        toast.error("Failed to send message.");
      }
    } else {
      toast.error("Please select a person to chat with.");
    }
  };

  // Typing notification
  const handleTyping = () => {
    if (selectedPerson && userId) {
      websocketService.notifyTyping({
        userId: userId, // Use dynamic userId
        conversationId: conversationId, // Use the conversation ID
      });
    }
  };

  // Select a person to chat with
  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    setMessages([]); // Reset chat messages
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Connected People Sidebar */}
          <Card className="p-4 md:col-span-1">
            <h3 className="font-semibold mb-4">Connected People</h3>
            <div className="space-y-2">
              {connectedPeople.map((person) => (
                <div
                  key={person.id}
                  onClick={() => handleSelectPerson(person)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedPerson?.id === person.id
                    ? "border border-primary text-white"
                    : "hover: hover:border hover:border-primary"
                    }`}
                >
                  <div className="bg-primary/10 p-2 rounded-full">
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <span className="font-medium">{person.name}</span>
                    <p className="text-sm text-gray-500">{person.role}</p>
                  </div>
                  <div
                    className={`ml-auto w-2 h-2 rounded-full ${person.status === "online"
                      ? "bg-green-500"
                      : "bg-gray-300"
                      }`}
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Window */}
          <Card className="p-4 md:col-span-2 flex flex-col h-[600px]">
            {selectedPerson ? (
              <>
                <div className="flex items-center justify-between border-b pb-2 mb-4">
                  <h3 className="font-semibold">{selectedPerson.name}</h3>
                  <p className="text-sm text-gray-500">{selectedPerson.role}</p>
                </div>
                <div className="flex-1 overflow-y-auto mb-4">
                  {messages.length > 0 ? (
                    messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`mb-2 ${msg.senderId === userId ? "text-right" : "text-left"}`}
                      >
                        <p className="bg-gray-200 text-black inline-block px-4 py-2 rounded-lg">
                          {msg.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p>No messages yet</p>  // Optional: Display a fallback message
                  )}
                </div>
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-center space-x-2"
                >
                  <Input
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      handleTyping();
                    }}
                    placeholder="Type your message..."
                  />
                  <Button type="submit" variant="default">
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <p>Select a person to start a chat</p>
              </div>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;
