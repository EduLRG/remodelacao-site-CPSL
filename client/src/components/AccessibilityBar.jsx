import React, { useContext } from "react";
import { AccessibilityContext } from "../contexts/AccessibilityContext";
import "../styles/AccessibilityBar.css";

// Barra de atalhos de acessibilidade
const AccessibilityBar = () => {
  const {
    fontSize,
    highContrast,
    increaseFontSize,
    decreaseFontSize,
    toggleContrast,
  } = useContext(AccessibilityContext);

  return (
    <div
      className="accessibility-bar compact"
      aria-label="Atalhos de acessibilidade"
    >
      <button
        type="button"
        onClick={decreaseFontSize}
        title="Diminuir tamanho da letra"
      >
        A-
      </button>
      <button
        type="button"
        onClick={increaseFontSize}
        title="Aumentar tamanho da letra"
      >
        A+
      </button>
      <button
        type="button"
        onClick={toggleContrast}
        aria-pressed={highContrast}
        title="Alternar alto contraste"
        className={highContrast ? "active" : ""}
      >
        Contraste
      </button>
      <span className="accessibility-state" aria-live="polite">
        {`Letra: ${fontSize} · Contraste: ${highContrast ? "On" : "Off"}`}
      </span>
    </div>
  );
};

export default AccessibilityBar;
