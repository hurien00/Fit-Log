This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).




# 🏋️‍♂️ FitLog — Ultimate Workout Tracker & Planner

A sleek, modern, and modern workout tracking web application designed to help fitness enthusiasts organize, plan, and track their daily lifts efficiently. Built with Next.js, React Context, and Tailwind CSS.

---

## Key Features

- **Explore Exercises:** Browse a collection of exercises targeting different major muscle groups and view detailed information for each workout.
- **Create Today’s Workout:** Add exercises to your daily workout plan and easily manage your routine. You can add up to 5 exercises per day.
- **Save Your Favorite Plans:** Save your preferred workout routines and keep your workout data stored locally, so it remains available even after closing or reopening the browser.
- **API-Driven Workout Data:** Fetches workout plans, categories, and metrics dynamically from a custom API endpoint for real-time updates.
- **Responsive & Modern Design:** A clean, dark-themed interface built with Tailwind CSS, designed to work smoothly across mobile phones, tablets, and desktops.

---

## 🛠️ Technologies Used

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript / JavaScript
- **Styling:** Tailwind CSS
- **State Management:** React Context API (`PlanContext`)
- **Notifications:** React Hot Toast
- **Icons & Images:** Next.js Image Component & Lucide/SVG Icons
- **Storage:** Browser `localStorage` API

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
