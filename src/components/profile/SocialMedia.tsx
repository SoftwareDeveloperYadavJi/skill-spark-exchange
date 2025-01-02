import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Github, Linkedin, Twitter, Globe } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export const SocialMedia = () => {
  const [links, setLinks] = useState({
    github: "",
    linkedin: "",
    twitter: "",
    website: "",
  });

  useEffect(() => {
    const fetchSocialMediaLinks = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage
// Replace this with the actual token retrieval logic
        const response = await axios.get("http://localhost:4000/api/user/socialmedia", {
          headers: {
            "user-id": "cm519rtib0000ffy0llai5lc5",
            Authorization: `Bearer ${token}`, // Include the token here
          },
        });
        const { github, linkedin, twitter, website } = response.data;
        setLinks({ github, linkedin, twitter, website });
        console.log("Fetched Social Media Links:", response.data);
      } catch (error) {
        console.error("Error fetching social media links:", error);
      }
    };

    fetchSocialMediaLinks();
  }, []);


  const handleSaveChanges = () => {
    console.log("Updated Links:", links);
    // Send the updated links to the server if needed.
  };

  return (
    <div className="space-y-6 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
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
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={links.website}
                  onChange={(e) => setLinks({ ...links, website: e.target.value })}
                />
              </div>
              <Button className="w-full" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex gap-4">
        <a
          href={`https://${links.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href={`https://${links.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href={`https://${links.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Twitter className="w-6 h-6" />
        </a>
        <a
          href={`https://${links.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary"
        >
          <Globe className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
};
