# ProcureSaathi - Progress & Change Tracker

This document maintains an accurate, chronological record of all architectural decisions, implementations, feature completions, and milestones for **ProcureSaathi**.

---

## 📌 Project Milestones Status

| Milestone | Description | Status |
| :--- | :--- | :--- |
| **M1: Foundation & Git Setup** | Repository initialization, .gitignore, .env.example, Context documentation | ✅ Complete |
| **M2: Architecture & Documentation** | `PROJECT_CONTEXT.md` for LLM continuity, `PROGRESS.md` changelog | ✅ Complete |
| **M3: Backend Data Models & Core** | FastAPI schemas for Requests, Offers, Cost Breakdowns, and Telemetry | ✅ Complete |
| **M4: TinyFish Web Agent Service** | Search (`api.search.tinyfish.ai`) & Fetch (`api.fetch.tinyfish.ai`) integration + simulator fallback | ✅ Complete |
| **M5: AI Landed Cost & Scoring Engine**| GST, shipping freight, MOQ validation, transparent reasoning generator | ✅ Complete |
| **M6: WhatsApp / Email RFQ Generator**| Direct supplier outreach link and quote message generator | ✅ Complete |
| **M7: Frontend Modern Dashboard** | Vite + React + Vanilla CSS design system, rich micro-animations | ✅ Complete |
| **M8: Live Agent Telemetry Visualizer**| Step-by-step display of web agent scraping & calculation progress | ✅ Complete |
| **M9: Comparison Matrix & Cost Modal**| Ranked cards, evidence drawer, interactive quantity recalculation | ✅ Complete |
| **M10: End-to-End Verification** | Real testing with restaurant packaging case study (5,000 containers) | ✅ Complete |
| **M11: Monochrome Minimalist UI & Story Movie** | Studio-grade minimalist monochrome aesthetic, 2D stick-figure movie, 3D rotary dial, resale simulator | ✅ Complete |
| **M12: Netlify Deployment & Layout Refinements** | Spacious card footers, distinct compliance pills, NLP parameter HUD, client simulation fallback for static hosts | ✅ Complete |

---

## 📝 Change Log

### [v1.1.0] - 2026-10-20
#### Added
- **Monochrome Minimalist Design System**:
  - Re-architected typography and styling to an executive monochrome aesthetic using Inter and Plus Jakarta Sans.
  - Eliminated harsh borders, dark clutter, and color overload in favor of clean high-contrast black/white ink palettes, micro-borders, and tactile interaction feedback.
- **Interactive 2D Minimalist Stick-Figure Story Movie (`StickFigureStoryMovie.jsx`)**:
  - Built an animated visual narrative illustrating the plight of cloud kitchen and restaurant owners battling hidden GST surcharges, fake low-unit pricing traps, and delivery delays.
  - Features real-time SVG vector rendering, dynamic stage transitions, audio-free visual pacing, scrubbable playback controls, and 1-click skip-to-solution actions.
- **3D Rotary Dial Showcase (`ComparisonMatrix.jsx`)**:
  - Implemented interactive 3D circular rotary dial displaying candidate supplier proposals in a smooth cylindrical carousel.
  - Full touch/click rotation controls, unclipped container boundaries, dynamic perspective depth scaling, and direct card selection.
- **Retail Margin & Resale Profit Simulator**:
  - Integrated direct margin calculation tool inside the supplier comparison matrix.
  - Allows merchants and restaurant owners to input target consumer selling prices, computing real-time unit margins, total gross profits, break-even unit volumes, and profit multipliers across each supplier's true landed cost.
- **Interactive 3D Parcel Visualizer (`Hero3DParcel.jsx`)**:
  - Implemented an isometric 3D delivery parcel animation in the hero banner showcasing verified consignment status and real-time logistics readiness.
- **B2B Counter-Offer Negotiation Generator (`NegotiationModal.jsx`)**:
  - Built automated strategic counter-offer drafter with custom concession levers (payment within 48h, non-urgent delivery window, recurring order commitment).
  - Generates polished B2B negotiation copy ready for 1-click WhatsApp dispatch.
- **Exploratory Modals & Architectural Hardening**:
  - Added `HowItWorksModal.jsx` providing intuitive 4-step workflow guidance.
  - Upgraded `RequirementForm.jsx` with instant intent extraction across product category, target quantity, budget ceiling, and delivery lead times.
