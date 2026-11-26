# leo-treinos

Fichas de treino do **Leo Personal** — um app para todos os alunos, publicado no GitHub Pages.

- Portal: https://danfermartins.github.io/leo-treinos/
- Painel do Leo: https://danfermartins.github.io/leo-treinos/admin.html

## Estrutura
| Arquivo | O que é |
|---|---|
| `app.js` / `app.css` | Motor e visual compartilhados. Corrigir aqui corrige para todos os alunos. |
| `sw.js` | Service worker único: funciona offline e pega atualizações sozinho (rede primeiro, cache em até 4 s). |
| `alunos/<slug>/data.js` | O treino de cada aluno (`window.FICHA`). É o único arquivo que muda por aluno. |
| `alunos/<slug>/index.html`, `manifest.json` | Página e ícone de instalação de cada aluno. |
| `alunos/index.js` | Lista de alunos usada pelo portal e pelo painel. |
| `admin.html` | Painel do Leo: monta a ficha com o catálogo e gera o `data.js`. |
| `alunos/preview/` | Prévia usada pelo painel. |

## Novo aluno
1. No painel, “Ficha nova” → monte os dias → **Baixar data.js**.
2. Crie `alunos/<slug>/` com o `data.js`, copiando `index.html` e `manifest.json` de outro aluno (troque o nome no manifest).
3. Adicione o aluno em `alunos/index.js`.

## Dados dos alunos
Ficam no celular de cada aluno (localStorage), separados por ficha. Não troque o `slug` nem o `key` de um aluno que já usa o app.
Na primeira abertura, o app importa automaticamente as cargas, datas e histórico dos apps antigos (treinojoao, treinoercilia etc.).
