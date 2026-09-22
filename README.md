# Ainga Data Labs — Frontend

**The public-facing web platform for Ainga Data Labs (ADL).**

Ainga Data Labs builds data systems that turn fragmented information into **structured, decision-ready intelligence**.

This repository contains the frontend experience through which ADL presents its data engineering capabilities, intelligence products, API systems, technical methodology, selected case studies, and the systems being developed behind them.

The frontend is treated as a **product surface**, not simply a company brochure. It communicates what ADL builds, how those systems work, what they produce, and how users can engage with them.

---

## Table of Contents

* [Overview](#overview)
* [Core Experience](#core-experience)
* [System Philosophy](#system-philosophy)
* [Architecture](#architecture)
* [Repository Structure](#repository-structure)
* [Technology Foundation](#technology-foundation)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Environment Variables](#environment-variables)
* [Development](#development)
* [Available Commands](#available-commands)
* [Production Build](#production-build)
* [Production Deployment](#production-deployment)
* [SPA Routing](#spa-routing)
* [Production Verification](#production-verification)
* [Dependencies & Reproducibility](#dependencies--reproducibility)
* [Security Boundaries](#security-boundaries)
* [Engineering Boundaries](#engineering-boundaries)
* [Current State](#current-state)
* [Roadmap](#roadmap)
* [Engineering Standards](#engineering-standards)
* [Troubleshooting](#troubleshooting)
* [Contributing](#contributing)
* [Contact](#contact)

---

# Overview

Modern organizations generate and consume large volumes of fragmented information across websites, APIs, databases, operational systems, and external data sources.

The difficult part is rarely collecting one more dataset.

The difficult part is building reliable systems that can:

```text
ingest → structure → enrich → analyze → serve → act
```

ADL's broader engineering work is centered around that lifecycle.

The frontend provides the public interface for communicating this approach and acts as the presentation layer for ADL's growing ecosystem of:

* Data engineering systems
* Data intelligence products
* API-driven services
* Automated data pipelines
* Market and competitive intelligence
* Analytics and decision-support systems
* Technical case studies
* Experimental and production-oriented engineering work

The website is designed to communicate not only **what ADL builds**, but also **how the systems work, what decisions they enable, and why the underlying data infrastructure matters**.

---

# Core Experience

## 1. ADL Landing Experience

The primary landing experience introduces ADL as a data engineering and intelligence organization.

It communicates:

* ADL's purpose
* Core capabilities
* Engineering methodology
* Selected systems and projects
* Data intelligence use cases
* Case studies
* API and product surfaces
* Contact and engagement pathways

The experience is structured around a progression from:

```text
What ADL does
      ↓
How ADL approaches data
      ↓
What systems ADL builds
      ↓
What those systems produce
      ↓
What decisions the intelligence can support
      ↓
How to engage with ADL
```

---

## 2. Data Pipeline Visualization

The website includes an interactive representation of the data lifecycle:

```text
SOURCE
   ↓
INGEST
   ↓
TRANSFORM
   ↓
ENRICH
   ↓
ANALYZE
   ↓
SERVE
   ↓
DECISION
```

The visualization demonstrates the architectural thinking behind ADL systems: raw information becomes progressively more structured, contextualized, and useful until it can support an operational or business decision.

---

## 3. API Playground

The frontend includes an API playground designed to demonstrate how structured intelligence can be exposed through machine-readable interfaces.

The interface can demonstrate concepts such as:

* Market intelligence
* Company fundamentals
* Structured records
* Normalized data
* API consumption
* Intelligence delivery

### Current API status

The repository's API playground must accurately reflect the state of the underlying services.

Where the interface uses representative responses, those responses are **demonstration data** and must not be represented as production API connectivity.

As production APIs become available, the frontend can replace representative responses with controlled API integrations without requiring the presentation architecture to be redesigned.

> **Important:** API credentials, private service credentials, database credentials, and other secrets must never be embedded in frontend source code or exposed through client-side environment variables.

---

## 4. Capability Layer

The website presents ADL's capabilities through outcomes rather than a list of technologies.

### Data Engineering

Designing and implementing systems for collecting, processing, validating, transforming, and delivering data.

### Data Intelligence

Turning structured datasets into signals, metrics, insights, and decision-support products.

### Backend & API Systems

Building services and interfaces that allow processed intelligence to be consumed by applications, dashboards, and other systems.

### Automation

Reducing repetitive operational work through scheduled pipelines, event-driven workflows, integrations, and automated processing.

### Data Products

Packaging reliable datasets and intelligence into interfaces that answer specific business questions.

---

# From Data to Decisions

ADL's product philosophy is centered around the idea that a dataset becomes significantly more valuable when it can answer a concrete question.

Rather than stopping at:

```text
"We collected the data."
```

ADL systems are designed to progress toward:

```text
"What does the data tell us?"
```

and ultimately:

```text
"What decision can this intelligence support?"
```

This distinction influences how ADL approaches pipeline architecture, enrichment, analytics, APIs, dashboards, and data products.

---

# System Philosophy

## 1. Data First

Reliable intelligence begins with reliable source data.

Systems should account for:

* Collection
* Validation
* Normalization
* Provenance
* Data quality

before analytical output is produced.

## 2. Layered Architecture

Data processing should be separated into logical stages rather than collapsing ingestion, transformation, enrichment, and analysis into one opaque process.

```text
External Sources
       │
       ▼
   Ingestion
       │
       ▼
    Raw Data
       │
       ▼
 Transformation
       │
       ▼
 Structured Data
       │
       ▼
   Enrichment
       │
       ▼
  Intelligence
       │
       ▼
APIs / Dashboards / Products
       │
       ▼
    Decisions
```

## 3. Separation of Concerns

Collection, processing, serving, and presentation should remain independently evolvable.

The frontend consumes interfaces and presents intelligence without becoming responsible for the underlying data pipeline.

## 4. Product Thinking

A pipeline is not automatically a product.

A useful data product should have:

* A clear consumer
* A defined problem
* A measurable decision or workflow it improves

## 5. Explainable Interfaces

Technical systems should not require users to understand the entire backend architecture before they can understand the output.

The frontend therefore translates technical infrastructure into understandable product experiences.

---

# Architecture

The frontend operates as the presentation layer within the wider ADL ecosystem.

```text
                    EXTERNAL DATA SOURCES
                             │
                             ▼
                       DATA PIPELINES
                             │
                   ┌─────────┴─────────┐
                   │                   │
                   ▼                   ▼
             TRANSFORMATION        ENRICHMENT
                   │                   │
                   └─────────┬─────────┘
                             ▼
                    INTELLIGENCE LAYER
                             │
                ┌────────────┼────────────┐
                │            │            │
                ▼            ▼            ▼
              APIs       Dashboards   Data Products
                │            │            │
                └────────────┼────────────┘
                             ▼
                        ADL FRONTEND
                             │
                             ▼
                         END USERS
```

The current repository is primarily concerned with the final presentation layer.

As underlying services evolve, the frontend can progressively replace representative interfaces with production API integrations without requiring the entire presentation architecture to be redesigned.

---

# Repository Structure

```text
ADL_frontend/
│
├── public/
│   └── Static assets and publicly served resources
│
├── src/
│   ├── assets/
│   │   └── Imported media and visual assets
│   │
│   ├── App.tsx
│   │   └── Main application experience
│   │
│   ├── main.tsx
│   │   └── Application entry point
│   │
│   ├── index.css
│   │   └── Global styles and design-system foundations
│   │
│   └── footer.css
│       └── Footer-specific presentation styles
│
├── index.html
│   └── Application HTML entry point
│
├── package.json
│   └── Project metadata, dependencies, and scripts
│
├── package-lock.json
│   └── Locked dependency tree for reproducible npm installs
│
└── vite.config.ts
    └── Vite configuration
```

The structure is intentionally lightweight at the current stage.

As the product surface expands, components and feature areas should be separated according to domain boundaries rather than introducing unnecessary abstraction prematurely.

---

# Technology Foundation

| Layer           | Technology     |
| --------------- | -------------- |
| UI              | React 19       |
| Language        | TypeScript     |
| Build Tool      | Vite           |
| Styling         | Tailwind CSS 4 |
| Code Quality    | ESLint         |
| Runtime         | Node.js 20+    |
| Package Manager | npm            |

Technology is deliberately kept secondary to the product architecture.

The stack provides the foundation for the experience; it is not the product itself.

---

# Prerequisites

Before working with the repository, install:

* Node.js 20 or newer
* npm
* Git

Verify the installed versions:

```bash
node --version
npm --version
git --version
```

The repository should be developed and built using a supported Node.js LTS release.

If the project later standardizes on an exact Node.js patch version, that version should be documented here and enforced through the repository/tooling.

---

# Installation

Clone the repository:

```bash
git clone https://github.com/aingadatalabs/ADL_frontend.git
```

Enter the project:

```bash
cd ADL_frontend
```

Install dependencies:

```bash
npm install
```

For CI and reproducible production-oriented installations, use:

```bash
npm ci
```

---

# Environment Variables

## Current state

The public frontend should not contain secrets.

If the current implementation does not require environment variables, no `.env` file is required for local development.

When production API integrations are introduced, environment-specific configuration should be documented here.

Example:

```env
VITE_API_BASE_URL=https://api.example.com
```

### Important security rule

Vite client-side environment variables are bundled into the frontend application.

Therefore:

> **Anything exposed through a `VITE_*` variable must be considered public.**

Never place the following in frontend environment variables:

* API secret keys
* Database credentials
* Private tokens
* Authentication secrets
* Service-account credentials
* Private backend credentials

Sensitive operations must be performed by trusted backend services.

---

# Development

Start the local development server:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

During development:

1. Run the application locally.
2. Verify the affected interface.
3. Run linting.
4. Run the production build.
5. Review the generated application before committing.

---

# Available Commands

| Command           | Purpose                                      |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the local development server           |
| `npm run build`   | Type-check and generate the production build |
| `npm run lint`    | Run ESLint                                   |
| `npm run preview` | Preview the production build locally         |

Run the production validation sequence with:

```bash
npm ci
npm run lint
npm run build
npm run preview
```

The exact scripts are defined by `package.json`, which is the source of truth for available npm commands.

---

# Production Build

Generate the production application:

```bash
npm run build
```

Vite generates the deployable static application in:

```text
dist/
```

The production artifact should be treated as the deployable output.

Do not deploy the development source tree as the production application when the hosting platform expects a static build artifact.

---

# Production Deployment

The ADL frontend is designed to operate as a modern static web application.

A production deployment must provide:

* HTTPS
* Custom-domain support
* Production environment configuration where required
* Automated build/deployment capability
* Appropriate caching
* Static asset optimization
* SPA routing support
* Error monitoring where available
* Secure API integration when backend services are introduced

## Recommended deployment pipeline

```text
Git push
   │
   ▼
Continuous Integration
   │
   ├── Install dependencies
   │       npm ci
   │
   ├── Lint
   │       npm run lint
   │
   └── Build
           npm run build
   │
   ▼
Production Deployment
   │
   ▼
Static Hosting / CDN
   │
   ▼
Custom Domain + HTTPS
   │
   ▼
Production Verification
```

The repository should not be considered production-ready merely because `npm run build` succeeds.

A successful production deployment must also be verified from the deployed environment.

---

# SPA Routing

The frontend is a client-side application.

Production hosting must therefore support the application's client-side routes.

For example:

```text
/
```

and future application routes such as:

```text
/api-demo
```

must be able to load correctly when accessed directly.

The hosting configuration must provide an appropriate SPA fallback so that direct navigation or browser refreshes do not incorrectly return a server-side `404`.

Whenever a new client-side route is introduced, verify:

1. Navigation from the application works.
2. Direct navigation to the route works.
3. Browser refresh works.
4. The route works in production.
5. Assets continue to resolve correctly.

---

# Production Verification

Every production deployment should be verified after release.

## Application

* Homepage loads successfully.
* Navigation works.
* Internal routes resolve.
* Direct route access works.
* Browser refresh works.
* No unexpected runtime errors occur.

## UI

* Desktop layout renders correctly.
* Mobile layout renders correctly.
* Responsive navigation works.
* Interactive components behave correctly.
* Images and static assets load correctly.

## API surfaces

Where API integration exists:

* Requests reach the intended production endpoint.
* Responses render correctly.
* Failed requests are handled appropriately.
* No credentials are exposed in browser source or network requests.
* Demonstration data is not presented as production data.

## Build integrity

Verify:

```bash
npm ci
npm run lint
npm run build
```

A deployment should not proceed when required validation steps fail.

## Browser verification

Inspect the production site for:

* Console errors
* Failed network requests
* Missing assets
* Incorrect routes
* Mixed-content warnings
* Unexpected redirects

---

# Dependencies & Reproducibility

The authoritative dependency definition is:

```text
package.json
```

The authoritative locked dependency tree is:

```text
package-lock.json
```

## Local development

Developers may use:

```bash
npm install
```

## CI / production-oriented installation

CI and deployment environments should use:

```bash
npm ci
```

This ensures the dependency tree is installed from the lockfile rather than being regenerated during deployment.

## Dependency changes

When adding, removing, or upgrading dependencies:

1. Update the dependency declaration.
2. Allow npm to update `package-lock.json`.
3. Run linting.
4. Run the production build.
5. Verify the affected application behavior.
6. Commit both dependency metadata and the lockfile.

Do not manually edit the lockfile.

## Dependency source of truth

Do not maintain a second manually maintained list of package versions in this README.

`package.json` and `package-lock.json` remain authoritative.

The README documents the **technology categories and operational dependency requirements**, while npm manifests define the exact installed packages.

---

# Security Boundaries

The frontend is a public client application.

Assume that all client-side code, assets, and exposed environment variables are observable by users.

## Never store secrets in:

* React source files
* `VITE_*` variables
* Public assets
* Git history
* Browser local storage unless explicitly appropriate for a non-sensitive value
* Client-side configuration files

## Backend responsibilities

Sensitive operations belong behind trusted backend services, including:

* Secret management
* Private API credentials
* Database access
* Authentication enforcement
* Authorization
* Sensitive business logic
* Protected data access

The frontend should only receive the minimum data required for the user-facing experience.

---

# Engineering Boundaries

## Frontend responsibility

The frontend is responsible for:

* Product presentation
* Information architecture
* Interactive experiences
* Visualizing system concepts
* API interface demonstrations
* Responsive user experience
* Public communication of ADL capabilities

## Backend responsibility

Production backend services are responsible for:

* Data ingestion
* Pipeline execution
* Transformation
* Enrichment
* Storage
* Intelligence generation
* API delivery
* Authentication and authorization
* Event processing
* Production monitoring
* Secret management

This separation allows the presentation layer and intelligence infrastructure to evolve independently.

---

# Current State

The repository represents the **public-facing ADL frontend experience**.

Implemented areas include:

* ADL landing experience
* Responsive navigation
* Capability and methodology sections
* Data pipeline visualization
* API playground interface
* Market and company intelligence examples
* Featured work and case-study presentation
* Responsive layout
* Accessible semantic page structure
* ADL contact and brand presentation

### API playground status

The API playground must be understood according to the actual state of the connected backend.

Where representative API responses are used, they are demonstrations rather than claims of production API connectivity.

As live ADL APIs become available, the playground can progressively transition toward controlled production-backed demonstrations.

---

# Roadmap

The frontend is being developed alongside the broader ADL ecosystem.

## Production API Integration

Replace representative API responses with authenticated production services as ADL APIs mature.

## Intelligence Dashboards

Introduce interactive dashboards for selected ADL intelligence products.

## Data Product Interfaces

Expose customer-specific datasets and intelligence through dedicated product surfaces.

## Live System Telemetry

Where appropriate, surface pipeline and system health information through controlled interfaces.

## Case Study Expansion

Document completed systems using a consistent structure:

```text
Problem
   ↓
Data Sources
   ↓
Architecture
   ↓
Processing
   ↓
Intelligence
   ↓
Decision / Outcome
```

## Broader ADL Ecosystem

The frontend will increasingly act as the public entry point into a wider ADL ecosystem:

```text
ADL Website
     │
     ├── Data Products
     ├── APIs
     ├── Intelligence Systems
     ├── Dashboards
     ├── Engineering Case Studies
     └── Technical Resources
```

---

# Engineering Standards

Changes to the frontend should preserve:

* Semantic HTML
* Responsive behavior
* Accessibility
* Type safety
* Maintainable component boundaries
* Clear information hierarchy
* Performance-conscious implementation
* Consistent visual language
* Separation between presentation and data services
* Accurate representation of production capabilities

Before opening a production deployment, run:

```bash
npm ci
npm run lint
npm run build
```

Changes that alter application behavior should also receive appropriate browser-level verification.

The website should remain technically credible as ADL's underlying systems evolve.

---

# Troubleshooting

## Dependencies fail to install

Verify Node.js and npm:

```bash
node --version
npm --version
```

Then perform a clean dependency installation:

```bash
npm ci
```

If the lockfile and dependency declarations are inconsistent, resolve the dependency state locally and commit the resulting `package-lock.json`.

---

## Production build fails

Run:

```bash
npm run lint
npm run build
```

Address the first actionable error before investigating downstream errors.

Confirm that:

* required dependencies are installed
* TypeScript errors are resolved
* imports reference valid files
* required environment configuration exists
* the Node.js version satisfies project requirements

---

## A route works locally but returns 404 in production

This generally indicates a hosting configuration problem with client-side routing.

Verify that the production host provides an SPA fallback for application routes.

Test the route by:

1. Navigating to it from the homepage.
2. Opening the route directly.
3. Refreshing the browser.
4. Opening the route in a new browser tab.

---

## Assets fail after deployment

Inspect the browser network panel and verify:

* Asset paths are correct.
* Files exist in the generated `dist/` directory.
* The deployment platform is serving the complete build output.
* The application base path matches the deployment configuration.

---

## API requests fail in production

Verify:

* The configured API endpoint is correct.
* The backend is reachable.
* CORS configuration permits the production frontend origin where required.
* The request is using HTTPS.
* Required public configuration is present.
* No private credentials are being sent from the browser.

---

# Contributing

Before committing frontend changes:

```bash
npm run lint
npm run build
```

Review the resulting application locally:

```bash
npm run preview
```

Changes should be:

* Purpose-driven
* Consistent with the existing architecture
* Accessible
* Responsive
* Type-safe
* Production-conscious
* Accurate about the capabilities they expose

Avoid introducing abstractions solely for theoretical future requirements.

Prefer clear domain boundaries and simple implementations that can evolve as the ADL product surface grows.

---

# Contact

For technical discovery, data engineering, intelligence systems, API development, or potential collaboration:

**[hello@aingadatalabs.com](mailto:hello@aingadatalabs.com)**

Website:

**https://aingadatalabs.com**

---

# Repository Purpose

This repository exists to build and maintain the public-facing digital experience for **Ainga Data Labs**.

As ADL's engineering ecosystem grows, this frontend will evolve from a company presentation layer into an interface for discovering, understanding, and interacting with ADL's data systems and intelligence products.

The long-term objective is simple:

> **Make sophisticated data infrastructure understandable, accessible, and useful.**
