import { HeroSection } from "@/components/dashboard/HeroSection";
import { SessionCard } from "@/components/dashboard/SessionCard";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { dummySessions, dummyUsers } from "@/lib/dummyData";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { SchedulePublicMeeting } from "./PublicSessionEdit";

const PublicSessions = () => {
    const [isMeetingDialogOpen, setIsMeetingDialogOpen] = useState(false);

    const handleScheduleClick = () => {
        setIsMeetingDialogOpen(true);
        toast.success("Meeting scheduled successfully!");
        console.log("Scheduling meeting");
    };
    return (
        <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">


                    <div className="flex items-center justify-between p-3">
                        <h2 className="text-2xl font-bold mb-6 text-foreground">Public Sessions Available</h2>
                        <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10" onClick={handleScheduleClick}>
                            Create Your Public Session
                        </Button>
                        <SchedulePublicMeeting
                            open={isMeetingDialogOpen}
                            onOpenChange={setIsMeetingDialogOpen} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dummySessions.map((session) => (
                            <SessionCard meetingLink={""} key={session.id} {...session} />
                        ))}
                    </div>



                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PublicSessions;