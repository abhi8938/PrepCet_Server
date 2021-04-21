const request=require("supertest")
const {
    subscition_data,
    student_data,
    package_data,
    validateprogram_data
}=require("../data/final")
const {Subscript}=require("../../src/Validators/subscription")
const {Student}=require("../../src/Validators/student")
const {Pack}=require("../../src/Validators/package")
const path=require('path')

let server;

describe("/api/subscriptions",()=>{
    beforeEach(() => {server=require("../../app");})
    afterEach(async()=>{
        server.close();
        await Student.remove({});
        await Subscript.remove({})
        await Student.remove({})
        await Pack.remove({})
    })
    
    describe("GET",()=>{
        it("should be able to get the subsription data",async()=>{
            const student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            const pack=new Pack(package_data)
            await pack.save()

            subscition_data.STID=student._id
            subscition_data.PID=pack._id
            const sub=new Subscript(subscition_data)
            await sub.save()

            const res=await request(server).get("/api/subscriptions") 
                                    .set("x-auth-token",token)
            expect(res.status).toBe(200)
        })
    })

    describe("GET /me",()=>{
        it("should be able to get my subsription",async()=>{
            const student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            const pack=new Pack(package_data)
            await pack.save()

            subscition_data.STID=student._id
            subscition_data.PID=pack._id
            const sub=new Subscript(subscition_data)
            await sub.save()

            const res=await request(server).get("/api/subscriptions/me") 
                                    .set("x-auth-token",token)
            expect(res.status).toBe(200)
        })
    })

    describe("POST",()=>{
        it("Should be able to upload the subsription data",async()=>{
            const student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            const pack=new Pack(package_data)
            await pack.save()

            subscition_data.STID=String(student._id)
            subscition_data.PID=String(pack._id)
            delete subscition_data.expiration
            delete subscition_data.STID

            const res=await request(server).post("/api/subscriptions") 
                                    .set("x-auth-token",token)
                                    .send(subscition_data)
            expect(res.status).toBe(200)
            console.log(res.text)
        })
    })

    describe("PUT",()=>{
        it("should be able to update the subsription data",async()=>{
            const student=new Student(student_data)
            await student.save()
            const token=student.generateAuthToken()

            const pack=new Pack(package_data)
            await pack.save()

            subscition_data.STID=student._id
            subscition_data.PID=pack._id
            subscition_data.expiration=new Date()
            const sub=new Subscript(subscition_data)
            await sub.save()

            const res=await request(server).put("/api/subscriptions/me")
                                    .set("x-auth-token",token)
                                    .send({
                                        "PA_ID":"6078116ee9738d8370db0f56",
                                        "status":"ACTIVE"
                                    })
            expect(res.status).toBe(200)
        })
    })
})