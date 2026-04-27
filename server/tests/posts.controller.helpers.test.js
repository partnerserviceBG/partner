const test = require("node:test");
const assert = require("node:assert/strict");
const { __test__ } = require("../controllers/posts.controller");

test("normalizeHousesIds handles arrays and strings", () => {
  assert.deepEqual(
    __test__.normalizeHousesIds(["1", 2, " 3 "]),
    ["1", "2", "3"],
  );
  assert.deepEqual(
    __test__.normalizeHousesIds("1, 2,3"),
    ["1", "2", "3"],
  );
  assert.deepEqual(__test__.normalizeHousesIds(null), []);
});

test("mapPostToResponse returns houses from post_houses relation", () => {
  const mapped = __test__.mapPostToResponse({
    id: 10,
    title: "Test",
    postHouses: [{ houseId: "15" }, { houseId: "42" }],
  });

  assert.equal(mapped.id, 10);
  assert.equal(mapped.title, "Test");
  assert.deepEqual(mapped.housesId, ["15", "42"]);
  assert.equal(mapped.postHouses, undefined);
});
