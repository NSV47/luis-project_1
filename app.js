
const axios = require('axios')
const fs = require('fs')

var nodeHtmlParser = require("node-html-parser")

try {
    const fd = fs.openSync('some.csv', 'w')
} catch (err) {
    console.error(err)
  }

let baseUrl = 'http://luis-lpa.ru'

axios.get('http://luis-lpa.ru/catalog').then(function(response){
    const resultCatalog = nodeHtmlParser.parse(response.data);
    let arrCatalog = resultCatalog.querySelector('.catalog').querySelectorAll('.object')
    for(let l = 0; l < arrCatalog.length; ++l){
        let contentCatalog = arrCatalog[l].structuredText
        let pageUrlCatalog = arrCatalog[l].querySelector('a').getAttribute('href');
        axios.get(baseUrl+pageUrlCatalog).then(function(response){
            const resultFunctionalGroupOfProducts = nodeHtmlParser.parse(response.data)
            let arrFunctionalGroupOfProducts = resultFunctionalGroupOfProducts
                .querySelector('.catalog').querySelectorAll('.object')
            for(let k = 0; k < arrFunctionalGroupOfProducts.length; ++k){
                let contentFunctionalGroupOfProducts = arrFunctionalGroupOfProducts[k].structuredText
                let pageUrlFunctionalGroupOfProducts = arrFunctionalGroupOfProducts[k].querySelector('a')
                    .getAttribute('href');
                axios.get(baseUrl+pageUrlFunctionalGroupOfProducts).then(function(response){
                    const resultProductsGroup = nodeHtmlParser.parse(response.data);
                    let arrProductsGroup = resultProductsGroup.querySelector('.catalog')
                        .querySelectorAll('.object')
                    for(let j = 0; j < arrProductsGroup.length; ++j){
                        let contentProductsGroup = arrProductsGroup[j].structuredText
                        let pageUrlProductsGroup = arrProductsGroup[j].querySelector('a').getAttribute('href')
                        axios.get(baseUrl+pageUrlProductsGroup).then(function(response){
                            const resultProducts = nodeHtmlParser.parse(response.data)
                            let arrSpecifications = resultProducts.querySelectorAll('tr')
                            for(let i = 1; i < arrSpecifications.length; ++i){
                                contentProducts = arrSpecifications[i]
                                    .structuredText.replace(/\r?\n/g, ";");
                                fs.appendFileSync('some.csv', contentCatalog+';');
                                fs.appendFileSync('some.csv', contentFunctionalGroupOfProducts+';');
                                fs.appendFileSync('some.csv', contentProductsGroup+';');

                                fs.appendFileSync('some.csv', contentProducts+';');
                                fs.appendFileSync('some.csv', "\n");
                            }
                        })
                    }
                })
            }
        })
    }
})
fs.appendFileSync('some.csv', "\n");
