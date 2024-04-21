# json-module-generator

json-module-generator is an npm package that generates TypeScript modules from a JSON file. It provides a simple command-line interface to convert JSON data into a structured TypeScript codebase.

## Installation

### Global Installation

You can install json-module-generator globally using npm or yarn:

```bash
npm install -g json-module-generator
```

or

```bash
yarn global add json-module-generator
```

### Local Installation

You can also install json-module-generator locally within your project using npm or yarn:

```bash
npm install --save-dev json-module-generator
```

or

```bash
yarn add --dev json-module-generator
```

## Usage

### Global Usage

If you have installed json-module-generator globally, you can use the following command:

```bash
json-module-generator --json <path/to/json/file> [--output <output/directory>]
```

### Local Usage

If you have installed json-module-generator locally within your project, you can use npx to run the command:

```bash
npx json-module-generator --json <path/to/json/file> [--output <output/directory>]
```

Alternatively, you can add a script to your `package.json` file:

```json
{
  "scripts": {
    "generate-modules": "json-module-generator --json <path/to/json/file> [--output <output/directory>]"
  }
}
```

Then, you can run the script using:

```bash
npm run generate-modules
```

or

```bash
yarn generate-modules
```

### Options

- `--json, -j` (required): Specifies the path to the input JSON file.
- `--output, -o` (optional): Specifies the output directory for the generated TypeScript modules. If not provided, the default output directory is `./output-modules`.

### JSON File Requirements

json-module-generator expects a specific structure for the input JSON file. The JSON file should have a hierarchical structure where the leaf nodes are objects with string values. Here's an example of a supported JSON structure:

```json
{
  "Primitive": {
    "Red": {
      "50": "#ffebee",
      "500": "#f44336",
      "900": "#b71c1c"
    },
    "Green": {
      "50": "#e8f5e9",
      "500": "#4caf50",
      "900": "#1b5e20"
    }
  },
  "Other": {
    "White": "#ffffff",
    "Black": "#000000"
  }
}
```

Please ensure that your input JSON file adheres to this structure for the package to generate the TypeScript modules correctly.

### Example

Suppose you have a JSON file named `colors.json` with the following content:

```json
{
  "Primitive": {
    "Red": {
      "50": "#ffebee",
      "500": "#f44336",
      "900": "#b71c1c"
    },
    "Green": {
      "50": "#e8f5e9",
      "500": "#4caf50",
      "900": "#1b5e20"
    }
  },
  "Other": {
    "White": "#ffffff",
    "Black": "#000000"
  }
}
```

To generate TypeScript modules from this JSON file, run the following command:

```bash
json-module-generator --json colors.json --output src/colors
```

This command will generate TypeScript modules in the `src/colors` directory based on the structure of the JSON data. The generated modules will have the following structure:

```
src/colors
├── Primitive
│   └── index.ts
├── Other.ts
└── index.ts
```

The content of the generated files will be:

```tsx
// ./src/colors/Primitive/index.ts
export const Red = {
  50: "#ffebee",
  500: "#f44336",
  900: "#b71c1c",
};
export const Green = {
  50: "#e8f5e9",
  500: "#4caf50",
  900: "#1b5e20",
};

// ./src/colors/Other.ts
export const data = {
  White: "#ffffff",
  Black: "#000000",
};

export const { White, Black } = data;

// ./src/colors/index.ts
export * as Primitive from "./Primitive";
export * as Other from "./Other";
```

You can then import and use the generated modules in your TypeScript project:

```tsx
import { Primitive, Other } from "./colors";
console.log(Primitive.Green[50]);
console.log(Other.White);

import { Red, Green } from "./colors/Primitive";
console.log(Red[500]);
console.log(Green[900]);

import { White, Black } from "./colors/Other";
console.log(White);
console.log(Black);
```

## License

This package is licensed under the MIT License.
