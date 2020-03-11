let express = require('express')
const axios = require('axios')
const fs = require('fs')
let app = express()

var nodeHtmlParser = require("node-html-parser")

let content = '';

try {
    const fd = fs.openSync('some.csv', 'a')
    const data = fs.writeFileSync('some.csv', content)
} catch (err) {
    console.error(err)
  }

let baseUrl = 'http://luis-lpa.ru'
let pageUrl = ''
axios.get('http://luis-lpa.ru/catalog').then(function(response){
    const resultCatalog = nodeHtmlParser.parse(response.data);
    let arrCatalog = resultCatalog.querySelector('.catalog').querySelectorAll('.object')
    // console.log(arrCatalog[0].structuredText)
    content = arrCatalog[0].structuredText
    fs.appendFileSync('some.csv', content+';');
    // console.log(arrCatalog[0].querySelector('a').getAttribute('href'))
    
    pageUrl = arrCatalog[0].querySelector('a').getAttribute('href');
    console.log(pageUrl)
    axios.get(baseUrl+pageUrl).then(function(response){
        const resultFunctionalGroupOfProducts = nodeHtmlParser.parse(response.data) // notification and evacuation management system 
        let arrFunctionalGroupOfProducts = resultFunctionalGroupOfProducts.querySelector('.catalog').querySelectorAll('.object')
        // console.log(arrFunctionalGroupOfProducts[0].structuredText)
        content = arrFunctionalGroupOfProducts[0].structuredText
        fs.appendFileSync('some.csv', content+';');
        // console.log(arrFunctionalGroupOfProducts[0].querySelector('a').getAttribute('href'))
        pageUrl = arrFunctionalGroupOfProducts[0].querySelector('a').getAttribute('href');
        axios.get(baseUrl+pageUrl).then(function(response){
            const resultProductsGroup = nodeHtmlParser.parse(response.data);
            let arrProductsGroup = resultProductsGroup.querySelector('.catalog').querySelectorAll('.object')
            // console.log(arrProductsGroup[0].structuredText)
            content = arrProductsGroup[0].structuredText
            fs.appendFileSync('some.csv', content+';');
            // console.log(arrProductsGroup[0].querySelector('a').getAttribute('href'))
            pageUrl = arrProductsGroup[0].querySelector('a').getAttribute('href')
            axios.get(baseUrl+pageUrl).then(function(response){
                const resultProducts = nodeHtmlParser.parse(response.data)
                let arrSpecifications = resultProducts.querySelectorAll('tr')
                for(let i = 1; i < arrSpecifications.length; ++i){
                    // console.log(resultProducts.querySelectorAll('tr')[i].structuredText)
                    content = resultProducts.querySelectorAll('tr')[i].structuredText.replace(/(\r\n|\n|\r)/gm, "<br>");
                    fs.appendFileSync('some.csv', content+';');
                }
            })
        })
    })
})
fs.appendFileSync('some.csv', "\n");
app.listen(3000, function(){
    console.log('запущено на localhost:3000')
})
