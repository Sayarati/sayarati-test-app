alter table customers add column if not exists app_installed boolean not null default false;
alter table customers add column if not exists last_app_opened_at timestamptz;
alter table customers add column if not exists last_browser_opened_at timestamptz;
alter table customers add column if not exists notifications_enabled boolean not null default false;

create table if not exists push_subscriptions (
  endpoint text primary key,
  customer_id uuid not null references customers(id) on delete cascade,
  subscription jsonb not null,
  user_agent text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  last_success_at timestamptz,
  last_error text
);

create index if not exists push_subscriptions_customer_id_idx on push_subscriptions(customer_id);
create index if not exists customers_app_installed_idx on customers(app_installed);
create index if not exists customers_notifications_enabled_idx on customers(notifications_enabled);
