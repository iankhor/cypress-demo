const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  viewportWidth: 1536,
  viewportHeight: 960,
  env: {
    USERNAME: process.env.CYPRESS_USERNAME,
    PASSWORD: process.env.CYPRESS_PASSWORD,
  },
  e2e: {
    baseUrl: process.env.HOST,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
