const path = require("path");

module.exports = {
  testEnvironment: "jest-environment-jsdom", // browser emulation
  moduleDirectories: [
    // only needed if you use webpack resolve => allows you to import node modules
    "node_modules",
    path.join(__dirname, "client/src"),
    "components",
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
};
