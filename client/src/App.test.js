import { render, screen } from "@testing-library/react";
import App from "./App";

// Teste basico para garantir que a app renderiza
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
