# Transpetro Estudos Online

Versão nova do site de estudos para **Transpetro 2026 — Ênfase 3: Análise Ambiental**.

## O que já está pronto

- Dashboard com **Estudar hoje**
- Cronograma semanal
- Marcação de aulas concluídas
- Área de **Questões por dia e por tema**
- 10 questões por página/bloco
- Correção imediata
- Caderno de erros automático
- Progresso do edital
- Login e sincronização com Supabase
- Modo local com `localStorage` enquanto o Supabase não estiver configurado
- Layout adaptado a celular e computador

## 1. Colocar no GitHub

Extraia a pasta. No repositório `transpetro-estudos`, clique em **Add file → Upload files** e envie **todo o conteúdo desta pasta** (não envie a pasta por fora; envie os arquivos que estão dentro dela).

Depois clique em **Commit changes**.

## 2. Criar o Supabase gratuito

1. Entre em https://supabase.com
2. Crie uma conta e um projeto Free.
3. Abra **SQL Editor → New query**.
4. Cole o conteúdo de `SUPABASE_SETUP.sql` e execute.
5. Em **Project Settings → API**, copie:
   - Project URL
   - anon/public key

Não compartilhe a chave `service_role`. O site usa somente a chave `anon` pública junto com Row Level Security.

## 3. Publicar na Vercel gratuitamente

1. Entre em https://vercel.com usando o GitHub.
2. Clique em **Add New → Project**.
3. Importe o repositório `transpetro-estudos`.
4. A Vercel deverá identificar **Vite** automaticamente.
5. Antes de publicar, adicione em **Environment Variables**:
   - `VITE_SUPABASE_URL` = Project URL do Supabase
   - `VITE_SUPABASE_ANON_KEY` = anon/public key do Supabase
6. Clique em **Deploy**.

## 4. Login

Na aba **Conta**, crie seu usuário. Dependendo da configuração padrão do Supabase, ele pode pedir confirmação por e-mail.

Depois do login, marcações e respostas ficam gravadas no Supabase e sincronizam entre dispositivos.

## Onde alterar conteúdo

- Cronograma: `src/data/studyPlan.js`
- Questões: `src/data/questions.js`
- Visual: `src/styles.css`

Cada questão já tem campos para `sourceType` e `sourceLabel`, então depois podemos misturar questões inéditas com questões reais identificadas pela prova de origem sem mudar a estrutura do site.
