-- CreateTable
CREATE TABLE "ShortURL" (
    "id" TEXT NOT NULL,
    "longURL" TEXT NOT NULL,
    "shortURL" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShortURL_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortURL_shortURL_key" ON "ShortURL"("shortURL");
