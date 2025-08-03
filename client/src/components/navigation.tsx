import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Homepage" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact Us" },
    { href: "/events", label: "Member Events" },
    { href: "/portal", label: "Member Portal" },
  ];

  const NavContent = () => (
    <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`text-navy-blue hover:text-blue-800 transition-colors font-medium ${
            location === item.href ? "font-bold" : ""
          }`}
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo and Hamburger Menu */}
          <div className="flex items-center">
            {/* Mobile Menu */}
            <div className="lg:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-navy-blue">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <div className="mt-6">
                    <NavContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <Link href="/" className="ml-4 lg:ml-0">
              <span className="text-2xl font-bold text-navy-blue" style={{ fontFamily: "Georgia, serif" }}>
                CFC
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:ml-10 lg:block">
              <NavContent />
            </div>
          </div>

          {/* Right: Apply & Login Buttons */}
          <div className="flex items-center space-x-4">
            <Link href="/apply">
              <Button className="bg-navy-blue text-white hover:bg-blue-900">
                Apply
              </Button>
            </Link>
            <Link href="/portal">
              <Button variant="outline" className="border-navy-blue text-navy-blue hover:bg-columbia-blue">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
