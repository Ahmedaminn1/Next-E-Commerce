'use client'
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-bold text-muted/30 select-none leading-none">
            404
          </h1>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-8 mb-4">
          Page Not Found
        </h2>

        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>


        {/* Optional: Helpful Links */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-muted-foreground text-sm mb-3 ">You might be looking for:</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/" className="text-blue-600 hover:text-blue-800 text-sm underline">
              Home
            </Link>
            <Link href="/products" className="text-blue-600 hover:text-blue-800 text-sm underline">
              Products
            </Link>
            <Link href="/brands" className="text-blue-600 hover:text-blue-800 text-sm underline">
              Brands
            </Link>
            <Link href="/categories" className="text-blue-600 hover:text-blue-800 text-sm underline">
              Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}