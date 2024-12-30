import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";

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
  initialEducation?: Education[];
}

export const Education = ({ initialEducation = [] }: EducationProps) => {
  const [education, setEducation] = useState<Education[]>(initialEducation);
  const [newEducation, setNewEducation] = useState<Omit<Education, "id" | "userId" | "createdAt" | "updatedAt">>({
    institute: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/user/education", {
          headers: { "user-id": "cm519rtib0000ffy0llai5lc5" },
        });

        if (Array.isArray(response.data)) {
          setEducation(response.data);
        } else {
          console.error("Invalid response format:", response.data);
          toast.error("Failed to load education data.");
        }
      } catch (error) {
        console.error("Error fetching education data:", error);
        toast.error("Error fetching education data.");
      }
    };

    fetchEducation();
  }, []);

  const handleAdd = async () => {
    if (!newEducation.institute || !newEducation.degree || !newEducation.fieldOfStudy || !newEducation.startDate || !newEducation.endDate) {
      toast.error("All fields must be filled!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/user/education",
        {
          ...newEducation,
        },
        {
          headers: { "user-id": "cm519rtib0000ffy0llai5lc5" },
        }
      );

      setEducation((prev) => [...prev, response.data]);
      setNewEducation({
        institute: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
      });
      toast.success("Education added successfully!");
    } catch (error) {
      console.error("Error adding education:", error);
      toast.error("Error adding education entry.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:4000/api/user/education/${id}`, {
        headers: { "user-id": "cm519rtib0000ffy0llai5lc5" },
      });

      setEducation((prev) => prev.filter((edu) => edu.id !== id));
      toast.success("Education entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting education:", error);
      toast.error("Error deleting education entry.");
    }
  };

  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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
              <Button onClick={handleAdd} className="w-full">
                Add Education
              </Button>
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
                  <p className="text-sm text-foreground">
                    {edu.degree} in {edu.fieldOfStudy}
                  </p>
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
