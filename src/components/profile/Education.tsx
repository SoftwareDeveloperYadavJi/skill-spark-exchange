import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import exp from "constants";

// Define the structure for an Education entry
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

 const Education = ({ initialEducation = [] }: EducationProps) => {
  const [education, setEducation] = useState<Education[]>(initialEducation);
  const [newEducation, setNewEducation] = useState<Omit<Education, "id" | "userId" | "createdAt" | "updatedAt">>({
    institute: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
  });

  const token = localStorage.getItem("authToken"); // Retrieve the token from localStorage

  // Fetch education data from the server
  useEffect(() => {
    const fetchEducation = async () => {
      if (!token) {
        toast.error("Please log in to access education data.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/user/education", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setEducation(response.data);
        } else {
          toast.error("Failed to load education data.");
        }
      } catch (error) {
        toast.error("Error fetching education data.");
      }
    };

    fetchEducation();
  }, [token]);

  // Add a new education entry
  const handleAdd = async () => {
    const { institute, degree, fieldOfStudy, startDate, endDate } = newEducation;

    if (!institute || !degree || !fieldOfStudy || !startDate || !endDate) {
      toast.error("All fields must be filled!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/api/update/education",
        { educations: [newEducation] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setEducation((prev) => [...prev, ...response.data.educations]);
      setNewEducation({ institute: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "" });
      toast.success("Education added successfully!");
    } catch (error) {
      toast.error("Error adding education entry.");
    }
  };

  // Delete an education entry
  const handleDelete = async (id: string) => {
    if (!token) {
      toast.error("No token found. Please log in.");
      return;
    }

    try {
      await axios.delete(`http://localhost:4000/api/user/education/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEducation((prev) => prev.filter((edu) => edu.id !== id));
      toast.success("Education entry deleted successfully!");
    } catch (error) {
      toast.error("Error deleting education entry.");
    }
  };

  // Format date for display
  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  return (
    <div className="space-y-6 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
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
