const STATUSES = ["Pending", "In progress", "Completed"];
const MAX_ID = 2147483647; // largest value the database id column can hold

const RULES = [
  { field: "title", label: "Title", min: 3, max: 80 },
  { field: "category", label: "Category", min: 2, max: 40 },
  { field: "description", label: "Description", min: 5, max: 300 }
];

// Returns { value } with trimmed fields, or { message } describing the first problem.
function validateRecord(body) {
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { message: "Request body must be a JSON object." };
  }
  const value = {};
  for (const rule of RULES) {
    const raw = body[rule.field];
    if (typeof raw !== "string") {
      return { message: `${rule.label} is required and must be text.` };
    }
    const text = raw.trim();
    if (text.length < rule.min || text.length > rule.max) {
      return { message: `${rule.label} must have ${rule.min} to ${rule.max} characters.` };
    }
    value[rule.field] = text;
  }
  if (typeof body.status !== "string") {
    return { message: "Status is required and must be text." };
  }
  const status = body.status.trim();
  if (!STATUSES.includes(status)) {
    return { message: "Status must be Pending, In progress or Completed." };
  }
  value.status = status;
  return { value };
}

// Returns a number for a positive whole number string, otherwise null.
function parseId(text) {
  if (typeof text !== "string" || !/^[1-9][0-9]*$/.test(text)) return null;
  const id = Number(text);
  return Number.isSafeInteger(id) ? id : null;
}

module.exports = { validateRecord, parseId, STATUSES, MAX_ID };
