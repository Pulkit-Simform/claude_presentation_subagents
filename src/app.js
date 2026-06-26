const express = require("express");
const methodOverride = require("method-override");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const customerRoutes = require("./routes/customers");
const contactRoutes = require("./routes/contacts");
const dealRoutes = require("./routes/deals");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", async (req, res, next) => {
  try {
    const prisma = require("./db");
    const [customerCount, contactCount, dealCount, activeDeals] = await Promise.all([
      prisma.customer.count(),
      prisma.contact.count(),
      prisma.deal.count(),
      prisma.deal.findMany({
        where: { status: "active" },
        include: { customer: true },
        orderBy: { value: "desc" },
        take: 5,
      }),
    ]);
    res.render("index", {
      title: "CRM Dashboard",
      customerCount,
      contactCount,
      dealCount,
      activeDeals,
    });
  } catch (err) {
    next(err);
  }
});

app.use("/customers", customerRoutes);
app.use("/contacts", contactRoutes);
app.use("/deals", dealRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`CRM app running at http://localhost:${PORT}`);
});
