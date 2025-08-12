"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { ROUTES_CONSTANT } from "@/lib/routes.constant";
import { validateEmail as isValidEmail } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function getEmailError(value: string): string | null {
  const trimmed = value.trim();
  if (!trimmed) return "Email is required";
  return isValidEmail(trimmed) ? null : "Enter a valid email address";
}

function validatePassword(value: string): string | null {
  if (!value) return "Password is required";
  return value.length >= 8 ? null : "Password must be at least 8 characters";
}

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>(
    { email: false, password: false }
  );
  const { login, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // Redirect if already authenticated (avoid navigation during render)
  useEffect(() => {
    if (isAuthenticated) router.replace(ROUTES_CONSTANT.DASHBOARD);
  }, [isAuthenticated, router]);

  const emailError = touched.email ? getEmailError(email) : null;
  const passwordError = touched.password ? validatePassword(password) : null;
  const hasValidationErrors =
    getEmailError(email) !== null || validatePassword(password) !== null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ email: true, password: true });

    const immediateEmailError = getEmailError(email);
    const immediatePasswordError = validatePassword(password);
    if (immediateEmailError || immediatePasswordError) return;

    const result = await login(email, password);

    if (result.success) {
      toast({
        variant: "success",
        title: "Login successful",
        description: "Welcome back!",
      });
      router.replace(ROUTES_CONSTANT.DASHBOARD);
    } else {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: result.error || "Invalid email or password",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((s) => ({ ...s, email: true }))}
                  placeholder="Enter your email"
                  aria-invalid={emailError ? true : false}
                  aria-describedby={emailError ? "email-error" : undefined}
                  disabled={isLoading}
                />
                {emailError && (
                  <p id="email-error" className="text-sm text-red-600">
                    {emailError}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setTouched((s) => ({ ...s, password: true }))}
                  placeholder="Enter your password"
                  aria-invalid={passwordError ? true : false}
                  aria-describedby={
                    passwordError ? "password-error" : undefined
                  }
                  disabled={isLoading}
                />
                {passwordError && (
                  <p id="password-error" className="text-sm text-red-600">
                    {passwordError}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || hasValidationErrors}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
