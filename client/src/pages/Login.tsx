import { useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import useField from "../hooks/useField";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { token, login } = useAuth();
  const { inputProps: username, reset: resetUsername } = useField("text", "");
  const { inputProps: password, reset: resetPassword } = useField(
    "password",
    "",
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (token) {
    return <Navigate to="/" replace />;
  }

  const resetAll = () => {
    resetUsername();
    resetPassword();
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(username.value, password.value);
      resetAll();
    } catch {
      setError("Invalid username or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]  flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="flex flex-col gap-4 w-full max-w-sm p-6 bg-neutral-900 border border-white/10 rounded-lg"
      >
        <h2 className="text-lg font-medium text-white">Login</h2>

        <label className="flex flex-col gap-1 text-sm text-neutral-400">
          Username
          <input
            {...username}
            required
            className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-neutral-400">
          Password
          <input
            {...password}
            required
            className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
          />
        </label>

        {error && <p className="text-red-400 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-neutral-950 font-medium rounded-md px-4 py-2 transition-colors"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
