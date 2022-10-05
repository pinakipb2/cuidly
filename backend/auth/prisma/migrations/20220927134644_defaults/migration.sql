-- CreateTable
CREATE TABLE "Defaults" (
    "id" TEXT NOT NULL,
    "guestUserLinks" INTEGER NOT NULL DEFAULT 10,
    "freeUserLinks" INTEGER NOT NULL DEFAULT 100,
    "freeUsersRateLimit" INTEGER NOT NULL DEFAULT 100,

    CONSTRAINT "Defaults_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Defaults_guestUserLinks_key" ON "Defaults"("guestUserLinks");

-- CreateIndex
CREATE UNIQUE INDEX "Defaults_freeUserLinks_key" ON "Defaults"("freeUserLinks");

-- CreateIndex
CREATE UNIQUE INDEX "Defaults_freeUsersRateLimit_key" ON "Defaults"("freeUsersRateLimit");
