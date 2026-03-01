"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginSchemaType } from "@/schema/auth.schema";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner"

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  async function onlogin(values: loginSchemaType) {
    //   const data = await loginUser(values)
    //   console.log(data);
    //   if(data.message == "success"){
    //       router.push("/products")
    //   }
    // }
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      // callbackUrl: "/products"
    });



    if (response?.ok) {
      router.push("/products")
      toast.success("Logged in Successfully ✅", {
        position: "top-right",
        duration: 3000
      })
    } else {
      toast.error(response?.error, {
        position: "top-center",
        duration: 3000
      })
    }

    console.log(response);
  }
  return (
    <>
      <main className="container mx-auto p-5">
        <h1 className="text-3xl font-semibold">Welcome to ShopMart 🛒</h1>
        <p className="my-5">Login Now !</p>
        <div className="max-w-2xl mx-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onlogin)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormDescription />
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
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full cursor-pointer">
                {form.formState.isSubmitted ? <Spinner /> : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  );
}
