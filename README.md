# StackScore

StackScore is an AI-powered resume analyzer and ATS optimization tool. Upload your resume, specify your target company and job, and get focused feedback to improve your chances!

## Features

- PDF Resume Upload
- Company & Job Details Form
- ATS Optimization Feedback
- Modern UI with React, TypeScript and Authentication with Puter.js

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/stackscore.git
    cd stackscore
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm run dev
    ```
    or
    ```sh
    npm start
    ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## How to Upload Your Resume

1. **Login/Register** if required.
2. Navigate to the **Upload** page (`/upload`).
3. Fill in the following fields:
    - **Company Name**: Enter the name of your target company.
    - **Job Title**: Enter the job title you are applying for.
    - **Job Description**: Paste the job description.
4. **Upload Resume**:
    - Click on the upload area and select your PDF resume file.
    - Only PDF files up to 20MB are accepted.
5. Click **Next** to submit your resume for analysis.

## Project Structure

```

├── .react-router/              # React Router metadata/config
├── app/                        # Main application source
│   ├── components/             # Reusable React components
│   ├── lib/                    # Utility libraries and helpers
│   ├── routes/                 # Route definitions and views
│   ├── utils/                  # Route-specific utilities
│   ├── app.css                 # Global styles
│   ├── root.tsx                # Root layout component
│   └── routes.ts               # Route configuration
├── constants/                  # Application-wide constants
├── types/                      # TypeScript type definitions
├── public/                     # Static assets (images, icons, etc.)
├── node_modules/               # Installed npm packages
├── .dockerignore               # Docker ignore rules
├── .gitignore                  # Git ignore rules
├── Dockerfile                  # Docker build instructions
├── package.json                # Project metadata and dependencies
├── package-lock.json           # Exact dependency tree
├── react-router.config.ts      # React Router setup
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite build tool configuration
└── README.md                   # Project documentation
```

## Technologies Used

- React & TypeScript
- Puter Js
- React Router v7.9.2

## License

MIT

---

**For any issues or feature requests, please open an issue on GitHub.**