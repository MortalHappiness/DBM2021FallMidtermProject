import { createContext, useContext } from "react";
import { useQuery } from "@apollo/client";

import { GET_ME_QUERY } from "./graphql";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { loading, error, data, refetch } = useQuery(GET_ME_QUERY, {
    notifyOnNetworkStatusChange: true,
  });

  const value = { user: data?.me, loading, refetch };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
