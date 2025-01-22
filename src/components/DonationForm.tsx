"use client";
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "./ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addDonation } from "@/server/donation/actions";
import { toast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";

const donationFormSchema = z.object({
  donationType: z.enum(["DONATION", "DISPOSAL"]),
  itemDescription: z.string().min(1, "Item description is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  location: z.string().min(1, "Pickup location is required"),
  ngoId: z.string().optional(),
  itemCondition: z.enum(["GOOD", "NORMAL", "BAD"]),
  pickupDate: z.date({
    required_error: "Please select a date",
  }),
  pickupTime: z.string().min(1, "Please select a pickup time"),
  notes: z.string().optional(),
});

export type DonationFormValues = z.infer<typeof donationFormSchema>;

const DonationForm = ({ availableNgos }) => {
  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      donationType: "DONATION",
      notes: "",
    },
  });

  async function onSubmit(data: DonationFormValues) {
    const res = await addDonation(data);
    if (res) {
      toast({
        title: "Donation scheduled",
        description: "Your donation has been scheduled successfully",
      });
      redirect("/user");
    } else {
      toast({
        title: "Error",
        description: "An error occurred while scheduling your donation",
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="donationType"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormLabel className="text-base">Type of Donation</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="DONATION" id="donation" />
                    <Label htmlFor="donation">Donation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="DISPOSAL" id="disposal" />
                    <Label htmlFor="disposal">Disposal</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="itemDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item Description</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Winter Jackets" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    placeholder="Number of items"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pickup Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter your complete address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="itemCondition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Condition</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="GOOD">Good</SelectItem>
                  <SelectItem value="NORMAL">Normal</SelectItem>
                  <SelectItem value="BAD">Bad</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ngoId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Select NGO</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an NGO" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableNgos.map((ngo) => (
                    <SelectItem key={ngo.id} value={ngo.id}>
                      {ngo.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose a specific NGO for your donation
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full justify-between gap-2">
          <FormField
            control={form.control}
            name="pickupDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Pickup Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      // initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pickupTime"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Preferred Pickup Time</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred time" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="morning">
                      Morning (9 AM - 12 PM)
                    </SelectItem>
                    <SelectItem value="afternoon">
                      Afternoon (12 PM - 4 PM)
                    </SelectItem>
                    <SelectItem value="evening">
                      Evening (4 PM - 7 PM)
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any special instructions or details about your items"
                  className="h-24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-green-600 text-white hover:bg-green-700"
        >
          Schedule Pickup
        </Button>
      </form>
    </Form>
  );
};

export default DonationForm;
