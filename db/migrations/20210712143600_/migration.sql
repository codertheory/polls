/*
  Warnings:

  - You are about to drop the column `userId` on the `Poll` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Poll" DROP CONSTRAINT "Poll_userId_fkey";

-- AlterTable
ALTER TABLE "Poll" DROP COLUMN "userId",
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "creatorId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Poll" ADD FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
