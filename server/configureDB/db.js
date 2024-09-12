const mongoose=require('mongoose')
const configureDB=async(req,res)=>{
    try{
    const db=await mongoose.connect('mongodb+srv://krishnalasyatalluri9:lasya0425@goodsify.dvahc.mongodb.net/?retryWrites=true&w=majority&appName=Goodsify')
    console.log('db connected')
    }
    catch(e){
        console.log(e.message)
    }

}
module.exports=configureDB