"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import { signInAction, signInWithCreds } from "@/server/auth/actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { z } from "zod";
import { signInSchema } from "@/lib/schemas";
import { ArrowRight } from "lucide-react";

function SignInPage() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    await signInWithCreds(data);
  };

  return (
    <Card className="w-full sm:w-96">
      <CardHeader>
        <CardTitle>Sign in to Wardrobe Care</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to continue
        </CardDescription>
      </CardHeader>
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="mx-6 w-[85%] md:mx-5 md:w-[90%]">
          <TabsTrigger value="user" className="w-full">
            User
          </TabsTrigger>
          <TabsTrigger value="ngo" className="w-full">
            NGO
          </TabsTrigger>
        </TabsList>
        <TabsContent value="user">
          <CardContent className="grid gap-y-4">
            <Button
              size="sm"
              variant="outline"
              type="button"
              className="my-3"
              onClick={signInAction}
            >
              <Icons.google className="mr-2 size-4" />
              Google
            </Button>

            <p className="flex items-center gap-x-3 text-sm text-muted-foreground before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border">
              or
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
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
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full text-white">
                  Sign in <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          </CardContent>
        </TabsContent>
        <TabsContent value="ngo">
          <CardContent className="grid gap-y-4">
            <div className="space-y-2">
              <Label>Email address</Label>
              <Input type="email" required />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input type="password" required />
            </div>
          </CardContent>
        </TabsContent>
      </Tabs>

      <CardFooter>
        <div className="grid w-full gap-y-4">
          <Button variant="link" size="sm" asChild>
            <Link href="/auth/sign-up">
              Don&apos;t have an account? Sign up
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export { SignInPage };
