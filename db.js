const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

function load(file) {
  const p = path.join(DATA_DIR, file + ".json");
  if (!fs.existsSync(p)) return {};
  try { return JSON.parse(fs.readFileSync(p, "utf8")); } catch { return {}; }
}

function save(file, data) {
  fs.writeFileSync(path.join(DATA_DIR, file + ".json"), JSON.stringify(data, null, 2));
}

function get(file, key) {
  const d = load(file);
  return key ? d[key] : d;
}

function set(file, key, value) {
  const d = load(file);
  d[key] = value;
  save(file, d);
}

function del(file, key) {
  const d = load(file);
  delete d[key];
  save(file, d);
}

module.exports = { load, save, get, set, del };
