import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";

export const SocialMedia = () => {
  const [links, setLinks] = useState({
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    twitter: "https://twitter.com/johndoe"
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Social Media</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Links
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Social Media Links</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={links.github}
                  onChange={(e) => setLinks({ ...links, github: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={links.linkedin}
                  onChange={(e) => setLinks({ ...links, linkedin: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={links.twitter}
                  onChange={(e) => setLinks({ ...links, twitter: e.target.value })}
                />
              </div>
              <Button className="w-full">Save Changes</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-4">
        <a
          href={links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href={links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href={links.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Twitter className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};