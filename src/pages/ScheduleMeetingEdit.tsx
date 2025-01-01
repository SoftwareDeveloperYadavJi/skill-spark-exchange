import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

interface ScheduleMeetingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ScheduleMeeting = ({ open, onOpenChange }: ScheduleMeetingProps) => {
  const [meeting, setMeeting] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  const handleSave = () => {
    // Save meeting details (typically to backend)
    toast.success("Meeting scheduled successfully!");
    onOpenChange(false); // Close dialog
  };

  const handleCancel = () => {
    onOpenChange(false); // Close dialog without saving
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Schedule a Meeting</DialogTitle>
          <DialogDescription>
            Please provide the meeting details below.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          {/* Meeting Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Meeting Title</Label>
            <Input
              id="title"
              value={meeting.title}
              onChange={(e) => setMeeting({ ...meeting, title: e.target.value })}
              placeholder="Enter meeting title"
            />
          </div>

          {/* Start Time */}
          <div className="space-y-2">
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              id="startTime"
              type="datetime-local"
              value={meeting.startTime}
              onChange={(e) => setMeeting({ ...meeting, startTime: e.target.value })}
            />
          </div>

          {/* End Time */}
          <div className="space-y-2">
            <Label htmlFor="endTime">End Time</Label>
            <Input
              id="endTime"
              type="datetime-local"
              value={meeting.endTime}
              onChange={(e) => setMeeting({ ...meeting, endTime: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-between mt-4">
          {/* Cancel Button */}
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          {/* Done Button */}
          <Button onClick={handleSave}>Done</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
