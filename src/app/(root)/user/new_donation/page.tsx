"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Leaf, RecycleIcon } from "lucide-react";

export default function DonatePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center space-x-2 mb-2">
              <Leaf className="h-6 w-6 text-green-600" />
              <RecycleIcon className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Make a Difference
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Your clothes can help others and save the environment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base">Type of Contribution</Label>
                <RadioGroup defaultValue="donation" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="donation" id="donation" />
                    <Label htmlFor="donation">Donation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="disposal" id="disposal" />
                    <Label htmlFor="disposal">Disposal</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="item">Item Description</Label>
                  <Input id="item" placeholder="e.g., Winter Jackets" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    placeholder="Number of items"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Pickup Location</Label>
                <Input
                  id="location"
                  placeholder="Enter your complete address"
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>NGO Preference</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select NGO preference" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Open to any NGO</SelectItem>
                      <SelectItem value="goodwill">Goodwill</SelectItem>
                      <SelectItem value="salvation">Salvation Army</SelectItem>
                      <SelectItem value="redcross">Red Cross</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Item Condition</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="bad">Bad</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Pickup Date</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border"
                  disabled={(date) => date < new Date()}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time">Preferred Pickup Time</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                    <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special instructions or details about your items"
                  className="h-24"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Schedule Pickup
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}