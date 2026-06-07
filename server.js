// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');

// const profileRoutes = require('./routes/profile.routes');
// const errorHandler = require('./middlewares/errorHandler');

// const app = express();

// // 1. Global Middleware Setups
// app.use(cors());
// app.use(express.json());

// // Request logging via Morgan for better debugging and development insights
// if (process.env.NODE_ENV === 'development') {
//     app.use(morgan('dev'));
// } else {
//     app.use(morgan('combined')); // Production formatting
// }

// // 2. Production Security: Rate Limiting to prevent API abuse
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100, // Limit each IP to 100 requests per window
//     standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//     legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//     message: {
//         success: false,
//         error: "Too many requests from this IP, please try again after 15 minutes."
//     }
// });
// app.use('/api/', limiter); // Apply the rate limit to all API routes

// // 3. Swagger Documentation Setup
// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'GitHub Profile Analyzer API',
//             version: '1.0.0',
//             description: 'Enterprise-grade backend service analyzing GitHub user profiles and metrics.',
//             contact: {
//                 name: 'tejesh1909',
//                 email: 'tejesh.vempati19@gmail.com',
//             },
//         },
//         servers: [
//             {
//                 url: `http://localhost:${process.env.PORT || 3000}`,
//                 description: 'Local Development Server',
//             },
//         ],
//     },
//     apis: ['./routes/*.js'], // Scans files inside routes folder for API documentation markup
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// // 4. API Core Routes
// app.use('/api/profiles', profileRoutes);

// // Health Check Route
// app.get('/', (req, res) => {
//     res.status(200).json({ 
//         success: true, 
//         message: 'GitHub Profile Analyzer API is operating smoothly.',
//         docs: '/api-docs'
//     });
// });

// // 5. Global Error Handling Middleware
// app.use(errorHandler);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//     console.log(`📄 Swagger documentation live at http://localhost:${PORT}/api-docs`);
// });
// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
// const swaggerUi = require('swagger-ui-express');
// const swaggerJsdoc = require('swagger-jsdoc');

// const profileRoutes = require('./routes/profile.routes');
// const errorHandler = require('./middlewares/errorHandler');

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//     standardHeaders: true,
//     legacyHeaders: false,
//     message: {
//         success: false,
//         error: "Too many requests from this IP, please try again after 15 minutes."
//     }
// });

// app.use('/api/', limiter);

// const swaggerOptions = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'GitHub Profile Analyzer API',
//             version: '1.0.0',
//             description: 'Enterprise-grade backend service analyzing GitHub user profiles and metrics.',
//             contact: {
//                 name: 'tejesh1909',
//                 email: 'tejesh.vempati19@gmail.com',
//             },
//         },
//         servers: [
//             {
//                 url: `http://localhost:${process.env.PORT || 3000}`,
//                 description: 'Local Development Server',
//             },
//         ],
//     },
//     apis: ['./routes/*.js'],
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// app.use('/api/profiles', profileRoutes);

// app.get('/', (req, res) => {
//     res.send(`
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <title>GitHub Profile Analyzer</title>
//             <style>
//                 body {
//                     margin: 0;
//                     font-family: Arial, sans-serif;
//                     background: linear-gradient(135deg, #0f172a, #1e293b);
//                     color: white;
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     min-height: 100vh;
//                 }
//                 .card {
//                     background: #111827;
//                     padding: 35px;
//                     border-radius: 18px;
//                     width: 650px;
//                     text-align: center;
//                     box-shadow: 0 15px 40px rgba(0,0,0,0.5);
//                 }
//                 h1 {
//                     color: #38bdf8;
//                     margin-bottom: 10px;
//                 }
//                 p {
//                     color: #cbd5e1;
//                 }
//                 input {
//                     padding: 13px;
//                     width: 70%;
//                     border-radius: 8px;
//                     border: none;
//                     margin-top: 20px;
//                     font-size: 15px;
//                 }
//                 button, a {
//                     display: inline-block;
//                     margin-top: 18px;
//                     padding: 12px 20px;
//                     background: #2563eb;
//                     color: white;
//                     text-decoration: none;
//                     border-radius: 8px;
//                     border: none;
//                     cursor: pointer;
//                     font-size: 15px;
//                 }
//                 button:hover, a:hover {
//                     background: #1d4ed8;
//                 }
//                 pre {
//                     margin-top: 20px;
//                     text-align: left;
//                     background: #020617;
//                     padding: 15px;
//                     border-radius: 10px;
//                     max-height: 300px;
//                     overflow: auto;
//                     color: #22c55e;
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="card">
//                 <h1>GitHub Profile Analyzer</h1>
//                 <p>Analyze GitHub profiles, repositories, languages, stars, forks, and engagement score.</p>

//                 <input id="username" placeholder="Enter GitHub username" />
//                 <br />

//                 <button onclick="analyze()">Analyze Profile</button>
//                 <br />
//                 <a href="/api-docs">Open Swagger Docs</a>

