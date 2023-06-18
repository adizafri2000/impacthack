-- cash_flow_record
insert into appschema.cash_flow_record (month) values ('2023-03-01');
insert into appschema.cash_flow_record (month) values ('2023-04-01');
insert into appschema.cash_flow_record (month) values ('2023-05-01');

-- inflow
insert into appschema.inflow (category, amount, cashflow_id) values ('sales',2000,1);
insert into appschema.inflow (category, amount, cashflow_id) values ('grant',10000,1);
insert into appschema.inflow (category, amount, cashflow_id) values ('sales',1750,1);
insert into appschema.inflow (category, amount, cashflow_id) values ('sales',2300,1);
insert into appschema.inflow (category, amount, cashflow_id) values ('sales',1900,1);

insert into appschema.inflow (category, amount, cashflow_id) values ('sales',1780,2);
insert into appschema.inflow (category, amount, cashflow_id) values ('sales',1750,2);
insert into appschema.inflow (category, amount, cashflow_id) values ('sales',1690,2);
insert into appschema.inflow (category, amount, cashflow_id) values ('sales',2010,2);

--insert into appschema.inflow (category, amount, cashflow_id) values ('sales',1900,3);
--insert into appschema.inflow (category, amount, cashflow_id) values ('sales',2090,3);
--insert into appschema.inflow (category, amount, cashflow_id) values ('sales',1870,3);
--insert into appschema.inflow (category, amount, cashflow_id) values ('sales',1740,3);

--receipt
insert into appschema.receipt (merchant, date_of_purchase, time, total_price, outflow_category) VALUES ('Kirara Bakery','2023-03-09','12:35',100,'direct');
insert into appschema.receipt (merchant, date_of_purchase, time, total_price, outflow_category) VALUES ('Chen Manufacturing Sdn Bhd','2023-03-18','14:00',500,'direct');
insert into appschema.receipt (merchant, date_of_purchase, time, total_price, outflow_category) VALUES ('Unifi','2023-03-21','09:00','168.55','indirect');
insert into appschema.receipt (merchant, date_of_purchase, time, total_price, outflow_category) VALUES ('Baharuddin Supplies','2023-04-07','13:30',400,'direct');
insert into appschema.receipt (merchant, date_of_purchase, time, total_price, outflow_category) VALUES ('PrintIt','2023-04-20','09:35',100,'direct');
insert into appschema.receipt (merchant, date_of_purchase, time, total_price, outflow_category) VALUES ('Kirara Bakery','2023-04-27','15:50',400,'direct');
insert into appschema.receipt (merchant, date_of_purchase, time, total_price, outflow_category) VALUES ('Ninjavan','2023-05-02','11:30',40,'indirect');
insert into appschema.receipt (merchant, date_of_purchase, time, total_price, outflow_category) VALUES ('Baharuddin Supplies','2023-05-29','12:35',300,'direct');

--purchase
insert into appschema.purchase (item, quantity, unit_price, receipt_id) VALUES ('honey',10,10,1);
insert into appschema.purchase (item, quantity, unit_price, receipt_id) VALUES ('bottle',10,50,2);
insert into appschema.purchase (item, quantity, unit_price, receipt_id) VALUES ('bills',1,168.55,3);
insert into appschema.purchase (item, quantity, unit_price, receipt_id) VALUES ('peanuts',40,10,4);
insert into appschema.purchase (item, quantity, unit_price, receipt_id) VALUES ('wrapper',10,10,5);
insert into appschema.purchase (item, quantity, unit_price, receipt_id) VALUES ('honey',50,8,6);
insert into appschema.purchase (item, quantity, unit_price, receipt_id) VALUES ('shipping',1,40,7);
insert into appschema.purchase (item, quantity, unit_price, receipt_id) VALUES ('peanuts',20,15,8);

--direct
insert into appschema.direct (category, unit, quantity, unit_price, cashflow_id, receipt_id) VALUES ('chocolate','kg',30,25,1,null);
insert into appschema.direct (category, unit, quantity, unit_price, cashflow_id, receipt_id) VALUES ('chocolate','kg',30,28.5,2,null);
insert into appschema.direct (category, unit, quantity, unit_price, cashflow_id, receipt_id) VALUES ('chocolate','kg',30,28.5,3,null);

--indirect
insert into appschema.indirect(category, price, cashflow_id, receipt_id) VALUES ('salary',2500,1,null);
insert into appschema.indirect(category, price, cashflow_id, receipt_id) VALUES ('bills',300,1,null);
insert into appschema.indirect(category, price, cashflow_id, receipt_id) VALUES ('salary',2500,2,null);
insert into appschema.indirect(category, price, cashflow_id, receipt_id) VALUES ('bills',350,2,null);
insert into appschema.indirect(category, price, cashflow_id, receipt_id) VALUES ('salary',2500,3,null);
insert into appschema.indirect(category, price, cashflow_id, receipt_id) VALUES ('bills',400,3,null);

UPDATE appschema.cash_flow_record SET closing_balance = 14400 WHERE id = 1;
UPDATE appschema.cash_flow_record SET closing_balance = 17925 WHERE id = 2;
--UPDATE appschema.cash_flow_record SET closing_balance = 13622.45 WHERE id = 3;