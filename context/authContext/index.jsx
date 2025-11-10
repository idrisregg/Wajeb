import React, { useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiService } from '../../src/services/apiService';

export const AuthContext = React.createContext(null);

const queryClient = new QueryClient();

const AuthProviderContent = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('Access_Token'));

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('Access_Token');
    queryClient.removeQueries(['userInfo']);
  };

  useQuery({
    queryKey: ['userInfo', token],
    queryFn: () => apiService.getUserInfo(),
    enabled: !!token,
    onSuccess: (data) => setUser(data.user),
    onError: () => logout(),
  });

  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => apiService.login(email, password),
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('Access_Token', data.token);
      queryClient.invalidateQueries(['userInfo']);
    },
  });

  const registerMutation = useMutation({
    mutationFn: ({ userName, email, password }) =>
      apiService.register(userName, email, password),
  });

  const loading = loginMutation.isLoading || registerMutation.isLoading;

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login: loginMutation.mutateAsync,
      logout,
      register: registerMutation.mutateAsync,
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
