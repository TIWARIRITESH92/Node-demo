/**** Create common table for prepay-credit ****/
CREATE TYPE role AS ENUM ('1','2');
CREATE TYPE status AS ENUM ('0','1'); /*** 0- completed 1- fail ***/
CREATE TYPE transaction_type AS ENUM ('0','1'); /** 0-add_money,1-deduct_money ***/
CREATE TABLE IF NOT EXISTS clients (
	 id serial primary key,
	 firstname varchar(255) NOT NULL,
	 surname varchar(255) NOT NULL,
	 admin_email varchar(255) NOT NULL,
	 invoice_email varchar(255) NOT NULL,
         company_name varchar(255) NOT NULL,
	 company_address_1 varchar(255) NOT NULL,
	 company_address_2 varchar(255) NOT NULL,
	 town varchar(255) NOT NULL,
	 country varchar(255) NOT NULL,
	 password varchar(255) NOT NULL,
	 postcode int,
         phone bigint,
	 support_email varchar(255) NOT NULL,
	 role role,
	 current_balance int NOT NULL DEFAULT 0,
	 created_date timestamp,
	 updated_at timestamp
);

INSERT INTO clients(firstname,surname,admin_email,invoice_email,company_name,company_address_1,company_address_2,town,country,password,postcode,phone,support_email,role,current_balance,created_date,updated_at)
VALUES ('Admin','Admin','admin@mail.com','','','','','','','$2a$10$a2Bs7szvqHNSNHG9s4L5Tesn.nCaPAL9hyusykkp1ocUPcPxC7Ipe','382415','9429519412','','1',0,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP);

/*** Create Transaction Table ***/
CREATE TABLE IF NOT EXISTS clients_stripe_transaction (
	id serial primary key,
        transaction_id varchar(255) NOT NULL,
        client_id bigint,
        amount bigint NOT NULL DEFAULT 0,
        remain_amount bigint NOT NULL DEFAULT 0,
        status status,
	transaction_status varchar(255) NOT NULL,
	created_date timestamp
);


/*** Create Transaction Table ***/
CREATE TABLE IF NOT EXISTS clients_wallet_transaction (
	id serial primary key,
        client_id bigint,
        amount bigint,
        remain_amount bigint,
        transaction_status varchar(255) NOT NULL,
	created_date timestamp
);

/*** Create common all transaction ***/
CREATE TABLE IF NOT EXISTS clients_all_transaction (
	id serial primary key,
        client_id bigint,
        amount bigint NOT NULL DEFAULT 0,
        remain_amount bigint NOT NULL DEFAULT 0,
        transaction_type transaction_type,
        status status,
	created_date timestamp
);


