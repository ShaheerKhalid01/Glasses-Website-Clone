# Glasses-Website-Clone
This is a clone of ainak.pk website and here it also have virtual reality feature which makes it able to look more interactive
Running Procedure:
🚀 Project Readme: Next.js and Tailwind CSS Starter
This guide will help you set up and run the project on your local machine. This application is built using Next.js for the frontend and serverless functions, and Tailwind CSS for rapid and utility-first styling.

📋 Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js (version 16 or later recommended)

npm or Yarn (npm is included with Node.js)

You can check your Node.js and npm versions by running:

Bash

node -v
npm -v
⚙️ Installation and Setup
Follow these steps to get your development environment ready:

1. Clone the Repository
Clone the project repository to your local machine using Git:

Bash

git clone <repository-url>
cd <project-directory-name>
2. Install Dependencies
Navigate into the project directory and install the necessary dependencies (Next.js, React, Tailwind CSS, etc.):

Bash

# Using npm
npm install

# OR using Yarn
yarn install
3. Environment Variables (If Applicable)
If your project uses environment variables (e.g., API keys, database URLs), you will need to create a local environment file.

Look for an example file named .env.local.example or .env.example.

Create a new file named .env.local in the root of the project directory.

Copy the contents from the example file into .env.local and fill in your actual credentials.

Example .env.local structure:

NEXT_PUBLIC_API_KEY=your_public_api_key_here
DATABASE_URL=your_database_connection_string
🛠️ Running the Project
Once the setup is complete, you can start the development server.

1. Start the Development Server
Run the following command to start the Next.js development server. This command will compile the code and make the application accessible locally.

Bash

# Using npm
npm run dev

# OR using Yarn
yarn dev
2. Access the Application
The application will typically start on port 3000. Open your web browser and navigate to:

http://localhost:3000
The application will automatically reload if you make changes to any source file.

📦 Build and Deployment
1. Create a Production Build
To create a highly optimized, production-ready build of the application:

Bash

# Using npm
npm run build

# OR using Yarn
yarn build
This command will generate the production-ready files in the .next folder.

2. Start the Production Server
To test the production build locally (requires running npm run build first):

Bash

# Using npm
npm run start

# OR using Yarn
yarn start
3. Tailwind CSS Integration
This project is configured to use Tailwind CSS. All styling is done using utility classes directly in the components.

The primary Tailwind configuration is found in the tailwind.config.js file.

The global CSS setup is typically in styles/globals.css.

Tailwind's JIT (Just-In-Time) mode is usually enabled by default in modern Next.js setups for fast compilation.
