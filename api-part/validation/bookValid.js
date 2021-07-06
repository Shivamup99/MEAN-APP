const {body , validationResult} = require('express-validator')

const bookValidation = ()=>{
    return [
        body("book_name").isString().isLength({min:4 , max:56}),
        body("author").isString().isLength({min:4 , max:56}),
        body("book_type").isString().isLength({min:3 , max:30}),
        body("rating").isNumeric(),
        body("desc").isString().isLength({min:5,max:300})
    ]
};

const schemaValidation = (req,res,next)=>{
    const errors = validationResult(req)
    if(errors.isEmpty()){
        return next()
    }

    const schemaError = []
    errors.array().map((err)=>schemaError.push({[err.param]:err.msg}))
    res.status(422).json({
        errors:schemaError
    })
}

module.exports = {bookValidation , schemaValidation}