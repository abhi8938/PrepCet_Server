const {
    Vocab,
    validate
}=require("../Validators/vocab")

const post_vocab=async(req, res)=>{
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let vocab=new Vocab(req.body)
    vocab=await vocab.save()

    res.status(200).send(vocab)
}

const get_vocab=async(req, res)=>{
    const vocab=await Vocab.findById(req.params.id)
    if(!vocab) throw new Error("They are no vocabs based on this ID")
    res.status(200).send(vocab)
}

const get_vocabs=async(req, res)=>{
    const vocabs=await Vocab.find(req.query)
    res.status(200).send(vocabs)
}

const del_vocab=async(req, res)=>{
    const vocab=await Vocab.findById(req.params.id)
    if(!vocab) throw new Error("They are no vocabs based on this ID")
    await Vocab.findByIdAndDelete(req.params.id)
    res.status(200).send(vocab)
}

module.exports = {
    del_vocab,
    get_vocabs,
    get_vocab,
    post_vocab      
}