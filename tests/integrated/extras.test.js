const request=require('supertest')
const {
    BMessage,
    Legal
}=require("../../src/Validators/extra")
const {Student}=require("../../src/Validators/student")
const {
    extra_message_data,
    student_data
}=require("../data/final")

let server;

describe("/api/extras",()=>{
    beforeEach(() => {server=require("../../app");})
    afterEach(async()=>{
        server.close();
        await BMessage.remove({});
        await Legal.remove({})
        await Student.remove({})
    })

    describe("POST /bmessage",()=>{
        it("should be able to uplaod the meesage data",async()=>{
            var student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            var res=await request(server).post("/api/extras/bmessage")
                                            .send(extra_message_data)
                                            .set('x-auth-token',token)
            expect(res.status).toBe(200)
        })
    })

    describe("GET /bmessage",()=>{
        it("should be able to get tha data based on the id",async()=>{
            var message=new BMessage(extra_message_data)
            await message.save()

            var student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            var res=await request(server).get("/api/extras/bmessage")
                                        .set('x-auth-token',token)

            expect(res.status).toBe(200)
        })
    })

    // describe("PUT /bmessage",()=>{
    //     it("should be able to update the data based on the id",async()=>{
    //         var message=new BMessage(extra_message_data)
    //         await message.save()

    //         var student=new Student(student_data)
    //         await student.save()
    //         const token=student.generateAuthToken()

    //         var res=await request(server).put("/api/extras/bmessage/"+message._id)
    //                                     .send({title:"This is new title"})
    //                                     .set('x-auth-token',token)
    //         expect(res.status).toBe(200)
    //     })
    // })

    // describe("POST /sendMail",()=>{
    //     it("should be able to send the data through mail",async()=>{
    //         var student=new Student(student_data)
    //         await student.save()
    //         const token=student.generateAuthToken()
    //         console.log(student.email)

    //         var res=await request(server).post("/api/extras/sendMail")
    //                                     .send({
    //                                         recipent:student.email,
    //                                         subject:"This is a trail email",
    //                                         body:"This is the bosy of the mail"
    //                                     })
    //                                     .set('x-auth-token',token)
    //         expect(res.status).toBe(200)
    //         console.log(res.body)
    //     })
    // })

    // describe("/sendSMS",()=>{
    //     it("should be ble to send the code to phone",async()=>{
    //         var student=new Student(student_data)
    //         await student.save()

    //         var res=await request(server).post("/api/extras/sendSMS")  
    //                                     .send({
    //                                         message:"This is a good message",
    //                                         recipent:8885623730
    //                                     })

    //         expect(res.status).toBe(200)
    //     })
    // })
})