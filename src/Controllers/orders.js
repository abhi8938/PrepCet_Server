const {
    Order,
    validate
}=require("../Validators/orders")

const post_order=async (req, res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    req.body.STID=req.user._id
    let order=new Order(req.body)
    order=await order.save()

    res.status(200).send(order)
}

module.exports = {
    post_order
}