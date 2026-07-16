import { env } from "../config/env";

export const swaggerSpec = {
  openapi: "3.0.3",
  info: {
    title: env.APP_NAME,
    version: "1.0.0",
    description:
      "Production REST API for India Holiday Destinations — treks, bookings, payments, CMS, and admin analytics.",
    contact: {
      name: "India Holiday Destinations",
      email: "indiaholidaydestinations.in@gmail.com",
    },
  },
  servers: [
    { url: env.APP_URL + env.API_PREFIX, description: "Current environment" },
    { url: "http://localhost:4000/api/v1", description: "Local" },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      Success: {
        type: "object",
        properties: {
          success: { type: "boolean" },
          message: { type: "string" },
          data: {},
          meta: { type: "object" },
        },
      },
      Error: {
        type: "object",
        properties: {
          success: { type: "boolean", example: false },
          message: { type: "string" },
          code: { type: "string" },
        },
      },
    },
  },
  paths: {
    "/health": {
      get: {
        tags: ["Health"],
        summary: "Health check",
        responses: { "200": { description: "OK" } },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Customer / staff login",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["email", "password"],
                properties: {
                  email: { type: "string", format: "email" },
                  password: { type: "string" },
                },
              },
            },
          },
        },
        responses: { "200": { description: "Tokens + user" } },
      },
    },
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Register customer",
        responses: { "201": { description: "Created" } },
      },
    },
    "/treks": {
      get: {
        tags: ["Treks"],
        summary: "List treks (public published)",
        parameters: [
          { name: "q", in: "query", schema: { type: "string" } },
          { name: "destination", in: "query", schema: { type: "string" } },
          { name: "region", in: "query", schema: { type: "string" } },
          { name: "difficulty", in: "query", schema: { type: "string" } },
          { name: "page", in: "query", schema: { type: "integer" } },
          { name: "limit", in: "query", schema: { type: "integer" } },
        ],
        responses: { "200": { description: "Paginated treks" } },
      },
      post: {
        tags: ["Treks"],
        summary: "Create trek (admin)",
        security: [{ bearerAuth: [] }],
        responses: { "201": { description: "Created" } },
      },
    },
    "/treks/{slug}": {
      get: {
        tags: ["Treks"],
        summary: "Get trek by slug",
        parameters: [
          { name: "slug", in: "path", required: true, schema: { type: "string" } },
        ],
        responses: { "200": { description: "Trek detail" }, "404": { description: "Not found" } },
      },
    },
    "/destinations": {
      get: {
        tags: ["Destinations"],
        summary: "List destinations",
        responses: { "200": { description: "OK" } },
      },
    },
    "/bookings": {
      post: {
        tags: ["Bookings"],
        summary: "Create booking",
        security: [{ bearerAuth: [] }],
        responses: { "201": { description: "Created" } },
      },
    },
    "/payments/create-order": {
      post: {
        tags: ["Payments"],
        summary: "Create payment order",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Order" } },
      },
    },
    "/search": {
      get: {
        tags: ["Search"],
        summary: "Global search",
        parameters: [{ name: "q", in: "query", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Results" } },
      },
    },
    "/analytics/dashboard": {
      get: {
        tags: ["Analytics"],
        summary: "Admin dashboard metrics",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Stats" } },
      },
    },
    "/enquiries": {
      post: {
        tags: ["Enquiries"],
        summary: "Public trek enquiry",
        responses: { "201": { description: "Created" } },
      },
    },
  },
};
