const { PrismaClient } = require("@prisma/client");

const userData = [
  {
    name: "Anonymous",
    email: "anonymous@example.com",
    passwordHash: null, // Anonymous user does not need a password
    posts: {
      create: [
        {
          title: "Anonymous Post",
          content: "This is a post from an anonymous user :).",
          datePosted: new Date(),
        },
      ],
    },
  },
  {
    name: "Jane",
    email: "jane@example.com",
    passwordHash: "$2a$12$RNtbB1W.XZLs98HPMdSi/uhNUlX3lRCgn1bpKXbUV2ineWX.8fjzq", // Pre-hashed password for Jane
    posts: {
      create: [
        {
          title: "First Post",
          content: "Hello, World!",
          datePosted: new Date(),
        },
      ],
    },
  },
  {
    name: "Joe",
    email: "joe@example.com",
    passwordHash: "$2a$12$u1MKPqAHorc5eOrFMAdUVOsVMsSM//FQvGWdl888hX9Pj4wZtHAw6", // Pre-hashed password for Joe
    posts: {
      create: [
        {
          title: "Second Post",
          content: "Hello, Journal!",
          datePosted: new Date(),
        },
      ],
    },
  },
];

async function seed() {
  const prisma = new PrismaClient();
  
  try {
    // First, delete existing data
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
    
    for (const user of userData) {
      // Create user without the id field
      const userDataToCreate = {
        email: user.email,
        name: user.name,
        passwordHash: user.passwordHash || null, // Use the pre-hashed password or null
        posts: user.posts,
      };
      
      // Create user
      await prisma.user.create({
        data: userDataToCreate,
      });
      
      console.log(`User ${user.name || "Anonymous"} created.`);
    }
    
    console.log("Seed data has been inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
