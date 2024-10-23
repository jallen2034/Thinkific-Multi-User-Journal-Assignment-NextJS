# Thinkific Multi-User Journal Assignment

## Getting Started

### 1. Get to know project tech stack

This simple project is a starting point for your take-home test. It is built with the following technologies:

- [React](https://reactjs.org/), a JavaScript library for building user interfaces
- [Next.js](https://nextjs.org/), a frontend framework for server-side rendering, easy routing, serverless RESTful API
- [Prisma](https://www.prisma.io/), a database ORM for Node.js
    - Scaffolding is set up for SQLite
    - You are free to use other databases of your choice

## Submission

Update this README file by answering the questions below.

### Date Or Reflection

The date you're submitting this.

October 23, 2024.

### Location of deployed application (not necessary for Junior Engineers)

Please provide the url where we can find and interact with your running application.

### Instructions to run assignment locally

Please provide us with the necessary instructions to run your solution if it is implemented with technologies different from the starting repo.

#### Installation:

#### 1. Clone the repository to your local machine:
```bash
 git clone https://github.com/your-repo-name/project.git
 cd project
```

#### 2. Install the dependencies:
```bash
npm install
```
#### 3. Ensure your .env file is correctly configured:

Create a `.env` file at the root of the project and include the following configuration to enable Prisma to connect with the database:
```env
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings
DATABASE_URL="file:./dev.db"
```

### 4. Prepare DB

Create a local SQLite database and run migrations.

```
npx prisma migrate dev --name init
```

Seed the database with the sample data from the seed.ts file located in the prisma directory.

```
npx prisma db seed
```

### Running the Development Server:
Once everything above is configured, you can start the development server:

```bash
npm run dev
```
The app should now be running, navigate to [`http://localhost:3000/`](http://localhost:3000/) in your browser to explore its UI.

### Running the Automated Unit Test Suite with Jest:
To run the unit tests using Jest, use the following command in your terminal:
```bash
npm test
```
This will execute all the unit tests in the project. Upon successful execution, you should see an output similar to the following:

```bash
npm test

> thinkific-take-home@0.1.0 test
> jest

 PASS  src/app/journal/helpers.test.ts (16.838 s)
 PASS  src/components/journal-container/helpers.test.ts (16.88 s)

Test Suites: 2 passed, 2 total
Tests:       8 passed, 8 total
Snapshots:   0 total
Time:        18.506 s
Ran all test suites.
```
- Test Suites: The number of test files that were executed and passed.
- Tests: The total number of individual test cases that were executed.
- Time: The total amount of time it took to run the automated test suite.

### Time spent

How much time did you spend on the assignment? Normally, this is expressed in hours.

I spent approximately 6-8 hours on the assignment. This includes time spent on project setup, development, testing, and documentation. I also had a busy evening, so I'm taking that into account while balancing my time.

### Assumptions made

Use this section to tell us about any assumptions that you made when creating your solution.

- **Technology Familiarity**: I assumed that the use of Prisma and SQLite would be fairly straightforward for the implementation. However, I ran into a bit of friction initially when using these technologies and I assume other intermediate developers might be in the same boat, particularly those who are less familiar with these technologies or are more frontend-focused.

### Shortcuts/Compromises made

If applicable. Did you do something that you feel could have been done better in a real-world application? Please let us know.

**Basic UI Implementation**: I opted for a more straightforward user interface design to meet the deadline, rather than spending additional time on advanced styling and user experience improvements.

**Limited Testing Coverage**: While I implemented some jest unit tests, I compromised on comprehensive testing coverage due to time constraints. In a real-world application, I would prioritize a more thorough testing strategy.

**Simplified Error Handling**: I implemented basic error handling in the API routes but did not include extensive logging or custom error messages, which would be important in a production environment.

**Simplified Authentication solution** For user registration and login, I implemented a basic authentication mechanism due to time constraints. While I aimed to integrate NextAuth or a more advanced authentication strategy, further enhancements can be made in the future to strengthen security and user experience.

### Assume your application will go into production...

To ensure the application is ready for production, I would take a multi-faceted approach focusing on comprehensive testing and continuous integration:

#### 1) What would be your approach to ensuring the application is ready for production (testing)?

**Enhance Testing Coverage**:
-  I would develop a more robust test suite, introducing comprehensive unit and integration tests using Jest and React Testing Library. My goal would be to achieve high code coverage, providing confidence that the application functions correctly and that future code changes do not introduce new issues.

**Continuous Integration (CI) Integration**: 
- I would integrate the test suite into the CI pipeline. This means that whenever a developer submits a pull request, the tests would automatically run. If any tests fail, merging would be blocked until the issues are resolved. This ensures that only code that passes all tests makes it into the main branch.

**Automated End-to-End Testing**:
- If time allowed, I would also implement Cypress for end-to-end testing to simulate user interactions with the UI. This would help identify any issues that could affect user experience in production.

**User Acceptance Testing (UAT)**: 
- Finally, I would involve stakeholders in a user acceptance testing phase to gather feedback and validate that the application meets business requirements before the official launch.

#### 2) How would you ensure a smooth user experience as 1000’s of users start using your app simultaneously?

To ensure a smooth user experience during peak usage, I would implement several strategies:

- **Load Testing**: I'd conduct load testing to simulate thousands of users accessing the application simultaneously. This helps identify potential performance bottlenecks and areas for optimization before going live.

- **Scalable Architecture**: I'd try design the application architecture to be scalable. Utilizing cloud services like AWS or Azure allows for auto-scaling capabilities (horizontal + vertical), which can adjust resources based on real-time demand, ensuring the application remains responsive.

- **Optimize Frontend Performance**: I'd also try minimize the size of JavaScript bundles and optimize assets such as images and CSS. Utilizing techniques like lazy loading and code splitting can improve initial load times and overall performance.

- **Caching Strategies**: If it was needed, I'd also implement caching mechanisms at various levels (e.g., browser caching, server-side caching, and CDN caching) to reduce server load and speed up content delivery.

#### 3) What key steps would you take to ensure application security?

To ensure the security of the application, I would take the following key steps:

**Implement Stronger Authentication Mechanisms**:
  - Currently, I use bcrypt for secure password hashing, ensuring passwords are not stored in plaintext. Given more time, I would also incorporate salting to enhance password security.
  - I would also likely implement multi-factor authentication (MFA) to add an additional layer of protection.
  - If time permitted, I would consider integrating established authentication frameworks like NextAuth or OAuth providers such as ForgeRock AM or Auth0 for a more robust solution, similar to what I implemented in the account merge project at Save-On-Foods.

**Secure API Endpoints**:
  - I'd be sure that I'm utilizing HTTPS for all communications to encrypt data in transit.
  - Implement rate limiting on the server side code to protect against brute-force attacks on authentication endpoints.
  - In addition to using JWTs, I would explore using OAuth tokens for stateless authentication, ensuring they are securely signed and validated.

**Input Validation and Sanitization**:
  - Validate and sanitize all user inputs to prevent injection attacks, such as SQL injection and cross-site scripting (XSS). While Prisma and ORMs provide some protection, I think that additional measures should still be considered.
  - I'd Employ libraries or frameworks that assist in sanitizing user input and utilize prepared statements, which Prisma may already support.

**Regular Security Audits and Code Reviews**:
  - I would conduct regular security audits and code reviews to identify and address vulnerabilities early in the development process.
  - I would try to stay updated on security best practices and promptly apply patches for any identified vulnerabilities in dependencies.

**Utilize Secure Coding Practices**:
  - I'd implement robust error handling in the application to avoid exposing sensitive information in error messages being presented to clients.

**Session Management**:
  - I'd ensure session tokens are securely stored, preferably in HttpOnly cookies, to prevent access via JavaScript instead of doing this via session storage.
  - I would implement session/token expiration and invalidation strategies to minimize the risks associated with session hijacking.

**Logging and Monitoring**:
  - I would Implement logging on both the server and client sides to capture security-relevant events and monitor these logs for unusual activities (e.g., using Splunk).
  - Set up alerts for suspicious activities to respond promptly to potential security breaches.

### What did you not include in your solution that you want us to know about? Were you short on time and not able to include something that you want us to know about? Please list it here so that we know that you considered it.

I believe that my solution is well-built with core features given the tight 24-hour deadline I was given, but due to the time constraints, some shortcuts needed to be made. Namely:

1. A lot of the TypeScript in the codebase is incomplete documentation-wise, as I didn't have time to fully type everything in detail, opting to use `any` in some spots.

2. For my authentication implementation, I initially considered integrating Clerk for a more robust solution, but the learning curve for synchronizing their webhook APIs with the SQLite database was too time-consuming. Instead, I implemented a basic JWT-based authentication system using a username and password. During registration, I hash the user's plaintext password using bcrypt before storing it in the users table. While I didn't have time to properly salt the passwords or make the solution more sophisticated, this approach is still more secure than storing passwords as plaintext. On login, I encrypt the entered password, send it to the backend, and compare it with the hash in the users table. I then return a JWT token to the browser for session storage. I acknowledge that this is less secure than using cookies, but given the tight deadline, this was the quickest solution.

3. I created some Jest unit tests for core helper functions in my React components, but I didn’t have time to implement more comprehensive testing on the backend or component tests in the UI using the React Testing Library.

4. If I had more time, I would ensure that all SCSS in my components is properly scoped, clean, and well-named. There are also general UI styling and polish improvements I would make. Additionally, I would add more robust form validation across the application, particularly for login, registration, and journal post submission. Currently, the application primarily handles the happy path, and improving this would significantly enhance the user experience.

Overall, while I was able to implement key functionalities, I recognize that there are several areas where the application could be improved with additional time.

### Other information about your submission that you feel it's important that we know if applicable.

**Project Configuration Challenges**: I encountered some configuration issues with the original Remix repository that took extra time to resolve. I believe it’s essential to highlight this, as it may impact the assessment of my overall performance on the challenge.

**Future Improvements**: While I completed the core functionality, I have ideas for further enhancements, such as [briefly mention any features or improvements you would consider for future iterations of the app].

**Availability for Discussion**: I am open to discussing my approach and any challenges I faced during the development process if further clarification is needed :)

Thank you for considering this information, and I look forward to your feedback!

### Your Feedback on This Technical Challenge

Have feedback for how we could make this assignment better? Please let us know.

Overall, I found the challenge engaging and enjoyable; however, I believe the original time estimate of 1-3 hours is inaccurate for intermediate-level developers.

For participants like myself who faced project configuration issues with the original repository, or for those who may be less experienced or unfamiliar with technologies such as Prisma, additional time is often required to familiarize themselves with these tools.

The scope of delivering the core functionality of the app, as outlined in the user stories, feels quite ambitious. In my opinion, significant shortcuts would have to be taken to meet the deadline effectively.

Moreover, the task of implementing one of the advanced features—such as real-time smart suggestions, user authentication, image uploads, sentiment analysis, inline translation, end-to-end testing, or UI improvements—adds an additional layer of complexity that may be overwhelming given the tight timeline.

Building a quality user interface with React, establishing proper server-side rendering, configuring API routes with robust error handling, setting up the SQLite database, seeding it with Prisma, and modifying the seed file to support both anonymous and logged-in users all require considerable development effort and time.

Additionally, ensuring the architecture of the code is clean, modular, well-tested using Jest, and thoroughly documented demands significant attention to detail. Providing comprehensive documentation in the README—covering project setup instructions and detailed explanations on enhancing application security and performance—while also devising a reliable deployment strategy, contributes further to the overall time investment.

While the challenge overall is both enjoyable and educational, I recommend reevaluating the time estimate to better reflect the complexity and demands of the tasks involved. Alternatively, consider using technologies and tools that are more agnostic than Prisma, such as a simple Postgres or SQLite database that requires raw SQL queries for interaction instead of an ORM.

