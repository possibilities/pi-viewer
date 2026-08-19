# pi-viewer

`pi-viewer` is a chromeless, read-only terminal viewer for live [Pi](https://github.com/earendil-works/pi) sessions. It displays only the active conversation and follows new entries as Pi persists them.

The viewer implementation lives on the [`pi-viewer`](https://github.com/possibilities/pi/tree/pi-viewer) branch of the public Pi fork. This repository provides the top-level `pi-viewer` command and pins a tested Pi revision through the `pi/` submodule.

## Install from source

Requires Bun 1.3 or newer and Node.js 24 with npm.

```bash
git clone --recurse-submodules https://github.com/possibilities/pi-viewer.git
cd pi-viewer
npm run setup
bun link
```

Run it with a session ID, unique ID prefix, or JSONL path:

```bash
pi-viewer <session-id>
pi-viewer ~/.pi/agent/sessions/<project>/<session>.jsonl
```

Use `pi-viewer --help` for navigation and options.

## Updating Pi

The submodule's `origin` is the public fork. Add the canonical repository as `upstream` once:

```bash
git -C pi remote add upstream https://github.com/earendil-works/pi.git
```

Then update the maintained viewer branch without rewriting its public history:

```bash
cd pi
git switch pi-viewer
git pull --ff-only origin pi-viewer
git fetch upstream
git merge upstream/main
npm ci --ignore-scripts
npm run check
cd packages/coding-agent
node "$(git rev-parse --show-toplevel)/node_modules/vitest/dist/cli.js" \
  --run test/session-viewer.test.ts test/keybindings-migration.test.ts
cd ../../..
git push origin pi-viewer

git add pi
git commit -m "chore: update Pi viewer core"
git push
```

The outer repository pins an exact Pi commit. Consumers do not move to a newer fork revision until that submodule pointer is reviewed and committed here.

## Live-update boundary

The viewer follows session JSONL changes at 100 ms intervals. Pi persists complete messages rather than token deltas, so in-progress model text appears when its message is written.
