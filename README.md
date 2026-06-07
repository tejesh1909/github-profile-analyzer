# 🚀 GitHub Profile Analyzer

An enterprise-grade Node.js & Express backend service that analyzes public GitHub profiles, calculates deep user engagement and repository insights, and preserves performance using a smart dual-caching layer backed by MySQL.

## 🎯 High-Value Features

* **Deep Language Breakdown:** Computes precise usage distribution percentages across all public repositories.
* **Top Repositories tracking:** Automatically isolates and maps the user's top 5 repositories based on stargazers and forks.
* **Advanced Analytical Metrics:** Calculates account longevity (Account Age in Days) and a custom user Engagement Score.
* **Dual-Tier Caching Optimization:** Employs an in-memory application cache (`memory-cache`) alongside database checkpoints to minimize network latency and respect GitHub rate limits.
* **Normalized Database Schema:** Features fully linked, clean relational SQL tables handling profiles, programming languages, and top repositories using an isolated Data Access Object (DAO) pattern.

## ⚙️ Tech Stack

* **Runtime Environment:** Node.js
* **Web Framework:** Express.js
* **Database:** MySQL (using connection pooling via `mysql2/promise`)
* **Caching Strategy:** `memory-cache` (In-Memory)
* **HTTP Client:** Axios

## 🛠️ Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone [https://github.com/tejesh1909/github-profile-analyzer.git](https://github.com/tejesh1909/github-profile-analyzer.git)
   cd github-profile-analyzer