//                 <pre id="result"></pre>
//             </div>

//             <script>
//                 async function analyze() {
//                     const username = document.getElementById('username').value.trim();
//                     const result = document.getElementById('result');

//                     if (!username) {
//                         result.textContent = 'Please enter a GitHub username';
//                         return;
//                     }

//                     result.textContent = 'Analyzing...';

//                     try {
//                         const res = await fetch('/api/profiles/' + username, {
//                             method: 'POST'
//                         });

//                         const data = await res.json();
//                         result.textContent = JSON.stringify(data, null, 2);
//                     } catch (error) {
//                         result.textContent = 'Error: ' + error.message;
//                     }
//                 }
//             </script>
//         </body>
//         </html>
//     `);
// });

// app.use(errorHandler);

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
//     console.log(`📄 Swagger documentation live at http://localhost:${PORT}/api-docs`);
// });
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const profileRoutes = require('./routes/profile.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: "Too many requests from this IP, please try again after 15 minutes."
    }
});

app.use('/api/', limiter);

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'GitHub Profile Analyzer API',
            version: '1.0.0',
            description: 'Backend service analyzing GitHub user profiles using GitHub API and MySQL.',
            contact: {
                name: 'tejesh1909',
                email: 'tejesh.vempati19@gmail.com',
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Local Development Server',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/profiles', profileRoutes);

