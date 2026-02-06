import React, { useEffect, useState } from "react";
import "../styles/ScrollTopButton.css";

// Botao flutuante para voltar ao topo
const ScrollTopButton = () => {
  const [visible, setVisible] = useState(false);

  // Mostra o botao apos scroll
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 250);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll suave para o topo
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      className="scroll-top-btn"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
    >
      ↑
    </button>
  );
};

export default ScrollTopButton;
