let mydata = "../Resources/js/test.js";

d3.json(mydata).then(function(response) {
    console.log(response)
})