This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app --typescript`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Overview

The task was completed using Formik's validation and state management helpers.
Field validations were done using yup schema (for name, phone numbers 
and gender fields) and custom functions (for email, age)

Table is setup with dummy data on first render and is updated with new entries following a successful form submission

Data is persisted in-memory so tab refreshes will only persist the initial dummy data

Email uniqueness is checked using `array.find()` over a state array which is passed as a prop to the component containing the AG Grid Table

## Dependencies used

[x] Ag Grid
[x] Formik  
[x] Tailwindcss

## Installing dependencies

Run the following command in the root directory

```bash
yarn
# Or
npm install
```

## Getting Started

First, run the development server:

```bash
npm run dev
# Or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
