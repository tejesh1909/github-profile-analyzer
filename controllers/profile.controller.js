const AnalyzerService = require("../services/analyzer.service");

const analyzeProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "GitHub username is required"
      });
    }

    const result =
      await AnalyzerService.analyzeAndSaveProfile(username);

    const profile =
      await AnalyzerService.getProfileDetails(username);

    res.status(200).json({
      success: true,
      message: result.message,
      source: result.source,
      data: profile
    });

  } catch (error) {
    next(error);
  }
};

const getAllProfiles = async (req, res, next) => {
  try {

    const page =
      parseInt(req.query.page) || 1;

    const limit =
      parseInt(req.query.limit) || 10;

    const result =
      await AnalyzerService.getAllProfiles(page, limit);

    res.status(200).json({
      success: true,
      ...result
    });

  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {

    const { username } = req.params;

    const profile =
      await AnalyzerService.getProfileDetails(username);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found"
      });
    }

    res.status(200).json({
      success: true,
      data: profile
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeProfile,
  getAllProfiles,
  getProfile
};
