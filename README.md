# Todo App

A simple Todo application built with React and Redux Toolkit.

---

## Features

* Add todos
* Delete todos
* Mark todos as completed

---

## Tech Stack

* React
* Redux Toolkit
* TypeScript

---

## Setup

```bash
git clone https://github.com/thekaramveer/todo-app.git
cd todo-app
npm install
npm run dev
```

---

## Structure

```
src/
├── redux/                 # Redux state management
│   ├── store.ts           # Store configuration + persistence setup
│   ├── hooks.ts           # Typed hooks (useAppDispatch, useAppSelector)
│   └── features/
│       └── todos/
│           ├── todoSlice.ts   # Todo slice (actions + reducers)
│           └── types.ts       # TypeScript types
│
├── utils/
│   └── localStorage.ts    # LocalStorage helpers (load/save todos)
│
├── App.tsx                # Main app component
└── main.tsx               # Entry point
```

---

## Author

Karamveer Chahar
