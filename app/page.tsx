import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  ShoppingBag,
  MessageSquare,
  User,
  ArrowRight,
  Zap,
} from "lucide-react";
import { NavBar } from "@/components/nav-bar";

const endpoints = [
  {
    title: "Products",
    description: "Fetch available products from the API",
    href: "/products",
    icon: ShoppingBag,
    color: "from-violet-500 to-purple-600",
    badge: "Public",
  },
  {
    title: "Hello",
    description: "Test the hello world endpoint",
    href: "/hello",
    icon: MessageSquare,
    color: "from-emerald-500 to-teal-600",
    badge: "Public",
  },
  {
    title: "Profile",
    description: "View your authenticated user profile",
    href: "/me",
    icon: User,
    color: "from-amber-500 to-orange-600",
    badge: "Protected",
    protected: true,
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-chart-2/5 blur-3xl glow-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10">
        {/* Session-aware Navbar */}
        <NavBar />

        {/* Hero */}
        <section className="mx-auto max-w-6xl px-6 pb-12 pt-20 text-center md:pt-32">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Zap className="h-3.5 w-3.5" />
            Spring Boot + OAuth2 + Next.js
          </div>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
            Your OAuth2{" "}
            <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
              Integration
            </span>{" "}
            Dashboard
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
            Seamlessly connect with Google OAuth2 through a Spring Boot backend.
            Explore your API endpoints below.
          </p>
        </section>

        {/* Endpoint cards */}
        <section className="mx-auto max-w-5xl px-6 pb-24">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {endpoints.map((ep) => {
              const Icon = ep.icon;
              return (
                <Link key={ep.href} href={ep.href} className="group">
                  <Card className="relative h-full overflow-hidden border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
                    {/* Gradient top accent */}
                    <div
                      className={`h-1 w-full bg-gradient-to-r ${ep.color}`}
                    />
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${ep.color} shadow-lg`}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            ep.protected
                              ? "bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20"
                              : "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                          }`}
                        >
                          {ep.badge}
                        </span>
                      </div>
                      <h3 className="mb-1.5 text-lg font-semibold">
                        {ep.title}
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        {ep.description}
                      </p>
                      <div className="flex items-center text-sm font-medium text-primary transition-all group-hover:gap-2">
                        Explore
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
