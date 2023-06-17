CREATE SCHEMA IF NOT EXISTS appschema;
create table if not exists appschema.cash_flow_record
(
    id              serial primary key,
    inflow          numeric default 0.00,
    outflow         numeric default 0.00,
    profit          numeric default 0.00,
    closing_balance numeric,
    month date unique,
    created_at      timestamp default now(),
    updated_at      timestamp default now()
);

create table if not exists appschema.inflow
(
    id          serial primary key,
    category    varchar(60),
    amount      numeric,
    created_at  timestamp default now(),
    cashflow_id integer
        references appschema.cash_flow_record
);

create table if not exists appschema.receipt
(
    id               serial primary key,
    merchant         varchar(60),
    date_of_purchase date,
    time             time,
    total_price      numeric,
    outflow_category varchar(10),
    created_at       timestamp default now()
);

create table if not exists appschema.direct
(
    id          serial primary key,
    category    varchar(60),
    unit        varchar(6),
    price       numeric GENERATED ALWAYS AS (quantity*unit_price) STORED,
    quantity    integer,
    unit_price  numeric,
    created_at  timestamp default now(),
    cashflow_id integer
        references appschema.cash_flow_record,
    receipt_id  integer
        references appschema.receipt
);

create table if not exists appschema.indirect
(
    id          serial primary key,
    category    varchar(60),
    price       numeric,
    created_at  timestamp default now(),
    cashflow_id integer
        references appschema.cash_flow_record,
    receipt_id  integer
        references appschema.receipt
);

create table if not exists appschema.purchase
(
    id         serial primary key,
    item       varchar(100),
    quantity   integer,
    unit_price numeric,
    created_at  timestamp default now(),
    receipt_id integer
        references appschema.receipt
);