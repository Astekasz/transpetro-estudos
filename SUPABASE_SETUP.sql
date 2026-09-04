-- Execute este arquivo no SQL Editor do Supabase.
-- As tabelas abaixo guardam somente dados do próprio usuário.

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_key text not null,
  status text not null default 'Não iniciado',
  updated_at timestamptz not null default now(),
  unique(user_id, item_key)
);

create table if not exists public.answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null,
  selected_option text not null,
  is_correct boolean not null,
  day_label text,
  theme text,
  answered_at timestamptz not null default now(),
  unique(user_id, question_id)
);

alter table public.progress enable row level security;
alter table public.answers enable row level security;

create policy "progress_select_own" on public.progress for select using (auth.uid() = user_id);
create policy "progress_insert_own" on public.progress for insert with check (auth.uid() = user_id);
create policy "progress_update_own" on public.progress for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "progress_delete_own" on public.progress for delete using (auth.uid() = user_id);

create policy "answers_select_own" on public.answers for select using (auth.uid() = user_id);
create policy "answers_insert_own" on public.answers for insert with check (auth.uid() = user_id);
create policy "answers_update_own" on public.answers for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "answers_delete_own" on public.answers for delete using (auth.uid() = user_id);
