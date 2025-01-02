import { GoogleSignIn } from "@/components/auth/GoogleSignIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyUsers } from "@/lib/dummyData";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Index = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = dummyUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      toast.success("Login successful!");
      navigate("/dashboard");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to LearnSwap
          </h1>
          <p className="text-muted-foreground">
            Connect, learn, and grow with expert developers
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4 mb-4">
          <div>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-background"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background"
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
          </Button>
        </form>
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <GoogleSignIn />
        <div className="text-center text-sm text-muted-foreground mt-4">
          By continuing, you agree to our{" "}
          <button
            className="text-primary underline"
            onClick={() => setIsTermsOpen(true)}
          >
            Terms of Service
          </button>{" "}
          and Privacy Policy
        </div>
      </div>

      {/* Terms and Conditions Dialog box */}
      <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
        <DialogContent className="sm:max-w-lg max-h-[70vh] overflow-y-auto
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-third">
          <DialogHeader>
            <DialogTitle>Terms and Conditions</DialogTitle>
            <DialogDescription>
              <div>
                <p>
                  Welcome to LearnSwap! By using our platform, you agree to the following terms and conditions:
                </p>
                <p>
                  <strong>1. Account Blocking for Complaints:</strong> Users who receive more than three (3) complaints from other users will be subject to account suspension or permanent blocking after an investigation by our team.
                </p>
                <p>
                  <strong>2. External Connections Responsibility:</strong> LearnSwap is not responsible for any interactions, agreements, or communications conducted outside the platform. Users are advised to exercise caution when engaging with others off-platform.
                </p>
                <p>
                  <strong>3. Fraud and Selling Prohibited:</strong> Our platform is designed for skill exchange, not monetary transactions. If any user engages in selling products or services and it results in fraud, LearnSwap bears no liability for such actions.
                </p>
                <p>
                  <strong>4. Decency in Reviews:</strong> Please keep your reviews respectful and constructive. Inappropriate, offensive, or overly negative reviews can impact your matching potential and may lead to account restrictions.
                </p>
                <p>
                  <strong>5. Free Platform:</strong> LearnSwap is completely free to use. Currently, we do not offer any paid subscriptions or premium services. Beware of any claims to the contrary.
                </p>
                <p>
                  <strong>6. Skill Verification:</strong> LearnSwap does not verify the accuracy of users’ stated skills or qualifications. It is the users’ responsibility to assess and validate their partners’ expertise during the exchange process.
                </p>
                <p>
                  <strong>7. Code of Conduct:</strong> Users must treat one another with respect and maintain a friendly environment. Harassment, hate speech, or abusive behavior will result in immediate account suspension.
                </p>
                <p>
                  <strong>8. Dispute Resolution:</strong> In case of disputes between users, LearnSwap offers a reporting mechanism. However, we do not mediate or guarantee resolution of disputes.
                </p>
                <p>
                  <strong>9. Account Responsibility:</strong> Users are responsible for maintaining the confidentiality of their account credentials. Do not share your login details with anyone.
                </p>
                <p>
                  <strong>10. Termination of Access:</strong> LearnSwap reserves the right to terminate or restrict access to the platform for violations of these terms or other unacceptable behavior.
                </p>
                <p>
                  <strong>11. Privacy and Data Use:</strong> By logging in via Google, you agree to our privacy policy regarding the use of your data. LearnSwap only uses data for platform functionality and does not share it with third parties.
                </p>
                <p>
                  <strong>12. Updates to Terms:</strong> LearnSwap reserves the right to update or modify these terms at any time without prior notice. Continued use of the platform signifies acceptance of the updated terms.
                </p>
                <p>
                  <em>By logging in and using LearnSwap, you acknowledge that you have read, understood, and agreed to these terms and conditions.</em>
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
