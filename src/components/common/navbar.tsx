"use client";
import Link from "next/link";
import React, { useContext } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ShoppingCart, UserRound, Moon, Sun } from "lucide-react";
import { Badge } from "../ui/badge";
import { signOut, useSession } from "next-auth/react";
import { CartContext } from "@/providers/cart-provider";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleTheme } from "@/redux/slices/themeSlice";
import { Button } from "../ui/button";

export default function Navbar() {
  const { data: session } = useSession();
  const { noOfCartItems } = useContext(CartContext);


  const { count } = useSelector((state: RootState) => state.counter);
  const mode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();
  console.log(count);

  function logoutUser() {
    signOut({ callbackUrl: "/login" });
  }

  return (
    <nav className="bg-background/80 backdrop-blur-md p-5 fixed top-0 w-full z-20 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <div className="nav-logo flex items-center gap-1">
          <Avatar className="rounded-lg bg-primary text-primary-foreground font-bold text-xl">
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <Link href="/" className="text-2xl font-bold">
            ShopMart {count}
          </Link>
        </div>

        <div className="nav-links">
          <NavigationMenu className="gap-2">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/products">Products</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/brands">Brands</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/categories">Categories</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenu>
        </div>

        <div className="nav-actions flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
          >
            {mode === "light" ? (
              <Moon className="size-6" />
            ) : (
              <Sun className="size-6" />
            )}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3" asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <p>{session && `Welcome, ${session.user?.name}`}</p>
                <UserRound className="size-6" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {session ? (
                <>
                  <Link href="/orders">
                    <DropdownMenuItem> Your Orders</DropdownMenuItem>
                  </Link>

                  <DropdownMenuItem className="cursor" onClick={logoutUser}>
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <DropdownMenuItem>Login</DropdownMenuItem>
                  </Link>
                  <Link href="/register">
                    <DropdownMenuItem>Register</DropdownMenuItem>
                  </Link>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          {session && (
            <Link href="/cart" className="relative">
              <Badge className="h-5 min-w-5 absolute bottom-full start-full -translate-x-1/2 translate-y-1/2 rounded-full px-1 font-mono tabular-nums">
                {noOfCartItems}
              </Badge>
              <ShoppingCart className="size-6" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
