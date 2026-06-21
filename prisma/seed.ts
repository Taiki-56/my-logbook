import "dotenv/config";

import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

async function main() {
  const email = process.env.ADMIN_EMAIL!;
  const password = process.env.ADMIN_PASSWORD!;
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: {
      email
    },
    update: {
      passwordHash
    },
    create: {
      email,
      passwordHash
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
