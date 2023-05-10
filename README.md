# Admin-panel-frontend
 _This is a frontend application for an administrative panel that allows creating and managing website content. It is developed using React.js and includes components for data management, page creation, and content management._

## Features
- Page creation: The application contains functionality for creating new pages, editing existing pages, and managing content on pages.
 - Content editing: The application allows adding, editing, and deleting content on website pages, such as text, images, videos, and other media resources.
 - Data management: The application includes various components for displaying and managing data, such as tables, forms, lists, and charts. They can be used to display and manage data related to website content.
- User authentication and authorization: The application uses access tokens for user authentication and protects routes using middleware for authorization.

## Requirements

- Node.js (version 14 or higher) and npm installed on your machine.
- admin-panel-backend


## Tech

The following open-source projects were used to develop admin-panel-frontend:

- [React] - a JavaScript library for building user interfaces
- [React Router DOM] - a tool for handling routes in React applications
 - [Ant Design] - a UI library for React
 - [Axios] - a promise-based HTTP client for the browser and node.js
 - [Day.js] - a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times
 - [Framer Motion] - a production-ready motion library for React
 - [I18next] - an internationalization-framework written in and for JavaScript
 - [React Quill] - a powerful, extensible Rich Text Editor for React
 - [Styled Components] - a CSS-in-JS library for React
 - [Transliteration] - a library for transliterating Unicode characters
 - [Vite] - a build tool that provides a faster and leaner development experience for modern web projects

## Setup:
- You can  Clone this repository. 
``` bash
git clone https://github.com/artjoker/admin-panel.git
```
- Install and run ["admin-panel-backend"](https://github.com/artjoker/admin-panel-backend.git).
- Install dependencies
 ```bash
yarn install

npm install
 ```
### Environment
This package can be configured by environment variables out-of-box (.env):
``` bash
VITE_PUBLIC_API_URL= The URL of the API that the frontend will communicate with.
```

## Code Style:
 
If you want to enforce a specific code style, you can run [ESLint](https://eslint.org/docs/latest/rules/) with your desired configuration. This project follows a standard JavaScript code style.
```bash
yarn run lint

npm run lint
```

## License

license. Please see the [license file](license.md) for more information.

