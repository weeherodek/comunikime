create table if not exists products(
	id serial primary key not null,
	name varchar(255) not null,
	description text,
	quantity int,
	value float,
	image text default 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png',
	updated_at timestamp default now(),
	created_at timestamp default now()
);

create table if not exists sales(
	id serial primary key not null,
	email varchar(255) not null,
	itensQuantity int not null,
	total float not null,
	updated_at timestamp default now(),
	created_at timestamp default now()
);

create table if not exists sales_products(
	id serial not null primary key,
	sale_id int not null,
	product_id int not null,
	product_qt int not null,
	product_amount float not null,
	updated_at timestamp default now(),
	created_at timestamp default now(),
	constraint fk_sale
		foreign key (sale_id)
		references sales(id)
		on delete CASCADE,
	constraint fk_product
		foreign key (product_id)
		references products(id)
		on delete set null
);


CREATE OR REPLACE FUNCTION update_modified_column() 
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_modtime BEFORE UPDATE ON products FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_products_modtime BEFORE UPDATE ON sales FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
CREATE TRIGGER update_products_modtime BEFORE UPDATE ON sales_products FOR EACH ROW EXECUTE PROCEDURE update_modified_column();
