import { Button } from "@/components/ui/button";
import { LogIn, Menu, MessageCircle, User, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-primary">
            SkillSpark
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/messages">
                <MessageCircle className="mr-2" />
                Messages
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/profile">
                <User className="mr-2" />
                Profile
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">
                <LogIn className="mr-2" />
                Sign Out
              </Link>
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2 animate-fade-in">
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link to="/messages">
                <MessageCircle className="mr-2" />
                Messages
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link to="/profile">
                <User className="mr-2" />
                Profile
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" asChild>
              <Link to="/">
                <LogIn className="mr-2" />
                Sign Out
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};