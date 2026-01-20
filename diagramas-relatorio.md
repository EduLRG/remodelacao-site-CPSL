# Diagramas para o Relatório

## 1. Diagrama de Fluxo de Autenticação JWT

```mermaid
sequenceDiagram
    participant U as Utilizador
    participant C as Cliente React
    participant S as Servidor Express
    participant BD as Base de Dados

    Note over U,BD: Processo de Login
    U->>C: Introduz email e password
    C->>S: POST /api/auth/login<br/>{email, password}
    S->>BD: SELECT * FROM utilizadores<br/>WHERE email = ?
    BD-->>S: Dados do utilizador
    S->>S: Verificar password<br/>(bcrypt.compare)
    alt Password Correta
        S->>S: Gerar JWT Token<br/>(jwt.sign)
        S-->>C: 200 OK<br/>{success, token, user}
        C->>C: Armazenar token<br/>(localStorage)
        C-->>U: Redirecionar para Dashboard
    else Password Incorreta
        S-->>C: 401 Unauthorized<br/>{success: false, message}
        C-->>U: Mostrar erro
    end

    Note over U,BD: Acesso a Recursos Protegidos
    U->>C: Navegar para página protegida
    C->>S: GET /api/conteudo<br/>Authorization: Bearer {token}
    S->>S: Verificar JWT<br/>(jwt.verify)
    alt Token Válido
        S->>BD: SELECT * FROM conteudo
        BD-->>S: Dados solicitados
        S-->>C: 200 OK {data}
        C-->>U: Mostrar conteúdo
    else Token Inválido/Expirado
        S-->>C: 401 Unauthorized
        C->>C: Remover token
        C-->>U: Redirecionar para Login
    end
```

---

## 2. Diagrama da Arquitetura Cliente-Servidor

```mermaid
graph TB
    subgraph "Cliente - Frontend"
        A[React App<br/>porta 3000]
        A1[Componentes]
        A2[Contexts<br/>Auth/Accessibility]
        A3[Services<br/>api.js]
        A --> A1
        A --> A2
        A --> A3
    end

    subgraph "Servidor - Backend"
        B[Express Server<br/>porta 5000]
        B1[Middleware<br/>Auth/Upload]
        B2[Routes<br/>API Endpoints]
        B3[Controllers]
        B --> B1
        B --> B2
        B --> B3
    end

    subgraph "Base de Dados"
        C[(PostgreSQL<br/>Supabase)]
        C1[Tabelas]
        C2[Índices]
        C --> C1
        C --> C2
    end

    subgraph "Armazenamento"
        D[Sistema de Ficheiros<br/>uploads/imagens]
    end

    A3 -->|HTTP Requests<br/>JSON| B
    B -->|JWT Auth<br/>CORS| A3
    B2 -->|SQL Queries| C
    C -->|Resultados| B2
    B3 -->|Upload/Read| D
    D -->|URLs| B3

    style A fill:#61dafb
    style B fill:#68a063
    style C fill:#336791
    style D fill:#ffa500
```

---

## 3. Diagrama Entidade-Relacionamento da Base de Dados

```mermaid
erDiagram
    UTILIZADORES ||--o{ PROJETOS : cria
    UTILIZADORES ||--o{ RESPOSTAS_SOCIAIS : cria
    UTILIZADORES ||--o{ NOTICIAS_EVENTOS : cria
    UTILIZADORES ||--o{ CONTEUDO_INSTITUCIONAL : cria
    UTILIZADORES ||--o{ MEDIA : cria
    UTILIZADORES ||--o{ TRANSPARENCIA : cria
    UTILIZADORES ||--o{ SECOES_PERSONALIZADAS : cria
    UTILIZADORES ||--o{ FORM_CONTACTO : responde

    SECOES_PERSONALIZADAS ||--o{ ITENS_SECOES_PERSONALIZADAS : contem
    SECOES_PERSONALIZADAS ||--o{ SUBMISSOES_FORMULARIOS_SECOES : recebe

    UTILIZADORES {
        int id PK
        string nome
        string email UK
        string password_hash
        string tipo
        boolean ativo
        timestamp data_criacao
        int criado_por FK
    }

    PROJETOS {
        int id PK
        string titulo
        text descricao
        date data_inicio
        date data_fim
        string imagem_destaque
        string url_externa
        boolean ativo
        int ordem
        int criado_por FK
        timestamp data_criacao
    }

    RESPOSTAS_SOCIAIS {
        int id PK
        string titulo
        string subtitulo
        text descricao
        text conteudo
        text objetivos
        text servicos_prestados
        string capacidade
        string horario
        string imagem_destaque
        boolean ativo
        int ordem
        int criado_por FK
        timestamp data_criacao
    }

    NOTICIAS_EVENTOS {
        int id PK
        string titulo
        text resumo
        text conteudo
        string tipo
        string autor
        string imagem_destaque
        boolean publicado
        timestamp data_publicacao
        int criado_por FK
        timestamp data_criacao
    }

    CONTEUDO_INSTITUCIONAL {
        int id PK
        string secao
        string titulo
        text conteudo
        string imagem
        string video_url
        int ordem
        boolean ativo
        int criado_por FK
        timestamp data_criacao
    }

    MEDIA {
        int id PK
        string tipo
        string nome
        string url
        text descricao
        string tamanho
        string mime_type
        string tabela_referencia
        int id_referencia
        int ordem
        int criado_por FK
        timestamp data_criacao
    }

    FORM_CONTACTO {
        int id PK
        string nome
        string email
        string assunto
        text mensagem
        boolean respondido
        text resposta
        int respondido_por FK
        timestamp data_resposta
        timestamp data_submissao
    }

    TRANSPARENCIA {
        int id PK
        string titulo
        text descricao
        int ano
        string tipo
        string ficheiro_url
        string tamanho_ficheiro
        int criado_por FK
        timestamp data_criacao
    }

    SECOES_PERSONALIZADAS {
        int id PK
        string nome UK
        string titulo
        string slug UK
        text descricao
        string icone
        int ordem
        boolean ativo
        string tipo_layout
        boolean tem_formulario
        jsonb config_formulario
        int criado_por FK
        timestamp data_criacao
    }

    ITENS_SECOES_PERSONALIZADAS {
        int id PK
        int secao_id FK
        string titulo
        text conteudo
        string imagem
        string video_url
        string link_externo
        int ordem
        boolean ativo
        int criado_por FK
        timestamp data_criacao
    }

    SUBMISSOES_FORMULARIOS_SECOES {
        int id PK
        int secao_id FK
        jsonb dados
        boolean respondido
        text resposta
        int respondido_por FK
        timestamp data_resposta
        timestamp data_submissao
    }

    CONTACTOS_INSTITUCIONAIS {
        int id PK
        string tipo
        string valor
        string descricao
        boolean ativo
        int ordem
        int atualizado_por FK
        timestamp data_atualizacao
    }
```

