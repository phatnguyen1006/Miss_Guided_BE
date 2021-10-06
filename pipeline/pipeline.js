const request = require("request");
const cheerio = require("cheerio");

pipe = (req, res) => {
    request(url, function (error, response, body) {
        if (error) {
            console.log(error);
            res.status(200).json({
                message: "Error"
            });
        }
        else {
            $ = cheerio.load(body);
            var ds = $(body).find("picture.styles__active--2pO1j styles__image--2YIO4 styles__previous--3SkPy");
            ds.each(function (i, e) {
                console.log($(this).text());
            });

            res.status(200).json({ "data": "ds" });
        }
    });
}


module.exports = pipe