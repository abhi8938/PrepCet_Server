const {
    Order,
    validate
}=require("../Validators/orders")

const post_order=async (req, res)=>{
    // console.log("Working")
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    req.body.STID=req.user._id
    // console.log(req.body)
    let order=new Order(req.body)
    order=await order.save()

    res.status(200).send(order)
}

const get_orders=async (req, res)=>{
    const orders=await Order.find({STID:req.user._id})
    res.status(200).send(orders)
}

const get_order=async(req,res)=>{
    const order=await Order.find({STID:req.user._id,_id:req.params.id})
    res.status(200).send(order)
}

module.exports = {
    post_order,
    get_order,
    get_orders
}