create table products_schema.products_images
(
    uuid uuid default uuid_generate_v4() not null primary key,
    product_uuid uuid constraint "ProductsImagesProductUuidFk" references products_schema.products,
    image_uuid uuid constraint "ProductsImagesImageUuidFk" references general_schema.images,
    created_at  timestamp default now() not null,
    updated_at  timestamp default now() not null
);