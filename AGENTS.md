# Development Rules

- Keep this repository focused on the top-level `pi-viewer` launcher.
- `pi/` is a submodule of `possibilities/pi`, pinned to its public `pi-viewer` branch.
- Never edit Pi from a detached submodule HEAD. Switch to `pi-viewer`, merge `upstream/main`, test, and push `origin/pi-viewer` before committing the outer pointer.
- Do not rebase or force-push the public `pi-viewer` branch.
- Install dependencies with `npm ci --ignore-scripts --prefix pi`.
- Run `bun run bin/pi-viewer.ts --help` after launcher changes.
