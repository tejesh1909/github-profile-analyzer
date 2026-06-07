const axios = require("axios");
const cache = require("memory-cache");
const ProfileModel = require("../models/profile.model");

class AnalyzerService {

  /**
   * Extra Feature: Isolated GitHub Data Fetching Layer
   * Fetches raw user and repository profiles with a 15-minute network-level cache.
   */
  static async fetchGithubData(username) {
    // FIXED: Using specific cache key to prevent conflicts
    const cacheKey = `github_${username}`;
    const cachedData = cache.get(cacheKey);
    
    if (cachedData) {
      return cachedData;
    }

    const config = {};
    if (process.env.GITHUB_TOKEN) {
      config.headers = {
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      };
    }

    const [userResponse, repoResponse] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`, config),
      axios.get(`https://api.github.com/users/${username}/repos?per_page=100`, config)
    ]);

    const data = {
      user: userResponse.data,
      repos: repoResponse.data
    };

    // FIXED: Explicitly putting the cache using the distinct cacheKey
    cache.put(cacheKey, data, 15 * 60 * 1000);
    return data;
  }

  /**
   * Complex Business Logic & Analytical Computations
   * Processes advanced metrics and orchestrates the database sync using the Model layer.
   */
  static async analyzeAndSaveProfile(username) {
    // 1. Fetch data from our modularized helper
    const { user, repos } = await AnalyzerService.fetchGithubData(username);

    // 2. Compute Deep Profile Insights & Analytics
    let totalStars = 0;
    let totalForks = 0;
    let totalRepoWithLanguages = 0;
    const languageCounts = {};

    repos.forEach(repo => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
      
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        totalRepoWithLanguages++;
      }
    });

    // Extract the "Most Used Language"
    let mostUsedLanguage = "None";
    let maxCount = 0;
    for (const [lang, count] of Object.entries(languageCounts)) {
      if (count > maxCount) {
        maxCount = count;
        mostUsedLanguage = lang;
      }
    }

    // Calculate "Account Age in Days"
    const accountAgeDays = Math.floor(
      (Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24)
    );

    // FIXED: Enhanced Formula with Star weighting and division safety limits
    const engagementScore = (
      (totalStars * 2 + totalForks + user.followers) /
      Math.max(user.public_repos, 1)
    ).toFixed(2);

    // Structure profile parameters to match the ProfileModel signatures
    const profilePayload = {
      github_id: user.id,
      username: username,
      name: user.name,
      avatar_url: user.avatar_url,
      bio: user.bio,
      public_repos: user.public_repos,
      followers: user.followers,
      following: user.following,
      total_stars: totalStars,
      total_forks: totalForks,
      account_age_days: accountAgeDays,
      most_used_language: mostUsedLanguage,
      engagement_score: engagementScore
    };

    // Parse the Top 5 Repositories sorted by Star counts
    const sortedTopRepos = [...repos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map(repo => ({
        repo_name: repo.name,
        repo_url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count
      }));

    // FIXED: Sorted languages descending and added safety checks against empty/no-language repos
    const languagesPayload = Object.entries(languageCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([lang, count]) => ({
        language_name: lang,
        percentage: totalRepoWithLanguages > 0
          ? ((count / totalRepoWithLanguages) * 100).toFixed(2)
          : 0
      }));

    // 3. MySQL Database Save via Model Layer 
    // FIXED: Mapping correctly to the profile.model.js methods to prevent any crashes
    const existingProfile = await ProfileModel.getProfileByUsername(username);
    let profileId;

    if (existingProfile) {
      profileId = existingProfile.id;
      await ProfileModel.updateProfile(profileId, profilePayload);
    } else {
      profileId = await ProfileModel.createProfile(profilePayload);
    }

    // Process dependent relational entities
    await ProfileModel.saveLanguages(profileId, languagesPayload);
    await ProfileModel.saveTopRepositories(profileId, sortedTopRepos);

    // Invalidate the unified detail view cache so data updates cleanly
    cache.del(`details_${username}`);

    return { message: "Profile intelligence successfully analyzed and stored.", source: "github_api" };
  }

  /**
   * Fetches paginated list summaries for dashboard rendering
   */
  static async getAllProfiles(page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    const [profiles, total] = await Promise.all([
      ProfileModel.getAllProfiles(Number(limit), Number(offset)),
      ProfileModel.getTotalProfiles()
    ]);

    return {
      total_records: total,
      current_page: Number(page),
      limit: Number(limit),
      data: profiles
    };
  }

  /**
   * Aggregates deeply nested relations into a singular, scannable response object
   */
  static async getProfileDetails(username) {
    const cacheKey = `details_${username}`;
    const cachedDetails = cache.get(cacheKey);
    if (cachedDetails) return cachedDetails;

    // FIXED: Correctly matching the method name inside profile.model.js
    const profile = await ProfileModel.getProfileByUsername(username);
    if (!profile) return null;

    // Resolve parallel relational properties from model layer
    const [languages, topRepositories] = await Promise.all([
      ProfileModel.getLanguages(profile.id),
      ProfileModel.getTopRepositories(profile.id)
    ]);

    const completeProfileData = {
      ...profile,
      languages,
      top_repositories: topRepositories
    };

    // Cache the processed relational model response for 1 hour to boost API efficiency
    cache.put(cacheKey, completeProfileData, 60 * 60 * 1000);
    return completeProfileData;
  }
}

module.exports = AnalyzerService;
