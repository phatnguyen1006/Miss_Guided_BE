const request = require("request");
const cheerio = require("cheerio");

const createProduct = require("./pipelineService");

pipe = async (req, res) => {
    if (!req.body.url) return;

    var name = "";
    var categories = [];
    var price = 0;
    var salePrice = 0;
    var sizes = [];
    var description = "";
    var images = [];

    request(req.body.url, async function (error, response, body) {
        if (error) {
            console.log(error);
            res.status(200).json({
                message: "Error"
            });
        }
        else {
            $ = cheerio.load(body);
            var nameds = $(body).find("h1.styles__title--eLOzY");
            var categoryds = $(body).find("li.crumb");
            var priceds = $(body).find("span.styles__old--32oYo");
            var salePriceds = $(body).find("span.styles__sale--3TyDe");
            var sizeds = $(body).find("span.styles__screenReaderOnly--3ue_j");
            var productDesds = $(body).find("p.styles__description--QyLnd");
            var productds = $(body).find("div.styles__readMoreText--2ATPU");
            var imgds = $(body).find("ul.styles__thumbnails--KtsE7");

            name = nameds[0]["children"][0].data ?? "";

            categoryds.each(function (i, e) {
                if (e["children"][1]["attribs"]?.title && i != 0) {
                    // console.log(e["children"][1]["attribs"].title);
                    categories.push(e["children"][1]["attribs"].title);
                }
            });

            priceds.each(function (i, e) {
                price = $(this).text();
            });

            salePriceds.each(function (i, e) {
                console.log($(this).text());
                salePrice = $(this).text();
            });

            description = productDesds[0]["children"][0].data + productds[0]["children"][0].data ?? "";

            sizeds.each(function (i, e) {
                sizes.push(e["parent"]["children"][1].data);
            })

            imgds[0]["children"]?.forEach(img => {
                images.push(img.children[0].children[0].children[0]['attribs']['srcset'].split(",")[3].trim().split(" ")[0]);
            });
        }

        let data = {
            "name": name,
            "categories": categories,
            "price": price,
            "salePrice": salePrice,
            "description": description,
            "sizes": sizes,
            "images": images,
        }
        
        const check = await createProduct(data);
    
        if ( check == 200) {
            res.render('pipeline', {
                "message": "Submitted!! Another submit?"
            });
            return;
        }
        else {
            res.render('pipeline', {
                "message": "Failed!!! Try again!!!"
            });
            return;
        }
    });
}

module.exports = pipe;
