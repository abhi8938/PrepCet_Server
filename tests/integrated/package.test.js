const request=require("supertest")
const {Pack}=require("../../src/Validators/package")
var{
    package_data
}=require('../data/final')

let server;

describe("/api/package",()=>{
    beforeEach(()=>{server=require("../../app")})
    afterEach(async()=>{
        server.close();
        await Pack.remove({})
    })

    describe("GET",()=>{
        it("should eb able to get all the data",async()=>{
            const pack=new Pack(package_data)
            await pack.save();

            var res=await request(server).get("/api/packages")
            expect(res.status).toBe(200)
            expect(res.body.length).toBe(1)
        })
    })

    describe("POST",()=>{
        it("Should be able to upload the data",async()=>{
            var res=await request(server).post("/api/packages")
                                        .send(package_data)

            expect(res.status).toBe(200)
            expect(res.body.discount).toBe(package_data.discount)
        })
    })

    describe("GET/:id",()=>{
        it("should eb able to get based on the id",async()=>{
            const pack=new Pack(package_data)
            await pack.save();

            var res=await request(server).get("/api/packages/"+pack._id)
            expect(res.status).toBe(200)
        })
    })

    describe("put/:id",()=>{
        it("Should be able to update the data",async()=>{
            const pack=new Pack(package_data)
            await pack.save();

            var res=await request(server).put("/api/packages/"+pack._id)
                                        .send({discount:2})
            expect(res.status).toBe(200)      
            expect(res.body.discount).toBe(2)      
        })
    })
})