- **Layout Spacing, Card Refinements & Static Deployment Readiness**:
  - Re-architected rotary supplier cards with dedicated `.card-footer-actions` preventing button clipping and adding generous bottom padding.
  - Fixed compliance tags (`.compliance-tags-row` and `.comp-pill`) ensuring delivery lead times and MOQ specifications are separated into distinct badges.
  - Styled real-time entity recognition HUD (`.nlp-entities-preview` and `.nlp-entity-tag`) displaying extracted procurement constraints as interactive pills.
  - Balanced product tile photo height (185px) and expanded 3D rotary stage height (1020px) for unclipped card rotation.
  - Integrated client-side autonomous intelligence fallback into `frontend/src/services/api.js` and `clientSimulation.js` enabling full static deployments (Netlify, Vercel) with zero 404 errors when backend is offline.

### [v1.0.0] - 2026-10-17
#### Added
- **Backend FastAPI Engine**:
  - Implemented async endpoints: `/api/procure/search`, `/api/procure/parse-query`, `/api/procure/recalculate`, `/api/health`, `/api/suppliers/catalog`.
  - Created Pydantic models for `ProcurementRequest`, `SupplierOffer`, `CostBreakdown`, `TieredPrice`, and `AgentLogStep`.
  - Built `TinyFishService`: Native integration with TinyFish Search (`api.search.tinyfish.ai`) and Fetch (`api.fetch.tinyfish.ai`) using `X-API-Key`, plus zero-downtime high-fidelity simulation fallback.
  - Built `CostEngine`: Formulates true total landed cost factoring GST (12% vs 18%), bulk freight waivers, and transit handling; calculates 5-factor composite score (0-100) and flags deceptive MOQ traps.
  - Built `NLPParser`: Automatically parses freeform user prompts into quantity, budget, lead time, and product categories.
  - Built `RFQService`: Formulates ready-to-dispatch WhatsApp click-to-chat links (`wa.me/?text=...`) and formatted email inquiry drafts.
  - Built automated unit & integration test suite (`tests/test_procure.py`) with 5/5 passing pytest assertions.

- **Frontend React (Vite) Web Application**:
  - Built modern design system in `frontend/src/index.css` featuring deep executive slate & trust emerald aesthetic, glassmorphic cards, and micro-animations.
  - Built `Header.jsx`: Animated TinyFish agent connection status and configuration launcher.
  - Built `RequirementForm.jsx`: Prompt textarea with quick-scenario chips and expandable parameter customization.
  - Built `AgentTelemetry.jsx`: Live radar-pulsed stepper tracking agent research, scraping, and cost normalization.
  - Built `ComparisonMatrix.jsx`: Economic metrics banner, interactive bulk quantity recalculation slider, ranked recommendation cards with badges (#1 Best Overall Value, Lowest Landed Cost, etc.), and side-by-side verification table.
  - Built `CostBreakdownModal.jsx`: Itemized cost waterfall inspection with extracted live evidence citations.
  - Built `RFQModal.jsx`: 1-click supplier RFQ dispatch with copy-to-clipboard and direct WhatsApp launch.
  - Built `SettingsModal.jsx`: Custom TinyFish API Key entry with local storage persistence.
  - Configured Vite reverse proxy to seamlessly bridge frontend requests to the FastAPI backend.

- **Developer Experience & Tooling**:
  - Created `run_dev.bat` and `run_dev.ps1` for 1-click local development launching both services simultaneously.
  - Created `README.md` with full project pitch, problem statement, workflow diagrams, and setup instructions.
  - Removed `.env.example` from version control and updated `.gitignore` to prevent tracking any environment template files.

### [v0.1.0] - 2026-10-17
#### Initialized
- Initialized Git repository in `d:/PROJECTS/ProcureSaathi`.
- Created `.gitignore` ignoring node modules, python cache, virtualenvs, local env files, and build outputs.
- Created `.env.example` defining variables for TinyFish API key, search/fetch endpoints, and backend/frontend ports.
- Created `PROJECT_CONTEXT.md` - Comprehensive master guide for other LLMs and developers to understand the full system context, domain model, cost formulas, and extension points.
- Created `PROGRESS.md` - Change tracker and milestone board.
