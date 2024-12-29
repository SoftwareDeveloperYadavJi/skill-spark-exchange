import { Card } from "@/components/ui/card";


interface ProfileDetailsProps {
  onEditProfile: () => void;
  language: string;
  preferredLanguage: string;
  gender: string;
}

export const ProfileDetails = ({ language, preferredLanguage, gender, onEditProfile}: ProfileDetailsProps) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4 text-foreground">About</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium text-foreground">Languages</h3>
          <p className="text-muted-foreground">{language}</p>
        </div>
        <div>
          <h3 className="font-medium text-foreground">Preferred Teaching Language</h3>
          <p className="text-muted-foreground">{preferredLanguage}</p>
        </div>
        <div>
          <h3 className="font-medium text-foreground">Gender</h3>
          <p className="text-muted-foreground">{gender}</p>
        </div>
      </div>
    </Card>
  );
};