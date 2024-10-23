import { createPostsFilteredByUser } from "@/components/journal-container/helpers";
import { dummyAnonymousOption, dummyJaneOption, dummyJoeOption, dummyPosts } from "../../../util/util-data";
import { UserSelectOption } from "@/components/journal-container/types";

describe("createPostsFilteredByUser", (): void => {
  it("should return posts for selected user Jane", (): void => {
    const result = createPostsFilteredByUser(dummyPosts, dummyJaneOption);
    expect(result).toEqual([
      {
        id: 1,
        title: "First Post",
        content: "Hello, World!",
        datePosted: new Date("2024-10-23T00:37:27.956Z"),
        userId: 1,
        user: {
          email: "jane@example.com",
          id: 1,
          name: "Jane",
        },
      },
    ]);
  });
  
  it("should return posts for selected user Joe", (): void => {
    const result = createPostsFilteredByUser(dummyPosts, dummyJoeOption);
    expect(result).toEqual([
      {
        id: 2,
        title: "Second Post",
        content: "Hello, Journal!",
        datePosted: new Date("2024-10-23T00:37:27.956Z"),
        userId: 2,
        user: {
          email: "joe@example.com",
          id: 2,
          name: "Joe",
        },
      },
    ]);
  });
  
  it("should return posts for selected anonymous user", (): void => {
    const result = createPostsFilteredByUser(dummyPosts, dummyAnonymousOption);
    expect(result).toEqual([
      {
        id: 3,
        title: "Anonymous Post",
        content: "This is a post from an anonymous user :).",
        datePosted: new Date("2024-10-23T01:38:34.583Z"),
        userId: 0,
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
        userId: 0,
        user: {
          email: "anonymous@example.com",
          id: 0,
          name: "Anonymous",
        },
      },
    ]);
  });
  
  it("should return original posts when no user is selected", (): void => {
    const result = createPostsFilteredByUser(dummyPosts, null);
    expect(result).toEqual(dummyPosts);
  });
  
  it("should return an empty array for a user with no posts", (): void => {
    const unknownUserOption: UserSelectOption = { value: "999", label: "Unknown User" };
    const result = createPostsFilteredByUser(dummyPosts, unknownUserOption);
    expect(result).toEqual([]);
  });
});