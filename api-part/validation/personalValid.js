const {body , validationResult} = require('express-validator')

// function isValidDate(value) {
//     if (!value.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
  
//     const date = new Date(value);
//     if (!date.getTime()) return false;
//     return date.toISOString().slice(0, 10) === value;
//   }
  

const personalValidation = ()=>{
    return [
        body("work").isString().isLength({min:4 , max:30}),
     //   body("birtDate").isISO8601(),
        body("github").isString(),
        body("linkdin").isString(),
        body("address").isString().isLength({min:5,max:100}),
        body("postCode").isNumeric().isLength({min:4,max:12}),
        body("country").isString().isLength({min:4,max:20}),
        body("profile").isString().isLength({min:10,max:300}),
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

module.exports = {personalValidation , schemaValidation}
