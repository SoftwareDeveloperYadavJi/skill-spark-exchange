import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

export const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "John Doe",
      rating: 5,
      review: "Excellent mentor! Very patient and knowledgeable.",
      date: "2024-02-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      rating: 4,
      review: "Great teaching style and very helpful explanations.",
      date: "2024-02-10"
    }
  ];

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-medium">{review.name}</h3>
              <div className="flex items-center">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-gray-600">{review.review}</p>
            <p className="text-sm text-gray-500 mt-1">
              {new Date(review.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};