import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "../styles/Profile.css";

// Pagina de perfil do utilizador autenticado
const Profile = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Perfil</h1>
        <div className="profile-actions">
          <button className="btn-back" onClick={() => navigate("/dashboard")}>
            ← Voltar
          </button>
          <button onClick={logout} className="btn-logout">
            Terminar Sessão
          </button>
        </div>
      </div>

      <div className="profile-container">
        {/* Informações do Utilizador Atual */}
        <section className="profile-info">
          <div className="profile-card">
            <div className="profile-item">
              <strong>Nome:</strong> <span>{user?.nome || "(Nome)"}</span>
            </div>
            <div className="profile-item">
              <strong>Email:</strong> <span>{user?.email || "(email)"}</span>
            </div>
            <div className="profile-item">
              <strong>Tipo Conta:</strong>{" "}
              <span className={`badge badge-${user?.tipo?.toLowerCase()}`}>
                {user?.tipo}
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
