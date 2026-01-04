import { addFavourite, removeFavourite } from "../utils/useFavourites";

test("addFavourite prevents duplicates", () => {
  expect(addFavourite(["a"], "a")).toEqual(["a"]);
  expect(addFavourite(["a"], "b")).toEqual(["a","b"]);
});

test("removeFavourite removes item", () => {
  expect(removeFavourite(["a","b"], "a")).toEqual(["b"]);
});
