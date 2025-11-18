-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Developer" (
    "id" TEXT NOT NULL,
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
    "rating" DOUBLE PRECISION,
    "completedProjects" INTEGER,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
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
    "area" DOUBLE PRECISION,
    "locationCity" TEXT,
    "locationArea" TEXT,
    "locationAddress" TEXT,
    "locationLat" DOUBLE PRECISION,
    "locationLng" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL,
    "pricePerSqm" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "priceRangeMin" DOUBLE PRECISION,
    "priceRangeMax" DOUBLE PRECISION,
    "yield" DOUBLE PRECISION,
    "capRate" DOUBLE PRECISION,
    "irr" DOUBLE PRECISION,
    "monthlyRent" DOUBLE PRECISION,
    "occupancy" DOUBLE PRECISION,
    "managementFee" DOUBLE PRECISION,
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
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
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
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL DEFAULT 'global',
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
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "source" TEXT,
    "locale" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizSubmission" (
    "id" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "budget" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "purpose" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "infrastructure" TEXT NOT NULL,
    "contactName" TEXT NOT NULL,
    "contactEmail" TEXT NOT NULL,
    "contactPhone" TEXT NOT NULL,
    "locale" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_slug_key" ON "Developer"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_developerId_fkey" FOREIGN KEY ("developerId") REFERENCES "Developer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
