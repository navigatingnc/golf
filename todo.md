# Golf AI – TODO

## Core Objectives
- Build a modular, reliable golf-focused AI system that delivers insights, recommendations, and automation for players, coaches, and content workflows.
- Keep the system observable, versioned, and easy to extend.

## MVP
- [ ] Define supported data sources
  - Scorecards
  - Shot tracking (manual, CSV, API)
  - Weather data
  - Course metadata
- [ ] Normalize inputs into a standard schema
- [ ] Generate post-round summaries
- [ ] Baseline analytics
  - Handicap trends
  - Fairways / GIR / Putts
  - Miss patterns
- [ ] Simple interface (CLI or minimal UI)

## Automation
- [ ] Scheduled data ingestion
- [ ] Automatic post-round insight generation
- [ ] Weekly performance summaries
- [ ] Alerts for anomalies
  - Sudden score spikes
  - Regressing strengths

## Quality & Reliability
- [ ] Deterministic prompts for repeatability
- [ ] Logging and error handling
- [ ] Versioned outputs
- [ ] Data validation

## Stretch Goals
- [ ] Swing video analysis
- [ ] Hole-by-hole course strategy
- [ ] Club selection recommendations
- [ ] Shareable visual insights
- [ ] Coach / player comparison modes
