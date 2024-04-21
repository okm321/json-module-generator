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

### Example

(The example usage remains the same as in the previous response.)

## License

This package is licensed under the MIT License.

---

By providing both global and local installation options, users can choose the method that best fits their project setup and requirements. Local installation is often preferred when you want to include json-module-generator as a development dependency for a specific project.
