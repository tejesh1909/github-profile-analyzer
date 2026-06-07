const pool = require("../config/db");

class ProfileModel {

  static async getProfileByUsername(username) {
    const [rows] = await pool.query(
      "SELECT * FROM profiles WHERE username = ?",
      [username]
    );

    return rows[0];
  }

  static async getAllProfiles(limit, offset) {
    const [rows] = await pool.query(
      `SELECT
        username,
        name,
        followers,
        public_repos,
        total_stars,
        total_forks,
        engagement_score,
        updated_at
      FROM profiles
      ORDER BY updated_at DESC
      LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    return rows;
  }

  static async getTotalProfiles() {
    const [rows] = await pool.query(
      "SELECT COUNT(*) AS total FROM profiles"
    );

    return rows[0].total;
  }

  static async createProfile(data) {

    const [result] = await pool.query(
      `
      INSERT INTO profiles (
        github_id,
        username,
        name,
        avatar_url,
        bio,
        public_repos,
        followers,
        following,
        total_stars,
        total_forks,
        account_age_days,
        most_used_language,
        engagement_score
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        data.github_id,
        data.username,
        data.name,
        data.avatar_url,
        data.bio,
        data.public_repos,
        data.followers,
        data.following,
        data.total_stars,
        data.total_forks,
        data.account_age_days,
        data.most_used_language,
        data.engagement_score
      ]
    );

    return result.insertId;
  }

  static async updateProfile(profileId, data) {

    await pool.query(
      `
      UPDATE profiles
      SET
        name=?,
        avatar_url=?,
        bio=?,
        public_repos=?,
        followers=?,
        following=?,
        total_stars=?,
        total_forks=?,
        account_age_days=?,
        most_used_language=?,
        engagement_score=?
      WHERE id=?
      `,
      [
        data.name,
        data.avatar_url,
        data.bio,
        data.public_repos,
        data.followers,
        data.following,
        data.total_stars,
        data.total_forks,
        data.account_age_days,
        data.most_used_language,
        data.engagement_score,
        profileId
      ]
    );
  }

  static async saveLanguages(profileId, languages) {

    await pool.query(
      "DELETE FROM profile_languages WHERE profile_id=?",
      [profileId]
    );

    for (const lang of languages) {

      await pool.query(
        `
        INSERT INTO profile_languages
        (profile_id, language_name, percentage)
        VALUES (?, ?, ?)
        `,
        [
          profileId,
          lang.language_name,
          lang.percentage
        ]
      );
    }
  }

  static async saveTopRepositories(profileId, repositories) {

    await pool.query(
      "DELETE FROM top_repositories WHERE profile_id=?",
      [profileId]
    );

    for (const repo of repositories) {

      await pool.query(
        `
        INSERT INTO top_repositories
        (
          profile_id,
          repo_name,
          repo_url,
          stars,
          forks
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          profileId,
          repo.repo_name,
          repo.repo_url,
          repo.stars,
          repo.forks
        ]
      );
    }
  }

  static async getLanguages(profileId) {

    const [rows] = await pool.query(
      `
      SELECT
      language_name,
      percentage
      FROM profile_languages
      WHERE profile_id=?
      ORDER BY percentage DESC
      `,
      [profileId]
    );

    return rows;
  }

  static async getTopRepositories(profileId) {

    const [rows] = await pool.query(
      `
      SELECT
      repo_name,
      repo_url,
      stars,
      forks
      FROM top_repositories
      WHERE profile_id=?
      ORDER BY stars DESC
      `,
      [profileId]
    );

    return rows;
  }
}

module.exports = ProfileModel;
