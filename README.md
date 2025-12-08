# Gamestation

Simple React + TypeScript project built with Vite. Use the steps below to get it running locally.

## Prerequisites
- Node.js 18+ (LTS recommended)
- npm 9+ (comes with Node)

## Setup
```bash
npm install
```
- Go to https://rawg.io/apidocs, create an account and get your api key
- Copy `.env.example` to `.env` and set `VITE_RAWG_API_KEY` with your RAWG.io API key.

## Run the dev server
```bash
npm run dev
```
Vite will print a local URL (default `http://localhost:5173`) where the app is served.

## Production build & preview
```bash
npm run build   # create optimized production assets
npm run preview # serve the built assets locally
```
