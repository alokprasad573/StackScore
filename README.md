# 🧠 StackScore

StackScore is an intelligent web application that analyzes resumes to calculate their **ATS (Applicant Tracking System) score** and provides actionable suggestions to help users improve their resumes for better job visibility and ranking.



## 🚀 Features

- 📄 PDF Resume Upload  
- 🏢 Company & Job Details Form  
- 🧠 ATS Optimization Feedback  
- 🎨 Modern UI built with React, TypeScript  
- 🔐 Authentication powered by Puter.js  


---

## 🚀 Live Demo
🔗 **Deployed on Vercel:** [https://stack-score.vercel.app](https://stack-score.vercel.app)

🔗 **GitHub Repository:** [https://github.com/alokprasad573/StackScore.git](https://github.com/alokprasad573/StackScore.git)

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/stackscore.git
cd stackscore
```

2. **Install dependencies**
```bash
npm install
```

3. **Add Puter.js to index.html**
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <!-- ...existing head content... -->
    <script src="https://js.puter.com/v2/"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```
4. **Start development server**
```bash
npm run dev
```

5. **Open the app**
Visit [http://localhost:5173](http://localhost:5173)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run typecheck` | Run TypeScript checks |
| `npm start` | Preview production build |

> 💡 **Tip**: Use `npm run dev` for development with hot reload enabled

---

## 🚀 Login/Register via Puter.js authentication

### Step-by-Step Guide

1. **Login/Register**
   - Use Puter.js authentication
   - Click "Login" for existing users
   - Click "Sign Up" for new accounts

2. **Access Upload Page**
   - Navigate to the Upload section
   - Direct URL: `/upload`

3. **Enter Job Details**
   - Required fields:
     - Company Name
     - Job Title
     - Job Description
   - All fields must be filled for analysis

4. **Upload Resume File**
   - Supported format: PDF only
   - Maximum file size: 20MB
   - Methods:
     - Click upload area to browse
     - Drag and drop file
   - Ensure document is text-searchable

5. **Submit for Analysis**
   - Click "Next" button
   - Wait for processing (~30-60 seconds)
   - View your ATS score and suggestions

> 💡 **Pro Tips**: 
> - Use a text-based PDF (not scanned)
> - Include relevant keywords from job description
> - Keep formatting simple for best ATS compatibility


## 🧪 Technologies Used

• **⚛️ React + TypeScript + Tailwind + Zustand**
  - Modern frontend framework
  - Type-safe development
  - Utility-first CSS framework for rapid UI development
  - State Management
  
• **🧭 React Router v7.9.2**
  - Advanced routing capabilities
  - Data loading and mutations
  
• **🧩 Puter.js**
  - Secure authentication
  - File storage integration
  
• **⚡ Vite**
  - Lightning-fast builds
  - Optimized development server
  
• **🐳 Docker**
  - Containerized deployment
  - Consistent environments

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


## 🗂️ Project Structure
Below is the key directory structure of the project:

```

STACKSCORE/
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

## 🤝 Contributing & Support

We welcome contributions! Here's how you can help:

- **Feature Requests**: Open an issue describing the feature
- **Bug Reports**: Submit with steps to reproduce
- **Improvements**: Submit a pull request with changes
- **Questions**: Start a discussion in Issues

### Contributing Steps
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
