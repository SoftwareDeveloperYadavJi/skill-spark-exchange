import { Card } from "@/components/ui/card";

export const ProfileDetails = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">About</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-gray-700">Languages</h3>
          <p className="text-gray-600">English (Native), Spanish (Intermediate)</p>
        </div>
        <div>
          <h3 className="font-medium text-gray-700">Preferred Teaching Language</h3>
          <p className="text-gray-600">English</p>
        </div>
        <div>
          <h3 className="font-medium text-gray-700">Gender</h3>
          <p className="text-gray-600">Male</p>
        </div>
      </div>
    </Card>
  );
};