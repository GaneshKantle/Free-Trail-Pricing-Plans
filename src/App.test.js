import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the WI Thinkers service page shell', () => {
  render(<App />);

  expect(
    screen.getByRole('heading', { level: 1, name: /magazine services by wi thinkers/i })
  ).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /about/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByRole('link', { name: /contact/i }).length).toBeGreaterThan(0);
});
