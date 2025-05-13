import fs from "fs";
import path from "path";

interface GetRegistrationFilesParams {
  dir: string;
  suffix?: string;
}
export function getRegistrationFiles({
  dir,
  suffix = "widgets",
}: GetRegistrationFilesParams): string[] {
  const results: string[] = [];
  const list = fs.readdirSync(dir);
  // RegExp to test if the filename ends with .{suffix}.(ts|tsx|js|jsx)
  const pattern = new RegExp(`\\.${suffix}\\.(ts|tsx|js|jsx)$`);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results.push(...getRegistrationFiles({ suffix, dir: filePath }));
    } else {
      if (pattern.test(file)) {
        results.push(filePath);
      }
    }
  }
  return results;
}

export function generateManifestContent(files: string[]): string {
  const importStatements = files.map((file) => {
    // Convert the absolute file path to a relative path from process.cwd()
    const here = "./";
    const relativePath =
      here + path.relative(process.cwd(), file).replace(/\\/g, "/");
    return `import '${relativePath}';`;
  });
  return importStatements.join("\n");
}
