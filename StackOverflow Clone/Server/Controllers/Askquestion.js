import mongoose from 'mongoose';
import question from '../Models/question.js';

export const Askquestion = async (req,res)=>{
    const postQuestionData = req.body;
    const postQuestion = new question(postQuestionData)
    try{
        await postQuestion.save();
        res.status(200).json("Posted Question Successfully");
    }
    catch(error)
    {
        console.log(error);
        res.status(409).json("Couldnt post a new question");
    }
}

export const FetchAllQuestion = async(req , res) => {
    try{
        const questionList = await question.find();
        res.status(200).json(questionList);
    }
    catch(error){
        console.log(error);
        res.status(404).json({message:error.message});
    }
}

export const deleteQuestion = async (req, res) => {
    const { id:_id } = req.params ;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }

    try {
        await question.findByIdAndRemove( _id );
        res.status(200).json({ message: "successfully deleted..."})
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message })
    }
}

export const VoteQuestion = async(req , res) => {
    const { id : _id} = req.params
    const {value , userId} = req.body ;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('question unavailable...');
    }

    try{
        const ques = await question.findById(_id)
        const upIndex = ques.upVote.findIndex((id) => id === String(userId))
        const downIndex = ques.downVote.findIndex((id) => id === String(userId)) 

        if(value === "upVote")
        {
            if(downIndex !== -1)
            {
                ques.downVote = ques.downVote.filter((id)=> id !== String(userId))
            }
            if(upIndex === -1)
            {
                ques.upVote.push(userId)
            }
            else
            {
                ques.upVote = ques.downVote.filter((id)=> id!== String(userId))
            }
        }
        else 
        {
            if(upIndex !== -1)
            {
                ques.upVote = ques.upVote.filter((id)=> id !== String(userId))
            }
            if(downIndex === -1)
            {
                ques.downVote.push(userId)
            }
            else
            {
                ques.downVote = ques.upVote.filter((id)=> id!== String(userId))
            }
        }
        await question.findByIdAndUpdate(_id , ques)
        res.status(200).json({message : "voted successfully..."})

    }
    catch(error)
    {
        res.status(404).json({message : "id not found"})
        console.log(error);
    }
}