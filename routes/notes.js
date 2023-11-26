const express = require("express");
const router = express.Router();
const fetchuser=require("../middleware/fetchuser")
const Note=require("../model/Note")
// 1 route that fetch all the notes by created by user that send request to this path api/notes/fetchallnotes 
router.get("/fetchallnotes",fetchuser,async (request, response) => {
  // make this post request to get request to display the above 2 lines code
  // console.log("notes path from backend");
  // response.send("from notes path backend");
try {

const notes=await Note.find({user:request.user.id}) 
   response.json(notes)
} catch (error) {
  console.log("error in api/notes/fetchallnotes"+error)
}

});

//2 route api/notes/addnote
router.post("/addnote",fetchuser,async(request,response)=>{
try {
  const {title,description,tag}=request.body
  const note= new Note({title,description,tag,user:request.user.id})
   const savedData =await note.save()
   response.json(savedData)
} catch (error) {
  console.log("error in api/notes/addnote"+error)
}
})
//3 route api/notes/updatenote/7fd877sgy78sg87sdfg8sd  that update the note and it takes id of note in params by using put request
router.put("/updatenote/:id",fetchuser,async(request,response)=>{
  try {
    const {title,description,tag}=request.body
    const newNote={}
    if(title){newNote.title=title}
    if(description){newNote.description=description}
    if (!request.params.id) {
      return response.status(400).json({ error: "Note ID is missing in the request." });
    }

    if(tag){newNote.tag=tag}
    let note = await Note.findById(request.params.id)
    if(!note){
      return response.status(401).send("Not Found")
    }
    // authenticate that it is the user that create this note (no other user update the notes of any user) 
    //there is a user field in note collection
    if(note.user.toString()!==request.user.id){
      return response.status(401).send("Not Allowed")
    }

    note= await Note.findByIdAndUpdate(request.params.id,{$set:newNote},{new:true})
    response.json(note)
  } catch (error) {
    console.log("error in api/notes/updatenote/:id"+error)
  }
})
//4 route api/notes/deletenote  that delete the note and it takes id of note in params by using delete request
router.delete("/deletenote/:id",fetchuser,async(request,response)=>{
try {
  if (!request.params.id) {
    return response.status(400).json({ error: "Note ID is missing in the request." });
  }
  let note= await Note.findById(request.params.id)
  if(!note){
    return response.status(401).send("Not found")
  }
  if(note.user.toString()!==request.user.id){
    return response.status(401).send("not found")
  }
  note=await Note.findByIdAndDelete(request.params.id)

   response.json({"success":"Your note has been deleted",note:note})
  
} catch (error) {
  console.log("error in api/notes/deletenote/:id"+error)
}
})
module.exports = router;
