"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icons } from "./icons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type z } from "zod";
import { NGOSignUpSchema, signUpSchema } from "@/lib/schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./card";
import { ngoSignUp, signInAction, signUp } from "@/server/auth/actions";
import { redirect } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";
import { RoundSpinner } from "./spinner";

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      role: "USER",
    },
  });

  const ngoForm = useForm<z.infer<typeof NGOSignUpSchema>>({
    resolver: zodResolver(NGOSignUpSchema),
    defaultValues: {
      orgname: "",
      email: "",
      password: "",
      role: "NGO",
      registrationnumber: "",
    },
  });
  const onSubmit = async (formValues: z.infer<typeof signUpSchema>) => {
    setLoading(true);
    const res = await signUp(formValues);
    if (res.success && res.user?.role === "USER") {
      setLoading(false);
      redirect("/");
    } else if (res.success && res.user?.role === "ADMIN") {
      setLoading(false);
      console.log("Admin Spotted");
      return;
    } else {
      setLoading(false);
      toast({
        title: "Error Occurred",
        variant: "destructive",
      });
    }
  };

  const onNGOSubmit = async (formValues: z.infer<typeof NGOSignUpSchema>) => {
    setLoading(true);
    const res = await ngoSignUp(formValues);
    if (res.error) {
      setLoading(false);
      toast({
        title: "Error Occurred",
        variant: "destructive",
        description: "error",
      });
    } else {
      setLoading(false);
      redirect("/ngo");
    }
  };
  return (
    <div className="mx-auto w-full max-w-md rounded-none bg-white p-4 shadow-input dark:bg-black md:rounded-2xl md:p-8">
      <Card className="w-full sm:w-96">
        <CardHeader>
          <CardTitle>Welcome to Wardrobe Care</CardTitle>
          <CardDescription>
            Your old clothes can be someone{"'"}s new clothes. Sign up to donate
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
                    onClick={signInAction}
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
                      className="space-y-4"
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
                      <Button
                        className="w-full text-white"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <RoundSpinner color="white" />
                        ) : (
                          <>Sign up &rarr;</>
                        )}
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
                  <Form {...ngoForm}>
                    <form
                      onSubmit={ngoForm.handleSubmit(onNGOSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={ngoForm.control}
                        name="orgname"
                        render={({ field }) => (
                          <FormItem>
                            <LabelInputContainer>
                              <FormLabel>Organization Name</FormLabel>
                            </LabelInputContainer>
                            <FormControl>
                              <Input
                                placeholder="Organization Name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={ngoForm.control}
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
                        control={ngoForm.control}
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
                      <FormField
                        control={ngoForm.control}
                        name="registrationnumber"
                        render={({ field }) => (
                          <FormItem>
                            <LabelInputContainer>
                              <FormLabel>Registration Number</FormLabel>
                            </LabelInputContainer>
                            <FormControl>
                              <Input
                                placeholder="Registration Number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        className="w-full text-white"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? (
                          <RoundSpinner color="white" />
                        ) : (
                          <>Sign up &rarr;</>
                        )}
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
