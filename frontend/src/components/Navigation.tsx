import { Link, useRouterState } from '@tanstack/react-router';
import { Flower, LayoutDashboard, Plus, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export default function Navigation() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const [open, setOpen] = useState(false);

  const navLinks = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/submit', label: 'Submit Task', icon: Plus },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/assets/generated/flower-logo.dim_256x256.png"
                alt="Flower Logo"
                className="h-10 w-10 transition-transform group-hover:scale-110 group-hover:rotate-12 duration-300"
              />
              <div className="absolute inset-0 bg-botanicalPurple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-flowerGreen-600 via-botanicalPurple-600 to-flowerGreen-600 bg-clip-text text-transparent">
              Flower
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = currentPath === link.path;
              return (
                <Link key={link.path} to={link.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className={`gap-2 transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-flowerGreen-500 to-flowerGreen-600 text-white shadow-lg shadow-flowerGreen-500/30'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Button>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <nav className="flex flex-col gap-2 mt-8">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = currentPath === link.path;
                  return (
                    <Link key={link.path} to={link.path} onClick={() => setOpen(false)}>
                      <Button
                        variant={isActive ? 'default' : 'ghost'}
                        className={`w-full justify-start gap-2 ${
                          isActive
                            ? 'bg-gradient-to-r from-flowerGreen-500 to-flowerGreen-600 text-white'
                            : ''
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
