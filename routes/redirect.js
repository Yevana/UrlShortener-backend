const express = require("express");
const router = express.Router();

const Url = require("../models/urlshort");


/**
 * @swagger
 * /api/:code:
 *   get:
 *     summary: The Redirect the page with the short url code
 *     tags: [UrlShortener]
 *     parameters:
 *       - in: path
 *         shortUrlCode: code
 *         schema:
 *           type: string
 *         required: true
 *         description: The short url code
 *     responses:
 *       200:
 *         description: The page redirected with the short url
 *       404:
 *         description: URL Not Found
 * 

 */

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrlCode: req.params.code });

    if (url) {
        
       url.visit++
       console.log(url)
       await url.save();
      res.send(url.longurl);
      
    } else {
      return res.status(404).json("URL Not Found");
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json("Server Error");
  }
});

module.exports = router;
