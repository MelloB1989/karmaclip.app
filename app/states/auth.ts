import { create } from "zustand";
import { router } from "expo-router";

interface AuthState {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  error: string;
  success: boolean | null;
  setSuccess: (success: boolean) => void;
  setError: (error: string) => void;
  login: (signIn: (s: string) => void) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),
  loading: false,
  error: "",
  success: null,
  setSuccess: (success) => set({ success }),
  setError: (error) => set({ error }),
  login: async (signIn: (s: string) => void) => {
    set({ loading: true });
    try {
      const { email, password } = get();
      if (email === "" || password === "") {
        set({ success: false, error: "Please fill your details!" });
        throw new Error("Email and password are required");
      } else {
        signIn("s");
        router.replace("/(protected)/(tabs)");
        set({ success: true, error: "" });
      }
    } catch (error) {
      set({ error: "Error" });
    }
    set({ loading: false });
  },
}));
