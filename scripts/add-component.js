#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

async function addComponent(componentName) {
  if (!componentName) {
    console.error("❌ Error: Please provide a component name");
    console.log("Usage: npm run add-component <ComponentName>");
    process.exit(1);
  }

  const componentPath = path.join(
    projectRoot,
    "src",
    "components",
    "dato",
    componentName
  );

  try {
    // Check if component directory exists
    const stat = await fs.stat(componentPath);
    if (!stat.isDirectory()) {
      console.error(
        `❌ Error: ${componentName} is not a directory in src/components/dato/`
      );
      process.exit(1);
    }
  } catch (error) {
    console.error(
      `❌ Error: Component directory ${componentName} does not exist in src/components/dato/`
    );
    process.exit(1);
  }

  // Check for required files
  const requiredFiles = [
    `${componentName}.astro`,
    `${componentName}.css`,
    `${componentName}.query.js`,
  ];

  const missingFiles = [];

  for (const fileName of requiredFiles) {
    const filePath = path.join(componentPath, fileName);
    try {
      await fs.access(filePath);
    } catch (error) {
      missingFiles.push(fileName);
    }
  }

  if (missingFiles.length > 0) {
    console.error(`❌ Error: Missing required files in ${componentName}:`);
    missingFiles.forEach((file) => console.error(`  - ${file}`));
    console.log(`\nExpected files:`);
    requiredFiles.forEach((file) => console.log(`  - ${file}`));
    process.exit(1);
  }

  console.log(`✅ Found all required files for ${componentName}`);

  // Read the component's query file to get the query name and content
  const queryFilePath = path.join(
    componentPath,
    `${componentName}.query.js`
  );
  const queryFileContent = await fs.readFile(queryFilePath, "utf-8");

  // Extract the exported query name (e.g., FACT_LIST_QUERY)
  const exportMatch = queryFileContent.match(
    /export\s+const\s+([A-Z_]+_QUERY)\s*=/
  );
  if (!exportMatch) {
    console.error(
      `❌ Error: Could not find exported query constant in ${componentName}.query.js`
    );
    console.log("Expected format: export const COMPONENT_NAME_QUERY = `...`");
    process.exit(1);
  }

  const queryConstantName = exportMatch[1];
  console.log(`📝 Found query constant: ${queryConstantName}`);

  // Update modularContent.js
  await updateModularContentQuery(componentName, queryConstantName);

  // Update ModularContent.astro
  await updateModularContentAstro(componentName);

  console.log(
    `🎉 Successfully added ${componentName} component to the project!`
  );
}

async function updateModularContentQuery(componentName, queryConstantName) {
  const modularContentPath = path.join(
    projectRoot,
    "src",
    "components",
    "dato",
    "ModularContent",
    "modularContent.js"
  );

  const content = await fs.readFile(modularContentPath, "utf-8");

  // Add import at the top
  const importStatement = `import { ${queryConstantName} } from "../${componentName}/${componentName}.query.js";`;

  // Check if import already exists
  if (content.includes(importStatement)) {
    console.log(
      `ℹ️  Import for ${queryConstantName} already exists in modularContent.js`
    );
  } else {
    // Add import after existing imports
    const lines = content.split("\n");
    const lastImportIndex = lines.findLastIndex((line) =>
      line.startsWith("import")
    );
    lines.splice(lastImportIndex + 1, 0, importStatement);

    const newContent = lines.join("\n");
    await fs.writeFile(modularContentPath, newContent, "utf-8");
    console.log(
      `✅ Added import for ${queryConstantName} to modularContent.js`
    );
  }

  // Add query fragment to the MODULAR_CONTENT_QUERY
  const updatedContent = await fs.readFile(modularContentPath, "utf-8");
  const recordFragment = `    ... on ${componentName}Record {
      \${${queryConstantName}}
    }`;

  if (updatedContent.includes(`... on ${componentName}Record`)) {
    console.log(
      `ℹ️  Query fragment for ${componentName}Record already exists in modularContent.js`
    );
  } else {
    // Find the position to insert the new fragment (before the closing bracket of content)
    const queryEndIndex = updatedContent.lastIndexOf("  }");
    const beforeClosing = updatedContent.substring(0, queryEndIndex);
    const afterClosing = updatedContent.substring(queryEndIndex);

    const newContent = beforeClosing + recordFragment + "\n" + afterClosing;
    await fs.writeFile(modularContentPath, newContent, "utf-8");
    console.log(
      `✅ Added query fragment for ${componentName}Record to modularContent.js`
    );
  }
}

async function updateModularContentAstro(componentName) {
  const astroFilePath = path.join(
    projectRoot,
    "src",
    "components",
    "dato",
    "ModularContent",
    "ModularContent.astro"
  );

  const content = await fs.readFile(astroFilePath, "utf-8");

  // Add import within the frontmatter section (between --- markers)
  const importStatement = `import ${componentName} from "../${componentName}/${componentName}.astro";`;

  if (content.includes(importStatement)) {
    console.log(
      `ℹ️  Import for ${componentName} already exists in ModularContent.astro`
    );
  } else {
    // Find the frontmatter section and add import there
    const frontmatterStart = content.indexOf("---");
    const frontmatterEnd = content.indexOf("---", frontmatterStart + 3);

    if (frontmatterStart === -1 || frontmatterEnd === -1) {
      console.error(
        "❌ Error: Could not find frontmatter section in ModularContent.astro"
      );
      return;
    }

    const beforeFrontmatter = content.substring(0, frontmatterEnd);
    const afterFrontmatter = content.substring(frontmatterEnd);

    // Find the last import line in frontmatter
    const frontmatterContent = beforeFrontmatter.substring(
      frontmatterStart + 3
    );
    const lines = frontmatterContent.split("\n");
    const lastImportIndex = lines.findLastIndex(
      (line) => line.trim().startsWith("import") && line.includes(".astro")
    );

    if (lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, importStatement);
    } else {
      // If no astro imports found, add after the first line
      lines.splice(1, 0, importStatement);
    }

    const newFrontmatter =
      content.substring(0, frontmatterStart + 3) + lines.join("\n");
    const newContent = newFrontmatter + afterFrontmatter;

    await fs.writeFile(astroFilePath, newContent, "utf-8");
    console.log(`✅ Added import for ${componentName} to ModularContent.astro`);
  }

  // Add switch case
  const updatedContent = await fs.readFile(astroFilePath, "utf-8");
  const switchCase = `      case "${componentName}":
        return <${componentName} {block} />;`;

  if (updatedContent.includes(`case "${componentName}":`)) {
    console.log(
      `ℹ️  Switch case for ${componentName} already exists in ModularContent.astro`
    );
  } else {
    // Find the default case and add before it
    const defaultCaseIndex = updatedContent.indexOf("      default:");
    if (defaultCaseIndex === -1) {
      console.error(
        "❌ Error: Could not find default case in switch statement"
      );
      return;
    }

    const beforeDefault = updatedContent.substring(0, defaultCaseIndex);
    const afterDefault = updatedContent.substring(defaultCaseIndex);

    const newContent = beforeDefault + switchCase + "\n" + afterDefault;
    await fs.writeFile(astroFilePath, newContent, "utf-8");
    console.log(
      `✅ Added switch case for ${componentName} to ModularContent.astro`
    );
  }
}

// Get component name from command line arguments
const componentName = process.argv[2];

// Run the script
addComponent(componentName).catch((error) => {
  console.error("❌ Unexpected error:", error.message);
  process.exit(1);
});
