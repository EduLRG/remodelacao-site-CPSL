-- Cria tabela para persistir o hero da home
CREATE TABLE IF NOT EXISTS hero_config (
    id INTEGER PRIMARY KEY DEFAULT 1 CHECK (id = 1),
    titulo VARCHAR(300),
    subtitulo VARCHAR(500),
    imagem_fundo VARCHAR(500),
    atualizado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Garante uma linha única com valores por defeito
INSERT INTO hero_config (id, titulo, subtitulo, imagem_fundo)
VALUES (1,
        'Centro Paroquial e Social de Lanheses',
        'Dedicando-nos ao apoio social à Pessoas Mais Velhas e à Infância',
        ''
)
ON CONFLICT (id) DO UPDATE SET atualizado_em = CURRENT_TIMESTAMP;
