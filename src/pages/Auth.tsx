import { useState } from "react";
import { LoginPage } from "../components/login/Login";
import { OnboardingPage } from "../components/login/onBoarding";
import { loginUser, registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import type { User, OnboardingForm } from "../constant/types";

export default function Auth({
  onAuthenticated,
}: {
  onAuthenticated: (user: User) => void;
}) {
  const [step, setStep] = useState<"login" | "onboarding">("login");
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<OnboardingForm>({
    email: "",
    password: "",
    name: "",
    sex: "",
    height: 0,
    weight: 0,
    race_date: undefined,
    race_level: "beginner",
    pr_5k: undefined,
    pr_10k: undefined,
    pr_half: undefined,
    pr_full: undefined,
  });

  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    try {
      console.log("🔐 Attempting login for email:", email);
      const res = await loginUser({ email, password });
      console.log("📦 Login successful:", res);

      setUser(res.user);
      onAuthenticated(res.user);
      navigate("/dashboard");
    } catch (err: any) {
      const detail = err?.response?.data?.detail;
      alert("Login failed: " + (detail ?? "Something went wrong."));
      console.error("❌ Login error:", err);
    }
  };

  const handleOnboardingSubmit = async () => {
    const savedUser = await registerUser({
      email: form.email,
      password: form.password,
      name: form.name,
      sex: form.sex,
      height: form.height,
      weight: form.weight,
      race_date: form.race_date || undefined,
      race_level: ["beginner", "intermediate", "advanced"].includes(
        form.race_level || ""
      )
        ? (form.race_level as "beginner" | "intermediate" | "advanced")
        : "beginner",
      pr_5k: form.pr_5k,
      pr_10k: form.pr_10k,
      pr_half: form.pr_half,
      pr_full: form.pr_full,
    });

    setUser(savedUser);
    onAuthenticated(savedUser);
    navigate("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const numberFields = [
      "height",
      "weight",
      "pr_5k",
      "pr_10k",
      "pr_half",
      "pr_full",
    ];

    if (numberFields.includes(name)) {
      setForm((f) => ({
        ...f,
        [name]: value === "" ? undefined : parseFloat(value),
      }));
    } else if (name === "race_date") {
      setForm((f) => ({
        ...f,
        race_date: value ? new Date(value) : undefined,
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  return step === "login" ? (
    <LoginPage
      onSubmit={handleLogin}
      onCreateAccountClick={() => setStep("onboarding")}
    />
  ) : (
    <OnboardingPage
      form={form}
      onChange={handleChange}
      onSubmit={handleOnboardingSubmit}
    />
  );
}
