-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "phone" TEXT NOT NULL,
    "source" TEXT,
    "locale" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "QuizSubmission" (
    "id" TEXT NOT NULL PRIMARY KEY,
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
