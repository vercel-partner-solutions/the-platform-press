#!/usr/bin/env node

/**
 * Contentful Schema Fetcher
 *
 * This script fetches the current content types schema from Contentful
 * and writes it to schema.json in the project root.
 *
 * The schema.json file is used to inform AI tools like Claude about the
 * current Contentful schema structure for better code generation.
 *
 * DO NOT manually edit schema.json - it should only be updated by this script.
 *
 * Usage: npm run fetch-schema
 */

// Load environment variables from .env.local
import { config } from "dotenv";
import { join } from "path";

// Load .env.local file
config({ path: join(process.cwd(), ".env.local") });

import { createClient } from "contentful-management";
import { writeFileSync } from "fs";

interface ContentTypeInfo {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
  };
  displayField?: string;
  name: string;
  description?: string;
  fields: Array<{
    id: string;
    name: string;
    type: string;
    linkType?: string;
    required: boolean;
    localized: boolean;
    disabled: boolean;
    validations?: any[];
    items?: {
      type: string;
      linkType?: string;
      validations?: any[];
    };
  }>;
}

interface SchemaOutput {
  generatedAt: string;
  space: string;
  environment: string;
  contentTypes: ContentTypeInfo[];
}

async function fetchSchema(): Promise<void> {
  console.log("🔍 Fetching Contentful schema...");

  try {
    // Validate environment variables
    if (!process.env.CONTENTFUL_CMA_TOKEN) {
      throw new Error("CONTENTFUL_CMA_TOKEN environment variable is required");
    }
    if (!process.env.CONTENTFUL_SPACE_ID) {
      throw new Error("CONTENTFUL_SPACE_ID environment variable is required");
    }

    // Create Contentful Management client
    const client = createClient({
      accessToken: process.env.CONTENTFUL_CMA_TOKEN,
    });

    // Get space and environment
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment("master");

    console.log(`📡 Connected to space: ${space.name} (${space.sys.id})`);

    // Fetch content types
    const contentTypes = await environment.getContentTypes();
    console.log(`📋 Found ${contentTypes.items.length} content types`);

    // Process and structure the schema data
    const schemaData: SchemaOutput = {
      generatedAt: new Date().toISOString(),
      space: space.sys.id,
      environment: "master",
      contentTypes: contentTypes.items.map((ct: any) => ({
        sys: {
          id: ct.sys.id,
          type: ct.sys.type,
          createdAt: ct.sys.createdAt,
          updatedAt: ct.sys.updatedAt,
        },
        displayField: ct.displayField,
        name: ct.name,
        description: ct.description,
        fields: ct.fields.map((field: any) => ({
          id: field.id,
          name: field.name,
          type: field.type,
          linkType: field.linkType,
          required: field.required || false,
          localized: field.localized || false,
          disabled: field.disabled || false,
          validations: field.validations,
          items: field.items,
        })),
      })),
    };

    // Write schema to file
    const schemaPath = join(process.cwd(), "schema.json");
    writeFileSync(schemaPath, JSON.stringify(schemaData, null, 2), "utf-8");

    console.log("✅ Schema successfully written to schema.json");
    console.log(
      `📊 Content types exported: ${schemaData.contentTypes.map((ct) => ct.name).join(", ")}`,
    );
  } catch (error) {
    console.error("❌ Error fetching schema:", error);
    process.exit(1);
  }
}

// Run the script if called directly
if (require.main === module) {
  fetchSchema();
}
