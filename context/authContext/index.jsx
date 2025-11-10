import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../../src/services/apiService';

export const AuthContext = React.createContext(null);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const AuthProviderContent = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(() => localStorage.getItem('Access_Token'));

  const logout = () => {
    setToken(null);
    localStorage.removeItem('Access_Token');
    queryClient.clear();
  };

  // Fetch user info when token exists - this IS our user state
  const { data: userInfoData } = useQuery({
    queryKey: ['userInfo', token],
    queryFn: () => apiService.getUserInfo(),
    enabled: !!token,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => apiService.login(email, password),
    onSuccess: (data) => {
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('Access_Token', data.token);
      }
      // Set user data in cache immediately
      if (data.user) {
        queryClient.setQueryData(['userInfo', data.token], { user: data.user });
      }
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ userName, email, password }) =>
      apiService.register(userName, email, password),
  });

  // Wrapper for login that handles errors
  const login = async (email, password) => {
    try {
      const result = await loginMutation.mutateAsync({ email, password });
      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  };

  // Wrapper for register that handles errors
  const register = async (userName, email, password) => {
    try {
      const result = await registerMutation.mutateAsync({ userName, email, password });
      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Registration failed' 
      };
    }
  };

  const loading = loginMutation.isPending || registerMutation.isPending;

  return (
    <AuthContext.Provider value={{
      user: userInfoData?.user || null, // Direct access to query data
      token,
      login,
      logout,
      register,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthProvider = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <AuthProviderContent>
      {children}
    </AuthProviderContent>
  </QueryClientProvider>
);