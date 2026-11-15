create table if not exists activity_visitors (
  id text primary key,
  first_seen_at timestamptz not null default now()
);

create table if not exists activity_events (
  id uuid primary key,
  visitor_id text not null references activity_visitors(id),
  session_id uuid not null,
  customer_id uuid references customers(id) on delete cascade,
  event_type text not null check (event_type in ('page_view','product_view','add_to_cart','checkout_started','cart_updated')),
  page text not null,
  product_id text,
  product_name text,
  quantity integer not null default 0,
  cart_items integer not null default 0,
  cart_value numeric(12,2) not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists activity_events_time_idx on activity_events(created_at);
create index if not exists activity_events_visitor_time_idx on activity_events(visitor_id, created_at);
create index if not exists activity_events_customer_time_idx on activity_events(customer_id, created_at);
