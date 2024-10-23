import { Post } from "@/app/journal/types";
import { UserSelectOption } from "@/components/journal-container/types";

const dummyPosts: Post[] = [
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
];

const dummyJaneOption: UserSelectOption = { value: "1", label: "Jane" };
const dummyJoeOption: UserSelectOption = { value: "2", label: "Joe" };
const dummyAnonymousOption: UserSelectOption = { value: "0", label: "Anonymous" };

export {
  dummyPosts,
  dummyJaneOption,
  dummyJoeOption,
  dummyAnonymousOption
}