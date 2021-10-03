const { emit } = require("nodemon");
const db = require("../Database");

exports.getSale = async (req, res) => {
  const { id } = req.params;

  try {
    const { rows, rowCount } = await db.query(
      `SELECT * FROM sales where id = ${id}`
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

exports.getAllSales = async (req, res) => {
  try {
    const { rows, rowCount } = await db.query(`SELECT * FROM sales;`);
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

exports.getSaleProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows, rowCount } = await db.query(
      `SELECT prods.name,
      salesProd.sale_id,
      prods.id,
      salesProd.product_qt,
      salesProd.product_amount
      from sales_products salesProd 
      inner join products prods on salesProd.product_id = prods.id
      where salesProd.sale_id = ${id};`
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

exports.getAllSalesProducts = async (req, res) => {
  try {
    const { rows, rowCount } = await db.query(
      `SELECT prods.name,
      salesProd.sale_id,
	    salesProd.product_id,
      prods.id,
      salesProd.product_qt,
      salesProd.product_amount 
      from sales_products salesProd 
      inner join products prods on salesProd.product_id = prods.id;`
    );

    const byOrder = rows.reduce((groupedSale, sale) => {
      const id = sale.sale_id;
      if (groupedSale[id] == null) groupedSale[id] = [];
      groupedSale[id].push({
        product_name: sale.name,
        product_id: sale.product_id,
        product_qt: sale.product_qt,
        product_amout: sale.product_amount,
      });
      return groupedSale;
    }, {});

    return res.status(200).json({
      status: "Success",
      length: rowCount,
      data: rows,
      byOrder: byOrder,
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

exports.createSale = async (req, res) => {
  const { email, products } = req.body;

  if (!email) {
    return res.status(400).json({
      status: "Fail",
      message: "Please, email is mandatory",
    });
  }
  if (!products || !Array.isArray(products)) {
    return res.status(400).json({
      status: "Fail",
      message: "Please, products is mandatory and must an array",
    });
  }

  let totalAmount = 0;
  let totalQuantity = 0;
  const productsError = [];
  const productsCorrect = [];

  try {
    for (let product of products) {
      if (
        !product.product_id ||
        !product.product_qt ||
        product.product_id <= 0 ||
        product.product_qt <= 0
      ) {
        productsError.push(product);
      } else {
        const { rows: productInfos } = await db.query(
          `SELECT * from products where id = ${product.product_id}`
        );
        if (
          productInfos[0].quantity <= 0 ||
          productInfos[0].value == null ||
          productInfos[0].value == 0 ||
          productInfos[0].quantity < product.product_qt
        ) {
          productsError.push(product);
        } else {
          totalAmount += productInfos[0].value * product.product_qt;
          totalQuantity += product.product_qt;
          product["product_amount"] =
            productInfos[0].value * product.product_qt;
          productsCorrect.push(product);
        }
      }
    }
    if (productsCorrect.length > 0) {
      const { rows } = await db.query(
        `INSERT INTO sales (email, itensquantity, total) values ('${email}', ${totalQuantity}, ${totalAmount}) returning id;`
      );

      for (let product of productsCorrect) {
        await db.query(
          `INSERT INTO sales_products (sale_id, product_id, product_qt, product_amount) values (${rows[0].id}, ${product.product_id}, ${product.product_qt},${product.product_amount})`
        );
        await db.query(`
        UPDATE products SET quantity = (SELECT quantity from products where id = ${product.product_id}) - ${product.product_qt} where id = ${product.product_id}`);
      }

      const productsFinal =
        productsError.length > 0
          ? { productsCorrect, productsError }
          : productsCorrect;
      return res.status(201).json({
        status: "Success",
        message: `Sale ${rows[0].id} created with success.`,
        products: productsFinal,
      });
    } else {
      return res.status(400).json({
        status: "Success",
        message:
          "Sorry, I can't create this Sale, any of the items is available.",
        products: productsError,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message:
        "Internal Server Error :( Please try again later or contact support. Thanks!",
      error,
    });
  }
};

exports.updateSale = async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({
      status: "Fail",
      message: "Sorry, I only change email in already done sale.",
    });
  }

  try {
    await db.query(`UPDATE sales set email = '${email}' where id = ${id}`);
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      message:
        "Internal Server Error :( Please try again later or contact support. Thanks!",
      error,
    });
  }
};

exports.deleteSale = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM sales where id = ${id}`);
    return res.status(200).json({
      status: "Success",
      message: `Sale ${id} deleted with success.`,
    });
  } catch (error) {}
};
