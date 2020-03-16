
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

const myGetPage = async (url) => {
    const response = await axios.get(url)
    const resultParse = nodeHtmlParser.parse(response.data);
    let headers = resultParse.querySelector('.breadcrumbs')
    let specifications = resultParse.querySelector('tbody')
    return [headers, specifications]
}

myGetPage(baseUrl+'/catalog/soue/lpa-mini300.html').then((arr) =>{
    let arrHeaders = arr[0].querySelectorAll('a')
    for(let i = 2; i < arrHeaders.length; ++i){
        console.log(arrHeaders[i].structuredText)
    }
    console.log(arr[0].querySelector('span').structuredText)
    let arrSpecifications = arr[1].querySelectorAll('tr')
    for(let j = 0; j < arrSpecifications.length; ++j){
        console.log(arrSpecifications[j].structuredText)
    }
})

myGet(baseUrl+'/catalog').then((arr) => {
    let promises = []
    for(let i = 0; i < arr.length; ++i){
        // console.log(arr[i])
        promises.push(myGet(baseUrl+arr[i]))
    }
    Promise.all(promises).then(responses => {
        // console.log(responses)
        let promises = []
        for(let j = 0; j < responses.length; ++j){
            for(let k = 0; k < responses[j].length; ++k){
                // console.log(responses[j][k])
                if(responses[j][k].endsWith('.html')){
                    // console.log(responses[j][k])
                    // fs.appendFileSync('some.csv', responses[j][k]+'\n')

                }else{
                    promises.push(myGet(baseUrl+responses[j][k]))
                }
            }
        }
        Promise.all(promises).then(responses => {
            // console.log(responses)
            let promises = []
            for(let j = 0; j < responses.length; ++j){
                for(let k = 0; k < responses[j].length; ++k){
                    // console.log(responses[j][k])
                    if(responses[j][k].endsWith('.html')){
                        // console.log(responses[j][k])
                        // fs.appendFileSync('some.csv', responses[j][k]+'\n')
                    }else{
                        promises.push(myGet(baseUrl+responses[j][k]))
                    }
                }
            }
            Promise.all(promises).then(responses => {
                // console.log(responses)
                for(let j = 0; j < responses.length; ++j){
                    for(let k = 0; k < responses[j].length; ++k){
                        // console.log(responses[j][k])
                        // fs.appendFileSync('some.csv', responses[j][k]+'\n')
                    }
                }
            })
        })
    })
})
