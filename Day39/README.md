# PDF Splitter & Merger

**Day 39 — 60 Days Claude AI Challenge**

A premium, single-file HTML app for splitting and merging PDFs — entirely in the browser. No uploads, no backend, works offline after first load.

## Features

**Splitter**
- Auto-detects page count and renders live thumbnails for every page
- Four split modes: custom ranges, split-after-page, every N pages, extract selected pages
- Multiple ranges in one operation, with inline validation
- Preview of resulting files before processing

**Merger**
- Drag-and-drop or multi-file upload
- Sortable file list with per-file thumbnails and page counts
- Drag-to-reorder before merging
- Live stats: total files, total pages, estimated size

## Tech

- Vanilla HTML / CSS / JS — no build step, no framework
- [pdf-lib](https://github.com/Hopding/pdf-lib) for splitting/merging
- [pdf.js](https://github.com/mozilla/pdf.js) for page rendering
- All processing happens client-side; files never leave the device

## Usage

Open `pdf-splitter-merger.html` in any modern browser. That's it.

## Design

A "print shop / drafting table" aesthetic — dashed cut-lines, precision-red accents, Fraunces + Space Grotesk + JetBrains Mono typography — built around the metaphor of cutting and binding paper.

---
Built as part of the [60 Days Claude AI Challenge](https://www.linkedin.com/) with Claude.