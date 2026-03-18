import Link from "next/link";
import { AuthForm } from "../../components/AuthForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center py-10">
      <AuthForm mode="login" />
      <p className="mt-4 text-sm text-slate-600">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-slate-900 underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

