# FreeAgent Coding Challenge

Thank you for your interest in the FreeAgent UI Coding Challenge. This template is a barebones guide to get you started.

Please add any libraries, folders, files, etc. you see fit in order to produce a solution you're proud of.

## Coding Challenge Instructions

Please see the INSTRUCTIONS.md file for more information.

## Your Solution Setup and Run Instructions

Please include instructions on how to setup and run your solution here.

## Your Design Decisions

We'd love to hear your thoughts around any design decisions you made while coding your solution.

- page-level data retrieval to allow for different types of api call rather than a global app.js one
- currencies determined by client rather than server endpoint, to allow for flexibility
- page-based architecture to allow for persistent navbar/footer and rerendering of <main> e.g. through react-router
- scss for variables w better browser support than css variables
- 7-in-1 scss organisation
- axios for easier error handling and better browser support than fetch (using promise chaining rather than try/catch block w async/await as find it easier to read in this case!)
