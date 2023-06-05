const { PrismaClient } = require('@prisma/client');
//const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});


module.exports = prisma;