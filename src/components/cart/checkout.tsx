'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import { Spinner } from "../ui/spinner";
import { checkoutUsers } from "@/app/_actions/cart.actions";
import { checkoutSchema, checkoutSchemaType } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function Checkout({cartId}: {cartId:string}) {
    const form = useForm({
      resolver:zodResolver(checkoutSchema),
        defaultValues: {
            shippingAddress:{
                details:"",
                city:"",
                phone:""
        }
    },
  })

  async function handelCheckout(values: checkoutSchemaType) {
    const response = await checkoutUsers(values , cartId)
    console.log(response);
    if(response.status == "success"){
        window.location.href = response.session.url
    }
    console.log(values);
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mb-3">
            Proceed to Checkout
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Checkout</DialogTitle>
            <DialogDescription>
                Complete the following info for checkout
            </DialogDescription>
          </DialogHeader>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(handelCheckout)} className="space-y-6">
              <FormField
                control={form.control}
                name="shippingAddress.details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Details</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shippingAddress.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                </FormItem>
                )}
            />
          <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
                {form.formState.isSubmitted ? <Spinner /> : "CheckOut"}
            </Button>
          </DialogFooter>
        </form>
          </Form>
    </DialogContent>
      </form>
    </Dialog>
  )
}
