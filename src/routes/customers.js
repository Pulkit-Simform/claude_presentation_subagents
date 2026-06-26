const { Router } = require("express");
const prisma = require("../db");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.render("customers/index", { customers, title: "Customers" });
  } catch (err) {
    next(err);
  }
});

router.get("/new", (req, res) => {
  res.render("customers/create", { title: "New Customer", customer: {} });
});

router.get("/:id", async (req, res, next) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.id) },
      include: { contacts: true, deals: true },
    });
    if (!customer) return next();
    res.render("customers/show", { customer, title: customer.name });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const customer = await prisma.customer.create({
      data: req.body,
    });
    res.redirect(`/customers/${customer.id}`);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const customer = await prisma.customer.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!customer) return next();
    res.render("customers/edit", { customer, title: `Edit ${customer.name}` });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const customer = await prisma.customer.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.redirect(`/customers/${customer.id}`);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.customer.delete({
      where: { id: Number(req.params.id) },
    });
    res.redirect("/customers");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
