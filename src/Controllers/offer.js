const {
    Offer,
    validate
}=require("../Validators/offer")

const post_offer=async(req,res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let offer=new Offer(req.body)
    offer=await offer.save()

    res.status(200).send(offer)
}

const get_offers=async(req,res)=>{
    const offers=await Offer.find(req.query)
    res.status(200).send(offers)
}

const get_offer=async(req,res)=>{
    const offer=await Offer.findById(req.params.id)
    res.status(200).send(offer)
}

module.exports={
    post_offer,
    get_offer,
    get_offers
}