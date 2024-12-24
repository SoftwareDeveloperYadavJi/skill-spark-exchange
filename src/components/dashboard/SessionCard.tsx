import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

interface SessionCardProps {
  title: string;
  mentor: string;
  date: string;
  time: string;
  topics: string[];
}

export const SessionCard = ({ title, mentor, date, time, topics }: SessionCardProps) => {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">with {mentor}</p>
      <div className="flex gap-4 mb-4 text-sm text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          {date}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {time}
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {topics.map((topic) => (
          <span
            key={topic}
            className="px-3 py-1 bg-secondary rounded-full text-sm text-primary"
          >
            {topic}
          </span>
        ))}
      </div>
      <Button className="w-full">Join Session</Button>
    </Card>
  );
};