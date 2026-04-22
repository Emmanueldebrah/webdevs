import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "./ui/button";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { isAuthenticated, logout, user } = useAuth();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/academics", label: "Academics" },
    { href: "/admissions", label: "Admissions" },
    { href: "/news", label: "News" },
    { href: "/events", label: "Events" },
    { href: "/staff", label: "Staff" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-md">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2 font-serif font-bold text-2xl text-primary hover:text-primary/80 transition-colors">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white text-lg font-bold">
                E
              </div>
              <span className="hidden sm:inline">Ebenezer SHS</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user?.role === "admin" && (
              <Link href="/admin">
                <a className="px-3 py-2 rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors">
                  Admin
                </a>
              </Link>
            )}
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground">{user?.name}</span>
                <Button
                  onClick={() => logout()}
                  variant="outline"
                  size="sm"
                >
                  Logout
                </Button>
              </>
            ) : (
              <a href={getLoginUrl()}>
                <Button size="sm" className="btn-primary">
                  Login
                </Button>
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border pt-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <div className="pt-2 border-t border-border mt-2 space-y-2">
              {isAuthenticated && user?.role === "admin" && (
                <Link href="/admin">
                  <a
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
                  >
                    Admin Dashboard
                  </a>
                </Link>
              )}
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    {user?.name}
                  </div>
                  <Button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <a href={getLoginUrl()}>
                  <Button size="sm" className="btn-primary w-full">
                    Login
                  </Button>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
