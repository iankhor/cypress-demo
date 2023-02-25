const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  video: false,
  env: {
    USERNAME: process.env.CYPRESS_USERNAME,
    PASSWORD: process.env.CYPRESS_PASSWORD,
    FINANCE_ENTITY: process.env.CYPRESS_FINANCE_ENTITY
  },
  e2e: {
    baseUrl: process.env.CYPRESS_HOST,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
