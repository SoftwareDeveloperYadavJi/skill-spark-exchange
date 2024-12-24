import { Card } from "@/components/ui/card";
import { Github, Linkedin, Twitter } from "lucide-react";

export const SocialMedia = () => {
  const socialLinks = [
    {
      platform: "GitHub",
      url: "https://github.com",
      icon: Github
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com",
      icon: Linkedin
    },
    {
      platform: "Twitter",
      url: "https://twitter.com",
      icon: Twitter
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Social Media</h2>
      <div className="flex flex-wrap gap-4">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
            >
              <Icon className="w-5 h-5" />
              <span>{link.platform}</span>
            </a>
          );
        })}
      </div>
    </Card>
  );
};