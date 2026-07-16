alter table customers add column if not exists shop_visit_count integer not null default 0;
alter table customers add column if not exists last_shop_opened_at timestamptz;
alter table customers add column if not exists last_shop_action_at timestamptz;
alter table customers add column if not exists last_shop_event text;
alter table customers add column if not exists last_shop_cart_items integer not null default 0;
alter table customers add column if not exists last_shop_cart_value numeric(12, 2) not null default 0;
alter table customers add column if not exists last_checkout_started_at timestamptz;

create index if not exists customers_last_shop_opened_at_idx
  on customers(last_shop_opened_at);
