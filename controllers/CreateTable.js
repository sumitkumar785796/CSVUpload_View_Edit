const db = require("../utils/db");
const path = require("path");
const csv = require("fast-csv");
const fs = require("fs");
const uploadFileMiddleware = require("../middleware/uploadFileMiddleware");
const reactPage = async (req,res)=>{
    try {
        res.sendFile(path.resolve(__dirname,'..',"client","build","index.html"))
    } catch (error) {
        console.error(error)
    }
}
const uploadCSVFileAutoCreateTableAndInsert = async (req, res) => {
  try {
    uploadFileMiddleware(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ message: "Error file uploading" });
      }
      console.log(req.file.path);
      const filePath = path.join(
        __dirname,
        "../public/upload",
        req.file.filename
      );
      await UploadCSV(filePath);
      res
        .status(200)
        .json({ message: "File uploaded and processed successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

const UploadCSV = async (filePath) => {
  const stream = fs.createReadStream(filePath);
  const csvDataColl = [];

  const fileStream = csv
    .parse({ headers: true }) // Treat the first row as headers
    .on("data", function (data) {
      csvDataColl.push(data);
    })
    .on("end", async function () {
      try {
        // Extract headers from the CSV file
        const headers = Object.keys(csvDataColl[0]);

        // Generate a dynamic table name based on the current timestamp
        const tableName = `csv_table_${Date.now()}`;

        // Generate a dynamic CREATE TABLE query
        const createTableQuery = `CREATE TABLE ${tableName} (${headers
          .map((header) => `${header} VARCHAR(255)`)
          .join(", ")})`;

        // Execute the CREATE TABLE query
        await db.execute(createTableQuery);

        // Generate a dynamic INSERT INTO query
        const insertQuery = `INSERT INTO ${tableName} (${headers.join(
          ", "
        )}) VALUES (${headers.map(() => "?").join(", ")})`;

        // Iterate through CSV data and execute the INSERT INTO query for each row
        for (const row of csvDataColl) {
          const values = headers.map((header) => row[header]);
          await db.execute(insertQuery, values);
        }
        console.log(
          `Table '${tableName}' created and CSV data inserted into the database successfully.`
        );
      } catch (error) {
        console.error(
          "Error creating table and inserting CSV data into the database:",
          error
        );
      }
    })

  stream.pipe(fileStream);
}
const showTables = async (req,res) =>{
  try {
    const view ="show tables"
    const [row,field]=await db.execute(view)
    res.status(200).json({message:row})
  } catch (error) {
    res.status(500).json({message:'Internal server error'})
  }
}
const showSingleTable = async(req,res)=>{
  try {
    const {id}=req.params
    const view = `select * from ${id}`
    const [row,field]= await db.execute(view)
    res.status(200).json({message:row})
  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Internal server error'})
  }
}
const showSingleRecord = async (req,res)=>{
  try {
    const {tableid}=req.params
    const {id}=req.params
    const view = `select * from ${tableid} where id=?`
    const [row,field]= await db.execute(view,[id])
    res.status(200).json({message:row})
  } catch (error) {
    res.status(500).json({message:'Internal server error'})
  }
}
const editRecord = async (req, res) => {
  try {
    const { tableid, rowId } = req.params
    const { newData } = req.body
    const updateQuery = `UPDATE ${tableid} SET ${Object.keys(newData)
      .map((column) => `${column} = ?`)
      .join(", ")} WHERE id = ?`;

    // Extract values from newData and append the rowId at the end
    const values = [...Object.values(newData), rowId]
    const [row,field] = await db.execute(updateQuery, values)
    res.status(200).json({ message: "Record updated successfully" })
  } catch (error) {
    console.log(error)
    console.error("Error updating record:", error);
    res.status(500).json({ message: "Internal Server Error" })
  }
}
const dropTable = async (req,res)=>{
  try {
    const {id}=req.params
    const view = `drop tables ${id}`
    const [row,field]= await db.execute(view)
    res.status(200).json({message:'Delete successfully...', view:row})
  } catch (error) {
    console.log(error)
  }
}
module.exports = {reactPage, uploadCSVFileAutoCreateTableAndInsert , showTables , showSingleTable ,showSingleRecord, dropTable,editRecord};
