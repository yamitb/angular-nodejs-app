const db = require('../db.js');

var con = db();
var getItemsQuery = "SELECT * FROM items WHERE userId = ?";
var getItemsCountQuery = "SELECT COUNT(*) FROM items WHERE userId = ?";
var getItemsQueryWithPagination = "SELECT * FROM items WHERE userId = ? LIMIT ?,?";
var addItemQuery = "INSERT INTO items (type,size,color,gender,city,imagePath,userId) VALUES (?, ?, ?, ?, ?, ?, ?)";
var deleteItemQuery = "DELETE FROM items WHERE id = ? AND userId = ?";
var updateItemQuery = "UPDATE items SET type = ?, size = ?, color = ?, gender = ?, city = ?,imagePath = ? WHERE id = ?";


exports.getItems = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  let fetchedItems;
  console.log(pageSize)
  console.log(currentPage)
  let query;
  if(pageSize != null && currentPage !=null){
    query = getItemsQueryWithPagination;
  }else{
    query = getItemsQuery;
  }
  const userId = req.userData.userId;
  console.log("getttttttt items db");
  con.query(query, [userId,pageSize * (currentPage),pageSize], function (err, result) {
    if (err) throw err;
    fetchedItems = result;
    con.query(getItemsCountQuery, [userId], function (err, count) {
      if (err) throw err;
      res.status(200).json({
        message: 'Items fetched succesfully!',
        items: fetchedItems,
        maxItems: count[0]["COUNT(*)"]
      });
    });
  });
}

exports.addItem = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  let item = req.body;
  console.log("item server");
  console.log(req.userData);
  item.userId = req.userData.userId;
  item.imagePath = url + "/images/" + req.file.filename;
  console.log(item);
  con.query(addItemQuery, [item.type, item.size, item.color,item.gender,item.city,item.imagePath,item.userId], function (err, result, fields) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Creating a item failed!',
      });
    }
    console.log(result);
    res.status(201).json({
      message: 'Item added successfully',
      item: {
        ...item,
        id: result.insertId
      },
    });
  });
}

exports.deleteItem = (req, res, next) => {
  const userId = req.userData.userId;
  console.log("delete from db");
  console.log(req.params.id);
  con.query(deleteItemQuery, [req.params.id,userId], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Deleting a item failed!',
      });
    }
    console.log(result);
    res.status(200).json({
      message: "Item deleted!"
    });
  });
}

exports.updateItem = (req, res, next) => {
  let item = req.body;
  console.log("update item db");
   console.log(item);
   console.log(req.file);
   if(req.file){
    const url = req.protocol + '://' + req.get("host");
    item.imagePath = url + "/images/" + req.file.filename;
   }
  con.query(updateItemQuery, [item.type, item.size, item.color, item.gender, item.city, item.imagePath,item.id], function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        message: 'Updeting an item failed!',
      });
    }
    console.log(result);
    res.status(200).json({
      message: "Item updated!",
      item: {
        ...item
      }
    });
  });
}