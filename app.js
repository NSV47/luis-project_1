let express = require('express')
const axios = require('axios')
let app = express()

var nodeHtmlParser = require("node-html-parser")

axios.get('http://luis-lpa.ru/catalog/sirens-ceiling/lpa-10n.html')
    .then(function(response){
        // console.log(response);
        const result = nodeHtmlParser.parse(response.data);
        let arrRes = result.querySelectorAll('tr')
        for(let i = 0; i < arrRes.length; ++i){ 
            console.log(result.querySelectorAll('tr')[i].structuredText);
        }
    })

app.listen(3000, function(){
    console.log('запущено на localhost:3000')
})