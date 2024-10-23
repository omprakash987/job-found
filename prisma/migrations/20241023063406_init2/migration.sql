/*
  Warnings:

  - You are about to drop the `Achievement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Education` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Experience` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SocialLink` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Achievement" DROP CONSTRAINT "Achievement_userProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_userProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_userProfileId_fkey";

-- DropForeignKey
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_companyProfileId_fkey";

-- DropForeignKey
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_userProfileId_fkey";

-- AlterTable
ALTER TABLE "CompanyProfile" ADD COLUMN     "socialLinks" TEXT[];

-- AlterTable
ALTER TABLE "UserProfile" ADD COLUMN     "achievements" TEXT[],
ADD COLUMN     "education" TEXT[],
ADD COLUMN     "experience" TEXT[],
ADD COLUMN     "socialLinks" TEXT[];

-- DropTable
DROP TABLE "Achievement";

-- DropTable
DROP TABLE "Education";

-- DropTable
DROP TABLE "Experience";

-- DropTable
DROP TABLE "SocialLink";