---

## 4. Diagrama de Arquitetura de Componentes React

```mermaid
graph TD
    subgraph "App.js - Componente Principal"
        APP[App]
    end

    subgraph "Contexts - Gestão de Estado Global"
        AUTH[AuthContext<br/>Autenticação]
        ACC[AccessibilityContext<br/>Acessibilidade]
    end

    subgraph "Componentes de Layout"
        HEADER[Header]
        NAVBAR[Navbar]
        ACCBAR[AccessibilityBar]
        SCROLL[ScrollTopButton]
    end

    subgraph "Páginas Públicas"
        HOME[Home]
        LOGIN[Login]
    end

    subgraph "Páginas Protegidas - Dashboard"
        DASH[Dashboard]
        USERS[Users]
        CONTENT[ContentManagement]
        PROJECTS[ProjectsManagement]
        TRANS[TransparencyManagement]
        CUSTOM[CustomSectionsManagement]
        SECTIONS[SectionItemsManagement]
        MSGS[Messages]
        INSCR[Inscriptions]
        PROFILE[Profile]
    end

    subgraph "Componentes Reutilizáveis"
        PRIVATE[PrivateRoute<br/>Proteção de Rotas]
        RTE[RichTextEditor<br/>Editor de Texto]
    end

    subgraph "Serviços"
        API[api.js<br/>Axios Instance<br/>HTTP Requests]
    end

    APP --> AUTH
    APP --> ACC
    APP --> HEADER
    APP --> NAVBAR
    APP --> ACCBAR
    APP --> SCROLL

    APP --> HOME
    APP --> LOGIN

    APP --> PRIVATE
    PRIVATE --> DASH
    PRIVATE --> USERS
    PRIVATE --> CONTENT
    PRIVATE --> PROJECTS
    PRIVATE --> TRANS
    PRIVATE --> CUSTOM
    PRIVATE --> SECTIONS
    PRIVATE --> MSGS
    PRIVATE --> INSCR
    PRIVATE --> PROFILE

    CONTENT --> RTE
    PROJECTS --> RTE
    CUSTOM --> RTE

    DASH --> API
    USERS --> API
    CONTENT --> API
    PROJECTS --> API
    TRANS --> API
    CUSTOM --> API
    SECTIONS --> API
    MSGS --> API
    INSCR --> API
    PROFILE --> API
    LOGIN --> API

    AUTH -.->|Contexto| PRIVATE
    AUTH -.->|Contexto| NAVBAR
    ACC -.->|Contexto| ACCBAR

    style APP fill:#61dafb
    style AUTH fill:#ffd700
    style ACC fill:#ffd700
    style API fill:#68a063
```

---

## Como Usar Estes Diagramas

### Opção 1: Mermaid Live Editor

1. Acede a https://mermaid.live/
2. Cola o código de cada diagrama
3. Exporta como PNG ou SVG
4. Insere no relatório

### Opção 2: Markdown com suporte Mermaid

- GitHub, GitLab, Notion, Obsidian renderizam Mermaid automaticamente
- Copia o código diretamente para o teu documento

### Opção 3: VS Code

1. Instala a extensão "Markdown Preview Mermaid Support"
2. Abre este ficheiro em preview
3. Faz screenshot dos diagramas

### Opção 4: Exportar para imagem

```bash
# Instalar mermaid-cli
npm install -g @mermaid-js/mermaid-cli

# Converter para PNG
mmdc -i diagramas-relatorio.md -o diagrama1.png
```

---

## Personalização

Podes editar:

- **Cores**: Adiciona `style NOME fill:#COR` no final
- **Formas**: Retângulos `[]`, Cilindros `[()]`, Losangos `{}`
- **Setas**: `-->` (sólida), `-.->` (tracejada), `==>` (grossa)
- **Texto**: Quebra de linha com `<br/>`
