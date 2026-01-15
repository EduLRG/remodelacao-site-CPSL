-- Cria tabela cpsl_intro para o conteúdo de introdução/hero
CREATE TABLE IF NOT EXISTS cpsl_intro (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    titulo VARCHAR(300),
    subtitulo VARCHAR(500),
    imagem_fundo VARCHAR(500),
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed único
INSERT INTO cpsl_intro (id, titulo, subtitulo, imagem_fundo)
VALUES (
  1,
  'Centro Paroquial e Social de Lanheses',
  'Dedicando-nos ao apoio social à Pessoas Mais Velhas e à Infância',
  ''
)
ON CONFLICT (id) DO UPDATE SET atualizado_em = CURRENT_TIMESTAMP;
