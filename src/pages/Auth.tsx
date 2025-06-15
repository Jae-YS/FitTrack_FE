import { useState } from "react";
import { LoginPage } from "../components/login/Login";
import { OnboardingPage } from "../components/login/onBoarding";
import { loginUser, registerUser } from "../api";
import { useNavigate } from "react-router-dom";
import type { User } from "../constant/types";

export default function Auth({
  onAuthenticated,
}: {
  onAuthenticated: (user: User) => void;
}) {
  const [step, setStep] = useState<"login" | "onboarding">("login");
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState({
    email: "",
    name: "",
    sex: "",
    height: "",
    weight: "",
  });

  const navigate = useNavigate();

  const handleLogin = async (email: string) => {
    try {
      console.log("🔐 Attempting login for email:", email);
      const res = await loginUser(email);
      console.log("📦 Login result:", res);

      const isNew = res.isNew ?? res.is_new;

      if (isNew) {
        console.log("🆕 New user detected — starting onboarding.");
        setForm((prev) => ({ ...prev, email }));
        setStep("onboarding");
      } else {
        console.log("🎉 Existing user — navigating to dashboard.");
        setUser(res.user);
        onAuthenticated(res.user);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("❌ Login error caught:", err);
    }
  };

  const handleOnboardingSubmit = async () => {
    const savedUser = await registerUser({
      ...form,
      height: parseFloat(form.height),
      weight: parseFloat(form.weight),
      id: 0,
    });
    setUser(savedUser);
    onAuthenticated(savedUser);
    navigate("/dashboard");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  if (step === "login") {
    return <LoginPage onSubmit={handleLogin} />;
  }

  if (step === "onboarding") {
    return (
      <OnboardingPage
        form={form}
        onChange={handleChange}
        onSubmit={handleOnboardingSubmit}
      />
    );
  }

  return null;
}
