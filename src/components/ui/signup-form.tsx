"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "./icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { signUpSchema } from "@/lib/schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./card";
import Link from "next/link";

export function SignupForm() {
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (formValues: z.infer<typeof signUpSchema>) => {
    console.log(formValues);
  };
  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Welcome to Wardrobe Care</CardTitle>
          <CardDescription>
            Your old clothes can be someone's new clothes. Sign up to donate
          </CardDescription>
        </CardHeader>

        <div className="flex flex-col gap-y-2">
          <Tabs defaultValue="user">
            <TabsList className="mx-auto grid w-[90%] grid-cols-2">
              <TabsTrigger value="user" className="w-full">
                User
              </TabsTrigger>
              <TabsTrigger value="ngo" className="w-full">
                NGO
              </TabsTrigger>
            </TabsList>
            <TabsContent value="user">
              <CardContent className="grid gap-y-4">
                <div>
                  <Button
                    size="sm"
                    variant="outline"
                    type="button"
                    className="mt-3 w-full"
                    onClick={() => console.log("Google Sign in")}
                  >
                    <Icons.google className="mr-2 size-4" />
                    Google
                  </Button>
                  <p className="my-3 flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
                    or
                  </p>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="fullname"
                        render={({ field }) => (
                          <FormItem>
                            <LabelInputContainer>
                              <FormLabel>Full Name</FormLabel>
                            </LabelInputContainer>
                            <FormControl>
                              <Input placeholder="Full Name" {...field} />
                            </FormControl>
                            <FormDescription>
                              This is your public display name.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <LabelInputContainer>
                              <FormLabel>Email</FormLabel>
                            </LabelInputContainer>
                            <FormControl>
                              <Input placeholder="Email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <LabelInputContainer>
                              <FormLabel>Password</FormLabel>
                            </LabelInputContainer>
                            <FormControl>
                              <Input placeholder="Password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button className="w-full text-white" type="submit">
                        Sign up &rarr;
                      </Button>
                    </form>
                  </Form>
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid w-full gap-y-4">
                  <Button variant="link" size="sm" asChild>
                    <Link href="/auth/sign-in">
                      Already have an account? Sign in
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </TabsContent>
            <TabsContent value="ngo">
              <CardContent className="grid gap-y-4">
                <div className="py-4">
                  <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
                    <LabelInputContainer>
                      <Label htmlFor="firstname">First name</Label>
                      <Input id="firstname" placeholder="John" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                      <Label htmlFor="lastname">Last name</Label>
                      <Input id="lastname" placeholder="Doe" type="text" />
                    </LabelInputContainer>
                  </div>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      placeholder="xyz@wardrobe.com"
                      type="email"
                    />
                  </LabelInputContainer>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      placeholder="••••••••"
                      type="password"
                    />
                  </LabelInputContainer>

                  <Button className="w-full text-white" type="submit">
                    Sign up &rarr;
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <div className="grid w-full gap-y-4">
                  <Button variant="link" size="sm" asChild>
                    <Link href="/auth/sign-in">
                      Already have an account? Sign in
                    </Link>
                  </Button>
                </div>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
