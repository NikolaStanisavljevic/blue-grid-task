# Blue Grid Task

## Description

This is the a Node.js application designed for a take-home assignment. It utilizes Express for server operations and focuses on efficient data transformation processes and caching.

## Prerequisites

Before you start, ensure you have the following installed:

- **Node.js**: Version 20.15.1 LTS or higher. Download it from [Node.js official website](https://nodejs.org/).
- **npm**: Comes with Node.js, but you can check your version by running `npm -v`.
- **TypeScript**: Ensure TypeScript is installed globally or locally. Install it using npm:

```
  npm install -g typescript
```

## Local Setup and Running the Project

### Installation

Clone the repository and navigate into the project directory:

```
git clone <repository-url>
cd blue-grid-task
```

Install the required npm packages:

```
npm install
```

### Environment Setup

There is a `.env` file located in root dir with necessary environment variables

### Running Locally with npm

To run the project locally using npm, use the following command:

```
npm run dev
```

This command utilizes ts-node-dev to run the TypeScript application directly in development mode, watching for changes to your source files.

### Running with Docker

To run the project using Docker, ensuring a consistent environment, use the custom npm script:

```
npm run docker:dev
```

This command builds the Docker image and starts the container as defined in the Docker configuration files.

### Running Tests

To execute tests with Jest, use the following npm script:

```
npm run test
```

### Additional Commands

**Build**: Compile TypeScript files to JavaScript in the dist directory:

```
npm run build
```

**Lint**: Check the code for linting errors using ESLint:

```
npm run lint
```

**Format**: Format your code using Prettier:

```
npm run format
```
