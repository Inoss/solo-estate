-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Developer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "logo" TEXT,
    "descriptionEn" TEXT,
    "descriptionKa" TEXT,
    "descriptionRu" TEXT,
    "descriptionHe" TEXT,
    "descriptionAz" TEXT,
    "descriptionHy" TEXT,
    "descriptionUk" TEXT,
    "rating" REAL,
    "completedProjects" INTEGER,
    "website" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleKa" TEXT,
    "titleRu" TEXT,
    "titleHe" TEXT,
    "titleAz" TEXT,
    "titleHy" TEXT,
    "titleUk" TEXT,
    "descriptionEn" TEXT,
    "descriptionKa" TEXT,
    "descriptionRu" TEXT,
    "descriptionHe" TEXT,
    "descriptionAz" TEXT,
    "descriptionHy" TEXT,
    "descriptionUk" TEXT,
    "developerId" TEXT,
    "status" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "area" REAL,
    "locationCity" TEXT,
    "locationArea" TEXT,
    "locationAddress" TEXT,
    "locationLat" REAL,
    "locationLng" REAL,
    "price" REAL NOT NULL,
    "pricePerSqm" REAL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "priceRangeMin" REAL,
    "priceRangeMax" REAL,
    "yield" REAL,
    "capRate" REAL,
    "irr" REAL,
    "monthlyRent" REAL,
    "occupancy" REAL,
    "managementFee" REAL,
    "deliveryQuarter" TEXT,
    "deliveryYear" INTEGER,
    "coverImage" TEXT,
    "gallery" TEXT,
    "videoUrl" TEXT,
    "floorPlans" TEXT,
    "highlights" TEXT,
    "documents" JSONB,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogImage" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Project_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleKa" TEXT,
    "titleRu" TEXT,
    "titleHe" TEXT,
    "titleAz" TEXT,
    "titleHy" TEXT,
    "titleUk" TEXT,
    "contentEn" TEXT,
    "contentKa" TEXT,
    "contentRu" TEXT,
    "contentHe" TEXT,
    "contentAz" TEXT,
    "contentHy" TEXT,
    "contentUk" TEXT,
    "excerptEn" TEXT,
    "excerptKa" TEXT,
    "excerptRu" TEXT,
    "excerptHe" TEXT,
    "excerptAz" TEXT,
    "excerptHy" TEXT,
    "excerptUk" TEXT,
    "coverImage" TEXT,
    "category" TEXT,
    "tags" TEXT,
    "metaTitle" TEXT,
    "metaDescription" TEXT,
    "ogImage" TEXT,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "publishedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'global',
    "siteNameEn" TEXT,
    "siteNameKa" TEXT,
    "siteNameRu" TEXT,
    "siteNameHe" TEXT,
    "siteNameAz" TEXT,
    "siteNameHy" TEXT,
    "siteNameUk" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "whatsapp" TEXT,
    "address" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "twitter" TEXT,
    "defaultMetaTitle" TEXT,
    "defaultMetaDescription" TEXT,
    "defaultOgImage" TEXT,
    "customSettings" JSONB,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_slug_key" ON "Developer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
