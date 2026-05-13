-- Sayarati real platform database schema for Supabase.
-- Run this in Supabase SQL Editor when we create the production database.

create extension if not exists pgcrypto;

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  phone text not null unique,
  name text,
  customer_type text,
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table if not exists public.cars (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  brand text not null,
  model text not null,
  year text,
  plate text,
  mileage integer,
  vin text,
  notes text,
  photo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.service_records (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  car_id uuid not null references public.cars(id) on delete cascade,
  service_date date,
  mileage integer,
  service_types text[] not null default '{}',
  oil_viscosity text,
  oil_liters numeric,
  brake_pad_position text,
  parts text,
  cost numeric,
  next_due date,
  next_service_note text,
  invoice_path text,
  part_photo_paths jsonb not null default '[]'::jsonb,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.otp_codes (
  phone text primary key,
  code_hash text not null,
  expires_at timestamptz not null,
  attempts integer not null default 0,
  send_count integer not null default 0,
  last_sent_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  phone text primary key,
  name text,
  created_at timestamptz not null default now()
);

insert into public.admin_users (phone, name)
values ('96176888157', 'Sayarati Admin')
on conflict (phone) do nothing;

create table if not exists public.admin_messages (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  cta_label text,
  cta_url text,
  is_active boolean not null default true,
  starts_at timestamptz not null default now(),
  ends_at timestamptz,
  created_by_phone text,
  created_at timestamptz not null default now()
);

alter table public.customers enable row level security;
alter table public.cars enable row level security;
alter table public.service_records enable row level security;
alter table public.otp_codes enable row level security;
alter table public.admin_users enable row level security;
alter table public.admin_messages enable row level security;

create index if not exists cars_customer_id_idx on public.cars(customer_id);
create index if not exists service_records_customer_id_idx on public.service_records(customer_id);
create index if not exists service_records_car_id_idx on public.service_records(car_id);
create index if not exists service_records_date_idx on public.service_records(service_date);
create index if not exists admin_messages_active_idx on public.admin_messages(is_active, starts_at, ends_at);
