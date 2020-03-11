let express = require('express')
const axios = require('axios')
const FS = require('fs')
let app = express()

var nodeHtmlParser = require("node-html-parser")

axios.get('http://luis-lpa.ru/catalog').then(function(response){
    const resultCatalog = nodeHtmlParser.parse(response.data);
    let arrCatalog = resultCatalog.querySelector('.catalog').querySelectorAll('.object')
    console.log(arrCatalog[0].structuredText)
    console.log(arrCatalog[0].querySelector('a').getAttribute('href'))
    axios.get('http://luis-lpa.ru'+arrCatalog[0].querySelector('a').getAttribute('href')).then(function(response){
        const resultFunctionalGroupOfProducts = nodeHtmlParser.parse(response.data) // notification and evacuation management system 
        let arrFunctionalGroupOfProducts = resultFunctionalGroupOfProducts.querySelector('.catalog').querySelectorAll('.object')
        console.log(arrFunctionalGroupOfProducts[0].structuredText)
        console.log(arrFunctionalGroupOfProducts[0].querySelector('a').getAttribute('href'))
        axios.get('http://luis-lpa.ru'+arrFunctionalGroupOfProducts[0].querySelector('a').getAttribute('href')).then(function(response){
            const resultProductsGroup = nodeHtmlParser.parse(response.data);
            let arrProductsGroup = resultProductsGroup.querySelector('.catalog').querySelectorAll('.object')
            console.log(arrProductsGroup[0].structuredText)
            console.log(arrProductsGroup[0].querySelector('a').getAttribute('href'))
            axios.get('http://luis-lpa.ru'+arrProductsGroup[0].querySelector('a').getAttribute('href')).then(function(response){
                const resultProducts = nodeHtmlParser.parse(response.data)
                let arrSpecifications = resultProducts.querySelectorAll('tr')
                for(let i = 1; i < arrSpecifications.length; ++i){
                    console.log(resultProducts.querySelectorAll('tr')[i].structuredText)
                }
            })
        })
    })
})

app.listen(3000, function(){
    console.log('запущено на localhost:3000')
})
