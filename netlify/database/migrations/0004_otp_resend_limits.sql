alter table otp_codes add column if not exists send_count integer not null default 0;
alter table otp_codes add column if not exists last_sent_at timestamptz;
