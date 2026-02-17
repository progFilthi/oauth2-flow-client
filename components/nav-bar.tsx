"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, Lock, LogOut, User } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface UserInfo {
  name: string;
  email: string;
  picture: string;
}

export function NavBar() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/me`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data: UserInfo) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setUser(null);
        setLoading(false);
      });
  }, []);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <nav className="border-b border-border/50 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            OAuth<span className="text-primary">Flow</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {loading ? (
            /* Subtle skeleton while checking session */
            <div className="h-9 w-9 animate-pulse rounded-full bg-muted" />
          ) : user ? (
            /* Authenticated state */
            <div className="flex items-center gap-3">
              <Link
                href="/me"
                className="flex items-center gap-2.5 rounded-full border border-border/50 bg-card/60 py-1.5 pl-1.5 pr-4 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-card/80"
              >
                <Avatar className="h-7 w-7">
                  <AvatarImage
                    src={user.picture}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback className="text-xs bg-primary/10 text-primary">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{user.name.split(" ")[0]}</span>
              </Link>
              <a href={`${API_BASE}/logout`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-muted-foreground hover:text-foreground cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </a>
            </div>
          ) : (
            /* Unauthenticated state */
            <a href={`${API_BASE}/oauth2/authorization/google`}>
              <Button
                variant="default"
                className="gap-2 bg-primary hover:bg-primary/90 cursor-pointer"
              >
                <Lock className="h-4 w-4" />
                Sign in with Google
              </Button>
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}
