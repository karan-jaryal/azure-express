const Azure = require("lib").AzureFunction;
const validate = require("lib").validate;
// azure function
async function handler(req, res) {


    const schema = {
        "properties": {
            "name": { "type": "string", format: "nonEmptyOrBlank" },
            "age": { "type": "number" }
        }, required: ["name"]
    }
    validate(schema, req.query)
    req.context.log(req.body)
    res.setHeader('Authorization', "token");
    res.send({ "data": "token generated" });

    
}

module.exports = Azure.from(handler, {});