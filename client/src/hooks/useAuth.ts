import { useState, useEffect } from 'react'
import { User, Session, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { toast } from '@/hooks/use-toast'

interface AuthState {
  user: User | null
  session: Session | null
  loading: boolean
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true
  })

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error('Error getting session:', error)
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive"
        })
      }

      setAuthState({
        user: session?.user ?? null,
        session,
        loading: false
      })
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email)
        
        setAuthState({
          user: session?.user ?? null,
          session,
          loading: false
        })

        // Handle sign in success
        if (event === 'SIGNED_IN' && session?.user) {
          await createOrUpdateProfile(session.user)
          toast({
            title: "Welcome!",
            description: "You have been successfully signed in.",
          })
        }

        // Handle sign out
        if (event === 'SIGNED_OUT') {
          toast({
            title: "Signed Out",
            description: "You have been successfully signed out.",
          })
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const createOrUpdateProfile = async (user: User) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
          provider: user.app_metadata?.provider || null,
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error creating/updating profile:', error)
      }
    } catch (error) {
      console.error('Error in createOrUpdateProfile:', error)
    }
  }

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      })

      if (error) {
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Google sign in error:', error)
      toast({
        title: "Sign In Error",
        description: "An unexpected error occurred during Google sign in.",
        variant: "destructive"
      })
    }
  }

  const signInWithGitHub = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      })

      if (error) {
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('GitHub sign in error:', error)
      toast({
        title: "Sign In Error",
        description: "An unexpected error occurred during GitHub sign in.",
        variant: "destructive"
      })
    }
  }

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) {
        toast({
          title: "Sign In Error",
          description: error.message,
          variant: "destructive"
        })
        return { error }
      }

      return { error: null }
    } catch (error) {
      console.error('Email sign in error:', error)
      toast({
        title: "Sign In Error",
        description: "An unexpected error occurred during sign in.",
        variant: "destructive"
      })
      return { error: error as AuthError }
    }
  }

  const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      })

      if (error) {
        toast({
          title: "Sign Up Error",
          description: error.message,
          variant: "destructive"
        })
        return { error }
      }

      toast({
        title: "Account Created",
        description: "Your account has been created successfully!",
      })

      return { error: null }
    } catch (error) {
      console.error('Email sign up error:', error)
      toast({
        title: "Sign Up Error",
        description: "An unexpected error occurred during sign up.",
        variant: "destructive"
      })
      return { error: error as AuthError }
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      
      if (error) {
        toast({
          title: "Sign Out Error",
          description: error.message,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Sign out error:', error)
      toast({
        title: "Sign Out Error",
        description: "An unexpected error occurred during sign out.",
        variant: "destructive"
      })
    }
  }

  return {
    user: authState.user,
    session: authState.session,
    loading: authState.loading,
    signInWithGoogle,
    signInWithGitHub,
    signInWithEmail,
    signUpWithEmail,
    signOut
  }
}