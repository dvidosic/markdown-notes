import Link from "next/link";
import { AuthForm } from "../../components/AuthForm";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center py-10">
      <AuthForm mode="signup" />
      <p className="mt-4 text-sm text-slate-600">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-slate-900 underline-offset-4 hover:underline"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}

