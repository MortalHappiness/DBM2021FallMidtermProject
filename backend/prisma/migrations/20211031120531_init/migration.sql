-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);
