import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

interface ScheduleMeetingProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

// @ts-ignore
export const ScheduleMeeting = ({ open, onOpenChange, email }: ScheduleMeetingProps) => {
    const [meeting, setMeeting] = useState({
        title: "",
        startTime: "",
        endTime: "",
    });
    const [skill, setSkill] = useState(""); // State for skill
    const [body, setBody] = useState(""); // State for body

    const handleSave = async () => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            toast.error("No token found. Please log in.");
            return;
        }

        // Prepare the data to be sent
        const data = JSON.stringify({
            subject: meeting.title,
            body: body, // Use the dynamic value for body
            email: email,
            skill: skill, // Use the dynamic value for skill
        });

        const config = {
            method: "post",
            maxBodyLength: Infinity,
            url: "http://localhost:4000/api/uses/createmeeting",
            headers: {
                Authorization: `Bearer ${token}`, // Attach the token
                "Content-Type": "application/json",
            },
            data: data,
        };

        try {
            // Send the request
            const response = await axios.request(config);
            console.log("Meeting scheduled:", response.data);
            toast.success("Meeting scheduled successfully!");
            onOpenChange(false); // Close the dialog after scheduling
        } catch (error) {
            console.error("Error scheduling meeting:", error);
            toast.error("Failed to schedule the meeting.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Schedule a Meeting</DialogTitle>
                    <DialogDescription>
                        Fill in the details to schedule the meeting.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={email}
                        readOnly // Make the email field read-only
                        disabled
                        className="cursor-not-allowed"
                    />

                    <Label htmlFor="title">Meeting Title</Label>
                    <Input
                        id="title"
                        value={meeting.title}
                        onChange={(e) => setMeeting({ ...meeting, title: e.target.value })}
                        placeholder="Enter meeting title"
                    />

                    <Label htmlFor="startTime">Start Time</Label>
                    <Input
                        id="startTime"
                        type="datetime-local"
                        value={meeting.startTime}
                        onChange={(e) => setMeeting({ ...meeting, startTime: e.target.value })}
                    />

                    <Label htmlFor="endTime">End Time</Label>
                    <Input
                        id="endTime"
                        type="datetime-local"
                        value={meeting.endTime}
                        onChange={(e) => setMeeting({ ...meeting, endTime: e.target.value })}
                    />

                    <Label htmlFor="skill">Skill</Label>
                    <Input
                        id="skill"
                        value={skill}
                        onChange={(e) => setSkill(e.target.value)}
                        placeholder="Enter skill"
                    />

                    <Label htmlFor="body">Meeting Details</Label>
                    <Input
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Enter details about the meeting"
                    />
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>Save Meeting</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

