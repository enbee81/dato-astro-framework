# Add Component Script

This script automates the process of adding a new modular content component to the Dato + Astro project.

## Usage

```bash
npm run add-component <ComponentName>
```

## Requirements

The component folder must exist in `src/components/dato/<ComponentName>/` and contain these three files:

1. `<ComponentName>.astro` - The Astro component file
2. `<ComponentName>.css` - The CSS styles for the component
3. `<ComponentName>.query.js` - The GraphQL query file that exports a `<COMPONENT_NAME>_QUERY` constant

## What the script does

1. **Validates the component structure** - Checks that all required files exist
2. **Uses the component's query file** - Imports the query from the component's own folder
3. **Updates modularContent.js** - Adds the import and query fragment for the new component
4. **Updates ModularContent.astro** - Adds the import and switch case for the new component

## Example

If you have a component called `ImageBlock`:

```bash
npm run add-component ImageBlock
```

The script will:

- Look for `src/components/dato/ImageBlock/ImageBlock.astro`
- Look for `src/components/dato/ImageBlock/ImageBlock.css`
- Look for `src/components/dato/ImageBlock/ImageBlock.query.js` with `IMAGE_BLOCK_QUERY` export
- Add the necessary imports and code to integrate it into the modular content system

## Error Handling

- ❌ Component directory doesn't exist
- ❌ Missing required files (with helpful error messages)
- ❌ Query constant not found in the .query.js file
- ✅ Prevents duplicate imports/additions
- ✅ Handles existing integrations gracefully
