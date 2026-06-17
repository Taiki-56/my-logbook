import prisma from "../lib/prisma";

async function main() {
  const user = await prisma.user.upsert({
    where: {
      email: "zvldvuofqt@icloud.com"
    },
    update: {},
    create: {
      email: "zvldvuofqt@icloud.com",
      passwordHash: "hmyktn4241"
    }
  });

  console.log("Created user:", user);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
