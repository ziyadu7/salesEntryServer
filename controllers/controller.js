const detailModel = require('../models/dataModel')
const itemModel = require('../models/itemModel')
const headerModel = require('../models/headerModel')

const getDetails = async (req, res) => {
    try {
        const { vrNo } = req.params
        const vrno = parseInt(vrNo)
        let details = []
        let header = {}
        details = await detailModel.findAll({
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
        if (details.length == 0) {
            header = await headerModel.findOne({ where: { vrno: vrno } })
        }

        res.status(200).json({ details, header })
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server error" })
    }
}

const addItem = async (req, res) => {
    try {
        const { item, price } = req.body

        const isExist = await itemModel.findOne({ where: { itemname: item } })

        if (isExist) {
            res.status(409).json({ errMsg: "Item already exist" })
        } else {
            await itemModel.create({ itemname: item, price: price })
            res.status(200).json({ message: "Item add successfully" })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server error" })
    }
}

const addHeader = async (req, res) => {
    try {
        const { status, accName } = req.body

        // const isExist = await headerModel.findOne({where:{acname:accName}})

        // if(isExist){

        // }

        const date = new Date()
        const header = await headerModel.create({ status, acname: accName, vrdate: date, acamount: 0 })
        res.status(200).json({ header, message: "Header add successfully" })
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server error" })
    }
}

const addDetails = async (req, res) => {
    try {
        const { qty, item, vrno } = req.body

        const isExist = await detailModel.findOne({ where: { item: item.itemcode, vrno: vrno } })

        if (isExist) {

        } else {
            const details = await detailModel.create()
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ errMsg: "Server error" })
    }
}

const saveDate = async (req, res) => {
    try {
        const { header, details, status, totalPrice} = req.body
        await headerModel.update({ status, acamount: totalPrice }, { where: { vrno: header?.vrno } })
        
        for(const detail of details){
            await detailModel.create({vrno:header?.vrno,item:detail?.itemDetails?.itemcode,rate:detail?.rate,qty:detail?.qty})
        }

        res.status(200).json({message:"Report add successfully"})

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
    addHeader,
    addDetails,
    saveDate
}