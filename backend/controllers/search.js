const db = require('../db.js');

var con = db();
var searchItemsQuery = "SELECT * FROM items WHERE type = ? && size = ? && color = ? && gender = ? && city = ? ";

var searchItemsCountQuery = "SELECT COUNT(*) FROM items WHERE type = ? && size = ? && color = ? && gender = ? && city = ?";
var searchItemsQueryWithPagination = "SELECT * FROM items WHERE type = ? && size = ? && color = ? && gender = ? && city = ? LIMIT ?,?";



// var addItemQuery = "INSERT INTO items (type,size,color,gender,city,imagePath,userId) VALUES (?, ?, ?, ?, ?, ?, ?)";
// var deleteItemQuery = "DELETE FROM items WHERE id = ? AND userId = ?";
// var updateItemQuery = "UPDATE items SET type = ?, size = ?, color = ?, gender = ?, city = ?,imagePath = ? WHERE id = ?";



exports.searchItems = (req, res, next) => {
  console.log("item from search db");
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const type = req.query.type;
  const size = req.query.size;
  const color = req.query.color;
  const gender = req.query.gender;
  const city = req.query.city;

  let fetchedItems;
  console.log(pageSize)
  console.log(currentPage)
  console.log(type)
  console.log(color)
  console.log(size)
  console.log(gender)
  console.log(city)

  let query;
  if(pageSize != null && currentPage !=null){
    query = searchItemsQueryWithPagination;
  }else{
    query = searchItemsQuery;
  }
  const userId = req.userData.userId;
  console.log("search items db");
  con.query(query, [type,size,color,gender,city,pageSize * (currentPage),pageSize], function (err, result) {
    if (err) throw err;
    fetchedItems = result;
    console.log("result searchhhhhhhhhh");
    console.log(fetchedItems);
    con.query(searchItemsCountQuery, [type,size,color,gender,city], function (err, count) {
      if (err) throw err;
      res.status(200).json({
        message: 'Items fetched succesfully!',
        items: fetchedItems,
        maxItems: count[0]["COUNT(*)"]
      });
    });
  });
}