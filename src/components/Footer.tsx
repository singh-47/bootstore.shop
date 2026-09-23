import { ShoppingBag, Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

const footerLinks = [
  {
    title: 'Shop',
    links: ['New Arrivals', 'Men', 'Women', 'Sale', 'Collections'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Contact Us', 'Careers', 'Press'],
  },
  {
    title: 'Support',
    links: ['Help Center', 'Shipping', 'Returns', 'Track Order'],
  },
];

const socialIcons = [
  { icon: Instagram, label: 'Instagram' },
  { icon: Twitter, label: 'Twitter' },
  { icon: Facebook, label: 'Facebook' },
  { icon: Youtube, label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-cream-100">
      {/* Newsletter */}
      <div className="border-b border-cream-100/10">
        <div className="container-x py-12 text-center">
          <h3 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Get 10% off your first order
          </h3>
          <p className="mt-2 text-cream-100/60 text-sm sm:text-base">
            Subscribe to our newsletter for exclusive drops and early access.
          </p>
          <form
            className="mt-6 mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full border border-cream-100/20 bg-cream-100/5 px-5 py-3 text-sm text-cream-100 placeholder:text-cream-100/40 focus:border-accent-400 focus:outline-none"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-accent-400"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-x py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2" aria-label="BootCart home">
              <ShoppingBag className="h-7 w-7 text-accent-500" strokeWidth={2.2} />
              <span className="text-xl font-extrabold tracking-tight">BootCart</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-100/60">
              Premium footwear for every step. From boardroom formals to street-ready sneakers,
              we're here to help you step into your style.
            </p>
            <div className="mt-6 flex gap-3">
              {socialIcons.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-cream-100/15 text-cream-100/70 transition-colors hover:border-accent-400 hover:bg-accent-500 hover:text-ink-900"
                  aria-label={label}
                >
                  <Icon className="h-4.5 w-4.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold uppercase tracking-wide text-cream-100">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-cream-100/60 transition-colors hover:text-accent-400"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream-100/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-cream-100/50">
            © 2026 BootCart. All rights reserved. Made by Gurpreet(MCA-2026)
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-cream-100/50 transition-colors hover:text-accent-400">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-cream-100/50 transition-colors hover:text-accent-400">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
