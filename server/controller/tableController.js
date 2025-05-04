const { tableModel } = require('../database/db')
const Log = require('./logController')
const addTable = async (req, res) => {

    try {
        const { name, total_table, table_size } = req.body
        if (!name)
            return res.status(422).json({ message: "The name of the room is required.", flag: false })
        if (!total_table)
            return res.status(422).json({ message: "The total number of table is not specified.", flag: false })
        if (!table_size)
            return res.status(422).json({ message: "The size per table contain is required.", flag: false })
        const checkTable = await tableModel.findOne({ name: name })
        if (!checkTable) {
            const newTable = await tableModel.create({ name, total_table, table_size })
            if (!newTable)
                res.status(501).json({ message: "The table is not created, Try in sometime", flag: false })
            const m = `Table is created with name ${name} and total table is ${total_table}`
           await Log.init_req(m, req)
            return res.status(201).json({ message: "The table is added succesfully", flag: true })

        }
        else
            return res.status(422).json({ message: `The table with name: ${name} already exist`, flag: false })
    }
    catch (err) {
        return res.status(500).json({ message: err, flag: false })
    }


}

// i want to make it like when user enter some query then based on query it will reply or just give the entire data

const showTable = async(req,res)=>{
    const query = req.query
    if(Object.keys(query).length > 0)
    {
        return res.status(200).json({message:"for temporary",flag:true})
    }else{
        const d = await tableModel.find({})
        if(d.length > 0 && d)
        {
            return res.status(200).json({data:d,message:"ok",flag:true})
        }
        if(d.length == 0)
        {
            return res.status(200).json({message:"There is not table yet created",flag:false})
        }
        if(!d)
        {
            return res.status(500).json({message:"Some Error happen try in sometime",flag:false})
        }

    }
}

const deleteTable = async (req, res) => {
    console.log("req aya delete ka ")
    try {
      const { id } = req.params;
  
      if (!id) {
        return res.status(422).json({ message: "Table ID is required", flag: false });
      }
  
      const checkTable = await tableModel.findById(id);
  
      if (!checkTable) {
        return res.status(404).json({ message: "Table doesn't exist", flag: false });
      }
      await tableModel.findByIdAndDelete(id);
      const m = `The table: ${checkTable.name} that has total: ${checkTable.table_size.length} is deleted.`
      Log.init_req(m,req)
      return res.status(200).json({ message: "Table deleted successfully", flag: true });
    } catch (error) {
      console.error("Error deleting table:", error);
      return res.status(500).json({ message: "Internal server error", flag: false });
    }
  };
  

module.exports = { addTable, showTable, deleteTable }