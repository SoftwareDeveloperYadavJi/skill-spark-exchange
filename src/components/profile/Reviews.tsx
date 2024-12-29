import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Star, User } from "lucide-react";
import { useState } from "react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  visible: boolean;
}

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: "Alice Johnson",
      rating: 5,
      comment: "Excellent mentor! Very patient and knowledgeable.",
      visible: true
    },
    {
      id: 2,
      name: "Bob Smith",
      rating: 4,
      comment: "Great teaching style and clear explanations.",
      visible: true
    }
  ]);

  const toggleReviewVisibility = (id: number) => {
    setReviews(reviews.map(review =>
      review.id === id ? { ...review, visible: !review.visible } : review
    ));
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="w-4 h-4" />
                </div>
                <span className="font-semibold">{review.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Show in profile</span>
                <Switch
                  checked={review.visible}
                  onCheckedChange={() => toggleReviewVisibility(review.id)}
                />
              </div>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};