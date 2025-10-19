const Invoice = require("../models/invoice");

exports.createInvoice = async (req, res) => {
  try {
    const user = req.user;
    const {
      invoiceNumber,
      invoiceDate,
      dueDate,
      billFrom,
      billTo,
      items,
      notes,
      paymentTerms,
    } = req.body;
    let subTotal = 0;
    let taxTotal = 0;
    items.forEach((item) => {
      subTotal += item.unitPrice * item.quantity;
      taxTotal +=
        (item.unitPrice * item.quantity * (item.taxPercent || 0)) / 100;
    });
    const total = subTotal + taxTotal;
    const invoice = new Invoice({
      user,
      invoiceNumber,
      invoiceDate,
      dueDate,
      billFrom,
      billTo,
      items,
      notes,
      paymentTerms,
      subTotal,
      taxTotal,
      total,
    });

    await invoice.save();
    res.status(201).json(invoice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error creating invoice", error: error.message });
  }
};

//get /api/invoices

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("user", "name email");
    res.json(invoices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error fetching invoice", error: error.message });
  }
};

//get /api/invoice/:id

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!invoice) return res.status(404).json({ message: "invoice not found" });
    res.json(invoice);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "error fetching invoice invoice",
        error: error.message,
      });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      invoiceDate,
      dueDate,
      billFrom,
      billTo,
      items,
      notes,
      paymentTerms,
      status,
    } = req.body;

    let subTotal = 0;
    let taxTotal = 0;
    if (items && items.length > 0) {
      items.forEach((item) => {
        subTotal += item.unitPrice * item.quantity;
        taxTotal +=
          (item.unitPrice * item.quantity * (item.taxPercent || 0)) / 100;
      });
    }
    const total = subTotal + taxTotal;
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      {
        invoiceNumber,
        invoiceDate,
        dueDate,
        billFrom,
        billTo,
        items,
        notes,
        paymentTerms,
        status,
        subTotal,
        taxTotal,
        total,
      },
      {
        new: true,
      }
    );
    if (!updatedInvoice)
      return res.status(404).json({ message: "invoice not found" });

    res.json(updatedInvoice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "error updating invoice", error: error.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) return res.status(404).json({ message: "invoice not found" });
    res.json({ message: "Invoice deleted sucessfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "error deleting invoice", error: error.message });
  }
};
