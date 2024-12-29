import { Footer } from "@/components/layout/Footer";
import { Navigation } from "@/components/layout/Navigation";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-6">About LearnSwap</h1>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                LearnSwap is dedicated to connecting learners with experienced developers,
                fostering a community where knowledge sharing and growth are paramount.
                We believe in the power of peer-to-peer learning and mentorship.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-medium mb-2">Connect</h3>
                  <p className="text-gray-600">
                    Find and connect with developers who match your learning needs
                    and schedule.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Learn</h3>
                  <p className="text-gray-600">
                    Engage in one-on-one sessions tailored to your specific learning
                    goals and pace.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Grow</h3>
                  <p className="text-gray-600">
                    Build your skills and confidence through practical guidance
                    and real-world projects.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Community-driven learning</li>
                <li>Quality education for everyone</li>
                <li>Practical, hands-on experience</li>
                <li>Continuous improvement</li>
              </ul>
            </section>
          </div>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default About;