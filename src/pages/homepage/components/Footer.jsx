import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../components/AppIcon";

const Footer = () => {
  const currentYear = new Date()?.getFullYear();
 const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
    { name: "Facebook", icon: "Facebook", href: "#" },
    { name: "Twitter", icon: "Twitter", href: "#" },
    { name: "Instagram", icon: "Instagram", href: "#" },
    { name: "Youtube", icon: "Youtube", href: "#" },
    { name: "LinkedIn", icon: "Linkedin", href: "#" },
  ];

  const paymentMethods = [
    { name: "Visa", icon: "CreditCard" },
    { name: "Mastercard", icon: "CreditCard" },
    { name: "PayPal", icon: "Wallet" },
    { name: "Apple Pay", icon: "Smartphone" },
    { name: "Google Pay", icon: "Smartphone" },
  ];

  return (
    <footer className="bg-surface border-t border-border">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link
              to="/homepage"
              className="flex items-center space-x-3 group transition-all duration-300"
              onClick={closeMobileMenu}
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
              Your trusted online shopping destination for quality african products at
              competitive prices. Discover amazing deals and exceptional
              customer service.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks?.map((social) => (
                <a
                  key={social?.name}
                  href={social?.href}
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

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Secure Shopping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Truck" size={16} className="text-success" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="RotateCcw" size={16} className="text-success" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            {/* <div className="text-sm text-muted-foreground">
              © {currentYear} ReactCommerce. All rights reserved.
            </div> */}

            {/* Payment Methods */}
            {/* <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">We accept:</span>
              <div className="flex items-center space-x-2">
                {paymentMethods?.map((method) => (
                  <div
                    key={method?.name}
                    className="w-8 h-8 bg-surface border border-border rounded flex items-center justify-center"
                    title={method?.name}
                  >
                    <Icon
                      name={method?.icon}
                      size={14}
                      className="text-muted-foreground"
                    />
                  </div>
                ))}
              </div>
            </div> */}

            {/* Trust Badges */}
            {/* <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Lock" size={14} className="text-success" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Award" size={14} className="text-success" />
                <span>Trusted Store</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