app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>GitHub Profile Analyzer</title>
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Arial, sans-serif;
            background: #0d1117;
            color: #c9d1d9;
        }

        header {
            background: #010409;
            border-bottom: 1px solid #30363d;
            padding: 16px 40px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .brand {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo {
            width: 36px;
            height: 36px;
            background: #f0f6fc;
            color: #010409;
            border-radius: 50%;
            display: grid;
            place-items: center;
            font-weight: 800;
        }

        header h2 {
            margin: 0;
            color: #f0f6fc;
            font-size: 22px;
        }

        .docs-link {
            color: #58a6ff;
            text-decoration: none;
            border: 1px solid #30363d;
            padding: 9px 14px;
            border-radius: 8px;
            font-size: 14px;
        }

        .docs-link:hover {
            background: #161b22;
        }

        .hero {
            max-width: 1120px;
            margin: 45px auto;
            padding: 0 24px;
        }

        .title {
            font-size: 44px;
            color: #f0f6fc;
            margin-bottom: 10px;
            letter-spacing: -1px;
        }

        .subtitle {
            font-size: 18px;
            color: #8b949e;
            max-width: 760px;
            line-height: 1.6;
        }

        .search-box {
            margin-top: 30px;
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 12px;
            padding: 22px;
            display: flex;
            gap: 12px;
        }

        input {
            flex: 1;
            background: #0d1117;
            border: 1px solid #30363d;
            color: #f0f6fc;
            padding: 13px 15px;
            border-radius: 8px;
            font-size: 16px;
            outline: none;
        }

        input:focus {
            border-color: #2f81f7;
            box-shadow: 0 0 0 3px rgba(47, 129, 247, 0.25);
        }

        button {
            background: #238636;
            color: white;
            border: 1px solid #2ea043;
            padding: 13px 22px;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
        }

        button:hover {
            background: #2ea043;
        }

        .message {
            margin-top: 20px;
            background: #161b22;
            border: 1px solid #30363d;
            padding: 18px;
            border-radius: 10px;
            display: none;
        }

        .result {
            margin-top: 28px;
            display: none;
            grid-template-columns: 280px 1fr;
            gap: 24px;
        }

        .sidebar,
        .main-card {
            background: #161b22;
            border: 1px solid #30363d;
            border-radius: 12px;
            padding: 22px;
        }

        .avatar {
            width: 100%;
            border-radius: 50%;
            border: 1px solid #30363d;
        }

        .name {
            color: #f0f6fc;
            font-size: 26px;
            margin: 18px 0 4px;
        }

        .username {
            color: #8b949e;
            font-size: 18px;
            margin-bottom: 15px;
        }

        .bio {
            color: #c9d1d9;
            margin-bottom: 18px;
            line-height: 1.5;
        }

        .follow {
            color: #8b949e;
            font-size: 14px;
            line-height: 1.8;
        }

        .stats {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 14px;
            margin-bottom: 24px;
        }

        .stat {
            background: #0d1117;
            border: 1px solid #30363d;
            border-radius: 10px;
            padding: 18px;
        }

        .stat h3 {
            color: #f0f6fc;
            margin: 0;
            font-size: 24px;
        }

        .stat p {
            color: #8b949e;
            margin: 6px 0 0;
            font-size: 14px;
        }

        .section-title {
            color: #f0f6fc;
            border-bottom: 1px solid #30363d;
            padding-bottom: 10px;
            margin-top: 25px;
        }

        .language {
            margin: 14px 0;
        }

        .language-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 6px;
        }

        .bar {
            height: 8px;
            background: #30363d;
            border-radius: 999px;
            overflow: hidden;
        }

        .bar span {
            display: block;
            height: 100%;
            background: #2f81f7;
        }

        .repo {
            background: #0d1117;
            border: 1px solid #30363d;
            border-radius: 10px;
            padding: 16px;
            margin-top: 12px;
        }

        .repo a {
            color: #58a6ff;
            font-weight: 600;
            text-decoration: none;
            font-size: 17px;
        }

        .repo a:hover {
            text-decoration: underline;
        }

        .repo p {
            color: #8b949e;
            margin-bottom: 0;
        }

        @media (max-width: 800px) {
            header {
                padding: 16px 20px;
            }

            .result {
                grid-template-columns: 1fr;
            }

            .stats {
                grid-template-columns: 1fr 1fr;
            }

            .search-box {
                flex-direction: column;
            }

            .title {
                font-size: 34px;
            }
        }
    </style>
</head>
<body>

<header>
    <div class="brand">
        <div class="logo">GH</div>
        <h2>GitHub Profile Analyzer</h2>
    </div>
    <a class="docs-link" href="/api-docs">API Docs</a>
</header>

<section class="hero">
    <h1 class="title">Analyze GitHub Profiles</h1>
    <p class="subtitle">
        Fetch public GitHub profile data, analyze repositories, languages, stars, forks,
        engagement score, and store insights in MySQL.
    </p>

    <div class="search-box">
        <input id="username" placeholder="Enter GitHub username, e.g. tejesh1909">
        <button onclick="analyzeProfile()">Analyze</button>
    </div>

    <div id="message" class="message"></div>

    <div id="result" class="result">
        <div class="sidebar" id="sidebar"></div>
        <div class="main-card" id="main"></div>
    </div>
</section>

<script>
    async function analyzeProfile() {
        const username = document.getElementById("username").value.trim();
        const result = document.getElementById("result");
        const sidebar = document.getElementById("sidebar");
        const main = document.getElementById("main");
        const message = document.getElementById("message");

        if (!username) {
            message.style.display = "block";
            message.innerHTML = "Please enter a GitHub username.";
            result.style.display = "none";
            return;
        }

        message.style.display = "block";
        message.innerHTML = "Analyzing GitHub profile...";
        result.style.display = "none";

        try {
            const res = await fetch("/api/profiles/" + username, {
                method: "POST"
            });

            const response = await res.json();

            if (!response.success) {
                message.innerHTML = response.message || "Profile not found.";
                return;
            }

            const data = response.data;

            message.style.display = "none";
            result.style.display = "grid";

            sidebar.innerHTML = \`
                <img class="avatar" src="\${data.avatar_url}" alt="Avatar">
                <h2 class="name">\${data.name || data.username}</h2>
                <div class="username">@\${data.username}</div>
                <p class="bio">\${data.bio || "No bio available"}</p>
                <div class="follow">
                    <div><b>\${data.followers}</b> followers · <b>\${data.following}</b> following</div>
                    <div><b>\${data.public_repos}</b> public repositories</div>
                    <div>Account age: <b>\${data.account_age_days}</b> days</div>
                </div>
            \`;

            main.innerHTML = \`
                <div class="stats">
                    <div class="stat"><h3>\${data.public_repos}</h3><p>Repositories</p></div>
                    <div class="stat"><h3>\${data.total_stars}</h3><p>Total Stars</p></div>
                    <div class="stat"><h3>\${data.total_forks}</h3><p>Total Forks</p></div>
                    <div class="stat"><h3>\${data.most_used_language}</h3><p>Top Language</p></div>
                    <div class="stat"><h3>\${data.engagement_score}</h3><p>Engagement Score</p></div>
                    <div class="stat"><h3>\${data.languages.length}</h3><p>Languages</p></div>
                </div>

                <h3 class="section-title">Language Usage</h3>
                \${data.languages.map(lang => \`
                    <div class="language">
                        <div class="language-row">
                            <span>\${lang.language_name}</span>
                            <span>\${lang.percentage}%</span>
                        </div>
                        <div class="bar">
                            <span style="width:\${lang.percentage}%"></span>
                        </div>
                    </div>
                \`).join("")}

                <h3 class="section-title">Top Repositories</h3>
                \${data.top_repositories.map(repo => \`
                    <div class="repo">
                        <a href="\${repo.repo_url}" target="_blank">\${repo.repo_name}</a>
                        <p>⭐ \${repo.stars} stars &nbsp; | &nbsp; 🍴 \${repo.forks} forks</p>
                    </div>
                \`).join("")}
            \`;

        } catch (error) {
            message.style.display = "block";
            message.innerHTML = "Something went wrong. Check backend server.";
            result.style.display = "none";
        }
    }
</script>

</body>
</html>
    `);
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📄 Swagger documentation live at http://localhost:${PORT}/api-docs`);
});