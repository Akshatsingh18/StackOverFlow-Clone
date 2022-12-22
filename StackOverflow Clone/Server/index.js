import  express  from "express";
import  cors from "cors";
import  mongoose  from "mongoose";
import userRouter from './Routes/user.js'
import useQuestion from './Routes/questionRoute.js'
import answerRoute from './Routes/answer.js'

const app = express();
app.use(express.json({limit: "30mb", extended: true }))
app.use(express.urlencoded({limit: "30mb", extended: true }))
app.use(cors());
mongoose.set('strictQuery', true);

app.get('/' , (req,res)=>{
    res.send("This is stack overflow clone API")
})

app.use('/user',userRouter)
app.use('/questions' , useQuestion)
app.use('/answer' , answerRoute)

const PORT = process.env.PORT || 5000

const CONNECTION_URL = "mongodb+srv://admin:admin@stackoverflow.taycsz8.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect( CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {console.log(`server running on port ${PORT}`)}))
    .catch((err) => console.log(err.message))