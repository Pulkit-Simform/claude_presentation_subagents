const { Router } = require("express");
const prisma = require("../db");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await prisma.contact.findMany({
      include: { customer: true },
      orderBy: { createdAt: "desc" },
    });
    res.render("contacts/index", { contacts, title: "Contacts" });
  } catch (err) {
    next(err);
  }
});

router.get("/new", async (req, res, next) => {
  try {
    const customers = await prisma.customer.findMany({ orderBy: { name: "asc" } });
    res.render("contacts/create", { title: "New Contact", contact: {}, customers });
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: Number(req.params.id) },
      include: { customer: true, deals: true },
    });
    if (!contact) return next();
    res.render("contacts/show", { contact, title: `${contact.firstName} ${contact.lastName}` });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const contact = await prisma.contact.create({ data: req.body });
    res.redirect(`/contacts/${contact.id}`);
  } catch (err) {
    next(err);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const contact = await prisma.contact.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!contact) return next();
    const customers = await prisma.customer.findMany({ orderBy: { name: "asc" } });
    res.render("contacts/edit", { contact, customers, title: `Edit ${contact.firstName} ${contact.lastName}` });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const contact = await prisma.contact.update({
      where: { id: Number(req.params.id) },
      data: req.body,
    });
    res.redirect(`/contacts/${contact.id}`);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await prisma.contact.delete({
      where: { id: Number(req.params.id) },
    });
    res.redirect("/contacts");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
