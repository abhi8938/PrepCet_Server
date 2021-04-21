const {subscition_data,update_subscition_data} =require ("../../data/sample_data")
const jwt =require ("jsonwebtoken")
const {validate,validateUpdate} =require ("../../../src/Validators/subscription")

describe('valid subscrition details',()=>{
    it('should be able valid subscition details',()=>{
        const result=validate(subscition_data)
        // console.log(subscition_data)
        expect(result.error).toBe(undefined)
    })
})

describe('valid update subscition details',()=>{
    it('should be able find valid details',()=>{
        const result=validateUpdate(update_subscition_data)
        // console.log(result)
        expect(result.error).toBe(undefined)
    })
})