import { LoginForm } from "@/components/login-form";
export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-1">
      <div className="flex flex-col p-6 md:p-10 bg-black-700">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
