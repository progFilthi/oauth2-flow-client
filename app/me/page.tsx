"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  User,
  Mail,
  Image as ImageIcon,
  ShieldCheck,
  AlertTriangle,
  ExternalLink,
  Lock,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

interface MeResponse {
  name: string;
  email: string;
  picture: string;
}

export default function MePage() {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/me`, { credentials: "include" })
      .then((res) => {
        setStatus(res.status);
        if (res.status === 401) {
          throw new Error("UNAUTHORIZED");
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: MeResponse) => {
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  // Unauthorized state
  if (!loading && error === "UNAUTHORIZED") {
    return (
      <DashboardShell>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/10">
            <Lock className="h-10 w-10 text-amber-400" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Authentication Required</h1>
          <p className="mb-8 max-w-md text-muted-foreground">
            You need to sign in with Google to view your profile. This endpoint
            is protected by OAuth2.
          </p>
          <a href={`${API_BASE}/oauth2/authorization/google`}>
            <Button className="gap-2 bg-primary hover:bg-primary/90 cursor-pointer" size="lg">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign in with Google
            </Button>
          </a>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="mt-1.5 text-muted-foreground">
          Your authenticated user information from{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
            /api/me
          </code>
        </p>
      </div>

      {loading ? (
        <div className="grid gap-5 md:grid-cols-3">
          {/* Skeleton profile card */}
          <Card className="border-border/50 bg-card/60 backdrop-blur-sm md:col-span-1">
            <CardContent className="flex flex-col items-center p-8">
              <Skeleton className="mb-4 h-24 w-24 rounded-full" />
              <Skeleton className="mb-2 h-6 w-40" />
              <Skeleton className="h-4 w-32" />
            </CardContent>
          </Card>
          {/* Skeleton details card */}
          <Card className="border-border/50 bg-card/60 backdrop-blur-sm md:col-span-2">
            <CardHeader>
              <Skeleton className="h-6 w-48" />
            </CardHeader>
            <CardContent className="space-y-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        </div>
      ) : error ? (
        <Card className="border-destructive/30 bg-destructive/5">
          <CardContent className="flex items-center gap-3 p-6">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <p className="font-medium text-destructive">
                Failed to load profile
              </p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </CardContent>
        </Card>
      ) : user ? (
        <div className="grid gap-5 md:grid-cols-3">
          {/* Profile card */}
          <Card className="border-border/50 bg-card/60 backdrop-blur-sm md:col-span-1">
            <CardContent className="flex flex-col items-center px-6 py-10">
              {/* Avatar with subtle ring */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/30 to-primary/0 blur-sm" />
                <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-border shadow-lg">
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted text-xl font-bold text-primary">
                      {getInitials(user.name)}
                    </div>
                  )}
                </div>
              </div>
              <h2 className="mt-5 text-xl font-bold">{user.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>
              <Badge className="mt-5 gap-1.5 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
                <ShieldCheck className="h-3.5 w-3.5" />
                Authenticated
              </Badge>
            </CardContent>
          </Card>

          {/* Details card */}
          <Card className="border-border/50 bg-card/60 backdrop-blur-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0">
              {/* Name */}
              <div className="flex items-start gap-4 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Full Name
                  </p>
                  <p className="mt-0.5 text-sm font-medium">{user.name}</p>
                </div>
              </div>

              <Separator />

              {/* Email */}
              <div className="flex items-start gap-4 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-2/10">
                  <Mail className="h-5 w-5 text-chart-2" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Email Address
                  </p>
                  <p className="mt-0.5 text-sm font-medium">{user.email}</p>
                </div>
              </div>

              <Separator />

              {/* Picture URL */}
              <div className="flex items-start gap-4 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-chart-3/10">
                  <ImageIcon className="h-5 w-5 text-chart-3" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Profile Picture
                  </p>
                  <a
                    href={user.picture}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-0.5 flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View full image
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>

              <Separator />

              {/* Auth provider */}
              <div className="flex items-start gap-4 py-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                  <ShieldCheck className="h-5 w-5 text-amber-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Auth Provider
                  </p>
                  <p className="mt-0.5 text-sm font-medium">Google OAuth2</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : null}
    </DashboardShell>
  );
}
