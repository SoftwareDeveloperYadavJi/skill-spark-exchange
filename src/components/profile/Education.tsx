import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Education {
  id: string;
  userId: string;
  institute: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  createdAt?: string;
  updatedAt?: string;
}

interface EducationProps {
  initialEducation: Education[];
}

export const Education = ({ initialEducation }: EducationProps) => {
  // Initialize the state with localStorage fallback or initialEducation prop
  const [education, setEducation] = useState<Education[]>(() => {
    const savedEducation = localStorage.getItem('education');
    return savedEducation ? JSON.parse(savedEducation) : initialEducation || [];
  });

  const [newEducation, setNewEducation] = useState<Omit<Education, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>({
    institute: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: ""
  });

  // Effect to save the education data in localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('education', JSON.stringify(education));
  }, [education]);

  const formatDateForInput = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAdd = () => {
    if (!newEducation.institute || !newEducation.degree || !newEducation.fieldOfStudy || !newEducation.startDate || !newEducation.endDate) {
      toast.error("All fields must be filled!");
      return;
    }

    const newEntry: Education = {
      ...newEducation,
      id: Date.now().toString(),
      userId: "dummy-user-id",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setEducation((prevEducation) => [...prevEducation, newEntry]);
    setNewEducation({
      institute: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: ""
    });
    toast.success("Education added successfully!");
  };

  const handleDelete = (id: string) => {
    setEducation((prevEducation) => prevEducation.filter((edu) => edu.id !== id));
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
              <div className="space-y-2">
                <Label htmlFor="institute">Institute Name</Label>
                <Input
                  id="institute"
                  value={newEducation.institute}
                  onChange={(e) => setNewEducation({ ...newEducation, institute: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="degree">Degree</Label>
                <Input
                  id="degree"
                  value={newEducation.degree}
                  onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fieldOfStudy">Field of Study</Label>
                <Input
                  id="fieldOfStudy"
                  value={newEducation.fieldOfStudy}
                  onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newEducation.startDate}
                    onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={newEducation.endDate}
                    onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAdd} className="w-full">Add Education</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {education.length > 0 ? (
          education.map((edu) => (
            <div key={edu.id} className="border rounded-lg p-4 bg-background">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-foreground">{edu.institute}</h3>
                  <p className="text-sm text-foreground">{edu.degree} in {edu.fieldOfStudy}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDateForDisplay(edu.startDate)} - {formatDateForDisplay(edu.endDate)}
                  </p>
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
          ))
        ) : (
          <p className="text-muted-foreground">No education entries available.</p>
        )}
      </div>
    </div>
  );
};

export default Education;
