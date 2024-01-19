const detailModel = require('../models/dataModel')
const itemModel = require('../models/itemModel')

const getDetails = async(req,res)=>{
    try {
        const {vrNo} = req.params
        
        const details = await detailModel.findOne({where:{vrno:vrNo}})
        res.status(200).json({details})
    } catch (error) {
        console.log(error);
        res.status(500).json({errMsg:"Server error"})
    }
}

const addItem = async (req,res)=>{
    try {
        const {item} = req.body

        const isExist = await itemModel .findOne({where:{itemname:item}})

        if(isExist){
            res.status(409).json({errMsg:"Item already exist"})
        }else{
            await itemModel.create({itemname:item})
            res.status(200).json({message:"Item add successfully"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({errMsg:"Server error"})
    }
}

const getItems = async (req,res)=>{
    try {
        const items = await itemModel.findAll()
        res.status(200).json({items})
    } catch (error) {
        console.log(error);
        res.status(500).json({errMsg:"Server error"})
    }
}

module.exports = {
    getDetails,
    addItem,
    getItems
}