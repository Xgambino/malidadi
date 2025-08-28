import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Icon from "../../../components/AppIcon";
import emailjs from "emailjs-com";

const Footer = () => {
  const currentYear = new Date()?.getFullYear();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsSubscribed(false);

  // ✅ Stronger email validation with regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    setError("Please enter your email address");
    return;
  }
  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address");
    return;
  }

  setIsLoading(true);

  try {
    await emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE_ID,
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  {
    email: "malidadikenya@gmail.com",
    from_name: "Malidadi Website",
    from_email: email
  },
  import.meta.env.VITE_EMAILJS_PUBLIC_KEY
);

    setIsSubscribed(true);
    setEmail("");

    // ❌ Instead of auto-resetting after 5s,
    // keep success visible until user types again
    // setTimeout(() => setIsSubscribed(false), 5000);
  } catch (err) {
    console.error("EmailJS error:", err);
    setError(err?.text || err?.message || "Failed to send email");
  } finally {
    setIsLoading(false);
  }
};

  const handleEmailChange = (e) => {
    setEmail(e?.target?.value);
    if (error) setError("");
  };

  const footerSections = [
    {
      title: "Shop",
      links: [
        { label: "All Products", href: "/product-catalog" },
        { label: "Electronics", href: "/product-catalog" },
        { label: "Fashion", href: "/product-catalog" },
        { label: "Home & Garden", href: "/product-catalog" },
        { label: "Sports", href: "/product-catalog" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { label: "Contact Us", href: "#" },
        { label: "FAQ", href: "#" },
        { label: "Shipping Info", href: "#" },
        { label: "Returns", href: "#" },
        { label: "Size Guide", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
        { label: "Sustainability", href: "#" },
        { label: "Investors", href: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Cookie Policy", href: "#" },
        { label: "Accessibility", href: "#" },
        { label: "Sitemap", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "https://facebook.com" },
    { name: "Twitter", icon: "Twitter", href: "https://twitter.com" },
    { name: "Instagram", icon: "Instagram", href: "https://instagram.com" },
    { name: "Youtube", icon: "Youtube", href: "https://youtube.com" },
    { name: "LinkedIn", icon: "Linkedin", href: "https://linkedin.com" },
  ];

  const paymentMethods = [
    { name: "Visa", icon: "CreditCard" },
    { name: "Mastercard", icon: "CreditCard" },
    { name: "PayPal", icon: "Wallet" },
    { name: "Apple Pay", icon: "Smartphone" },
    { name: "Google Pay", icon: "Smartphone" },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-surface border-t border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link
              to="/homepage"
              className="flex items-center space-x-3 group transition-all duration-300"
            >
              <div className="w-[190px] h-[auto] rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
                <img
                  src="/assets/images/logoi.png"
                  alt="Malidadi Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>

            <p className="text-muted-foreground text-sm mb-6 max-w-sm">
              Your trusted online shopping destination for quality African
              products at competitive prices. Discover amazing deals and
              exceptional customer service.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200 group"
                  aria-label={social?.name}
                >
                  <Icon
                    name={social?.icon}
                    size={18}
                    className="text-muted-foreground group-hover:text-white transition-colors duration-200"
                  />
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-3 mt-6">
              {paymentMethods.map((method) => (
                <div
                  key={method.name}
                  className="w-10 h-10 flex items-center justify-center"
                >
                  <Icon name={method.icon} size={24} title={method.name} />
                </div>
              ))}
            </div>

            {/* Contact Info */}
            <div className="mt-6 text-muted-foreground text-sm">
              <p>
                Email:{" "}
                <a
                  href="mailto:support@malidadi.com"
                  className="text-primary hover:underline"
                >
                  support@malidadi.com
                </a>
              </p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+254700000000"
                  className="text-primary hover:underline"
                >
                  +254 700 000 000
                </a>
              </p>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections?.map((section) => (
            <div key={section?.title} className="lg:col-span-1">
              <h3 className="font-semibold text-foreground mb-4">
                {section?.title}
              </h3>
              <ul className="space-y-3">
                {section?.links?.map((link) => (
                  <li key={link?.label}>
                    <Link
                      to={link?.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors duration-200"
                    >
                      {link?.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-border pt-8 mt-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-6 md:space-y-0">
            <div className="max-w-md">
              <h3 className="font-semibold text-foreground mb-2">
                Stay Connected
              </h3>
              <p className="text-muted-foreground text-sm">
                Get the latest updates on new products and exclusive offers.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSubscribed && !isLoading ? (
                <p className="text-success mt-2 text-sm">
                  Thank you! You have successfully subscribed to our emails.
                </p>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={handleEmailChange}
                      error={error}
                      className="bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:bg-white/20"
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    loading={isLoading}
                    disabled={isLoading}
                    iconName="Send"
                    iconPosition="right"
                    iconSize={16}
                    className="bg-white text-primary hover:bg-white/90 font-semibold px-6 sm:px-8"
                  >
                    {isLoading ? "Subscribing..." : "Subscribe"}
                  </Button>
                </div>
              )}
            </form>

            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Secure Shopping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Truck" size={16} className="text-success" />
                <span>Free Shipping In Nairobi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Top */}
        <div className="mt-8 text-center">
          <Button
            type="button"
            onClick={scrollToTop}
            variant="ghost"
            className="text-muted-foreground hover:text-primary text-sm"
          >
            Back to Top ↑
          </Button>
        </div>

        {/* Footer Bottom */}
        <div className="mt-6 text-center text-muted-foreground text-sm">
          &copy; {currentYear} Malidadi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
