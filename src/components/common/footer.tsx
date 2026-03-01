import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground w-10 h-10 flex justify-center items-center rounded-lg">
              S
            </div>
            <span className="text-2xl font-semibold">ShopMart</span>
          </div>

          <p className="text-muted-foreground leading-6">
            Your one-stop destination for the the latest technology, fashion,
            and lifestyle products, Quality guaranteed with fast shipping and
            excellent customer service.
          </p>

          <div className="space-y-3 text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>123 Shop Street, Nasr City, DC 12345</span>
            </div>

            <div className="flex items-center gap-2">
              <Phone size={18} />
              <span>(+20) 01068504037</span>
            </div>

            <div className="flex items-center gap-2">
              <Mail size={18} />
              <span>ahmedamin372002@gmail.com</span>
            </div>
          </div>

        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 capitalize">shop</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home & Garden</li>
            <li>Sports</li>
            <li>Deals</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 capitalize">customer sevice</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li>Contact Us</li>
            <li>Help Center</li>
            <li>Track Your Order</li>
            <li>Returns & Exchanges</li>
            <li>Size Guide</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4 capitalize">polices</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li>Privacy Policy</li>
            <li>Terms Of Services</li>
            <li>Cookie Policy</li>
            <li>Shipping Policy</li>
            <li>Refund Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
