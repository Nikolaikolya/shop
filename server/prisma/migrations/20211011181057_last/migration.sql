/*
  Warnings:

  - You are about to drop the column `updated_at` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
CREATE SEQUENCE "attribute_name_id_seq";
ALTER TABLE "attribute_name" ALTER COLUMN "id" SET DEFAULT nextval('attribute_name_id_seq');
ALTER SEQUENCE "attribute_name_id_seq" OWNED BY "attribute_name"."id";

-- AlterTable
CREATE SEQUENCE "attributes_id_seq";
ALTER TABLE "attributes" ALTER COLUMN "id" SET DEFAULT nextval('attributes_id_seq');
ALTER SEQUENCE "attributes_id_seq" OWNED BY "attributes"."id";

-- AlterTable
CREATE SEQUENCE "cart_products_id_seq";
ALTER TABLE "cart_products" ALTER COLUMN "id" SET DEFAULT nextval('cart_products_id_seq');
ALTER SEQUENCE "cart_products_id_seq" OWNED BY "cart_products"."id";

-- AlterTable
CREATE SEQUENCE "categories_id_seq";
ALTER TABLE "categories" ALTER COLUMN "id" SET DEFAULT nextval('categories_id_seq');
ALTER SEQUENCE "categories_id_seq" OWNED BY "categories"."id";

-- AlterTable
CREATE SEQUENCE "employees_id_seq";
ALTER TABLE "employees" ALTER COLUMN "id" SET DEFAULT nextval('employees_id_seq');
ALTER SEQUENCE "employees_id_seq" OWNED BY "employees"."id";

-- AlterTable
CREATE SEQUENCE "images_id_seq";
ALTER TABLE "images" ALTER COLUMN "id" SET DEFAULT nextval('images_id_seq');
ALTER SEQUENCE "images_id_seq" OWNED BY "images"."id";

-- AlterTable
CREATE SEQUENCE "order_details_id_seq";
ALTER TABLE "order_details" ALTER COLUMN "id" SET DEFAULT nextval('order_details_id_seq');
ALTER SEQUENCE "order_details_id_seq" OWNED BY "order_details"."id";

-- AlterTable
CREATE SEQUENCE "orders_id_seq";
ALTER TABLE "orders" ALTER COLUMN "id" SET DEFAULT nextval('orders_id_seq');
ALTER SEQUENCE "orders_id_seq" OWNED BY "orders"."id";

-- AlterTable
CREATE SEQUENCE "product_attributes_id_seq";
ALTER TABLE "product_attributes" ALTER COLUMN "id" SET DEFAULT nextval('product_attributes_id_seq');
ALTER SEQUENCE "product_attributes_id_seq" OWNED BY "product_attributes"."id";

-- AlterTable
CREATE SEQUENCE "product_categories_id_seq";
ALTER TABLE "product_categories" ALTER COLUMN "id" SET DEFAULT nextval('product_categories_id_seq');
ALTER SEQUENCE "product_categories_id_seq" OWNED BY "product_categories"."id";

-- AlterTable
CREATE SEQUENCE "product_comments_id_seq";
ALTER TABLE "product_comments" ALTER COLUMN "id" SET DEFAULT nextval('product_comments_id_seq');
ALTER SEQUENCE "product_comments_id_seq" OWNED BY "product_comments"."id";

-- AlterTable
CREATE SEQUENCE "product_defects_id_seq";
ALTER TABLE "product_defects" ALTER COLUMN "id" SET DEFAULT nextval('product_defects_id_seq');
ALTER SEQUENCE "product_defects_id_seq" OWNED BY "product_defects"."id";

-- AlterTable
CREATE SEQUENCE "products_id_seq";
ALTER TABLE "products" ALTER COLUMN "id" SET DEFAULT nextval('products_id_seq');
ALTER SEQUENCE "products_id_seq" OWNED BY "products"."id";

-- AlterTable
CREATE SEQUENCE "ratings_id_seq";
ALTER TABLE "ratings" ALTER COLUMN "id" SET DEFAULT nextval('ratings_id_seq');
ALTER SEQUENCE "ratings_id_seq" OWNED BY "ratings"."id";

-- AlterTable
CREATE SEQUENCE "region_id_seq";
ALTER TABLE "region" ALTER COLUMN "id" SET DEFAULT nextval('region_id_seq');
ALTER SEQUENCE "region_id_seq" OWNED BY "region"."id";

-- AlterTable
CREATE SEQUENCE "roles_id_seq";
ALTER TABLE "roles" ALTER COLUMN "id" SET DEFAULT nextval('roles_id_seq');
ALTER SEQUENCE "roles_id_seq" OWNED BY "roles"."id";

-- AlterTable
CREATE SEQUENCE "shippers_id_seq";
ALTER TABLE "shippers" ALTER COLUMN "id" SET DEFAULT nextval('shippers_id_seq');
ALTER SEQUENCE "shippers_id_seq" OWNED BY "shippers"."id";

-- AlterTable
CREATE SEQUENCE "suppliers_id_seq";
ALTER TABLE "suppliers" ALTER COLUMN "id" SET DEFAULT nextval('suppliers_id_seq');
ALTER SEQUENCE "suppliers_id_seq" OWNED BY "suppliers"."id";

-- AlterTable
CREATE SEQUENCE "supply_id_seq";
ALTER TABLE "supply" ALTER COLUMN "id" SET DEFAULT nextval('supply_id_seq');
ALTER SEQUENCE "supply_id_seq" OWNED BY "supply"."id";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "updated_at",
ADD COLUMN     "reset_password_expire" TIMESTAMP(6);
