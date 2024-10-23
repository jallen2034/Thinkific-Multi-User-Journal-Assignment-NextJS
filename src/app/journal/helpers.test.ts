import { Post } from "@/app/journal/types";
import { sortPostsByDate } from "@/app/journal/helpers";

const dummyPosts: Post[] = [
  {
    id: 1,
    title: "First Post",
    content: "Hello, World!",
    datePosted: new Date("2024-10-23T00:37:27.956Z"),
    authorId: 1,
    user: {
      email: "jane@example.com",
      id: 1,
      name: "Jane",
    },
  },
  {
    id: 2,
    title: "Second Post",
    content: "Hello, Journal!",
    datePosted: new Date("2024-10-23T00:37:27.956Z"),
    authorId: 2,
    user: {
      email: "joe@example.com",
      id: 2,
      name: "Joe",
    },
  },
  {
    id: 3,
    title: "Anonymous Post",
    content: "This is a post from an anonymous user :).",
    datePosted: new Date("2024-10-23T01:38:34.583Z"),
    authorId: 0,
    user: {
      email: "anonymous@example.com",
      id: 0,
      name: "Anonymous",
    },
  },
  {
    id: 13,
    title: "Anonymous Post",
    content: "Hello there my guy.",
    datePosted: new Date("2024-10-23T02:11:09.496Z"),
    authorId: 0,
    user: {
      email: "anonymous@example.com",
      id: 0,
      name: "Anonymous",
    },
  },
];

describe("sortPostsByDate", (): void => {
  it("should return posts sorted by date in descending order", (): void => {
    const sortedPosts: Post[] = sortPostsByDate(dummyPosts);
    
    // Expect the first post to be the latest one
    expect(sortedPosts[0].id).toBe(13);
    expect(sortedPosts[1].id).toBe(3);
    expect(sortedPosts[2].id).toBe(1); // id 1 and id 2 have the same timestamp, so order between them doesn't matter
    expect(sortedPosts[3].id).toBe(2);
  });
  
  it("should handle posts with identical timestamps", (): void => {
    const postsWithSameTimestamp: Post[] = [
      {
        id: 1,
        title: "First Post",
        content: "Hello, World!",
        datePosted: new Date("2024-10-23T00:37:27.956Z"),
        authorId: 1,
        user: {
          email: "jane@example.com",
          id: 1,
          name: "Jane",
        },
      },
      {
        id: 2,
        title: "Second Post",
        content: "Hello, Journal!",
        datePosted: new Date("2024-10-23T00:37:27.956Z"),
        authorId: 2,
        user: {
          email: "joe@example.com",
          id: 2,
          name: "Joe",
        },
      },
    ];
    
    const sortedPosts: Post[] = sortPostsByDate(postsWithSameTimestamp);
    
    // Since the timestamps are identical, we expect the original order to be maintained
    expect(sortedPosts[0].id).toBe(1);
    expect(sortedPosts[1].id).toBe(2);
  });
  
  it("should handle null datePosted by treating them as the oldest", (): void => {
    const postsWithNullDates: Post[] = [
      {
        id: 3,
        title: "Post with null date",
        content: "This post has a null date.",
        datePosted: null, // Null datePosted.
        authorId: 1,
        user: {
          email: "jane@example.com",
          id: 1,
          name: "Jane",
        },
      },
      {
        id: 4,
        title: "Valid Post",
        content: "This post has a valid date.",
        datePosted: new Date("2024-10-23T02:11:09.496Z"),
        authorId: 1,
        user: {
          email: "jane@example.com",
          id: 1,
          name: "Jane",
        },
      },
    ];
    
    const sortedPosts: Post[] = sortPostsByDate(postsWithNullDates);
    
    // Expect the post with the valid date to be first, and the one with null to be last one.
    expect(sortedPosts[0].id).toBe(4);
    expect(sortedPosts[1].id).toBe(3);
  });
});