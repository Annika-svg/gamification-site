// Make the official npm-distributed engine available to the vendored launcher.
import { createRequire } from 'node:module';
import { mkdir, copyFile, chmod } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const target = `${process.platform}-${process.arch}`;
const executable = process.platform === 'win32' ? 'impeccable.exe' : 'impeccable';
const platform = process.platform === 'win32' ? `windows-${process.arch}` : target;
const source = require.resolve(`@impeccable/cli-${platform}/bin/${executable}`);
const destination = join(root, '.cursor/skills/impeccable/scripts/bin', platform, executable);
await mkdir(dirname(destination), { recursive: true });
await copyFile(source, destination);
if (process.platform !== 'win32') await chmod(destination, 0o755);
console.log(`Impeccable engine prepared for ${platform}.`);
