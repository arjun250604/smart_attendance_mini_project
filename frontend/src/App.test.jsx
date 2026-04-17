import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Component', () => {
  it('renders the SmartAttend app', () => {
    render(<App />);
    
    // Quick smoke test to ensure the App renders the login route component
    // We expect the word "SmartAttend" to be somewhere on the login screen
    const element = screen.getByText(/SmartAttend/i);
    expect(element).toBeInTheDocument();
  });
});
