#!/usr/bin/env node

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import readline from "readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

async function promptAddToModularContent(componentName) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      "\n❓ Do you want to add this component to modular content? (y/N): ",
      async (answer) => {
        rl.close();

        if (answer.toLowerCase() === "y" || answer.toLowerCase() === "yes") {
          console.log(`\n🔄 Adding ${componentName} to modular content...`);

          try {
            // Run the add-component script
            const addComponentProcess = spawn(
              "npm",
              ["run", "add-component", componentName],
              {
                stdio: "inherit",
                cwd: projectRoot,
              }
            );

            addComponentProcess.on("close", (code) => {
              if (code === 0) {
                console.log(
                  `\n✅ ${componentName} has been successfully added to modular content!`
                );
              } else {
                console.log(
                  `\n❌ Failed to add ${componentName} to modular content. You can run 'npm run add-component ${componentName}' manually.`
                );
              }
              resolve();
            });

            addComponentProcess.on("error", (error) => {
              console.error(`❌ Error running add-component: ${error.message}`);
              console.log(
                `💡 You can run 'npm run add-component ${componentName}' manually.`
              );
              resolve();
            });
          } catch (error) {
            console.error(`❌ Error: ${error.message}`);
            console.log(
              `💡 You can run 'npm run add-component ${componentName}' manually.`
            );
            resolve();
          }
        } else {
          console.log(
            `\n💡 You can add ${componentName} to modular content later by running:`
          );
          console.log(`   npm run add-component ${componentName}`);
          resolve();
        }
      }
    );
  });
}

async function createNewComponent(componentName) {
  if (!componentName) {
    console.error("❌ Error: Please provide a component name");
    console.log("Usage: npm run new-component <ComponentName>");
    process.exit(1);
  }

  // Validate component name (should start with uppercase)
  if (!/^[A-Z][a-zA-Z0-9]*$/.test(componentName)) {
    console.error(
      "❌ Error: Component name must start with uppercase letter and contain only alphanumeric characters"
    );
    console.log("Example: MyComponent, ImageBlock, FactList");
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
    // Check if component directory already exists
    await fs.access(componentPath);
    console.error(
      `❌ Error: Component ${componentName} already exists in src/components/dato/`
    );
    process.exit(1);
  } catch (error) {
    // Directory doesn't exist, which is what we want
  }

  // Create the component directory
  try {
    await fs.mkdir(componentPath, { recursive: true });
    console.log(`✅ Created directory: src/components/dato/${componentName}/`);
  } catch (error) {
    console.error(`❌ Error: Could not create directory ${componentName}`);
    console.error(error.message);
    process.exit(1);
  }

  // Generate content for each file
  const kebabCaseName = componentName
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase();

  const constantName =
    componentName.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase() + "_QUERY";

  // Define the files to create
  const filesToCreate = [
    {
      name: `${componentName}.astro`,
      content: `---
const { block } = Astro.props;
---

<h2>This is ${componentName}</h2>

<style>
@import './${componentName}.css';
</style>`,
      description: "Astro component file",
    },
    {
      name: `${componentName}.css`,
      content: `.${kebabCaseName} {
  /* Styles for ${kebabCaseName} */
}`,
      description: "CSS styles file",
    },
    {
      name: `${componentName}.query.js`,
      content: `export const ${constantName} = \`
  id
  _modelApiKey
  __typename
\`;`,
      description: "GraphQL query file",
    },
  ];

  // Create each file
  for (const file of filesToCreate) {
    const filePath = path.join(componentPath, file.name);

    try {
      await fs.writeFile(filePath, file.content, "utf-8");
      console.log(`✅ Created ${file.description}: ${file.name}`);
    } catch (error) {
      console.error(`❌ Error: Could not create file ${file.name}`);
      console.error(error.message);
      process.exit(1);
    }
  }

  console.log(`\n🎉 Successfully created ${componentName} component!`);
  console.log(`\nComponent location: src/components/dato/${componentName}/`);

  // Ask if user wants to add to modular content
  await promptAddToModularContent(componentName);
}

// Get component name from command line arguments
const componentName = process.argv[2];

// Run the script
createNewComponent(componentName).catch((error) => {
  console.error("❌ Unexpected error:", error.message);
  process.exit(1);
});
