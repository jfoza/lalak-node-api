create table products_schema.products_events
(
    uuid uuid default uuid_generate_v4() not null primary key,
    product_uuid uuid constraint "ProductsEventsProductUuidFk" references products_schema.products,
    event_uuid uuid constraint "ProductsEventsEventUuidFk" references products_schema.events,
    created_at  timestamp default now() not null,
    updated_at  timestamp default now() not null
);