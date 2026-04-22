import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4 text-primary">
              Ebenezer SHS
            </h3>
            <p className="text-sm text-muted-foreground">
              Established in 1941, Ebenezer Senior High School (Padua) is committed to academic excellence and character development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/academics">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Academics
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/admissions">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    Admissions
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/news">
                  <a className="text-muted-foreground hover:text-primary transition-colors">
                    News
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  Dansoman, Accra, Ghana
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a
                  href="tel:+233302986227"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +233 30 298 6227
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary flex-shrink-0" />
                <a
                  href="mailto:info@ebenezer-shs.edu.gh"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@ebenezer-shs.edu.gh
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com/gopadu4"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/ebenezer_shs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>
              &copy; {new Date().getFullYear()} Ebenezer Senior High School. All
              rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
