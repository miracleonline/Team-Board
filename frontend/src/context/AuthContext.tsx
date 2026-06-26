import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import * as authService from "../services/auth";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    name: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    authService
      .getProfile()
      .then((user) => setUser(user))
      .finally(() => setLoading(false));
  }, []);

  const signup = async (
    name: string,
    email: string,
    password: string
  ) => {
    await authService.signup({
      name,
      email,
      password,
    });
  };

  const login = async (
    email: string,
    password: string
  ) => {
    const data = await authService.login({
      email,
      password,
    });

    localStorage.setItem(
      "token",
      data.access_token
    );

    setUser(data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);