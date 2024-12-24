import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export const Education = () => {
  const education = [
    {
      institute: "Stanford University",
      degree: "Master of Computer Science",
      year: "2020-2022"
    },
    {
      institute: "MIT",
      degree: "Bachelor of Computer Science",
      year: "2016-2020"
    }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Education</h2>
      </div>
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
            <h3 className="font-medium">{edu.institute}</h3>
            <p className="text-gray-600">{edu.degree}</p>
            <p className="text-sm text-gray-500">{edu.year}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};