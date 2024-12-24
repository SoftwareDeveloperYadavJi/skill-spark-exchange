import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";

export const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary to-purple-700 text-white py-16 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative container mx-auto px-6">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">
            Learn from Expert Developers
          </h1>
          <p className="text-lg mb-8 opacity-90 animate-fade-in">
            Join live coding sessions with experienced developers. Perfect for beginners
            looking to enhance their skills through practical guidance.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in">
            <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
              Browse Sessions
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Become a Mentor
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 p-6 flex gap-4">
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-4 text-white">
          <Users className="w-6 h-6 mb-2" />
          <p className="text-sm">500+ Active Mentors</p>
        </Card>
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-4 text-white">
          <Calendar className="w-6 h-6 mb-2" />
          <p className="text-sm">Weekly Sessions</p>
        </Card>
      </div>
    </div>
  );
};