"use client";

import { Message } from "@/components/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/providers/Auth";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;
  address: string;
  gst: string;
};

// Enhanced phone number regex with better international support
const phoneRegex = /^(\+?\d{1,3}[- ]?)?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;
// Strong password regex (at least 8 chars, 1 uppercase, 1 lowercase, 1 number)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams();
  const allParams = searchParams.toString()
    ? `?${searchParams.toString()}`
    : "";
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>({
    mode: "onBlur", // Validate on blur for better UX
  });

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`,
        {
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const message =
          errorData.message || "There was an error creating the account.";
        // const message =
        //   response.statusText || "There was an error creating the account.";
        setError(message);
        setLoading(false);
        return;
      }

      const redirect = searchParams.get("redirect");

      const timer = setTimeout(() => {
        setLoading(true);
      }, 1000);

      try {
        await login(data);
        clearTimeout(timer);
        if (redirect) router.push(redirect);
        else
          router.push(
            `/account?success=${encodeURIComponent("Account created successfully")}`
          );
      } catch (_) {
        clearTimeout(timer);
        setError(
          "There was an error with the credentials provided. Please try again."
        );
      }
    },
    [login, router, searchParams]
  );

  return (
    <form className="max-w-lg py-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="prose mb-6">
        <p>{`Create your account to get started. All fields are required.`}</p>
      </div>
      <Message className="classes.message" error={error} />

      <div className="mb-4">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          type="email"
          placeholder="your@email.com"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          required
          type="text"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          {...register("phone", {
            required: "Phone number is required",
            pattern: {
              value: phoneRegex,
              message:
                "Please enter a valid phone number (e.g., +1 234 567 8900)",
            },
            minLength: {
              value: 10,
              message: "Phone number must be at least 10 digits",
            },
            maxLength: {
              value: 15,
              message: "Phone number must be less than 15 digits",
            },
          })}
          type="tel"
          placeholder="+91 9876543210"
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          {...register("address", {
            required: "Address is required",
          })}
          type="text"
          placeholder="Enter your address"
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label htmlFor="gst">GST Number</Label>
        <Input
          id="gst"
          {...register("gst", {
            required: "GST number is required",
            pattern: {
              value:
                /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
              message: "Invalid GST number",
            },
          })}
          type="text"
          placeholder="Enter your GST number"
        />
        {errors.gst && (
          <p className="mt-1 text-sm text-red-500">{errors.gst.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value: passwordRegex,
              message:
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            },
          })}
          type="password"
          placeholder="At least 8 characters"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="mb-4">
        <Label htmlFor="passwordConfirm">Confirm Password</Label>
        <Input
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "Please confirm your password",
            validate: (value) =>
              value === password.current || "The passwords do not match",
          })}
          type="password"
          placeholder="Re-enter your password"
        />
        {errors.passwordConfirm && (
          <p className="mt-1 text-sm text-red-500">
            {errors.passwordConfirm.message}
          </p>
        )}
      </div>

      <Button disabled={loading} type="submit" variant="default">
        {loading ? "Processing" : "Create Account"}
      </Button>

      <div className="prose mt-8">
        <p>
          {"Already have an account? "}
          <Link href={`/login${allParams}`}>Login</Link>
        </p>
      </div>
    </form>
  );
};
