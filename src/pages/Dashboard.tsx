import { HeroSection } from "@/components/dashboard/HeroSection";
import { SessionCard } from "@/components/dashboard/SessionCard";

const Dashboard = () => {
  const upcomingSessions = [
    {
      title: "Introduction to React Hooks",
      mentor: "Sarah Johnson",
      date: "Mar 15, 2024",
      time: "2:00 PM EST",
      topics: ["React", "JavaScript", "Hooks"],
    },
    {
      title: "Building APIs with Node.js",
      mentor: "Michael Chen",
      date: "Mar 16, 2024",
      time: "3:00 PM EST",
      topics: ["Node.js", "REST API", "Express"],
    },
    {
      title: "CSS Grid Mastery",
      mentor: "Emma Wilson",
      date: "Mar 17, 2024",
      time: "1:00 PM EST",
      topics: ["CSS", "Layout", "Responsive Design"],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <HeroSection />
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Upcoming Sessions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingSessions.map((session) => (
              <SessionCard key={session.title} {...session} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;