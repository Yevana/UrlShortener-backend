const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortUrl = require("shortid");
const config = require('config');

const Url = require('../models/urlshort')


/**
 * @swagger
 * /api/getUrl:
 *   post:
 *     summary: The long url gets shortener
 *     tags: [UrlShortener]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: The short url have successfully create
 *         
 *    
 */
router.post('/',async (request, response)=>{
    const { longurl,email } = request.body;
    const genUrl = shortUrl.generate();

    const baseUrl = config.get('baseURI');
    if(validUrl.isUri(longurl)){
        try{
            let url = await Url.findOne({longurl,email});

            // let email = await Url.findOne({email});


            let visit = url
           
            if(url){
                response.json(url);
            }else{
                const shortUrl = baseUrl + '/' + genUrl
        
                url = new Url({
                    email,
                    longurl,
                    shortUrl,
                    shortUrlCode:genUrl,
                });
                console.log(url)
            await url.save();
            response.json(url);
            }
            
           }catch(err){
            console.error(err.message);
            response.status(500).json('Server Error');
           }
    }else{
        return response.status(401).json('invalid Long Url');

    }
   
})

module.exports = router