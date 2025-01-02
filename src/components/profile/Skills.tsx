import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Skill {
  id: string;
  name: string;
}

export const Skills = () => {
  const [offeredSkills, setOfferedSkills] = useState<Skill[]>([]);
  const [requestedSkills, setRequestedSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState<"offered" | "requested">("offered");

  const fetchSkills = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/user/skillexchange",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await axios.request(config);
      const data = response.data[0];
      setOfferedSkills(
        data.offeredSkill.split(", ").map((skill: string, index: number) => ({
          id: `offered-${index}`,
          name: skill,
        }))
      );
      setRequestedSkills(
        data.requestedSkill.split(", ").map((skill: string, index: number) => ({
          id: `requested-${index}`,
          name: skill,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateSkills = async () => {
    const token = localStorage.getItem("authToken");
    const userId = "cm519rtib0000ffy0llai5lc5"; // Replace with actual user ID logic

    if (!token) {
      console.error("No token found");
      return;
    }

    const offeredSkillNames = offeredSkills.map((skill) => skill.name).join(", ");
    const requestedSkillNames = requestedSkills.map((skill) => skill.name).join(", ");

    const data = JSON.stringify({
      offeredSkill: offeredSkillNames,
      requestedSkill: requestedSkillNames,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:4000/api/update/skillexchange",
      headers: {
        "user-id": userId,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data,
    };

    try {
      const response = await axios.request(config);
      console.log("Skills updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating skills:", error);
    }
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    const skill = { id: `${Date.now()}`, name: newSkill };
    if (skillType === "offered") {
      setOfferedSkills([...offeredSkills, skill]);
    } else {
      setRequestedSkills([...requestedSkills, skill]);
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (id: string, type: "offered" | "requested") => {
    if (type === "offered") {
      setOfferedSkills(offeredSkills.filter((skill) => skill.id !== id));
    } else {
      setRequestedSkills(requestedSkills.filter((skill) => skill.id !== id));
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className="space-y-6 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Skills</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit Skills
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Skills</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={skillType === "offered" ? "default" : "outline"}
                  onClick={() => setSkillType("offered")}
                >
                  Offered Skills
                </Button>
                <Button
                  variant={skillType === "requested" ? "default" : "outline"}
                  onClick={() => setSkillType("requested")}
                >
                  Requested Skills
                </Button>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Add a skill..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                />
                <Button onClick={handleAddSkill}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>{skillType === "offered" ? "Offered Skills" : "Requested Skills"}</Label>
                <div className="space-y-2">
                  {(skillType === "offered" ? offeredSkills : requestedSkills).map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-2 border rounded">
                      <span>{skill.name}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSkill(skill.id, skillType)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={updateSkills} className="w-full">
                Save Changes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-4">Offered Skills</h3>
          <div className="space-y-2">
            {offeredSkills.map((skill) => (
              <div key={skill.id} className="inline-block mr-2 mb-2">
                <span className="px-3 py-1 bg-primary/10 rounded-full text-sm">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-4">Requested Skills</h3>
          <div className="space-y-2">
            {requestedSkills.map((skill) => (
              <div key={skill.id} className="inline-block mr-2 mb-2">
                <span className="px-3 py-1 bg-secondary/10 rounded-full text-sm">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
