CREATE SCHEMA IF NOT EXISTS appschema;
create table if not exists appschema.cash_flow_record
(
    id              serial
        primary key,
    inflow          numeric,
    outflow         numeric,
    profit          numeric,
    closing_balance numeric,
    created_at      timestamp default now(),
    updated_at      timestamp default now()
);

create table if not exists appschema.inflow
(
    id          serial
        primary key,
    category    varchar(60),
    amount      numeric,
    created_at  timestamp default now(),
    cashflow_id integer
        references appschema.cash_flow_record
);

create table if not exists appschema.receipt
(
    id               serial
        primary key,
    merchant         varchar(60),
    date_of_purchase date,
    time             time,
    total_price      numeric,
    outflow_category varchar(10),
    created_at       timestamp default now()
);

create table if not exists appschema.direct
(
    id          serial
        primary key,
    category    varchar(60),
    unit        varchar(6),
    price       numeric GENERATED ALWAYS AS (quantity*unit_price) STORED,
    quantity    integer,
    unit_price  integer,
    created_at  timestamp default now(),
    cashflow_id integer
        references appschema.cash_flow_record,
    receipt_id  integer
        references appschema.receipt
);

create table if not exists appschema.indirect
(
    id          serial
        primary key,
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
    id         serial
        primary key,
    item       varchar(100),
    quantity   integer,
    unit_price numeric,
    created_at  timestamp default now(),
    receipt_id integer
        references appschema.receipt
);

create table appschema.category_unit
(
    id            serial
        primary key,
    unit_name     varchar(10),
    category_name varchar(60)
);

-- function to trigger updated_at timestamp to actually update
CREATE OR REPLACE FUNCTION update_timestamp_function() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_timestamp
    before UPDATE
    ON appschema.cash_flow_record
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp_function();

-- function to insert data to the direct table when purchase table receives new inserts
CREATE OR REPLACE FUNCTION add_direct_outflow_function() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO appschema.direct(category, quantity, unit_price, cashflow_id, receipt_id)
        VALUES ((select outflow_category from appschema.receipt where appschema.receipt.id=new.receipt_id),
                NEW.quantity,
                new.unit_price,
                (select id from appschema.cash_flow_record order by updated_at DESC limit 1),
                new.receipt_id
                );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER add_direct_outflow
    after insert
    ON appschema.purchase
    FOR EACH ROW
EXECUTE PROCEDURE add_direct_outflow_function();

-- function to insert data to the indirect table when purchase table receives new inserts
CREATE OR REPLACE FUNCTION add_indirect_outflow_function() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO appschema.indirect(category, price,cashflow_id, receipt_id)
    VALUES ((select outflow_category from appschema.receipt where appschema.receipt.id=new.receipt_id),
            new.unit_price,
            (select id from appschema.cash_flow_record order by updated_at DESC limit 1),
            new.receipt_id
           );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER add_indirect_outflow
    after insert
    ON appschema.purchase
    FOR EACH ROW
EXECUTE PROCEDURE add_indirect_outflow_function();
