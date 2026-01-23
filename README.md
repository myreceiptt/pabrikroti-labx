# PABRIK ROTI [![version](https://img.shields.io/badge/version-1.1.3.1-blue)](https://github.com/myreceiptt/pabrikroti-labx/releases/tag/v.1.1.3.1)

> "This is not just a factory. This is a rehearsal of freedom—kneaded with code, fermented by its community, and baked through the heat of shared struggles."
>
> — Prof. NOTA

---

---

## Maintenance by Prof. NOTA Evergreen Standard

This repo is a **Live Artefact App**: the user-facing UX is intentionally frozen
("MINT CLOSED", no wallet prompts), while the codebase remains buildable and
production-safe on Vercel.

### Runtime

- Node: **24.x** (local + Vercel)
- Package manager: **Yarn 4.12.0** (lockfile: `yarn.lock`)
- `@types/node`: **24.10.7** (pinned to match Node 24; 25.x intentionally deferred)
- Deploy target: **Vercel**

### Build System

- Next.js **16.1.4** (Turbopack)

### Monthly Safe Updates (recommended)

Monthly is **monitor + verify**, not modernization.

1. Check what’s outdated (report only):

   - `yarn outdated`

2. Security report (report only unless explicitly approved):

   - `yarn npm audit --severity moderate`

3. Verify build reproducibility:

   - `yarn lint`
   - `yarn build`

4. Verify production sanity:

   - Confirm "MINT CLOSED"
   - Confirm no wallet prompts / connect flows
   - Confirm no critical console errors

### Major Updates (quarterly / scheduled)

Major upgrades must be done **one at a time**, with a dedicated PR and full testing.
Artefact UX must remain unchanged.

Examples:

- React major version upgrade
- Web3 stack upgrade (e.g., web3 v1 → v4)
- Toolchain changes
- Node major policy change

### Artefact UX Policy (Frozen)

- Minting must remain **disabled**
- Wallet connect must remain **disabled**
- Any functional change requires a versioned successor (new tag/release)

---

---

## PABRIK ROTI v.1.1.3.1: Staging MeMoRa of Voyage.Co.Id by LabX

Link #1: [labx.voyage.co.id](https://labx.voyage.co.id/)  
Link #2: [labx.endhonesa.com](https://labx.endhonesa.com/)

🧬 Forked from [PABRIKROTI-MASTER](https://github.com/myreceiptt/pabrikroti-master/releases/tag/v.1.1.3-labx)

## About This Repo

This repo is a prototype web app built for **LabX**—a creative and collaborative venture within **BUBU.com** (est. late 2020)—as part of a broader collaboration with **Voyage Global** to bring Web3 utilities into real-world programs, events, and community activities.

### What it does

- Provides a Web3-integrated interface to issue and manage digital participation artifacts (POAP-style) and event ticketing flows.
- Utilizes **NFTs** and **FTs** on the **Base** blockchain to support onchain proofs and lightweight access utilities for offline events (including the LabX anniversary in 2025).

### Technology

- Next.js (App Router) + React + TypeScript
- Tailwind CSS
- thirdweb (EVM wallet + contract integrations)
- Vercel deployment

### How we build (quality + workflow)

- We keep the repo production-safe on Node 24 / Vercel and validate every upgrade with audit/lint/build.
- We ship changes in small, reviewable steps and document why each update exists (security, stability, or lifecycle compatibility).
- We prioritize preserving the artefact UX while ensuring the codebase stays buildable and deployable.

## 📜 License

This project is licensed under a [**Custom Limited License**](./LICENSE) by [Prof. NOTA & Prof. NOTA Inc.](https://nota.endhonesa.com/).

> 📩 For permission or inquiries, contact: [nota@endhonesa.com](mailto:nota@endhonesa.com)

## Usage

### Install dependencies

```bash
yarn install
```

### Review dependency updates (interactive)

```bash
yarn up -i
```

### Upgrade dependencies

```bash
yarn up -R "*"
```

### Start development server

```bash
yarn dev
```

### Check all the code

```bash
yarn lint
```

### Create a production build

```bash
yarn build
```

### Preview the production build

```bash
yarn start
```

## Resources

- [Prof. NOTA Inc.](https://nota.endhonesa.com/)
- [Prof. NOTA Console](https://prompt.endhonesa.com/)
- [Prof. NOTA Tutor](https://baca.endhonesa.com/)

## Join Prof. NOTA Discord

For questions or suggestions, join Prof. NOTA discord at [https://discord.gg/5KrsT6MbFm](https://discord.gg/5KrsT6MbFm).
