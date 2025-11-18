const fs = require('fs');
const path = require('path');

console.log('🔧 Preparing production build...');

// Copy production schema to replace development schema
const productionSchemaPath = path.join(__dirname, '..', 'prisma', 'schema.production.prisma');
const schemaPath = path.join(__dirname, '..', 'prisma', 'schema.prisma');
const backupPath = path.join(__dirname, '..', 'prisma', 'schema.dev.prisma');

// Backup development schema
fs.copyFileSync(schemaPath, backupPath);
console.log('✅ Backed up development schema to schema.dev.prisma');

// Use production schema
fs.copyFileSync(productionSchemaPath, schemaPath);
console.log('✅ Switched to production schema (PostgreSQL)');

console.log('🚀 Ready for production build!');
