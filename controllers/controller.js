const detailModel = require('../models/dataModel')

const getDetails = async(req,res)=>{
    try {
        const {vrNo} = req.params
        
        const details = await detailModel.findOne({where:{vrNo:vrNo}})
        res.status(200).json({details})
    } catch (error) {
        console.log(error);
        res.status(500).json({errMsg:"Server error"})
    }
}

module.exports = {
    getDetails
}