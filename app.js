
const axios = require('axios')
const fs = require('fs')

var nodeHtmlParser = require("node-html-parser")

try {
    const fd = fs.openSync('some.csv', 'w')
} catch (err) {
    console.error(err)
  }

let baseUrl = 'http://luis-lpa.ru'

// const myGet = async (url) => {
//     const response = await axios.get(url);
//     // console.log(response.data)
//     return response
// }

const myGet = async (url) => {
    const response = await axios.get(url);
    const resultParse = nodeHtmlParser.parse(response.data);
    let arrObject = resultParse.querySelector('.catalog').querySelectorAll('.object')
    let arrUrl = []
    for(let l = 0; l < arrObject.length; ++l){
        let pageUrl = arrObject[l].querySelector('.header').getAttribute('href');
        arrUrl.push(pageUrl)
    }
    return arrUrl
}

myGet(baseUrl+'/catalog').then((arr) => {
    let promises = []
    for(let i = 0; i < arr.length; ++i){
        // console.log(arr[i])
        promises.push(myGet(baseUrl+arr[i]))
    }
    Promise.all(promises).then(responses => {
        console.log(responses[0].length)
    })
})



axios.get('http://luis-lpa.ru/catalog/soue/').then(function(response){
    const resultFunctionalGroupOfProducts = nodeHtmlParser.parse(response.data)
    let arrFunctionalGroupOfProducts = resultFunctionalGroupOfProducts
        .querySelector('.catalog').querySelectorAll('.object')
    // let contentFunctionalGroupOfProducts = arrFunctionalGroupOfProducts[0].structuredText
        
    for(let k = 0; k < arrFunctionalGroupOfProducts.length; ++k){
        let pageUrlFunctionalGroupOfProducts = arrFunctionalGroupOfProducts[k].querySelector('.header')
            .getAttribute('href');
        // console.log(pageUrlFunctionalGroupOfProducts)
    }
    // axios.get(baseUrl+pageUrlFunctionalGroupOfProducts).then(function(response){
    //     const resultProductsGroup = nodeHtmlParser.parse(response.data);
    //     let arrProductsGroup = resultProductsGroup.querySelector('.catalog')
    //         .querySelectorAll('.object')
    //     // for(let j = 0; j < arrProductsGroup.length; ++j){
    //     let j = 0
    //     while(j < arrProductsGroup.length){
    //         let contentProductsGroup = arrProductsGroup[j].structuredText
    //         let pageUrlProductsGroup = arrProductsGroup[j].querySelector('.header')
    //             .getAttribute('href')
    //         axios.get(baseUrl+pageUrlProductsGroup).then(function(response){
    //             const resultProducts = nodeHtmlParser.parse(response.data)
    //             let arrSpecifications = resultProducts.querySelectorAll('tr')
                
    //             for(let i = 1; i < arrSpecifications.length; ++i){
    //                 contentProducts = arrSpecifications[i]
    //                     .structuredText.replace(/\r?\n/g, ";");
    //                 fs.appendFileSync('some.csv', contentCatalog+';');
    //                 fs.appendFileSync('some.csv', contentFunctionalGroupOfProducts+';');
    //                 fs.appendFileSync('some.csv', contentProductsGroup+';');

    //                 fs.appendFileSync('some.csv', contentProducts+';');
    //                 fs.appendFileSync('some.csv', "\n");
    //             }
                
    //         })
    //         j++
    //     }
    // })
})

fs.appendFileSync('some.csv', "\n");
