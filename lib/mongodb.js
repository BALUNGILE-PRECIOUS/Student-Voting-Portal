import {MongoClient} from 'mongodb'
const uri = process.env.MONGOB_URI
const options = {

}
let client 
let clientPromise

if(!process.env.MONGOB_URI){
    throw new Error('Please add your Mongo URI to env.local')
}
if(process.env.NODE_ENV==='development'){
    //in development mode, use a global variable so that the value
    //is preserved across module reloads caused by HMR(hot Module Replacement)
    if(!global._MongoClientPromise){
    client = new MongoClient(uri, options)
     global._mongoClientPromise= client.connect()
    }
    clientPromise = global._mongoClientPromise
}
else{
    //in production mode, its best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
}
//Export a module scoped MongoClient promise. By doing this in a 
//separate module, the client can be shared across functions
export default clientPromise