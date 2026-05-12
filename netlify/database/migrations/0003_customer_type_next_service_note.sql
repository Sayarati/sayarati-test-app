alter table customers add column if not exists customer_type text;
alter table service_records add column if not exists next_service_note text;
