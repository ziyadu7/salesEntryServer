const detailModel = require('../models/dataModel')
const itemModel = require('../models/itemModel')
const headerModel = require('../models/headerModel')

const getDetails = async (req, res) => {
    try {
        const { vrNo } = req.params
        const vrno = parseInt(vrNo)
        let details = {}
        details = await detailModel.findOne({
            where: { vrno: vrno },
            include: [
                {
                    model: headerModel,
                    as: 'header'
                },
                {
                    model: itemModel,
                    as: 'itemDetails'
                }
            ]
        })

        if(!details){
            details = {}
            details.header = await headerModel.findOne({where:{vrno:vrno}})
        }

        res.status(200).json({ details })
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server error" })
    }
}

const addItem = async (req, res) => {
    try {
        const { item } = req.body

        const isExist = await itemModel.findOne({ where: { itemname: item } })

        if (isExist) {
            res.status(409).json({ errMsg: "Item already exist" })
        } else {
            await itemModel.create({ itemname: item })
            res.status(200).json({ message: "Item add successfully" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server error" })
    }
}

const addHeader = async (req,res)=>{
    try {
        const {status,accName} = req.body

        // const isExist = await headerModel.findOne({where:{acname:accName}})

        // if(isExist){

        // }

        const date = new Date()
        const header = await headerModel.create({status,acname:accName,vrdate:date,acamount:0})
        res.status(200).json({header,message:"Header add successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server error" })
    }
}

const getItems = async (req, res) => {
    try {
        const items = await itemModel.findAll()
        res.status(200).json({ items })
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server error" })
    }
}

module.exports = {
    getDetails,
    addItem,
    getItems,
    addHeader
}