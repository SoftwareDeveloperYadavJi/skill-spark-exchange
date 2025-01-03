import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";

interface ReviewPopupProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    id: string; // Add id prop to the component
}

export const ReviewPopup = ({ open, onOpenChange, id }: ReviewPopupProps) => {
    const [review, setReview] = useState({
        description: "",
        rating: 3, // Default rating
    });

    const handleSave = async () => {
        try {
            // Construct request payload in the desired format
            const data = {
                userId: id, // Use the provided ID prop
                reviewDescription: review.description,
                rating: review.rating.toString(), // Convert rating to string
            };
            console.log("Review data:", data);

            // Send the POST request
            await axios.post("http://localhost:4000/api/review/update", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            toast.success("Review submitted successfully!");
            onOpenChange(false); // Close the dialog
        } catch (error) {
            toast.error("Failed to submit the review. Please try again.");
            console.error("Error submitting review:", error);
        }
    };

    const handleCancel = () => {
        onOpenChange(false); // Close dialog without saving
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Submit a Review</DialogTitle>
                    <DialogDescription>
                        Please provide your review details below.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                    {/* Rating Slider */}
                    <div className="space-y-2">
                        <Label htmlFor="rating">Rating</Label>
                        <Slider
                            id="rating"
                            min={1}
                            max={5}
                            step={1}
                            value={[review.rating]}
                            onValueChange={(value) => setReview({ ...review, rating: value[0] })}
                        />
                        <p className="text-sm text-gray-500">Rating: {review.rating} / 5</p>
                    </div>

                    {/* Review Description */}
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={review.description}
                            onChange={(e) =>
                                setReview({ ...review, description: e.target.value })
                            }
                            placeholder="Write your review here..."
                            rows={4}
                            className="resize-none"
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-4">
                    {/* Cancel Button */}
                    <Button variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                    {/* Submit Button */}
                    <Button onClick={handleSave}>
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
