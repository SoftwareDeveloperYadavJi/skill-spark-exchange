import { Button } from "@/components/ui/button";
import { LogIn, Menu, MessageCircle, User, Phone, Info, X, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const handleLogoClick = () => {
    toast("Logged out successfully!");
    localStorage.removeItem("authtoken");
    navigate("/");
  };

  const logoClick = () => {
    navigate("/dashboard");
  };

  // Determine logo based on the theme
  const logoSrc = theme === "dark"
    ? "https://res.cloudinary.com/dehkbnswl/image/upload/v1735752262/LearnSwapLogo_cdnasz.png"
    : "https://res.cloudinary.com/dehkbnswl/image/upload/v1735752263/LearnSwapLogoWhite_nem4cz.png";

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={logoClick}
            className="hover:opacity-80 transition-opacity"
          >
            <img src={logoSrc} alt="LearnSwap Logo" className="h-16 w-auto" />
          </button>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
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
            <Button variant="ghost" size="sm" asChild className="text-foreground">
              <Link to="/messages">
                <MessageCircle className="mr-2" />
                Messages
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-foreground">
              <Link to="/connections">
                <Users className="mr-2" />
                Connections
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-foreground">
              <Link to="/contact">
                <Phone className="mr-2" />
                Contact
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild className="text-foreground">
              <Link to="/profile">
                <User className="mr-2" />
                Profile
              </Link>
            </Button>
            <Button variant="outline" size="sm" asChild className="text-foreground">
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
            <Button variant="ghost" size="sm" className="w-full justify-start text-foreground" asChild>
              <Link to="/messages">
                <MessageCircle className="mr-2" />
                Messages
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-foreground" asChild>
              <Link to="/connections">
                <Users className="mr-2" />
                Connections
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-foreground" asChild>
              <Link to="/profile">
                <User className="mr-2" />
                Profile
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-foreground" asChild>
              <Link to="/contact">
                <Phone className="mr-2" />
                Contact
              </Link>
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start text-foreground" asChild>
              <Link to="/about">
                <Info className="mr-2" />
                About
              </Link>
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start text-foreground" asChild onClick={handleLogoClick}>
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