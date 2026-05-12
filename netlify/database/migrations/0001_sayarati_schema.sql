create extension if not exists pgcrypto;

create table if not exists customers (
  id uuid primary key default gen_random_uuid(),
  phone text not null unique,
  name text,
  customer_type text,
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

create table if not exists cars (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
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

create table if not exists service_records (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  car_id uuid not null references cars(id) on delete cascade,
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

create table if not exists otp_codes (
  phone text primary key,
  code_hash text not null,
  expires_at timestamptz not null,
  attempts integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists admin_users (
  phone text primary key,
  name text,
  created_at timestamptz not null default now()
);

create table if not exists admin_messages (
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

insert into admin_users (phone, name)
values ('96176888157', 'Sayarati Admin')
on conflict (phone) do nothing;

create index if not exists cars_customer_id_idx on cars(customer_id);
create index if not exists service_records_customer_id_idx on service_records(customer_id);
create index if not exists service_records_car_id_idx on service_records(car_id);
create index if not exists service_records_date_idx on service_records(service_date);
create index if not exists admin_messages_active_idx on admin_messages(is_active, starts_at, ends_at);
