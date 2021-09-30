const mysql = require("mysql");

//Connection Pool
let pool = mysql.createPool({
  connectionlimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

//view Users
exports.view = (req, res) => {
  //Connect to DB
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    //User the connection
    connection.query(
      'SELECT * FROM user where status="active"',
      (err, rows) => {
        //when done with the connection release it
        connection.release();
        if (!err) {
          let removedUser = req.query.removed;
          res.render("home", { rows, removedUser });
        } else {
          console.log(err);
        }
      }
    );
  });
};

//Find User by Seacrh
exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    let searchTerm = req.body.search;
    //User the connection
    connection.query(
      "SELECT * FROM user WHERE name LIKE ? OR email LIKE ?",
      ["%" + searchTerm + "%", "%" + searchTerm + "%"],
      (err, rows) => {
        if (!err) {
          res.render("home", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};

exports.from = (req, res) => {
  res.render("add-user");
};

//Add new user
exports.create = (req, res) => {
  const { name, email, password, phone, comments } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);

    let searchTerm = req.body.search;

    //User the connection
    connection.query(
      "INSERT INTO user SET name = ?, email = ?, password = ?, phone = ?, comments = ?",
      [name, email, password, phone, comments],
      (err, rows) => {
        if (!err) {
          res.render("add-user", { alert: "User added successfully." });
        } else {
          console.log(err);
        }
      }
    );
  });
};

//edit user
exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    //User the connection
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        if (!err) {
          res.render("edit-user", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};

//Update User
exports.update = (req, res) => {
  const { name, email, password, phone, comments } = req.body;
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    connection.query(
      "UPDATE user SET name=?,email=?,password=?,phone=?,comments=? WHERE id=?",
      [name, email, password, phone, comments, req.params.id],
      (err, rows) => {
        if (!err)
          //User the connection
          connection.query(
            "SELECT * FROM user where id = ?",
            [req.params.id],
            (err, rows) => {
              //when done with the connection release it
              connection.release();
              if (!err) {
                res.render("edit-user", {
                  rows,
                  alert: `${name} has been updated.`,
                });
              } else {
                console.log("error" + err);
              }
            }
          );
        else {
          console.log(err);
        }
      }
    );
  });
};

//Delete User
exports.delete = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    //User the connection
    connection.query(
      "UPDATE user SET status = ? WHERE id = ?",
      ["removed", req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          let removedUser = encodeURIComponent("User successeflly removed.");
          res.redirect("/?removed=" + removedUser);
        } else {
          console.log(err);
        }
        console.log("The data from beer table are: \n", rows);
      }
    );
  });
};

//View User
exports.viewall = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);
    //User the connection
    connection.query(
      "SELECT * FROM user WHERE id = ?",
      [req.params.id],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("view-user", { rows });
        } else {
          console.log(err);
        }
      }
    );
  });
};
