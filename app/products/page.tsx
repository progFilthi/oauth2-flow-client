"use client";

import { useEffect, useState } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ShoppingBag, Server, CheckCircle2, XCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export default function ProductsPage() {
  const [data, setData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        setData(text);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <DashboardShell>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
        <p className="mt-1.5 text-muted-foreground">
          Response from <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">/api/products</code>
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Response card */}
        <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-3 pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 shadow-lg">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">API Response</CardTitle>
              <p className="text-xs text-muted-foreground">GET /api/products</p>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : error ? (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
                <XCircle className="h-4 w-4 shrink-0" />
                <span>Error: {error}</span>
              </div>
            ) : (
              <div className="rounded-lg border border-border/50 bg-muted/30 p-4">
                <p className="text-sm font-medium leading-relaxed">{data}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info card */}
        <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center gap-3 pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-500 to-slate-600 shadow-lg">
              <Server className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">Endpoint Info</CardTitle>
              <p className="text-xs text-muted-foreground">Details</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status</span>
              {loading ? (
                <Skeleton className="h-5 w-16" />
              ) : error ? (
                <Badge variant="destructive" className="gap-1">
                  <XCircle className="h-3 w-3" />
                  Error
                </Badge>
              ) : (
                <Badge className="gap-1 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3" />
                  Success
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Method</span>
              <Badge variant="secondary">GET</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Auth</span>
              <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-400">
                Public
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">URL</span>
              <code className="rounded bg-muted px-2 py-0.5 text-xs font-mono">
                {API_BASE}/api/products
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
