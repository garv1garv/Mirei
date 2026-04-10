<div align="center">

# MIREI — DSA Mastery Platform

**A premium, all-in-one Data Structures & Algorithms platform for cracking FAANG interviews.**

[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Gemini](https://img.shields.io/badge/Gemini_AI-Powered-4285F4?logo=google&logoColor=white)](https://ai.google.dev)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[Live Demo](#) | [Report Bug](../../issues) | [Request Feature](../../issues)

---

</div>

## What is MIREI?

MIREI is a **beautifully crafted, dark-themed DSA learning platform** that combines a structured A2Z curriculum with an AI-powered tutor, visual roadmap, and integrated code editor — all in a single React app.

Built for engineers preparing for technical interviews at Google, Amazon, Meta, Microsoft, and other top tech companies.

<br>

## Features

### Visual Roadmap (NeetCode-Inspired)
- **Interactive DAG layout** — 17 topic nodes connected by SVG arrows showing prerequisites
- **Progress rings** on each node with real-time completion tracking
- **Click-to-expand drawers** revealing problems grouped by sub-section
- Color-coded states: in-progress (blue), complete (green)

### AI Tutor (ChatGPT-Style Interface)
- **Premium prompt input box** with pill-shaped design, auto-resize textarea
- **3 AI modes**: Search, Think, Canvas — each adjusts the system prompt
- **Image upload** — paste or drag screenshots for code review
- **Voice recording UI** with animated visualizer bars
- **Markdown rendering** — bold, inline code, headings, bullet points
- **6 quick-action cards** — one-click prompts for DP patterns, tree quizzes, study plans
- Powered by **Google Gemini 1.5 Flash** API

### A2Z Curriculum — 500+ Problems
- **17 structured chapters** from Basics to DP to Tries & Math
- Every problem mapped to verified **LeetCode** and **GeeksForGeeks** URLs
- Sub-sections (Easy/Medium/Hard, Lectures) for granular navigation
- Difficulty badges, bookmarks, and personal notes

### Integrated Code Editor
- **Multi-language support** — Python, JavaScript, Java, C++
- **Pyodide-powered** in-browser Python execution
- Starter code templates and test case validation
- LeetCode-style problem view with description, hints, and editorial

### Dashboard & Analytics
- GitHub-style **contribution heatmap**
- Streak tracking (current + longest)
- Difficulty breakdown (Easy/Medium/Hard solve counts)
- Recent activity feed

### Additional Tools
| Tool | Description |
|---|---|
| **Company Prep** | Filter problems by company (Google, Amazon, Meta, etc.) |
| **Prep Planner** | Weekly/monthly study schedule builder |
| **Cheatsheet** | Quick-reference for all major DSA patterns |
| **Pattern Finder** | Type a keyword, get the optimal algorithm pattern |
| **Skill Builder** | Topic-wise skill assessment and gap analysis |

<br>

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 + Vite 6.4 |
| **Styling** | Vanilla CSS (dark theme, 1600+ lines) |
| **AI** | Google Gemini 1.5 Flash API |
| **Code Execution** | Pyodide (WASM Python), Piston API |
| **State** | localStorage persistence |
| **Icons** | Inline SVGs (zero dependencies) |
| **Build** | ~450KB JS, ~33KB CSS (gzipped: ~128KB + ~7KB) |

> **Zero heavy dependencies.** No Tailwind, no component libraries, no state management frameworks. Pure React + CSS.

<br>

## Quick Start

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/mirei-dsa.git
cd mirei-dsa

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### API Key Setup

1. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)
2. Click the Settings icon in the sidebar
3. Paste your API key and click Save

<br>

## Project Structure

```
src/
├── App.jsx              # All views & components (~2300 lines)
├── index.css            # Complete design system (~1650 lines)
├── data/
│   ├── chapters.js      # 17 chapters with sub-sections
│   └── questions.js     # 500+ problems with metadata & URLs
└── utils/
    ├── gemini.js         # Gemini API wrapper
    ├── codeRunner.js     # Pyodide + Piston execution
    └── storage.js        # localStorage persistence
```

<br>

## Screenshots

> Add screenshots here

| Dashboard | Roadmap | AI Tutor |
|---|---|---|
| ![Dashboard](#) | ![Roadmap](#) | ![AI Tutor](#) |

<br>

## Roadmap

- [ ] User authentication & cloud sync
- [ ] Contest timer & mock interview mode
- [ ] Community solutions & discussions
- [ ] Mobile responsive PWA
- [ ] Spaced repetition problem scheduler
- [ ] Video editorial integration

<br>

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

<br>

## Acknowledgments

- [Striver's A2Z DSA Sheet](https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2/) — Curriculum structure inspiration
- [NeetCode Roadmap](https://neetcode.io/roadmap) — Visual roadmap design inspiration
- [Google Gemini](https://ai.google.dev) — AI tutor backbone
- [Pyodide](https://pyodide.org) — In-browser Python execution

---

<div align="center">

**Built for the DSA grind.**

Star this repo if it helps your prep.

</div>
