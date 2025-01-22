"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "./ui/checkbox";
import { Dropzone } from "./Dropzone";

const profileFormSchema = z.object({
  contactPerson: z.string().nonempty(),
  headOfficeAddress: z.string().nonempty(),
  website: z.string().url(),
  bio: z.string().nonempty(),
  termsAgreement: z.boolean(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: ProfileFormValues = {
  contactPerson: "",
  headOfficeAddress: "",
  website: "",
  bio: "",
  termsAgreement: false,
};

export function ProfileForm() {
  const { toast } = useToast();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log("submitting");
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* // Contact Person: Name of a representative to coordinate. */}
        <FormField
          control={form.control}
          name="contactPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of a representative to coordinate with.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Head Office Address: Complete physical address of the NGO. */}
        <FormField
          control={form.control}
          name="headOfficeAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Head Office Address</FormLabel>
              <FormControl>
                <Input placeholder="123 Main St, City, Country" {...field} />
              </FormControl>
              <FormDescription>
                This is the complete physical address of the NGO.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Website */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} />
              </FormControl>
              <FormDescription>
                This is the official website of the NGO.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Mission Statement: A brief overview of their goals and values.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Terms & Conditions Agreement: Acknowledgment of rules for using the platform. */}
        <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
          <Dropzone heading="Proof Of Registration" />
          <Dropzone heading="Tax Exemption Certificate" />
        </div>
        <FormField
          control={form.control}
          name="termsAgreement"
          render={({ field }) => (
            <FormItem className="items-startspace-x-3 flex flex-row space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="text-white"
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  You agree to our terms and conditions and privacy policy.
                </FormLabel>
                <FormDescription>
                  Acknowledgment of rules for using the platform.
                </FormDescription>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="text-white">
          Update profile
        </Button>
      </form>
    </Form>
  );
}
