## Developing

Prerequisites:
* Install [Node.js](https://nodejs.org/) if needed.
* Install dependencies in this directory with `npm install` (or `pnpm install`
  or `yarn`).

Then to start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Instructions

This take-home exercise involves a few frameworks [Svelte](https://svelte.dev/),
[SvelteKit](https://kit.svelte.dev/) and [TailwindCSS](https://tailwindcss.com).
You'll apply these technologies to implement a simple feature in a demo
application. To get started with Svelte, we highly recommend the
[tutorial](https://svelte.dev/tutorial/basics). (Most of the necessary SvelteKit
scaffolding is already set up for you here, so you may not need to dive too deep
into that documentation.)

The feature that we'd like you to build is to flesh out the product page to show
some basic info about a product, and calculate some simple metrics about its
supply chain.

For more details, see the TODOs in the page at
src/routes/product/[id]/index.svelte, and in the backend route at
src/routes/product/[id]/details.json.ts

The end goal here is to familiarize yourself with some of the tech that Bluebird
uses, and to demonstrate that you can use these tools to build a simple feature.
We don't need to see perfectly polished UIs or production-ready code, but please
try to make the end result look reasonably good.

Bonus: include form validation to show errors on invalid inputs

## Notes

Feel free to install additional npm packages as needed.

By "supply chain distance" in this scenario, we mean the total distance that the
packaging for a product travels to get to the manufacturing location for that
product. For instance, for the Toothpaste product in our example data, this
would be the distance from Shanghai to Phoenix + the distance from
Secaucus to Phoenix (this disregards the fact that two types of packaging come
from Shanghai for this product).
There are several different methods to approximate the distance between two 
latitude/longitude pairs on Earth - please find an appropriate library for this,
no need to implement it manually.

A tonne is the same as a metric ton (1000kg).
