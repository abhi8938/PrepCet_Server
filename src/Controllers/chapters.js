const {
    Chapter,
    validate,
    validateUpdate
}=require("../Validators/chapters")
const {generateKeywords,handleUpdate}=require("../Services/algo")

const fs=require("fs")

const post_chapter=async (req, res)=>{
    if(req.user.isAdmin==true) throw new Error("You are not allowed to upload the data")
    const {error}=validate(req.body)
    if(error) throw new Error(error.details[0].message)

    let chapter=new Chapter(req.body)
    await chapter.save()
    res.status(200).send(chapter)
}

const get_chapters=async (req, res)=>{
    let chapters=await Chapter.find(req.body).sort("chapter_no")
    res.status(200).send(chapters)
}

const get_chapter=async (req, res)=>{
    let chapters=await Chapter.findById(req.params.id)
    res.status(200).send(chapters)
}

const update_chapter=async (req, res)=>{
    if(req.user.isAdmin==true) throw new Error("You are not allowed to edit the data")

    const {error}=validateUpdate(req.body)
    if(error) throw new Error(error.details[0].message)

    let chapter=await Chapter.findById(req.params.id)

    handleUpdate(chapter,req.body)
    chapter=await chapter.save()
    res.status(200).send(chapter)
}

const video_stream=async(req, res)=>{
    const range = req.headers.range;
        if (!range) {
            res.status(400).send("Requires Range header");
        }

        // get video stats (about 61MB)
        const videoPath = "uploads/"+req.params.id;
        const videoSize = fs.statSync(videoPath).size;

        // Parse Range
        // Example: "bytes=32324-"
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        // Create headers
        const contentLength = end - start + 1;
        const headers = {
            "Content-Range": `bytes ${start}-${end}/${videoSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        };

        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);

        // create video read stream for this particular chunk
        const videoStream = fs.createReadStream(videoPath, { start, end });

        // Stream the video chunk to the client
        videoStream.pipe(res);
}

module.exports = {
    post_chapter,
    get_chapters,
    get_chapter,
    update_chapter,
    video_stream
}