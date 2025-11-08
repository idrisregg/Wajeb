import React from 'react';
import { renderHook } from '@testing-library/react';
import { useAuth } from '../../hooks/useAuth';
import { AuthContext } from '../../context/authContext/authContext';

describe('useAuth', () => {
    test('returns context value when used within AuthContext provider', () => {
        const mockAuthValue = {
            user: { id: '123', name: 'Test User', email: 'test@example.com' },
            isAuthenticated: true,
            login: jest.fn(),
            logout: jest.fn(),
            loading: false
        };

        const wrapper = ({ children }) => (
            <AuthContext.Provider value={mockAuthValue}>
                {children}
            </AuthContext.Provider>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        expect(result.current).toEqual(mockAuthValue);
        expect(result.current.user).toEqual(mockAuthValue.user);
        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.loading).toBe(false);
    });

    test('returns updated context value when context changes', () => {
        let currentValue = {
            user: null,
            isAuthenticated: false,
            login: jest.fn(),
            logout: jest.fn(),
            loading: false
        };

        const Wrapper = ({ children }) => (
            <AuthContext.Provider value={currentValue}>
                {children}
            </AuthContext.Provider>
        );

        const { result, rerender } = renderHook(() => useAuth(), {
            wrapper: Wrapper
        });

        expect(result.current.user).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);

        // Update the value
        currentValue = {
            user: { id: '456', name: 'Updated User', email: 'updated@example.com' },
            isAuthenticated: true,
            login: jest.fn(),
            logout: jest.fn(),
            loading: false
        };

        rerender();

        expect(result.current.user).toEqual({ id: '456', name: 'Updated User', email: 'updated@example.com' });
        expect(result.current.isAuthenticated).toBe(true);
    });

    test('returns context with function methods', () => {
        const mockLogin = jest.fn();
        const mockLogout = jest.fn();

        const mockAuthValue = {
            user: null,
            isAuthenticated: false,
            login: mockLogin,
            logout: mockLogout,
            loading: false
        };

        const wrapper = ({ children }) => (
            <AuthContext.Provider value={mockAuthValue}>
                {children}
            </AuthContext.Provider>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        expect(result.current.login).toBe(mockLogin);
        expect(result.current.logout).toBe(mockLogout);
        expect(typeof result.current.login).toBe('function');
        expect(typeof result.current.logout).toBe('function');
    });

    test('returns default context value when used outside AuthContext provider', () => {
        const { result } = renderHook(() => useAuth());
        
        expect(result.current).toBeDefined();
        expect(result.current).toHaveProperty('user');
        expect(result.current).toHaveProperty('login');
        expect(result.current).toHaveProperty('logout');
        expect(result.current).toHaveProperty('loading');
        expect(result.current.user).toBeNull();
        expect(result.current.token).toBeNull();
        expect(result.current.loading).toBe(false);
    });

    test('returns loading state correctly', () => {
        const mockAuthValue = {
            user: null,
            isAuthenticated: false,
            login: jest.fn(),
            logout: jest.fn(),
            loading: true
        };

        const wrapper = ({ children }) => (
            <AuthContext.Provider value={mockAuthValue}>
                {children}
            </AuthContext.Provider>
        );

        const { result } = renderHook(() => useAuth(), { wrapper });

        expect(result.current.loading).toBe(true);
    });
});