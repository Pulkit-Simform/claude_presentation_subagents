const { Router } = require("express");
const prisma = require("../db");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const deals = await prisma.deal.findMany({
      include: { customer: true, contact: true },
      orderBy: { createdAt: "desc" },
    });
    res.render("deals/index", { deals, title: "Deals" });
  } catch (err) {
    next(err);
  }
});

router.get("/new", async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany({ orderBy: { name: "asc" } });
    const contacts = await prisma.contact.findMany({
      include: { customer: true },
      orderBy: { lastName: "asc" },
    });
    res.render("deals/create", { title: "New Deal", deal: {}, customers, contacts });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const deal = await prisma.deal.findUnique({
      where: { id: Number(req.params.id) },
      include: { customer: true, contact: true },
    });
    if (!deal) return next();
    res.render("deals/show", { deal, title: deal.title });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.value = data.value ? parseFloat(data.value) : null;
    data.contactId = data.contactId ? Number(data.contactId) : null;
    data.customerId = Number(data.customerId);
    const deal = await prisma.deal.create({ data });
    res.redirect(`/deals/${deal.id}`);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const deal = await prisma.deal.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!deal) return next();
    const customers = await prisma.customer.findMany({ orderBy: { name: "asc" } });
    const contacts = await prisma.contact.findMany({
      include: { customer: true },
      orderBy: { lastName: "asc" },
    });
    res.render("deals/edit", { deal, customers, contacts, title: `Edit ${deal.title}` });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const data = { ...req.body };
    data.value = data.value ? parseFloat(data.value) : null;
    data.contactId = data.contactId ? Number(data.contactId) : null;
    data.customerId = Number(data.customerId);
    const deal = await prisma.deal.update({
      where: { id: Number(req.params.id) },
      data,
    });
    res.redirect(`/deals/${deal.id}`);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.deal.delete({
      where: { id: Number(req.params.id) },
    });
    res.redirect("/deals");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
