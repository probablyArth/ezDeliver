-- CreateTable
CREATE TABLE "Seller" (
    "id" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "password" STRING NOT NULL,
    "username" STRING NOT NULL,

    CONSTRAINT "Seller_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" STRING NOT NULL,
    "sellerId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "quantity" INT4 NOT NULL,
    "weightPerKg" INT4 NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transporter" (
    "id" STRING NOT NULL,
    "phone" STRING NOT NULL,
    "password" STRING NOT NULL,
    "username" STRING NOT NULL,

    CONSTRAINT "Transporter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "id" STRING NOT NULL,
    "transporterId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "weightLimit" INT4 NOT NULL,
    "pricePerKg" INT4 NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seller_phone_key" ON "Seller"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Transporter_phone_key" ON "Transporter"("phone");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_transporterId_fkey" FOREIGN KEY ("transporterId") REFERENCES "Transporter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
