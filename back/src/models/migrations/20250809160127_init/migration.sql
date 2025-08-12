/*
  Warnings:

  - The primary key for the `Wishlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `wishlist_id` on the `Wishlist` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Wishlist_item" DROP CONSTRAINT "Wishlist_item_wishlist_id_fkey";

-- DropIndex
DROP INDEX "public"."Wishlist_user_id_key";

-- AlterTable
ALTER TABLE "public"."Wishlist" DROP CONSTRAINT "Wishlist_pkey",
DROP COLUMN "wishlist_id",
ADD CONSTRAINT "Wishlist_pkey" PRIMARY KEY ("user_id");

-- AddForeignKey
ALTER TABLE "public"."Wishlist_item" ADD CONSTRAINT "Wishlist_item_wishlist_id_fkey" FOREIGN KEY ("wishlist_id") REFERENCES "public"."Wishlist"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
