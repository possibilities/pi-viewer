#!/usr/bin/env bun
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const piRoot = resolve(repositoryRoot, "pi");
const entrypoint = resolve(piRoot, "packages/coding-agent/src/bun/cli.ts");

if (!existsSync(entrypoint)) {
	process.stderr.write("Pi is not initialized. Run: git submodule update --init\n");
	process.exit(1);
}
if (!existsSync(resolve(piRoot, "node_modules"))) {
	process.stderr.write("Pi dependencies are not installed. Run: npm run setup\n");
	process.exit(1);
}

const child = Bun.spawn([process.execPath, "run", entrypoint, ...process.argv.slice(2)], {
	cwd: piRoot,
	env: { ...process.env, PI_VIEWER_COMMAND: "pi-viewer" },
	stdin: "inherit",
	stdout: "inherit",
	stderr: "inherit",
});

process.exitCode = await child.exited;
