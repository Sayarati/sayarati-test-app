create table if not exists service_due_push_log (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  record_id uuid not null references service_records(id) on delete cascade,
  due_date date not null,
  sent_at timestamptz not null default now(),
  unique (record_id, due_date)
);

create index if not exists service_due_push_log_customer_id_idx on service_due_push_log(customer_id);
create index if not exists service_due_push_log_due_date_idx on service_due_push_log(due_date);
