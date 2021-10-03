const db = require("../Database");

exports.createProduct = async (req, res) => {
  const { name, description, quantity, value, image } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "Fail",
      message: "Sorry, name of products is mandatory",
    });
  }

  if (isNaN(quantity)) {
    return res.status(400).json({
      status: "Fail",
      message: "Sorry, quantity must be a number.",
    });
  }

  try {
    await db.query(
      `INSERT INTO products (name, description, quantity, value, image) values('${name}','${description}', ${quantity},  ${value}, '${image}')`
    );
    return res.status(201).json({
      status: "Success",
      message: `Product '${name}' created with success.`,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message:
        "Internal Server Error :( Please try again later or contact support. Thanks!",
      error,
    });
  }
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await db.query(
      `select * from products where id = ${id}`
    );
    return res.status(200).json({
      status: "Success",
      length: rowCount,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message:
        "Internal Server Error :( Please try again later or contact support. Thanks!",
      error,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const { rows, rowCount } = await db.query(
      `SELECT * FROM products ORDER BY id`
    );

    return res.status(200).json({
      status: "Success",
      length: rowCount,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message:
        "Internal Server Error :( Please try again later or contact support. Thanks!",
      error,
    });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, description, quantity, value } = req.body;

  try {
    if (name)
      await db.query(`UPDATE products SET name = '${name}' where id = ${id}`);
    if (description)
      await db.query(
        `UPDATE products SET description = '${description}' where id = ${id}`
      );
    if (quantity)
      await db.query(
        `UPDATE products set quantity = ${quantity} where id = ${id}`
      );

    if (value)
      await db.query(`UPDATE products set value = ${value} where id = ${id}`);

    return res.status(200).json({
      status: "Success",
      message: `Product ${id} updated with success.`,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message:
        "Internal Server Error :( Please try again later or contact support. Thanks!",
      error,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM products where id = ${id}`);
    return res.status(200).json({
      status: "Success",
      message: `User ${id} deleted with success.`,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message:
        "Internal Server Error :( Please try again later or contact support. Thanks!",
      error,
    });
  }
};

exports.getSellableProduct = async (req, res) => {
  try {
    const { rows, rowCount } = await db.query(
      `SELECT * FROM products where quantity > 0 and value is not null;`
    );
    return res.status(200).json({
      status: "Success",
      length: rowCount,
      data: rows,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message:
        "Internal Server Error :( Please try again later or contact support. Thanks!",
      error,
    });
  }
};
