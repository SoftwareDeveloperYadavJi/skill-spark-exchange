import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";
import { toast } from "sonner";

interface ReviewPopupProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export const ReviewPopup = ({ open, onOpenChange }: ReviewPopupProps) => {
    const [review, setReview] = useState({
        description: "",
        rating: 3, // Default rating
    });

    const handleSave = () => {
        // Save review details (typically to backend)
        toast.success("Review submitted successfully!");
        onOpenChange(false); // Close dialog
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
                </div>
                <div className="flex justify-between mt-4">
                    {/* Cancel Button */}
                    <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                    {/* Submit Button */}
                    <Button onClick={handleSave}>Submit</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};