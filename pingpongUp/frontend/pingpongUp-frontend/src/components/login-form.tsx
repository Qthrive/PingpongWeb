import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

import { Link } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 可添加登录验证逻辑
    navigate("/page");
  };

  return (
    <form
      className={`flex flex-col gap-6 ${className}`}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <img className="w-16 h-16 rounded-full" src={logo} alt="Logo" />
        <h1 className="text-2xl font-bold">Pingpong UP Today!</h1>
        <p className="text-sm text-zinc-600">Enter your email below to login</p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <a
              href="#"
              className="ml-auto text-sm font-bold underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <input
            id="password"
            type="password"
            required
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
          />
        </div>
        <Link to="/page/dashboard">
          {" "}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 cursor-pointer"
          >
            Login
          </button>
        </Link>
      </div>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <a href="/signup" className="font-bold underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
