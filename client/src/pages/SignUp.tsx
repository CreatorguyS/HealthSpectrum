import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, signInWithGitHub, signUpWithEmail } = useAuthContext();
  const navigate = useNavigate();

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

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    const { error } = await signUpWithEmail(email, password, fullName);
    setLoading(false);

    if (!error) {
      navigate("/");
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
          <span>Sign up with Google</span>
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
          <span>Sign up with Github</span>
        </Button>
      </div>

      {/* OR separator */}
      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-700"></div>
        <span className="mx-4 text-gray-500 text-sm font-medium">OR</span>
        <div className="flex-grow border-t border-gray-700"></div>
      </div>

      {/* Email Sign Up Form */}
      <form onSubmit={handleSignUpSubmit} className="space-y-6">
        <div>
          <Label htmlFor="signUpName" className="text-gray-300">
            Full Name
          </Label>
          <Input
            type="text"
            id="signUpName"
            placeholder="John Doe"
            className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all mt-1"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="signUpEmail" className="text-gray-300">
            Email Address
          </Label>
          <Input
            type="email"
            id="signUpEmail"
            placeholder="name@example.com"
            className="w-full px-4 py-3 bg-gray-800 rounded-lg text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all mt-1"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <Label htmlFor="signUpPassword" className="text-gray-300">
            Password
          </Label>
          <Input
            type="password"
            id="signUpPassword"
            placeholder="Create a password"
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
              Creating Account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>

      {/* Footer with a toggle link to sign in */}
      <div className="mt-8 text-center text-gray-400">
        Already have an account?{" "}
        <Link
          to="/auth/sign-in"
          className="text-indigo-500 hover:text-indigo-400 font-semibold transition-colors"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUp;
