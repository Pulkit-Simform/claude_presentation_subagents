const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const acme = await prisma.customer.create({
    data: {
      name: "Acme Corp",
      industry: "Technology",
      website: "https://acme.example.com",
      phone: "+1-555-0100",
      address: "123 Innovation Drive, San Francisco, CA 94105",
      notes: "Enterprise technology company",
      contacts: {
        create: [
          {
            firstName: "John",
            lastName: "Doe",
            email: "john@acme.example.com",
            phone: "+1-555-0101",
            position: "CTO",
          },
          {
            firstName: "Jane",
            lastName: "Smith",
            email: "jane@acme.example.com",
            phone: "+1-555-0102",
            position: "VP Engineering",
          },
        ],
      },
      deals: {
        create: [
          {
            title: "Platform Migration",
            value: 150000,
            stage: "proposal",
            status: "active",
          },
          {
            title: "Consulting Retainer",
            value: 60000,
            stage: "closing",
            status: "active",
          },
        ],
      },
    },
  });

  const globex = await prisma.customer.create({
    data: {
      name: "Globex Inc",
      industry: "Manufacturing",
      website: "https://globex.example.com",
      phone: "+1-555-0200",
      address: "456 Industrial Blvd, Detroit, MI 48201",
      notes: "Manufacturing company looking to modernize",
      contacts: {
        create: [
          {
            firstName: "Bob",
            lastName: "Johnson",
            email: "bob@globex.example.com",
            phone: "+1-555-0201",
            position: "CEO",
          },
        ],
      },
      deals: {
        create: [
          {
            title: "IoT Implementation",
            value: 250000,
            stage: "lead",
            status: "active",
          },
        ],
      },
    },
  });

  await prisma.deal.update({
    where: { id: 2 },
    data: { contactId: 2 },
  });

  await prisma.deal.update({
    where: { id: 3 },
    data: { contactId: 3 },
  });

  console.log("CRM seeded successfully!");
  console.log(`  Customers: Acme Corp, Globex Inc`);
  console.log(`  Contacts: John Doe, Jane Smith, Bob Johnson`);
  console.log(`  Deals: Platform Migration, Consulting Retainer, IoT Implementation`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
