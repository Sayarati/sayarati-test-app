alter table cars add column if not exists client_id text;
alter table service_records add column if not exists client_id text;
alter table service_records add column if not exists service_type text;
alter table service_records add column if not exists other_service_details text;

create unique index if not exists cars_customer_client_id_idx on cars(customer_id, client_id);
create unique index if not exists service_records_customer_client_id_idx on service_records(customer_id, client_id);
