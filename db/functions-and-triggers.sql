-- function and trigger for appschema.cash_flow_record.updated_at timestamp to actually update
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
-- function and trigger ends

-- function to insert data to the direct table when purchase table receives new inserts
CREATE OR REPLACE FUNCTION add_direct_outflow_function() RETURNS TRIGGER AS $$
BEGIN
    if ((select outflow_category from appschema.receipt where receipt.id=new.receipt_id)='direct') then
        INSERT INTO appschema.direct(category, quantity, unit_price, cashflow_id, receipt_id)
        VALUES (NEW.item,
                NEW.quantity,
                new.unit_price,
                (select id from appschema.cash_flow_record order by updated_at DESC limit 1),
                new.receipt_id
               );
    end if;
    return new;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER add_direct_outflow
    after insert
    ON appschema.purchase
    FOR EACH ROW
    --WHEN ((select outflow_category from appschema.receipt where id=new.receipt_id)='direct')
EXECUTE PROCEDURE add_direct_outflow_function();
-- function and trigger ends

-- function to insert data to the indirect table when purchase table receives new inserts
CREATE OR REPLACE FUNCTION add_indirect_outflow_function() RETURNS TRIGGER AS $$
BEGIN
    if ((select outflow_category from appschema.receipt where receipt.id=new.receipt_id)='indirect') then
        INSERT INTO appschema.indirect(category, price,cashflow_id, receipt_id)
        VALUES (new.item,
                new.unit_price,
                (select id from appschema.cash_flow_record order by updated_at DESC limit 1),
                new.receipt_id
               );
    end if;
    return new;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER add_indirect_outflow
    after insert
    ON appschema.purchase
    FOR EACH ROW
EXECUTE PROCEDURE add_indirect_outflow_function();
-- function and trigger ends

-- function to update appschema.cash_flow_records.inflow with inflow amounts whenver new records are inserted
CREATE OR REPLACE FUNCTION cfr_inflow_updater_function() RETURNS TRIGGER AS $$
BEGIN
    update appschema.cash_flow_record
    set inflow = inflow + new.amount
    where id=new.cashflow_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER cfr_inflow_updater
    after insert
    ON appschema.inflow
    FOR EACH ROW
EXECUTE PROCEDURE cfr_inflow_updater_function();
-- function and trigger ends

-- function to update appschema.cash_flow_records.outflow with direct outflow amounts whenver new records are inserted
CREATE OR REPLACE FUNCTION cfr_direct_outflow_updater_function() RETURNS TRIGGER AS $$
BEGIN
    update appschema.cash_flow_record
    set outflow = outflow + new.price
    where id=new.cashflow_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER cfr_direct_outflow_updater
    after insert
    ON appschema.direct
    FOR EACH ROW
EXECUTE PROCEDURE cfr_direct_outflow_updater_function();
-- function and trigger ends

-- function to update appschema.cash_flow_records.outflow with indirect outflow amounts whenver new records are inserted
CREATE OR REPLACE FUNCTION cfr_indirect_outflow_updater_function() RETURNS TRIGGER AS $$
BEGIN
    update appschema.cash_flow_record
    set outflow = outflow + new.price
    where id=new.cashflow_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER cfr_indirect_outflow_updater
    after insert
    ON appschema.indirect
    FOR EACH ROW
EXECUTE PROCEDURE cfr_indirect_outflow_updater_function();
-- function and trigger ends

-- function to update appschema.cash_flow_records.profit using the formula:
-- appschema.cash_flow_records.profit = (inflow.amount where category='sales') - ((ALL direct.price records)+(ALL indirect.price records))
CREATE OR REPLACE FUNCTION profit_sales_updater_function() RETURNS TRIGGER AS $$
BEGIN
    update appschema.cash_flow_record
    set profit = profit + new.amount
    where id=new.cashflow_id
    and new.category='sales';
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER profit_sales_updater
    after insert
    ON appschema.inflow
    FOR EACH ROW
EXECUTE PROCEDURE profit_sales_updater_function();
-- function and trigger ends

CREATE OR REPLACE FUNCTION profit_direct_outflow_updater_function() RETURNS TRIGGER AS $$
BEGIN
    update appschema.cash_flow_record
    set profit = profit - new.price
    where id=new.cashflow_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER profit_direct_outflow_update
    after insert
    ON appschema.direct
    FOR EACH ROW
EXECUTE PROCEDURE profit_direct_outflow_updater_function();

CREATE OR REPLACE FUNCTION profit_indirect_outflow_updater_function() RETURNS TRIGGER AS $$
BEGIN
    update appschema.cash_flow_record
    set profit = profit - new.price
    where id=new.cashflow_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER profit_indirect_outflow_update
    after insert
    ON appschema.indirect
    FOR EACH ROW
EXECUTE PROCEDURE profit_indirect_outflow_updater_function();

--closing balance generation
CREATE OR REPLACE FUNCTION closing_balance_updater_function() RETURNS TRIGGER AS $$
BEGIN
    --check if today's month has passed the current
    if (
        ((select extract(MONTH FROM CURRENT_DATE))-(select extract(MONTH FROM (select month from appschema.cash_flow_record))))>0
        ) then
        --check if for the current cash flow month, were there any sales inflow records
        if(
            (select count(id)
             from appschema.inflow
             where cashflow_id=(
                select id
                from appschema.cash_flow_record cfr
                where cfr.closing_balance is null
             ))>0
          ) then
            update appschema.cash_flow_record
            set closing_balance = (inflow - outflow + (select closing_balance from (select * from appschema.cash_flow_record cfr order by month desc limit 2) as sub order by closing_balance limit 1))
            where id=new.cashflow_id;
        end if;
    end if;
    RETURN NEW;
END
$$ LANGUAGE plpgsql;


    CREATE OR REPLACE TRIGGER closing_balance_updater
    after insert
    ON appschema.inflow
    FOR EACH ROW
EXECUTE PROCEDURE closing_balance_updater_function();


