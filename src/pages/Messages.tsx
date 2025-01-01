import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Send, Calendar, User, Image, FileText, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { ScheduleMeeting } from "./ScheduleMeetingEdit";

const Messages = () => {
  const [isMeetingDialogOpen, setIsMeetingDialogOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [selectedPerson, setSelectedPerson] = useState<{
    id: number;
    name: string;
    role: string;
  } | null>(null);



  // Dummy data
  const connectedPeople = [
    { id: 1, name: "John Doe", role: "JavaScript Developer", status: "online" },
    { id: 2, name: "Jane Smith", role: "UI/UX Designer", status: "offline" },
    { id: 3, name: "Alex Brown", role: "Data Scientist", status: "online" },
  ];

  const dummyMessages = [
    {
      id: 1,
      sender: "John Doe",
      content: {
        type: "text",
        message: "Hey, when can we start our session?"
      },
      time: "10:30 AM"
    },
    {
      id: 2,
      sender: "You",
      content: {
        type: "image",
        message: "photo-1488590528505-98d2b5aba04b",
        caption: "Here's the screenshot of the issue"
      },
      time: "10:35 AM"
    },
    {
      id: 3,
      sender: "John Doe",
      content: {
        type: "file",
        message: "documentation.pdf",
        fileType: "PDF"
      },
      time: "10:36 AM"
    },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      console.log("Sending message:", message);
      toast.success("Message sent!");
      setMessage("");
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      toast.success(`File "${file.name}" ready to upload`);
    }
  };

  const handleScheduleMeeting = () => {
    toast.success("Meeting scheduled successfully!");
    console.log("Scheduling meeting");
  };

  const handleSelectPerson = (person: typeof connectedPeople[0]) => {
    setSelectedPerson(person);
  };

  const handleScheduleClick = () => {
    setIsMeetingDialogOpen(true); 
    // toast.success("Meeting scheduled successfully!");
    // console.log("Scheduling meeting");
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
                    ? "border border-white text-white"
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
                  <div className={`ml-auto w-2 h-2 rounded-full ${person.status === 'online' ? 'bg-green-500' : 'bg-gray-300'}`} />
                </div>
              ))}
            </div>
          </Card>

          {/* Chat Window */}
          <Card className="p-4 md:col-span-2 flex flex-col h-[600px]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                {selectedPerson
                  ? `Chat with ${selectedPerson.name}`
                  : ""}
              </h3>
              {!selectedPerson ? (
                <div />
              ) : (
                <><Button variant="outline" onClick={handleScheduleClick}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button><ScheduleMeeting
                    open={isMeetingDialogOpen}
                    onOpenChange={setIsMeetingDialogOpen} /></>
              )}

            </div>

            {/* Conditional Rendering of Messages */}
            {!selectedPerson ? (
              <div className="flex justify-center items-center flex-1">
                <p className="text-center text-gray-500">
                  Select a contact to start chatting
                </p>
              </div>
            ) : (
              <>
                {/* Messages Container */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {dummyMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start text-black"
                        }`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-lg ${msg.sender === "You" ? "bg-primary text-white" : "bg-secondary"
                          }`}
                      >
                        {msg.content.type === "text" && (
                          <p className="text-sm">{msg.content.message}</p>
                        )}
                        {msg.content.type === "image" && (
                          <div className="space-y-2">
                            <img
                              src={`https://source.unsplash.com/${msg.content.message}`}
                              alt="Shared image"
                              className="rounded-md max-w-full"
                            />
                            <p className="text-sm">{msg.content.caption}</p>
                          </div>
                        )}
                        {msg.content.type === "file" && (
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            <span className="text-sm">{msg.content.message}</span>
                          </div>
                        )}
                        <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept="image/*,.pdf"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => document.getElementById("file-upload")?.click()}
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </div>
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
              </>
            )}
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Messages;