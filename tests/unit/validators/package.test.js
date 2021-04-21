const {package_data} =require ("../../data/sample_data")
const {validate,validateUpdate} =require ("../../../src/Validators/package")

describe('package data validating function',()=>{
    it('validate package data function',()=>{
        const result=validate(package_data)
        expect(result.error).toBe(undefined)
    })

    it('validate update function',()=>{
        const result=validateUpdate(package_data)
        expect(result.error).toBe(undefined)
    })
})