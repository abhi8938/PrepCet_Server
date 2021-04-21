const {Student,validateUpdate,validateAuth,validate} =require ("../../../src/Validators/student")
const jwt =require ("jsonwebtoken")
const config =require ("config")
const mongoose =require ("mongoose")
const {student_data} =require ("../../data/sample_data")

describe('student.generateAuthtoken',()=>{
    it('should return a valid JWT',()=>{
        const paylod={_id:new mongoose.Types.ObjectId().toHexString(),isAdmin:true}
        const user =new Student(paylod)
        const token =user.generateAuthToken();
        const decode=jwt.verify(token,config.get('jwtPrivateKey'))
        expect(decode).toMatchObject(paylod)
    })
})

describe('validate the student details',()=>{
    it('should check if the all the data is proper',()=>{
        const result=validate(student_data)
        expect(result.error).toBe(undefined)
    })
})

// describe('validate authenticating details',()=>{
//     it('should accept proper email and password of min 5 and max 1024',()=>{
//         // console.log(student_data['email'])
//         let details={
//             email:student_data['email'],
//             password:student_data['password']
//         }
//         const result=validate(details)
//         expect(result.error).toBe(undefined)
//     })

    
// })

describe('student validate update field',()=>{
    it('should detect proper input field',()=>{
        let details={
            contact:student_data['contact'],
            email:student_data['email'],
            password:student_data['password'],
            device_token:student_data['device_token'],
            semester:student_data['semester']
        }
        // console.log(details)
        const result=validateUpdate(details)
        expect(result.error).toBe(undefined)
    })
    
})