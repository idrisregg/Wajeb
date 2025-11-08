import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ThemeToggle from '../../comps/themeToggle';

describe('ThemeToggle', () => {
    const mockToggleTheme = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetModules();
    });

    test('renders theme toggle button', () => {
        render(<ThemeToggle />);
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    test('shows "Switch to Dark Mode" label when isDark is false', () => {
        jest.doMock('../../hooks/useTheme', () => ({
            useTheme: () => ({
                toggleTheme: mockToggleTheme,
                isDark: false
            })
        }));
        const { default: ThemeToggleLight } = require('../../comps/themeToggle');
        render(<ThemeToggleLight />);
        
        const button = screen.getByRole('button', { name: 'Switch to Dark Mode' });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('title', 'Switch to Dark Mode');
        expect(button).toHaveAttribute('aria-label', 'Switch to Dark Mode');
    });

    test('shows "Switch to Light Mode" label when isDark is true', () => {
        jest.doMock('../../hooks/useTheme', () => ({
            useTheme: () => ({
                toggleTheme: mockToggleTheme,
                isDark: true
            })
        }));
        const { default: ThemeToggleDark } = require('../../comps/themeToggle');
        render(<ThemeToggleDark />);
        
        const button = screen.getByRole('button', { name: 'Switch to Light Mode' });
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute('title', 'Switch to Light Mode');
        expect(button).toHaveAttribute('aria-label', 'Switch to Light Mode');
    });

    test('calls toggleTheme when button is clicked', async () => {
        jest.doMock('../../hooks/useTheme', () => ({
            useTheme: () => ({
                toggleTheme: mockToggleTheme,
                isDark: false
            })
        }));
        const { default: ThemeToggleWithMock } = require('../../comps/themeToggle');
        render(<ThemeToggleWithMock />);
        
        const button = screen.getByRole('button');
        await userEvent.click(button);
        
        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });

    test('applies custom className when provided', () => {
        const customClass = 'custom-class';
        render(<ThemeToggle className={customClass} />);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('theme-toggle');
        expect(button).toHaveClass(customClass);
    });

    test('renders SVG icon inside button', () => {
        render(<ThemeToggle />);
        const button = screen.getByRole('button');
        const svg = button.querySelector('svg');
        expect(svg).toBeInTheDocument();
    });
});