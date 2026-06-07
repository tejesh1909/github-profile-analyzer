CREATE DATABASE IF NOT EXISTS github_analyzer;
USE github_analyzer;

CREATE TABLE IF NOT EXISTS profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    github_id INT UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(150),
    avatar_url VARCHAR(255),
    bio TEXT,
    public_repos INT DEFAULT 0,
    followers INT DEFAULT 0,
    following INT DEFAULT 0,
    total_stars INT DEFAULT 0,
    total_forks INT DEFAULT 0,
    account_age_days INT DEFAULT 0,
    most_used_language VARCHAR(50),
    engagement_score DECIMAL(5,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_username (username)
);

CREATE TABLE IF NOT EXISTS profile_languages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profile_id INT NOT NULL,
    language_name VARCHAR(50) NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE,
    UNIQUE KEY uq_profile_lang (profile_id, language_name)
);

CREATE TABLE IF NOT EXISTS top_repositories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    profile_id INT NOT NULL,
    repo_name VARCHAR(150) NOT NULL,
    repo_url VARCHAR(255) NOT NULL,
    stars INT DEFAULT 0,
    forks INT DEFAULT 0,
    FOREIGN KEY (profile_id) REFERENCES profiles(id) ON DELETE CASCADE
);
