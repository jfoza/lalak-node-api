create table products_schema.products_categories
(
    uuid uuid default uuid_generate_v4() not null primary key,
    product_uuid uuid constraint "ProductsCategoriesProductUuidFk" references products_schema.products,
    category_uuid uuid constraint "ProductsCategoriesCategoryUuidFk" references products_schema.categories,
    created_at  timestamp default now() not null,
    updated_at  timestamp default now() not null
);