-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CO_ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "buttonStyle" TEXT NOT NULL DEFAULT 'rounded',
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER',
ADD COLUMN     "theme" TEXT NOT NULL DEFAULT 'system';
