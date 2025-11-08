import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LanguageToggle from '../../comps/languageToggle';

describe('LanguageToggle', () => {
  test('renders the current language', () => {
    render(<LanguageToggle />);
    const currentButton = screen.getAllByRole('button').find(btn =>
      within(btn).queryByText('EN')
    );
    const { getByText } = within(currentButton);
    expect(getByText('EN')).toBeInTheDocument();
    expect(getByText('English')).toBeInTheDocument();
  });

  test('renders all language options', () => {
    render(<LanguageToggle />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(4);
    expect(screen.getAllByText('العربية')).toHaveLength(2);
    expect(screen.getByText('Français')).toBeInTheDocument();
  });

test('calls setLanguage when clicking a language', async () => {
  const mockFn = jest.fn();

  jest.doMock('../../hooks/useLanguage', () => ({
    useLanguage: () => ({
      language: 'en',
      setLanguage: mockFn,
      t: (key) => key,
    }),
  }));

  jest.resetModules();
  const { default: LanguageToggle } = await import('../../comps/languageToggle');
  
  render(<LanguageToggle />);
  const frenchButton = screen.getByText('Français');
  await userEvent.click(frenchButton);
  expect(mockFn).toHaveBeenCalledWith('fr');
});

});
