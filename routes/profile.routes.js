const express = require("express");
const router = express.Router();

const {
  analyzeProfile,
  getAllProfiles,
  getProfile
} = require("../controllers/profile.controller");

/**
 * @swagger
 * /api/profiles/{username}:
 *   post:
 *     summary: Analyze and save a GitHub profile
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: tejesh1909
 *     responses:
 *       200:
 *         description: Profile analyzed and stored successfully
 */
router.post("/:username", analyzeProfile);

/**
 * @swagger
 * /api/profiles:
 *   get:
 *     summary: Get all stored GitHub profiles
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: List of profiles
 */
router.get("/", getAllProfiles);

/**
 * @swagger
 * /api/profiles/{username}:
 *   get:
 *     summary: Get a saved GitHub profile by username
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: tejesh1909
 *     responses:
 *       200:
 *         description: Profile found
 *       404:
 *         description: Profile not found
 */
router.get("/:username", getProfile);

module.exports = router;