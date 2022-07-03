const express = require("express");
const router = express.Router();
const url = require("../models/urlshort");

/**
 * @swagger
 * components:
 *   schemas:
 *     Url:
 *       type: object
 *       required:
 *         - email
 *         - longurl
 *          - shortUrl
 *         - shortUrlCode
 *          -visit
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         longurl:
 *           type: string
 *           description: The Long url
 *         shortUrl:
 *           type: string
 *           description: The short url with the long url
 *         shortUrlCode:
 *           type: string
 *           description: The short url code
 *         visit:
 *           type: number
 *           description: The number of visit to the site
 *       example:
 *         email: max@gmail.com
 *         longurl: https://www.google.com
 *         shortUrl: http://localhost:5000/EkQpjrSoV
 *         shortUrlCode: EkQpjrSoV
 *         visit: 1
 */

/**
  * @swagger
  * tags:
  *   name: UrlShortener
  *   description: The URL shortener API
  */

/**
 * @swagger
 * /api/GetAllShortUrl:
 *   post:
 *     summary: The list of url shorteners based on email
 *     tags: [UrlShortener]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: The list of shortener url is was successfully fetch
 *         
 *    
 */


router.post("/", async (req, res) => {
  const AllShortUrls = await url.find({ email: req.body.email });

  res.send(AllShortUrls);
});

module.exports = router;
