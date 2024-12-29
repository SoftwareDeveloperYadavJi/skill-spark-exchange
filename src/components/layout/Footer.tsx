import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-background border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4">SkillSpark</h3>
            <p className="text-muted-foreground">Connect, learn, and grow with expert developers</p>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary">Dashboard</Link></li>
              <li><Link to="/messages" className="text-muted-foreground hover:text-primary">Messages</Link></li>
              <li><Link to="/profile" className="text-muted-foreground hover:text-primary">Profile</Link></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-muted-foreground">support@skillspark.com</p>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 SkillSpark. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};