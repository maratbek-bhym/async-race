Async Race

Score: 400 / 400

Deploy: https://maratbek-bhym.github.io/async-race/

Important: the app works with the local server mock. Before opening the deploy link, clone and start the server: https://github.com/mikhama/async-race-api (npm install, npm start, it runs on http://127.0.0.1:3000).

Note for the reviewer: Chrome may ask for a "local network access" permission when the deployed page requests 127.0.0.1:3000. Click "Allow", otherwise the garage will be empty.

Stack

React 19, TypeScript (strict mode)
Redux Toolkit as state manager
React Router (HashRouter)
Vite, ESLint (Airbnb config), Prettier
fetch + AbortController, Web Animations API for car animation

Run locally

git clone https://github.com/maratbek-bhym/async-race.git
cd async-race
npm install
npm run dev

Scripts: dev, build, preview, lint, format, ci:format

Checklist: 400 / 400

UI Deployment

Deployed to GitHub Pages (auto-deploy via GitHub Actions)

Requirements to Commits and Repository

Commits follow Conventional Commits
Checklist is included in README.md
Score is calculated and placed at the top of README.md
Deployment link is placed at the top of README.md

Basic Structure (80 / 80)

Two views: Garage and Winners
Garage view: name, car creation/editing panel, race control panel, garage section
Winners view: name, winners table, pagination
Persistent state between views: pages, form inputs, sorting are kept in the store

Garage View (90 / 90)

CRUD for cars, empty and too long names are handled, deleting a car also deletes its winner record
Color picker, selected color is shown on the car image
Random car generation, 100 cars per click, random name from two parts and random color
Update and Delete buttons near each car
Pagination, 7 cars per page
EXTRA: "No cars" message for the empty garage
EXTRA: deleting the last car on a page moves you to the previous page

Winners View (50 / 50)

Winner is displayed in the winners table after the race
Pagination, 10 winners per page
Table columns: number, car image, name, wins, best time; repeated wins increase the counter, the best time is kept
Sorting by wins and time, ascending and descending

Race (170 / 170)

Start engine animation, on 500 error the car stops where it broke
Stop engine animation, the car returns to the start after the server response
Responsive animation, works on screens from 500px
Race button starts the race for all cars on the current page
Reset button returns all cars to the start
Winner banner with the winner's name and time
Button states: start is disabled while driving, stop is disabled at the start position
Actions during the race are handled: car editing, deleting, page switching and generation are blocked while the race is running, leaving the view resets the race

Prettier and ESLint (10 / 10)

Prettier with format and ci:format scripts
ESLint with Airbnb style guide, strict TypeScript config

Code Quality (up to 100)

Layers are separated: src/api (server requests), src/store (Redux slices and thunks), src/components (UI), src/hooks, src/utils
No magic numbers, all constants are in src/constants.ts
Functions are small, no any in the code
Custom hooks: useCarAnimation, useCarControls, typed store hooks
