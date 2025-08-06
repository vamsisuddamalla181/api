import express from 'express'
import usercontroller from '../Controller/usercontroller'
const route=express.Router()
route.post("/post",usercontroller.userrgister)
route.get("/getone/:id",usercontroller.find)
export default route