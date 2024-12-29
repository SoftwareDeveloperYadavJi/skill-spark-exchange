import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Education {
  id: number;
  institute: string;
  city: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
}

export const Education = () => {
  const [education, setEducation] = useState<Education[]>([
    {
      id: 1,
      institute: "Stanford University",
      city: "Stanford, CA",
      degree: "Bachelor's",
      field: "Computer Science",
      startYear: "2018",
      endYear: "2022"
    }
  ]);

  const [newEducation, setNewEducation] = useState<Omit<Education, 'id'>>({
    institute: "",
    city: "",
    degree: "",
    field: "",
    startYear: "",
    endYear: ""
  });

  const handleAdd = () => {
    setEducation([...education, { ...newEducation, id: Date.now() }]);
    setNewEducation({
      institute: "",
      city: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: ""
    });
    toast.success("Education added successfully!");
  };

  const handleDelete = (id: number) => {
    setEducation(education.filter(edu => edu.id !== id));
    toast.success("Education entry deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Education</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Add Education
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Education</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="institute">Institute Name</Label>
                  <Input
                    id="institute"
                    value={newEducation.institute}
                    onChange={(e) => setNewEducation({ ...newEducation, institute: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newEducation.city}
                    onChange={(e) => setNewEducation({ ...newEducation, city: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    value={newEducation.degree}
                    onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input
                    id="field"
                    value={newEducation.field}
                    onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startYear">Start Year</Label>
                  <Input
                    id="startYear"
                    type="number"
                    value={newEducation.startYear}
                    onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endYear">End Year</Label>
                  <Input
                    id="endYear"
                    type="number"
                    value={newEducation.endYear}
                    onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAdd} className="w-full">Add Education</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="border rounded-lg p-4 bg-background">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-foreground">{edu.institute}</h3>
                <p className="text-sm text-muted-foreground">{edu.city}</p>
                <p className="text-sm text-foreground">{edu.degree} in {edu.field}</p>
                <p className="text-sm text-muted-foreground">{edu.startYear} - {edu.endYear}</p>
              </div>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => handleDelete(edu.id)}
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};