# Use an official Node.js 20 runtime as a parent image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the application port (Next.js default is 3000)
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production

# Ensure Prisma points to the correct SQLite file inside the container
ENV DATABASE_URL="file:/app/dev.db"

# Ensure Prisma generates client and performs migrations
RUN npx prisma generate

# Run the Prisma migration to create the SQLite database schema
RUN npx prisma migrate deploy

# Seed the database with dummy data
RUN npx prisma db seed

# Build the Next.js app
RUN npm run build

# Start the Next.js app
CMD ["npm", "start"]
