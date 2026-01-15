const express = require("express");
const router = express.Router();
const pool = require("../config/database");
const { authenticate, isAdminOrGestor } = require("../middleware/auth");

const DEFAULT_HERO = {
  id: 1,
  titulo: "Centro Paroquial e Social de Lanheses",
  subtitulo: "Dedicando-nos ao apoio social à Pessoas Mais Velhas e à Infância",
  imagem_fundo: "",
};

const TABLE = "cpsl_intro";

// GET - hero config (público)
router.get("/", async (_req, res) => {
  try {
    const [rows] = await pool.query(
  `SELECT id, titulo, subtitulo, imagem_fundo, atualizado_em FROM ${TABLE} WHERE id = 1 LIMIT 1`
    );

    if (!rows || rows.length === 0) {
      return res.json({ success: true, data: DEFAULT_HERO });
    }

    return res.json({ success: true, data: rows[0] });
  } catch (error) {
  console.error(`Erro ao obter ${TABLE}:`, error.message);
    return res
      .status(500)
      .json({ success: false, message: "Erro no servidor ao obter hero." });
  }
});

// PUT - atualizar hero config (apenas Admin/Gestor)
router.put("/", [authenticate, isAdminOrGestor], async (req, res) => {
  try {
    const { titulo, subtitulo, imagem_fundo } = req.body;

    const [rows] = await pool.query(
      `INSERT INTO ${TABLE} (id, titulo, subtitulo, imagem_fundo)
       VALUES (1, $1, $2, $3)
       ON CONFLICT (id) DO UPDATE
         SET titulo = EXCLUDED.titulo,
             subtitulo = EXCLUDED.subtitulo,
             imagem_fundo = EXCLUDED.imagem_fundo,
             atualizado_em = CURRENT_TIMESTAMP
       RETURNING id, titulo, subtitulo, imagem_fundo, atualizado_em`,
      [titulo || null, subtitulo || null, imagem_fundo || null]
    );

    const saved = rows?.[0] || { ...DEFAULT_HERO, titulo, subtitulo, imagem_fundo };
    return res.json({ success: true, message: "Hero atualizado.", data: saved });
  } catch (error) {
    console.error(`Erro ao atualizar ${TABLE}:`, error.message);
    return res
      .status(500)
      .json({ success: false, message: "Erro no servidor ao atualizar hero." });
  }
});

module.exports = router;
