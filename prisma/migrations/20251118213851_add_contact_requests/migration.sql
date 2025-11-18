-- CreateTable
CREATE TABLE IF NOT EXISTS "ContactRequest" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "subject" TEXT,
    "message" TEXT,
    "projectId" TEXT,
    "projectTitle" TEXT,
    "country" TEXT,
    "budget" TEXT,
    "preferredCity" TEXT,
    "propertyType" TEXT,
    "source" TEXT,
    "locale" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactRequest_pkey" PRIMARY KEY ("id")
);
