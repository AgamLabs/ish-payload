"use client";

import { Message } from "@/components/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/payload-types";
import { useAuth } from "@/providers/Auth";
import { useRouter } from "next/navigation";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  name: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  address: string;
  gst: string;
};

// Phone number regex
const phoneRegex =
  /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,3}[-\s.]?[0-9]{3,4}[-\s.]?[0-9]{3,4}$/;

export const AccountForm: React.FC = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { setUser, user } = useAuth();
  const [changePassword, setChangePassword] = useState(false);

  const {
    formState: { errors, isLoading },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<FormData>();

  const password = useRef({});
  password.current = watch("password", "");

  const router = useRouter();

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`,
          {
            // Make sure to include cookies with fetch
            body: JSON.stringify(data),
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            method: "PATCH",
          }
        );

        if (response.ok) {
          const json = await response.json();
          setUser(json.doc);
          setSuccess("Successfully updated account.");
          setError("");
          setChangePassword(false);
          reset({
            name: json.doc.name,
            email: json.doc.email,
            password: "",
            passwordConfirm: "",
            phone: json.doc.phone || "",
            address: json.doc.address || "",
            gst: json.doc.gst || "",
          });
        } else {
          setError("There was a problem updating your account.");
        }
      }
    },
    [user, setUser, reset]
  );

  useEffect(() => {
    console.log("Current user:", user); // Add this line
    if (user === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          "You must be logged in to view this page."
        )}&redirect=${encodeURIComponent("/account")}`
      );
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      reset({
        name: user.name || "", // Fallback to empty string if undefined,
        email: user.email || "",
        password: "",
        passwordConfirm: "",
        phone: user.phone || "",
        address: user.address || "",
        gst: user.gst || "",
      });
    }
  }, [user, router, reset, changePassword]);

  return (
    <form className="max-w-xl" onSubmit={handleSubmit(onSubmit)}>
      <Message className="" error={error} success={success} />
      {!changePassword ? (
        <Fragment>
          <div className="prose dark:prose-invert mb-8">
            <p className="">
              {"Change your account details below, or "}
              <Button
                className="px-0 text-inherit underline"
                onClick={() => setChangePassword(!changePassword)}
                type="button"
                variant="link"
              >
                click here
              </Button>
              {" to change your password."}
            </p>
          </div>
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
              required
              type="email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
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
                  message: "Please enter a valid phone number",
                },
                minLength: {
                  value: 8,
                  message: "Phone number must be at least 8 digits",
                },
                maxLength: {
                  value: 15,
                  message: "Phone number must be less than 15 digits",
                },
              })}
              type="tel"
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-500">
                {errors.phone.message}
              </p>
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
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address.message}
              </p>
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
            />
            {errors.gst && (
              <p className="mt-1 text-sm text-red-500">{errors.gst.message}</p>
            )}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="prose dark:prose-invert mb-8">
            <p>
              {"Change your password below, or "}
              <Button
                className="px-0 text-inherit underline"
                onClick={() => setChangePassword(!changePassword)}
                type="button"
                variant="link"
              >
                cancel
              </Button>
              .
            </p>
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
              })}
              required
              type="password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-8">
            <Label htmlFor="passwordConfirm">Confirm password</Label>
            <Input
              id="passwordConfirm"
              {...register("passwordConfirm", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password.current || "The passwords do not match",
              })}
              required
              type="password"
            />
            {errors.passwordConfirm && (
              <p className="mt-1 text-sm text-red-500">
                {errors.passwordConfirm.message}
              </p>
            )}
          </div>
        </Fragment>
      )}
      <Button disabled={isLoading} type="submit" variant="default">
        {isLoading
          ? "Processing"
          : changePassword
            ? "Change Password"
            : "Update Account"}
      </Button>
    </form>
  );
};
