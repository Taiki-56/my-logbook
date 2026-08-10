"use client";

import loginAction from "@/actions/auth";
import { CredentialFormValues, getLocalizedCredentialSchema } from "@/schemas/credentialSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { type } from "os";
import { useState } from "react";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const t = useTranslations("Admin.login");

  const schema = getLocalizedCredentialSchema(t);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CredentialFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (formData: CredentialFormValues) => {
    setSubmitStatus("submitting");
    try {
      const result = await loginAction(formData);
      if (result?.error) {
        setSubmitStatus("error");
      } else {
        setSubmitStatus("success");
        reset();
      }
    } catch (error: unknown) {
      const err = error as Error & { digest?: string };
      const isRedirectError = err?.message === "NEXT_REDIRECT" || err?.digest?.startsWith("NEXT_REDIRECT");
      if (isRedirectError) {
        throw error;
      }

      console.error(error);
      setSubmitStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 sm:space-y-6">
      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block font-['Geist:Medium'] font-medium text-[13px] sm:text-[14px] text-[#1b1c1c] tracking-[0.24px] mb-2 sm:mb-2.5">
          {t("emailLabel")}
        </label>
        <div className="relative">
          <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2">
            <Mail className="w-5 h-5 text-[#414754]" />
          </div>
          <input
            {...register("email")}
            type="email"
            id="email"
            placeholder={t("emailPlaceholder")}
            className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-4 border rounded-lg font-['Geist:Regular'] text-[14px] sm:text-base text-[#1b1c1c] placeholder:text-[#999] focus:outline-none focus:ring-1 transition-colors ${
              errors.email
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-[#c1c6d7] focus:border-[#0058c3] focus:ring-[#0058c3]"
            }`}
          />
        </div>
        {errors.email && <p className="mt-1.5 text-[12px] sm:text-[13px] text-red-600">{errors.email.message}</p>}
      </div>

      {/* Password Field */}
      <div>
        <label
          htmlFor="password"
          className="block font-['Geist:Medium'] font-medium text-[13px] sm:text-[14px] text-[#1b1c1c] tracking-[0.24px] mb-2 sm:mb-2.5">
          {t("passwordLabel")}
        </label>
        <div className="relative">
          <div className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2">
            <Lock className="w-5 h-5 text-[#414754]" />
          </div>
          <input
            {...register("password")}
            type="password"
            id="password"
            placeholder={t("passwordPlaceholder")}
            className={`w-full h-12 sm:h-14 pl-11 sm:pl-12 pr-4 border rounded-lg font-['Geist:Regular'] text-[14px] sm:text-base text-[#1b1c1c] placeholder:text-[#999] focus:outline-none focus:ring-1 transition-colors ${
              errors.password
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-[#c1c6d7] focus:border-[#0058c3] focus:ring-[#0058c3]"
            }`}
          />
        </div>
        {errors.password && <p className="mt-1.5 text-[12px] sm:text-[13px] text-red-600">{errors.password.message}</p>}
      </div>

      {/* Submit Button */}
      <div className="pt-2 sm:pt-4">
        <button
          type="submit"
          disabled={submitStatus === "submitting"}
          className="w-full h-12 sm:h-14 bg-[#1b1c1c] text-white font-['Geist:Medium'] font-medium text-[15px] sm:text-base rounded-lg hover:bg-[#2a2b2b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
          {submitStatus === "submitting" ? t("statusSubmitting") : t("loginButton")}
        </button>
      </div>

      {/* Status Messages */}
      {submitStatus === "error" && (
        <p className="text-[13px] sm:text-[14px] text-red-600 text-center font-['Geist:Medium']">{t("statusError")}</p>
      )}
      {submitStatus === "success" && (
        <p className="text-[13px] sm:text-[14px] text-green-600 text-center font-['Geist:Medium']">
          {t("statusSuccess")}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
