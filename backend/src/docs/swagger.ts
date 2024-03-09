import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

// Meta Information
const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Global TODO List", version: "1.0.0" },
    servers: [
      {
          url: `http://localhost:${process.env.PORT}`,
      }
  ]
  },
  apis: ["../routes/*.ts"],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Setup docs
export const swaggerDocs = (app: Express, port: string) => {
  // Route-Handler
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(
    `[DOCS] Version 1 Docs are available on http://localhost:${port}/api-docs`
  );
};

export default swaggerDocs;