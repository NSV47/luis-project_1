let express = require('express')
const axios = require('axios')
const FS = require('fs')
let app = express()

var nodeHtmlParser = require("node-html-parser")

axios.get('http://luis-lpa.ru/catalog').then(function(response){
    const result = nodeHtmlParser.parse(response.data);
    // console.log(result.querySelector('.catalog').classNames.toString() === 'container,catalog')
    // console.log(result.querySelector('.container.catalog').classNames.toString().firstChild.structure)
    // console.log(result.querySelector('.container.catalog').structuredText)
    // if(result.querySelector('.container.catalog').classNames.toString() === 'container,catalog'){
    //     console.log(result.querySelector('.container.catalog'))
    // }
    // console.log(result.querySelector('.catalog').querySelectorAll('.col')[1].text)
    let arrObject = result.querySelector('.catalog').querySelectorAll('.object')
    console.log(arrObject[0].structuredText)
    console.log(arrObject[0].querySelector('a').getAttribute('href'))
    for(let i = 0; i < arrObject.length; ++i){
        
    }
})    

// axios.get('http://luis-lpa.ru/catalog/sirens-ceiling/lpa-10n.html')
//     .then(function(response){
//         // console.log(response);
//         const result = nodeHtmlParser.parse(response.data);
//         let arrRes = result.querySelectorAll('tr')
//         for(let i = 0; i < arrRes.length; ++i){ 
//             // console.log(result.querySelectorAll('tr')[i].structuredText);
//             // FS.writeFileSync("some.csv", exampleData.map(row=> `${row.name}${separator}${row.age}`).join("\n"))
//             FS.appendFileSync("some.csv", result.querySelectorAll('tr')[i].structuredText+';');
            
//         }
//     })

app.listen(3000, function(){
    console.log('запущено на localhost:3000')
})

return 0
