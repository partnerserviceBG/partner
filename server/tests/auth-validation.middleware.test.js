const test = require("node:test");
const assert = require("node:assert/strict");
const {
  validateLoginBody,
} = require("../middleware/auth-validation.middleware");

const createResponse = () => ({});

test("validateLoginBody passes for valid credentials", () => {
  const req = {
    body: {
      email: "user@example.com",
      password: "123456",
    },
  };
  const res = createResponse();
  let called = false;

  validateLoginBody(req, res, (error) => {
    called = true;
    assert.equal(error, undefined);
  });

  assert.equal(called, true);
});

test("validateLoginBody rejects invalid email", () => {
  const req = {
    body: {
      email: "invalid-email",
      password: "123456",
    },
  };
  const res = createResponse();
  let receivedError = null;

  validateLoginBody(req, res, (error) => {
    receivedError = error;
  });

  assert.ok(receivedError);
  assert.equal(receivedError.status, 400);
  assert.equal(receivedError.message, "Некорректный email");
});

test("validateLoginBody rejects short password", () => {
  const req = {
    body: {
      email: "user@example.com",
      password: "123",
    },
  };
  const res = createResponse();
  let receivedError = null;

  validateLoginBody(req, res, (error) => {
    receivedError = error;
  });

  assert.ok(receivedError);
  assert.equal(receivedError.status, 400);
  assert.equal(
    receivedError.message,
    "Пароль должен содержать минимум 6 символов",
  );
});
