[![Plane Scape](/banner.png)](https://plane-scape-app.vercel.app/)

> **Important:** You must enable the CORS proxy, or API requests will not work. <br />
> To successfully send requests to the external API, **you must use a CORS proxy**. Follow these steps: <br />
> 1. Go to [https://cors-anywhere.herokuapp.com](https://cors-anywhere.herokuapp.com) <br />
> 2. Click the **"Request temporary access to the demo server"** button. <br />
> 3. Refresh the application website, and the data should now load correctly. [Click here for the application website.](https://plane-scape-app.vercel.app)

# [**Plane Scape**](https://plane-scape-app.vercel.app/)

**Plane Scape** is an application developed to view and manage flight information. <br />This project allows users to easily track and manage flight information.

Project Demo Link: [https://plane-scape-app.vercel.app/](https://plane-scape-app.vercel.app/)

Make sure to complete this before running the project!

## Project Screenshots

[![Homepage](/project-screenshot-homepage.png)](https://plane-scape-app.vercel.app/)
[![My-Flights](/project-screenshot-my-flights-page.png)](https://plane-scape-app.vercel.app/)

## Technologies and Tools

This project was built using these technologies and tools.

- **Language**: [Vite](https://vitejs.dev) + [React](https://react.dev) & [Typescript](https://www.typescriptlang.org)
- **Styling**: [SASS (SCSS)](https://sass-lang.com), [Bootstrap Grid](https://getbootstrap.com)
- **Formatter**: [Prettier](https://prettier.io)
- **Code Editor**: [VS Code](https://code.visualstudio.com)
- **Deployment**: [Vercel](https://vercel.com)
- **Other Tools**: [Eslint](https://eslint.org)

## Minimum Requirements

- Node.js version: 14.x or higher
- npm version: 6.x or higher
- MongoDB: Atlas or a local MongoDB instance
- Internet connection: Required to run the project

## .env Example

Here is an example of what your .env file should look like:

```bash
VITE_API_BASE_URL=https://api.example.com
VITE_API_APP_ID=your_app_id_123
VITE_API_APP_KEY=your_app_key_abc
VITE_API_RESOURCE_VERSION=v4

VITE_DATABASE_API_BASE_URL=https://database.example.com

VITE_PROXY_URL=https://proxy.example.com
```

## Running Project

1. Clone the repository:

```bash
git clone https://github.com/bozaci/plane-scape.git
```

2. Navigate into the project directory:

```bash
cd plane-scape
```

3. Install the dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

Once the server is running, you can access the application at http://localhost:5173.

## License

This project is licensed under the [Creative Commons Attribution-NonCommercial 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/legalcode). You are free to:

- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

Under the following terms:

- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.
- **NonCommercial** — You may not use the material for commercial purposes.
