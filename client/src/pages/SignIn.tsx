import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Loader2 } from "lucide-react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithGitHub, signInWithEmail } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = async () => {
    setLoading(true);
    await signInWithGoogle();
    setLoading(false);
  };

  const handleGitHubSignIn = async () => {
    setLoading(true);
    await signInWithGitHub();
    setLoading(false);
  };

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    const { error } = await signInWithEmail(email, password);
    setLoading(false);

    if (!error) {
      navigate(from, { replace: true });
    }
  };

  return (
    <>
      {/* Social Logins */}
      <div className="space-y-4 mb-6">
        <Button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center gap-2 justify-center p-3 border border-gray-700 rounded-lg custom-shadow hover:bg-gray-800 transition-colors bg-transparent text-white"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FcGoogle className="w-5 h-5" />
          )}
          <span>Log in with Google</span>
        </Button>
        <Button
          onClick={handleGitHubSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center p-3 gap-2 border border-gray-700 rounded-lg custom-shadow hover:bg-gray-800 transition-colors bg-transparent text-white"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <FaGithub className="w-5 h-5" />
          )}
          <span>Log in with Github</span>
        </Button>
      </div>

      {/* OR separator */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-700"></div>
        <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
        <div className="flex-grow border-t border-gray-700"></div>
      </div>

      {/* Email Sign In Form */}
      <form onSubmit={handleSignInSubmit} className="space-y-6">
        <div>
          <Label htmlFor="signInEmail" className="text-gray-300">
            Email Address
          </Label>
          <Input
            type="email"
            id="signInEmail"
            placeholder="Your email address"
            className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all mt-1"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="signInPassword" className="text-gray-300">
            Password
          </Label>
          <Input
            type="password"
            id="signInPassword"
            placeholder="Your password"
            className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all mt-1"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>
        <Button
          type="submit"
          disabled={loading || !email || !password}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Signing In...
            </>
          ) : (
            "Log In"
          )}
        </Button>
      </form>

      {/* Footer with a toggle link to sign up */}
      <div className="mt-8 text-center text-gray-400">
        Don't have an account?{" "}
        <Link
          to="/auth/sign-up"
          className="text-indigo-500 hover:text-indigo-400 font-semibold transition-colors"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignIn;
