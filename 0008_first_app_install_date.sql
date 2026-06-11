alter table customers
  add column if not exists first_app_installed_at timestamptz;

create index if not exists customers_first_app_installed_at_idx
  on customers(first_app_installed_at);
