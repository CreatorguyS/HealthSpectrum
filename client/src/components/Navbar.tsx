import { motion } from "framer-motion";
import { Brain, Shield, ArrowRight, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "./auth/AuthProvider";

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className = "" }: NavbarProps) => {
  const location = useLocation();
  const { user, signOut } = useAuthContext();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 bg-card/90 backdrop-blur-2xl border-b border-border/50 shadow-card ${className}`}
    >
      <div className="medical-container">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-3 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold text-foreground group-hover:text-primary-glow transition-colors">
                MedAnalyze
              </span>
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-6"
          >
            <Link to="/">
              <Button
                variant="ghost"
                className={`transition-colors font-medium ${
                  isActive("/")
                    ? "text-primary-glow bg-primary-soft border border-primary/20 rounded-lg px-4"
                    : "text-muted-foreground hover:text-primary-glow"
                }`}
              >
                Home
              </Button>
            </Link>

            <Link to="/about">
              <Button
                variant="ghost"
                className={`transition-colors font-medium ${
                  isActive("/about")
                    ? "text-primary-glow bg-primary-soft border border-primary/20 rounded-lg px-4"
                    : "text-muted-foreground hover:text-primary-glow"
                }`}
              >
                About
              </Button>
            </Link>

            <Link to="/upload">
              <Button
                variant="ghost"
                className={`transition-colors font-medium ${
                  isActive("/upload")
                    ? "text-primary-glow bg-primary-soft border border-primary/20 rounded-lg px-4"
                    : "text-muted-foreground hover:text-primary-glow"
                }`}
              >
                Upload
              </Button>
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.email} />
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.user_metadata?.full_name || user.user_metadata?.name || 'User'}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth/sign-in">
                <Button className="btn-medical-primary group">
                  <Shield className="w-4 h-4 mr-2" />
                  Log In/Sign Up
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};
