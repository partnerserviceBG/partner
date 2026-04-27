const formatMessage = (level, message, meta) => {
  const timestamp = new Date().toISOString();
  const normalizedMeta = meta ? ` ${JSON.stringify(meta)}` : "";
  return `[${timestamp}] [${level}] ${message}${normalizedMeta}`;
};

const info = (message, meta) => {
  console.log(formatMessage("INFO", message, meta));
};

const warn = (message, meta) => {
  console.warn(formatMessage("WARN", message, meta));
};

const error = (message, meta) => {
  console.error(formatMessage("ERROR", message, meta));
};

module.exports = {
  info,
  warn,
  error,
};
