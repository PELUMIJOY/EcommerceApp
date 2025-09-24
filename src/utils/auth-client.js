import { createAuthClient } from "better-auth/client";

const isLocal = window?.location?.hostname === "localhost";

const BASE_URL = isLocal
  ? "http://localhost:8000"
  : "https://jumia-api-1.onrender.com";

export const authClient = createAuthClient({
  baseURL: BASE_URL,
  fetchOptions: {
    credentials: "include",
  },
});

// Helper functions for easier usage
export const signInWithEmail = async (email, password) => {
  try {
    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message || "Login failed");
    }

    // Return user data and session info
    return {
      user: data.user,
      session: data.session,
      token: data.session?.token,
    };
  } catch (error) {
    console.error("Sign in error:", error);
    throw new Error(error.message || "Login failed");
  }
};

export const signUpWithEmail = async (userData) => {
  try {
    const { data, error } = await authClient.signUp.email({
      email: userData.email,
      password: userData.password,
      name: userData.name,
      // Additional fields will be handled by Better-Auth
      ...userData,
    });

    if (error) {
      throw new Error(error.message || "Signup failed");
    }

    return {
      user: data.user,
      session: data.session,
      token: data.session?.token,
    };
  } catch (error) {
    console.error("Sign up error:", error);
    throw new Error(error.message || "Signup failed");
  }
};

export const signInWithGoogle = async (callbackURL = "/cart") => {
  try {
    // For social login, Better-Auth handles redirection
    await authClient.signIn.social({
      provider: "google",
      callbackURL: `${window.location.origin}${callbackURL}`,
    });

    // The page will redirect, so we don't need to return anything
    // After redirect, use getCurrentSession to get user data
  } catch (error) {
    console.error("Google sign in error:", error);
    throw new Error(error.message || "Google login failed");
  }
};

export const signInWithFacebook = async (callbackURL = "/cart") => {
  try {
    await authClient.signIn.social({
      provider: "facebook",
      callbackURL: `${window.location.origin}${callbackURL}`,
    });
  } catch (error) {
    console.error("Facebook sign in error:", error);
    throw new Error(error.message || "Facebook login failed");
  }
};

export const signOut = async () => {
  try {
    await authClient.signOut();
    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    throw new Error(error.message || "Logout failed");
  }
};

export const getCurrentSession = async () => {
  try {
    const session = await authClient.getSession();
    return session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
};

// Helper to check if user is authenticated
export const isAuthenticated = async () => {
  try {
    const session = await getCurrentSession();
    return !!session?.data?.user;
  } catch (error) {
    return false;
  }
};

// Helper to get current user
export const getCurrentUser = async () => {
  try {
    const session = await getCurrentSession();
    return session?.data?.user || null;
  } catch (error) {
    return null;
  }
};
