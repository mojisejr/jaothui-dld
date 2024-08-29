/*
  Warnings:

  - Added the required column `rawRegisterDataId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "rawRegisterDataId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RawRegisterData" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "idCard" INTEGER NOT NULL,
    "address1" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "amphoe" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "farmName" TEXT NOT NULL,
    "farmLogo" TEXT NOT NULL,
    "farmAddress" TEXT NOT NULL,
    "farmProvince" TEXT NOT NULL,
    "farmAmphoe" TEXT NOT NULL,
    "farmDistrict" TEXT NOT NULL,
    "farmZipcode" TEXT NOT NULL,
    "farmSize1" INTEGER NOT NULL,
    "farmSize2" INTEGER NOT NULL,
    "farmSize3" INTEGER NOT NULL,
    "animalType" TEXT NOT NULL,
    "momCount" INTEGER NOT NULL,
    "momBreed" TEXT NOT NULL,
    "dadCount" INTEGER NOT NULL,
    "dadBreed" TEXT NOT NULL,
    "otherAnimalSize" INTEGER NOT NULL,
    "children" INTEGER NOT NULL,
    "totalAnimalInFarm" INTEGER NOT NULL,
    "farmObj1" TEXT NOT NULL,
    "farmObj2" TEXT NOT NULL,
    "farmObj3" TEXT NOT NULL,
    "farmObj4" TEXT NOT NULL,
    "farmObjOther" TEXT,
    "grassField" TEXT NOT NULL,
    "water" TEXT NOT NULL,
    "waterOther" TEXT,
    "food" TEXT NOT NULL,
    "foodOther" TEXT,
    "treat" TEXT NOT NULL,
    "treatOther" TEXT,
    "certificate" TEXT NOT NULL,
    "farmLocation" TEXT NOT NULL,
    "idCardImage" TEXT NOT NULL,
    "farmImage1" TEXT NOT NULL,
    "farmImage2" TEXT NOT NULL,
    "farmImage3" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "accept" TEXT NOT NULL,

    CONSTRAINT "RawRegisterData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RawRegisterData_idCard_key" ON "RawRegisterData"("idCard");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_rawRegisterDataId_fkey" FOREIGN KEY ("rawRegisterDataId") REFERENCES "RawRegisterData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
