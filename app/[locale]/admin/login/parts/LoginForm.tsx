"use client";

import { CredentialFormValues, credentialSchema } from "@/schemas/credentialSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { loginAction } from "../../../../../actions/login";

const LoginForm = () => {
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const t = useTranslations("Admin.login");

  //* React Hook Formの初期化
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CredentialFormValues>({
    resolver: zodResolver(credentialSchema),
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
    } catch {
      setSubmitStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f8] flex items-center justify-center p-4">
      <div className="w-full max-w-100 bg-white rounded-lg border border-[#c1c6d7] p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0058c3] rounded-xl mb-4">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <h1 className="font-['Geist:Bold'] font-bold text-[24px] text-[#1b1c1c] mb-2">{t("title")}</h1>
          <p className="font-['Geist:Regular'] text-[14px] text-[#414754]">{t("subtitle")}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block font-['Geist:Medium'] font-medium text-[12px] text-[#1b1c1c] tracking-[0.24px] mb-2">
              {t("emailLabel")}
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Mail className="w-4.5 h-4.5 text-[#414754]" />
              </div>
              <input
                {...register("email")}
                type="email"
                id="email"
                placeholder={t("emailPlaceholder")}
                className="w-full h-11 pl-11 pr-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] text-[#1b1c1c] placeholder:text-[#999] focus:outline-none focus:border-[#0058c3] focus:ring-1 focus:ring-[#0058c3]"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block font-['Geist:Medium'] font-medium text-[12px] text-[#1b1c1c] tracking-[0.24px] mb-2">
              {t("passwordLabel")}
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Lock className="w-4.5 h-4.5 text-[#414754]" />
              </div>
              <input
                {...register("password")}
                type="password"
                id="password"
                placeholder={t("passwordPlaceholder")}
                className="w-full h-11 pl-11 pr-4 border border-[#c1c6d7] rounded-lg font-['Geist:Regular'] text-[14px] text-[#1b1c1c] placeholder:text-[#999] focus:outline-none focus:border-[#0058c3] focus:ring-1 focus:ring-[#0058c3]"
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a
              href="#"
              className="font-['Geist:Regular'] text-[14px] text-[#0058c3] hover:underline">
              {t("forgotPassword")}
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitStatus === "submitting"}
            className="w-full h-11 bg-[#1b1c1c] text-white font-['Geist:Medium'] font-medium text-[14px] rounded-lg hover:bg-[#2a2b2b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            {submitStatus === "submitting" ? "送信中..." : t("signInButton")}
          </button>

          {/* Status Messages */}
          {submitStatus === "error" && <p className="text-sm text-red-600 text-center">ログインに失敗しました</p>}
          {submitStatus === "success" && <p className="text-sm text-green-600 text-center">ログインしました</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
