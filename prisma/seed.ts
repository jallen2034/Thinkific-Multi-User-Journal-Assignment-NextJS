const { PrismaClient } = require("@prisma/client");

const userData = [
  {
    name: "Anonymous", // Optional: you can provide a name if you want
    email: "anonymous@example.com", // Ensure this is unique
    id: 0, // Explicitly set the user ID to 0 for the anonymous user
    posts: {
      create: [
        {
          title: "Anonymous Post",
          content: "This is a post from an anonymous user :).",
          datePosted: new Date(), // Add the current date
        },
      ],
    },
  },
  {
    name: "Jane",
    email: "jane@example.com",
    posts: {
      create: [
        {
          title: "First Post",
          content: "Hello, World!",
          datePosted: new Date(), // Add the current date
        },
      ],
    },
  },
  {
    name: "Joe",
    email: "joe@example.com",
    posts: {
      create: [
        {
          title: "Second Post",
          content: "Hello, Journal!",
          datePosted: new Date(), // Add the current date
        },
      ],
    },
  },
];

async function seed() {
  const prisma = new PrismaClient();
  
  try {
    for (const user of userData) {
      // Check if the user already exists (skip the anonymous user check)
      if (user.id === 0) {
        const existingAnonUser = await prisma.user.findUnique({
          where: { id: 0 },
        });
        
        if (!existingAnonUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              id: user.id, // Explicitly set the user ID
              posts: user.posts,
            },
          });
          console.log("Anonymous user created.");
        } else {
          console.log("Anonymous user already exists.");
        }
      } else {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        
        if (!existingUser) {
          await prisma.user.create({
            data: user,
          });
        } else {
          console.log(`User with email ${user.email} already exists.`);
        }
      }
    }
    
    console.log("Seed data has been inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
