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
    "/search/autocomplete": {
      get: {
        tags: ["Search"],
        summary: "Autocomplete suggestions",
        parameters: [{ name: "q", in: "query", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Suggestions" } },
      },
    },
    "/search/popular": {
      get: {
        tags: ["Search"],
        summary: "Popular searches",
        responses: { "200": { description: "Popular queries" } },
      },
    },
    "/search/trending": {
      get: {
        tags: ["Search"],
        summary: "Trending searches",
        responses: { "200": { description: "Trending queries" } },
      },
    },
    "/seo/bootstrap": {
      get: {
        tags: ["SEO"],
        summary: "Public SEO bootstrap (settings, analytics, verification)",
        responses: { "200": { description: "SEO bootstrap payload" } },
      },
    },
    "/seo/robots.txt": {
      get: {
        tags: ["SEO"],
        summary: "Generated robots.txt",
        responses: { "200": { description: "text/plain robots.txt" } },
      },
    },
    "/seo/sitemaps/{name}": {
      get: {
        tags: ["SEO"],
        summary: "Generate sitemap XML by name (index|treks|blogs|destinations|images|videos|categories|programmatic)",
        parameters: [{ name: "name", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "application/xml sitemap" } },
      },
    },
    "/seo/treks/{slug}": {
      get: {
        tags: ["SEO"],
        summary: "Trek SEO bundle (meta, schemas, related/nearby/similar)",
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Trek SEO payload" } },
      },
    },
    "/seo/destinations/{slug}": {
      get: {
        tags: ["SEO"],
        summary: "Destination SEO bundle",
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Destination SEO payload" } },
      },
    },
    "/seo/blogs/{slug}": {
      get: {
        tags: ["SEO"],
        summary: "Blog SEO bundle",
        parameters: [{ name: "slug", in: "path", required: true, schema: { type: "string" } }],
        responses: { "200": { description: "Blog SEO payload" } },
      },
    },
    "/seo/settings": {
      get: {
        tags: ["SEO"],
        summary: "Get global SEO settings (admin)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Settings" } },
      },
      put: {
        tags: ["SEO"],
        summary: "Update global SEO settings (admin)",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Updated" } },
      },
    },
    "/seo/score": {
      post: {
        tags: ["SEO"],
        summary: "Calculate and persist SEO score for trek/blog/destination",
        security: [{ bearerAuth: [] }],
        responses: { "200": { description: "Score breakdown" } },
      },
    },
    "/seo/schema/generate": {
      post: {
        tags: ["SEO"],
        summary: "Generate JSON-LD by schema type",
        responses: { "200": { description: "JSON-LD object" } },
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
    "/analytics/config": {
      get: {
        tags: ["Analytics"],
        summary: "Public analytics tag config (GA4, GTM, Pixel, Clarity)",
        responses: { "200": { description: "Config" } },
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
