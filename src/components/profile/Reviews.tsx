import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Star, User } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  visible: boolean;
}

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  // Fetch reviews from the API
  useEffect(() => {
    const fetchReviews = async () => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:4000/api/review/get",
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.request(config);
        const fetchedReviews = response.data.map((review: any) => ({
          id: review.id,
          name: review.user.name,
          rating: review.rating,
          comment: review.reviewDescription,
          visible: true, // Default to visible
        }));
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  const toggleReviewVisibility = (id: string) => {
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
