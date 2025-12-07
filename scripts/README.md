# Component Management Scripts

This directory contains scripts to help manage modular content components in the Dato + Astro project.

## Scripts

### 1. Create New Component (`new-component.js`)

Creates a new component structure with empty files.

```bash
npm run new-component <ComponentName>
```

**What it does:**

- Creates a new folder in `src/components/dato/<ComponentName>/`
- Creates three empty files: `ComponentName.astro`, `ComponentName.css`, `ComponentName.query.js`
- Validates component naming (must start with uppercase)
- Prevents overwriting existing components

### 2. Add Component to Modular Content (`add-component.js`)

Integrates an existing component into the modular content system.

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
3. **Updates ModularContent.query.js** - Adds the import and query fragment for the new component
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

## Typical Workflow

1. **Create a new component:**

   ```bash
   npm run new-component MyNewComponent
   ```

2. **Add content to the component files:**
   - Edit `MyNewComponent.astro` - Add your Astro component markup
   - Edit `MyNewComponent.css` - Add component styles
   - Edit `MyNewComponent.query.js` - Add GraphQL query with exported constant

3. **Integrate into modular content:**
   ```bash
   npm run add-component MyNewComponent
   ```

## Error Handling

### new-component script:

- ❌ Component name validation (must start with uppercase)
- ❌ Prevents overwriting existing components
- ✅ Creates complete folder structure

### add-component script:

- ❌ Component directory doesn't exist
- ❌ Missing required files (with helpful error messages)
- ❌ Query constant not found in the .query.js file
- ✅ Prevents duplicate imports/additions
- ✅ Handles existing integrations gracefully
