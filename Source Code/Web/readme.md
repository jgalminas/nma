# Web Drawing & Admin Portal

This part of the project contains code related to the web drawing application, as well as, the admin portal.

It is built using [TypeScript](https://www.typescriptlang.org/), [React](https://beta.reactjs.org/) and [Tailwind](https://tailwindcss.com/).

## Running the project

The project uses [Vite](https://vitejs.dev/) for its development tooling.

### Production Build

When the project is ready to be hosted, it can be build using the following command.

```
npm run build
```

### Production Build Preview

Using this command the project can be built and hosted on a local server for previewing and ensuring everything functions as intended.

```
npm run preview
```

### Development

When developing use the following command to host a static server and take advantage of Hot Module Reloading for quick feedback.

```
npm run dev
```

## Structure

The project is a single page application and it uses the [React Router library](https://reactrouter.com/en/main) to provide the routing functionality.

The root <kbd> / </kbd> of the project will route the users to the drawing application, while the <kbd> /admin </kbd> route will route the users to the admin side of the application.

Entry points are configured as follows:

- <kbd> / </kbd> entry point is the [**DrawingApp.tsx**](../Web/src/DrawingApp.tsx) component
- <kbd> /admin </kbd> entry point is the [**AdminApp.tsx**](../Web/src/AdminApp.tsx) component
