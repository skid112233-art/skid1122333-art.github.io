const STORAGE_KEY = "commons-state";
const PREFS_KEY = "commons-prefs";
const DATA_VERSION = 1;
const SLOT = 30;
const DAY_MS = 86400000;
const HOUR_MS = 3600000;
const ACTIVE_STATUSES = ["pending", "approved"];
const REQUEST_STATUSES = ["open", "in-progress", "resolved"];
const PRIORITY_ORDER = { urgent: 0, high: 1, normal: 2, low: 3 };
// The one Commons owner. Owning Commons only means reviewing join requests and website problem reports.
// This same email is also J.R. Tucker High School's school administrator, which is where its admin tools come from.
const OWNER_EMAIL = "sntr0306@gmail.com";
const BUILT_IN_SCHOOL_ADMINS = { "sntr0306@gmail.com": "J.R. Tucker High School" };
// Former owner emails. They're removed from saved admin lists so they lose access in browsers that already have data.
const RETIRED_ADMIN_EMAILS = ["skid112233@gmail.com"];
// Paste an OAuth "Web application" client ID from console.cloud.google.com to turn on Google sign-in (see README).
// Leave it empty and the Google button explains how to set it up.
const GOOGLE_CLIENT_ID = "745886773102-f58shu8smjts90qo8bbabuknh9vs4lrq.apps.googleusercontent.com";
const GOOGLE_SCRIPT = "https://accounts.google.com/gsi/client";
const DIVISION_NAME ="Henrico County Public Schools";
const DIVISION_CONTACT = { address: "3820 Nine Mile Road, Henrico, VA 23223", phone: "(804) 652-3600", url: "https://henricoschools.us/" };
// Front office contacts from each school's website on henricoschools.us. `site` is the school's subdomain.
// `hours` is the posted front office hours where a school lists them (Baker, Harvie, Lakeside, Nuckols Farm, Sandston,
// Henrico Virtual Academy). Otherwise it's the posted school day, from the first bell to 30 minutes after dismissal.
const SCHOOL_CONTACTS = {
  "Deep Run High School": { address: "4801 Twin Hickory Road, Glen Allen, VA 23059", phone: "(804) 364-8000", site: "deeprun", hours: "9:00 a.m. – 4:25 p.m." },
  "Douglas S. Freeman High School": { address: "8701 Three Chopt Road, Henrico, VA 23229", phone: "(804) 673-3700", site: "freeman", hours: "9:00 a.m. – 4:25 p.m." },
  "Glen Allen High School": { address: "10700 Staples Mill Road, Glen Allen, VA 23060", phone: "(804) 501-3300", site: "glenallenhs", hours: "9:00 a.m. – 4:25 p.m." },
  "Henrico High School": { address: "302 Azalea Avenue, Henrico, VA 23227", phone: "(804) 228-2700", site: "henrico", hours: "9:00 a.m. – 4:25 p.m." },
  "Hermitage High School": { address: "8301 Hungary Spring Road, Henrico, VA 23228", phone: "(804) 756-3000", site: "hermitage", hours: "9:00 a.m. – 4:25 p.m." },
  "Highland Springs High School": { address: "200 S. Airport Drive, Highland Springs, VA 23075", phone: "(804) 328-4000", site: "highlandspringshs", hours: "9:00 a.m. – 4:25 p.m." },
  "J.R. Tucker High School": { address: "2910 N. Parham Rd, Henrico, VA 23294", phone: "(804) 527-4600", site: "tucker", hours: "9:00 a.m. – 4:25 p.m." },
  "Mills E. Godwin High School": { address: "2101 Pump Road, Henrico, VA 23238", phone: "(804) 750-2600", site: "godwin", hours: "9:00 a.m. – 4:25 p.m." },
  "Varina High School": { address: "7053 Messer Road, Henrico, VA 23231", phone: "(804) 226-8700", site: "varinahs", hours: "9:00 a.m. – 4:25 p.m." },
  "Brookland Middle School": { address: "9200 Lydell Drive, Henrico, VA 23228", phone: "(804) 261-5000", site: "brookland", hours: "8:35 a.m. – 3:45 p.m." },
  "Elko Middle School": { address: "5901 Elko Rd, Sandston, VA 23150", phone: "(804) 328-4110", site: "elko", hours: "8:35 a.m. – 3:45 p.m." },
  "Fairfield Middle School": { address: "5121 Nine Mile Rd, Henrico, VA 23223", phone: "(804) 328-4020", site: "fairfield", hours: "8:35 a.m. – 3:45 p.m." },
  "George H. Moody Middle School": { address: "7800 Woodman Road, Henrico, VA 23228", phone: "(804) 261-5015", site: "moody", hours: "8:35 a.m. – 3:45 p.m." },
  "Holman Middle School": { address: "600 Concourse Blvd, Glen Allen, VA 23059", phone: "(804) 346-1300", site: "holman", hours: "8:35 a.m. – 3:45 p.m." },
  "Hungary Creek Middle School": { address: "4909 Francistown Road, Glen Allen, VA 23060", phone: "(804) 527-2640", site: "hungarycreek", hours: "8:35 a.m. – 3:45 p.m." },
  "John Rolfe Middle School": { address: "6901 Messer Road, Henrico, VA 23231", phone: "(804) 226-8730", site: "rolfe", hours: "8:35 a.m. – 3:45 p.m." },
  "L. Douglas Wilder Middle School": { address: "6900 Wilkinson Road, Henrico, VA 23227", phone: "(804) 515-1100", site: "wilder", hours: "8:35 a.m. – 3:45 p.m." },
  "Pocahontas Middle School": { address: "12000 Three Chopt Rd, Henrico, VA 23233", phone: "(804) 364-0830", site: "pocahontas", hours: "8:35 a.m. – 3:45 p.m." },
  "Quioccasin Middle School": { address: "9400 Quioccasin Road, Henrico, VA 23238", phone: "(804) 750-2630", site: "quioccasin", hours: "8:35 a.m. – 3:45 p.m." },
  "Short Pump Middle School": { address: "4701 Pouncey Tract Road, Glen Allen, VA 23059", phone: "(804) 360-0800", site: "shortpumpms", hours: "8:35 a.m. – 3:45 p.m." },
  "Tuckahoe Middle School": { address: "9000 Three Chopt Road, Henrico, VA 23229", phone: "(804) 673-3720", site: "tuckahoems", hours: "8:35 a.m. – 3:45 p.m." },
  "Anthony P. Mehfoud Elementary School": { address: "8320 Buffin Road, Henrico, VA 23231", phone: "(804) 795-7020", site: "mehfoud", hours: "7:40 a.m. – 2:40 p.m." },
  "Arthur R. Ashe Jr. Elementary School": { address: "1001 Cedar Fork Road, Henrico, VA 23223", phone: "(804) 343-6550", site: "ashe", hours: "7:40 a.m. – 2:40 p.m." },
  "Cashell Donahoe Elementary School": { address: "1801 Graves Road, Sandston, VA 23150", phone: "(804) 328-4035", site: "donahoe", hours: "7:40 a.m. – 2:40 p.m." },
  "Chamberlayne Elementary School": { address: "8200 St. Charles Road, Henrico, VA 23227", phone: "(804) 261-5030", site: "chamberlayne", hours: "7:40 a.m. – 2:35 p.m." },
  "Charles M. Johnson Elementary School": { address: "5600 Bethlehem Road, Henrico, VA 23230", phone: "(804) 673-3735", site: "johnson", hours: "7:40 a.m. – 2:40 p.m." },
  "Colonial Trail Elementary School": { address: "12101 Liesfeld Farm Drive, Glen Allen, VA 23059", phone: "(804) 364-0055", site: "colonialtrail", hours: "8:10 a.m. – 3:10 p.m." },
  "Crestview Elementary School": { address: "1901 Charles St, Henrico, VA 23226", phone: "(804) 673-3775", site: "crestview", hours: "7:40 a.m. – 2:40 p.m." },
  "David A. Kaechele Elementary School": { address: "5680 Pouncey Tract Road, Glen Allen, VA 23059", phone: "(804) 364-8080", site: "kaechele", hours: "7:40 a.m. – 2:40 p.m." },
  "Dumbarton Elementary School": { address: "9000 Hungary Spring Road, Henrico, VA 23228", phone: "(804) 756-3030", site: "dumbarton", hours: "7:40 a.m. – 2:40 p.m." },
  "Echo Lake Elementary School": { address: "5200 Francistown Road, Glen Allen, VA 23060", phone: "(804) 527-4672", site: "echolake", hours: "8:10 a.m. – 3:10 p.m." },
  "Elizabeth Holladay Elementary School": { address: "7300 Galaxie Road, Henrico, VA 23228", phone: "(804) 261-5040", site: "holladay", hours: "7:40 a.m. – 2:40 p.m." },
  "Fair Oaks Elementary School": { address: "201 Jennings Road, Highland Springs, VA 23075", phone: "(804) 328-4085", site: "fairoaks", hours: "7:40 a.m. – 2:40 p.m." },
  "Gayton Elementary School": { address: "12481 Church Road, Henrico, VA 23233", phone: "(804) 360-0820", site: "gayton", hours: "8:10 a.m. – 3:10 p.m." },
  "George F. Baker Elementary School": { address: "6651 Willson Road, Henrico, VA 23231", phone: "(804) 226-8755", site: "baker", hours: "8:00 a.m. – 4:00 p.m." },
  "Glen Allen Elementary School": { address: "11101 Mill Rd, Glen Allen, VA 23060", phone: "(804) 756-3040", site: "glenallenes", hours: "7:20 a.m. – 2:40 p.m." },
  "Glen Lea Elementary School": { address: "3909 Austin Ave, Henrico, VA 23222", phone: "(804) 228-2725", site: "glenlea", hours: "7:50 a.m. – 3:10 p.m." },
  "Greenwood Elementary School": { address: "10960 Greenwood Rd, Glen Allen, VA 23059", phone: "(804) 261-2970", site: "greenwood", hours: "7:20 a.m. – 2:30 p.m." },
  "Harold Macon Ratcliffe Elementary School": { address: "2901 Thalen St, Henrico, VA 23223", phone: "(804) 343-6535", site: "ratcliffe", hours: "8:10 a.m. – 3:10 p.m." },
  "Harvie Elementary School": { address: "3401 Harvie Road, Henrico, VA 23223", phone: "(804) 343-7010", site: "harvie", hours: "7:30 a.m. – 4:00 p.m." },
  "Henry Ward Elementary School": { address: "3400 Darbytown Road, Henrico, VA 23231", phone: "(804) 795-7030", site: "ward", hours: "7:40 a.m. – 2:40 p.m." },
  "Highland Springs Elementary School": { address: "600 Pleasant St, Highland Springs, VA 23075", phone: "(804) 328-4045", site: "highlandspringses", hours: "8:10 a.m. – 3:10 p.m." },
  "Jackson Davis Elementary School": { address: "8801 Nesslewood Drive, Henrico, VA 23229", phone: "(804) 527-4620", site: "davis", hours: "8:10 a.m. – 3:10 p.m." },
  "Jacob L. Adams Elementary School": { address: "600 S. Laburnum Avenue, Henrico, VA 23223", phone: "(804) 226-8745", site: "adams", hours: "7:40 a.m. – 2:40 p.m." },
  "Laburnum Elementary School": { address: "500 Meriwether Ave, Henrico, VA 23222", phone: "(804) 228-2720", site: "laburnum", hours: "7:40 a.m. – 2:40 p.m." },
  "Lakeside Elementary School": { address: "6700 Cedar Croft St, Henrico, VA 23228", phone: "(804) 261-5050", site: "lakeside", hours: "7:50 a.m. – 4:00 p.m." },
  "Longdale Elementary School": { address: "9500 Norfolk St, Glen Allen, VA 23060", phone: "(804) 261-5095", site: "longdale", hours: "7:20 a.m. – 2:40 p.m." },
  "Maude Trevvett Elementary School": { address: "2300 Trevvett Drive, Henrico, VA 23228", phone: "(804) 261-5060", site: "trevvett", hours: "7:40 a.m. – 2:40 p.m." },
  "Maybeury Elementary School": { address: "901 Maybeury Drive, Henrico, VA 23229", phone: "(804) 750-2650", site: "maybeury", hours: "8:10 a.m. – 3:10 p.m." },
  "Montrose Elementary School": { address: "2820 Williamsburg Road, Henrico, VA 23231", phone: "(804) 226-8765", site: "montrose", hours: "7:40 a.m. – 2:40 p.m." },
  "Nuckols Farm Elementary School": { address: "12351 Graham Meadows Drive, Henrico, VA 23233", phone: "(804) 364-0840", site: "nuckolsfarm", hours: "7:00 a.m. – 4:00 p.m." },
  "Pemberton Elementary School": { address: "1400 Pemberton Road, Henrico, VA 23238", phone: "(804) 750-2660", site: "pemberton", hours: "8:10 a.m. – 3:10 p.m." },
  "R.C. Longan Elementary School": { address: "9200 Mapleview Ave, Henrico, VA 23294", phone: "(804) 527-4640", site: "longan", hours: "8:10 a.m. – 3:10 p.m." },
  "Raymond B. Pinchbeck Elementary School": { address: "1275 Gaskins Road, Henrico, VA 23233", phone: "(804) 750-2670", site: "pinchbeck", hours: "7:40 a.m. – 2:40 p.m." },
  "Ridge Elementary School": { address: "8910 Three Chopt Road, Henrico, VA 23229", phone: "(804) 673-3745", site: "ridge", hours: "8:10 a.m. – 3:10 p.m." },
  "Rivers Edge Elementary School": { address: "11600 Holman Ridge Road, Glen Allen, VA 23059", phone: "(804) 935-6760", site: "riversedge", hours: "7:40 a.m. – 2:40 p.m." },
  "Ruby F. Carver Elementary School": { address: "1801 Lauderdale Drive, Henrico, VA 23238", phone: "(804) 750-2640", site: "carver", hours: "7:40 a.m. – 2:40 p.m." },
  "Sandston Elementary School": { address: "7 Naglee Ave, Sandston, VA 23150", phone: "(804) 328-4055", site: "sandston", hours: "7:30 a.m. – 4:00 p.m. (by phone)" },
  "Seven Pines Elementary School": { address: "301 Beulah Road, Sandston, VA 23150", phone: "(804) 328-4065", site: "sevenpines", hours: "7:40 a.m. – 2:40 p.m." },
  "Shady Grove Elementary School": { address: "12200 Wyndham Lake Drive, Glen Allen, VA 23059", phone: "(804) 360-0825", site: "shadygrove", hours: "7:40 a.m. – 2:40 p.m." },
  "Short Pump Elementary School": { address: "3425 Pump Road, Henrico, VA 23233", phone: "(804) 360-0812", site: "shortpumpes", hours: "8:10 a.m. – 3:10 p.m." },
  "Skipwith Elementary School": { address: "2401 Skipwith Road, Henrico, VA 23294", phone: "(804) 527-4650", site: "skipwith", hours: "7:40 a.m. – 2:40 p.m." },
  "Springfield Park Elementary School": { address: "4301 Fort McHenry Parkway, Glen Allen, VA 23060", phone: "(804) 527-4630", site: "springfieldpark", hours: "7:40 a.m. – 2:40 p.m." },
  "Three Chopt Elementary School": { address: "1600 Skipwith Road, Henrico, VA 23229", phone: "(804) 673-3755", site: "threechopt", hours: "7:40 a.m. – 2:40 p.m." },
  "Tuckahoe Elementary School": { address: "701 Forest Ave, Henrico, VA 23229", phone: "(804) 673-3765", site: "tuckahoees", hours: "7:20 a.m. – 2:35 p.m." },
  "Twin Hickory Elementary School": { address: "4900 Twin Hickory Lake Drive, Glen Allen, VA 23059", phone: "(804) 360-4700", site: "twinhickory", hours: "8:10 a.m. – 3:10 p.m." },
  "Varina Elementary School": { address: "2551 New Market Road, Henrico, VA 23231", phone: "(804) 795-7010", site: "varinaes", hours: "7:40 a.m. – 2:40 p.m." },
  "The Campus of Virginia Randolph": { address: "2204 Mountain Road, Glen Allen, VA 23060", phone: "(804) 261-5085", site: "campusofvirginiarandolph", hours: "8:00 a.m. – 5:00 p.m." },
  "Virginia Randolph Education Center": { address: "2206 Mountain Road, Glen Allen, VA 23060", phone: "(804) 261-5090", site: "vrec", hours: "8:15 a.m. – 3:45 p.m." },
  "Henrico Virtual Academy": { address: "15 S. Oak Avenue, Highland Springs, VA 23075", phone: "(804) 328-5610", site: "henricovirtualacademy", hours: "7:45 a.m. – 4:15 p.m." }
};
const HENRICO_SCHOOLS = Object.keys(SCHOOL_CONTACTS);
const PASSWORD_MIN = 8;
const PBKDF2_ITERATIONS = 150000;
const EMAIL_LOCAL_PATTERN = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+$/;
const DOMAIN_PATTERN = /^(?=.{3,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/;

const ROLE_LABELS = { student: "Student", teacher: "Teacher", admin: "Administrator" };const PRIORITY_LABELS = { low: "Low", normal: "Normal", high: "High", urgent: "Urgent" };
const STATUS_LABELS = {
  pending: "Awaiting approval",
  approved: "Confirmed",
  active: "In use",
  completed: "Completed",
  denied: "Declined",
  cancelled: "Cancelled",
  returned: "Returned",
  open: "Open",
  "in-progress": "In progress",
  resolved: "Resolved"
};

const ICONS = {
  Technology: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M2 20h20M9 16v4M15 16v4"/></svg>',
  Media: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 8a2 2 0 0 1 2-2h2.5L9 4h6l1.5 2H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/></svg>',
  Science: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 3h6M10 3v6.5L4.6 18.4A1.7 1.7 0 0 0 6 21h12a1.7 1.7 0 0 0 1.4-2.6L14 9.5V3"/><path d="M7.5 15h9"/></svg>',
  Spaces: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21h18M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17"/><circle cx="14.5" cy="12" r="1"/></svg>',
  Events: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 21V3M5 4h11l-2.5 4L16 12H5"/></svg>',
  default: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12h8M12 8v8"/></svg>'
};

const VIEWS = {
  home: { title: "Home", render: renderHome },
  catalog: { title: "Browse Resources", render: renderCatalog },
  requests: { title: "Service Requests", render: renderRequests },
  activity: { title: "My Activity", render: renderActivity },
  admin: { title: "Admin Dashboard", render: renderAdmin, adminOnly: true },
  help: { title: "Help and Policies", render: renderHelp },
  signup: { title: "County Sign-up", render: renderSignup, public: true },
  owner: { title: "Commons Owner", render: renderOwner, ownerOnly: true }
};

const state = {
  version: DATA_VERSION,
  organization: {},
  settings: {},
  categories: [],
  requestTypes: [],
  resources: [],
  reservations: [],
  requests: [],
  announcements: [],
  faq: [],
  policies: [],
  nextRequestNumber: 1000,
  access: { adminEmails: [], allowedDomains: [] },
  accounts: {},
  counties: [],
  siteReports: [],
  nextReportNumber: 1001,
  user: null
};

const ui = {
  googleProfile: null,
  view: "home",
  routed: false,
  requestFilter: "all",
  activityTab: "reservations",
  activeResourceId: null,
  schoolRowId: 0,
  showResolved: false,
  compose: null
};

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;
}

function plural(count, word) {
  return `${count} ${word}${count === 1 ? "" : "s"}`;
}

function toISODate(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

function parseISODate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isWeekendDate(date) {
  return date.getDay() === 0 || date.getDay() === 6;
}

function isWeekend(iso) {
  return isWeekendDate(parseISODate(iso));
}

function todayISO() {
  return toISODate(new Date());
}

function offsetDays(count, from = new Date()) {
  const date = new Date(from);
  date.setDate(date.getDate() + count);
  return toISODate(date);
}

function shiftSchoolDays(count) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  const step = count < 0 ? -1 : 1;
  let remaining = Math.abs(count);
  while (isWeekendDate(date)) date.setDate(date.getDate() + step);
  while (remaining > 0) {
    date.setDate(date.getDate() + step);
    if (!isWeekendDate(date)) remaining -= 1;
  }
  return toISODate(date);
}

function nextSchoolDay(iso, includeSelf) {
  const date = parseISODate(iso);
  if (!includeSelf) date.setDate(date.getDate() + 1);
  while (isWeekendDate(date)) date.setDate(date.getDate() + 1);
  return toISODate(date);
}

function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function fromMinutes(total) {
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function nowMinutes() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}

function formatTime(time) {
  const [hours, minutes] = time.split(":").map(Number);
  const suffix = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${suffix}`;
}

function formatRange(start, end) {
  return `${formatTime(start)} – ${formatTime(end)}`;
}

function formatDate(iso, options = { weekday: "short", month: "short", day: "numeric" }) {
  return parseISODate(iso).toLocaleDateString("en-US", options);
}

function formatDateTime(timestamp) {
  return new Date(timestamp).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
}

function relativeDay(iso) {
  if (iso === todayISO()) return "Today";
  if (iso === offsetDays(1)) return "Tomorrow";
  return formatDate(iso);
}

function dayPhrase(iso) {
  const label = relativeDay(iso);
  return label === "Today" || label === "Tomorrow" ? label.toLowerCase() : `on ${label}`;
}

function openMinutes() {
  return toMinutes(state.settings.open);
}

function closeMinutes() {
  return toMinutes(state.settings.close);
}

function defaultWindow() {
  const open = openMinutes();
  const close = closeMinutes();
  let date = todayISO();
  let start = Math.max(open, Math.ceil(nowMinutes() / SLOT) * SLOT);
  if (isWeekend(date) || start + 60 > close) {
    date = nextSchoolDay(date, false);
    start = Math.min(open + 120, close - 60);
  }
  return { date, start: fromMinutes(start), end: fromMinutes(start + 60) };
}

function displayName(name) {
  if (/^(mr|ms|mrs|dr|coach)\.?\s/i.test(name)) return name;
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : parts[0];
}

function initials(name) {
  return name
    .replace(/^(mr|ms|mrs|dr|coach)\.?\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function emailDomain(email) {
  return email.split("@").pop();
}

function isAdminEmail(email) {
  return Boolean(email) && state.access.adminEmails.includes(email.toLowerCase());
}

// The most specific matching domain wins, so students.school.org can be a student domain under a teacher domain school.org.
function domainRule(email) {
  const domain = emailDomain(email.toLowerCase());
  return (
    state.access.allowedDomains
      .filter(rule => domain === rule.domain || domain.endsWith(`.${rule.domain}`))
      .sort((a, b) => b.domain.length - a.domain.length)[0] ?? null
  );
}

function allowedRoles(email) {
  if (!email) return [];
  if (isAdminEmail(email)) return ["student", "teacher", "admin"];
  const rule = domainRule(email);
  return rule ? [rule.role] : [];
}

function approvedCounties() {
  return state.counties.filter(county => county.status === "approved");
}

function allSchools() {
  return [...HENRICO_SCHOOLS, ...approvedCounties().flatMap(county => county.schools.map(school => school.name))];
}

function findSchool(value) {
  const query = value.trim().toLowerCase();
  return allSchools().find(school => school.toLowerCase() === query) ?? null;
}

function countySchool(name) {
  for (const county of approvedCounties()) {
    const school = county.schools.find(item => item.name === name);
    if (school) return { county, school };
  }
  return null;
}

function principalSchool(email) {
  return Object.keys(state.access.principals).find(school => state.access.principals[school] === email) ?? null;
}

function isPrincipal() {
  return isAdmin() && principalSchool(state.user.email) === state.user.school;
}

function roleLabel(user) {
  return user.role === "admin" && principalSchool(user.email) === user.school ? "Principal" : ROLE_LABELS[user.role];
}

function isOwner() {
  return isAdmin() && state.user.email === OWNER_EMAIL;
}

// Which schools an admin email manages: its own school, or every school in its county.
function adminScope(email) {
  const principalOf = principalSchool(email);
  if (principalOf) return { label: `Principal · ${principalOf}`, schools: [principalOf] };
  if (BUILT_IN_SCHOOL_ADMINS[email]) return { label: `School administrator · ${BUILT_IN_SCHOOL_ADMINS[email]}`, schools: [BUILT_IN_SCHOOL_ADMINS[email]] };
  for (const county of approvedCounties()) {
    if (county.contact.email === email) return { label: `County administrator · ${county.name}`, schools: county.schools.map(school => school.name) };
    const school = county.schools.find(item => item.adminEmail === email);
    if (school) return { label: `School administrator · ${school.name}`, schools: [school.name] };
  }
  const added = state.access.addedAdmins?.[email];
  if (added) return { label: `School administrator · ${added.school}`, schools: [added.school] };
  return null;
}

function adminTitle(email) {
  return [email === OWNER_EMAIL && "Commons owner", adminScope(email)?.label].filter(Boolean).join(" and ") || "Administrator";
}

function adminSchoolError(email, school) {
  const scope = adminScope(email);
  if (!scope || scope.schools.includes(school)) return "";
  return scope.schools.length === 1
    ? `As an administrator, ${email} signs in for ${scope.schools[0]}.`
    : "As an administrator, pick one of your county's schools.";
}

function currentSchool() {
  return state.user?.school ?? DIVISION_NAME;
}

function canSignIn(user) {
  if (!state.accounts[user?.email] || !findSchool(user.school ?? "")) return false;
  if (user.role === "admin" && adminSchoolError(user.email, user.school)) return false;
  return allowedRoles(user.email).includes(user.role);
}

function signInError(email, role) {
  if (!isValidEmail(email)) return "Enter a valid email address, like name@school.org.";
  const roles = allowedRoles(email);
  if (!roles.length) return `@${emailDomain(email)} isn't authorized. Ask an administrator to approve your email domain.`;
  if (role === "admin" && !roles.includes("admin")) return `${email} isn't an administrator email.`;
  if (!roles.includes(role)) return `@${emailDomain(email)} is approved for ${ROLE_LABELS[roles[0]].toLowerCase()}s, so sign in as a ${ROLE_LABELS[roles[0]]}.`;
  return "";
}

function bytesToHex(bytes) {
  return [...new Uint8Array(bytes)].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function hexToBytes(hex) {
  return new Uint8Array(hex.match(/../g).map(pair => parseInt(pair, 16)));
}

// Passwords are never saved. Only a salted PBKDF2 hash is kept, and sign-in compares hashes.
async function hashPassword(password, saltHex) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: hexToBytes(saltHex), iterations: PBKDF2_ITERATIONS }, key, 256);
  return bytesToHex(bits);
}

async function createCredential(password) {
  const salt = bytesToHex(crypto.getRandomValues(new Uint8Array(16)));
  return { salt, hash: await hashPassword(password, salt), createdAt: Date.now() };
}

function ensureAccess() {
  const access = state.access ?? {};
  const principals = access.principals ?? {};
  // Email → { school, addedBy, addedAt }. Administrators added from the Admin page by an existing admin or principal.
  const addedAdmins = access.addedAdmins ?? {};
  state.access = {
    adminEmails: [
      ...new Set([OWNER_EMAIL, ...Object.keys(BUILT_IN_SCHOOL_ADMINS), ...Object.values(principals), ...Object.keys(addedAdmins), ...(access.adminEmails ?? [])])
    ].filter(email => !RETIRED_ADMIN_EMAILS.includes(email)),
    // School name → principal's email. Principals are school administrators who can also override other admins.
    principals,
    addedAdmins,
    allowedDomains: (access.allowedDomains ?? []).map(rule => (typeof rule === "string" ? { domain: rule, role: "student" } : rule))
  };
  state.accounts = state.accounts ?? {};
  // Student access codes were removed. Drop any that older saved data still has.
  delete state.accessCodes;
  state.counties = state.counties ?? [];
  state.siteReports = state.siteReports ?? [];
  state.nextReportNumber = state.nextReportNumber ?? 1001;
  state.messages = state.messages ?? [];
}

// Stricter than "something@something.something": checks the parts on each side of the @ against email rules.
function isValidEmail(email) {
  const at = email.lastIndexOf("@");
  if (at < 1 || email.length > 254) return false;
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  return local.length <= 64 && EMAIL_LOCAL_PATTERN.test(local) && !/^\.|\.$|\.\./.test(local) && DOMAIN_PATTERN.test(domain);
}

function isAdmin() {
  return state.user?.role === "admin" && isAdminEmail(state.user.email);
}

function isMine(record) {
  return Boolean(state.user) && record.user.toLowerCase() === state.user.name.toLowerCase();
}

function getResource(id) {
  return state.resources.find(resource => resource.id === id);
}

function getCategory(name) {
  return state.categories.find(category => category.name === name) ?? { name, color: "#64748b" };
}

function iconFor(category) {
  return ICONS[category] ?? ICONS.default;
}

function byDateTime(a, b) {
  return a.date.localeCompare(b.date) || toMinutes(a.start) - toMinutes(b.start);
}

function hasStarted(reservation) {
  const today = todayISO();
  return reservation.date < today || (reservation.date === today && toMinutes(reservation.start) <= nowMinutes());
}

function isPast(reservation) {
  const today = todayISO();
  return reservation.date < today || (reservation.date === today && toMinutes(reservation.end) <= nowMinutes());
}

function displayStatus(reservation) {
  if (reservation.status !== "approved") return reservation.status;
  if (isPast(reservation)) return "completed";
  if (hasStarted(reservation)) return "active";
  return "approved";
}

function bookingsFor(resourceId, date) {
  return state.reservations
    .filter(item => item.resourceId === resourceId && item.date === date && ACTIVE_STATUSES.includes(item.status))
    .sort(byDateTime);
}

function availableQuantity(resource, date, start, end) {
  const from = toMinutes(start);
  const to = toMinutes(end);
  const overlapping = bookingsFor(resource.id, date).filter(item => toMinutes(item.start) < to && from < toMinutes(item.end));
  const checkpoints = [from, ...overlapping.map(item => toMinutes(item.start)).filter(point => point > from && point < to)];
  const peak = Math.max(
    0,
    ...checkpoints.map(point =>
      overlapping
        .filter(item => toMinutes(item.start) <= point && point < toMinutes(item.end))
        .reduce((sum, item) => sum + item.qty, 0)
    )
  );
  return Math.max(0, resource.quantity - peak);
}

function popularity(resourceId) {
  return state.reservations.filter(item => item.resourceId === resourceId && !["cancelled", "denied"].includes(item.status)).length;
}

function myReservations() {
  return state.reservations.filter(isMine);
}

async function loadSeed() {
  const response = await fetch("FBLA.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`FBLA.json returned ${response.status}`);
  return response.json();
}

function hydrate(seed) {
  const now = Date.now();
  return {
    version: DATA_VERSION,
    organization: seed.organization,
    settings: seed.settings,
    categories: seed.categories,
    requestTypes: seed.requestTypes,
    faq: seed.faq,
    policies: seed.policies,
    announcements: seed.announcements.map(({ daysAgo, ...item }) => ({ ...item, date: offsetDays(-daysAgo) })),
    resources: seed.resources.map(item => ({ ...item })),
    reservations: seed.reservations.map(({ dayOffset, ...item }) => ({
      ...item,
      date: shiftSchoolDays(dayOffset),
      createdAt: now - 2 * DAY_MS
    })),
    requests: seed.requests.map(({ hoursAgo, updates, ...item }) => {
      const createdAt = now - hoursAgo * HOUR_MS;
      return {
        ...item,
        createdAt,
        updates: updates.map(({ hoursAfter, ...update }) => ({ ...update, at: createdAt + hoursAfter * HOUR_MS }))
      };
    }),
    nextRequestNumber: seed.settings.firstRequestNumber + seed.requests.length,
    schoolTemplate: seed.resources.map(item => ({ ...item })),
    access: state.access,
    accounts: state.accounts,
    counties: state.counties,
    siteReports: state.siteReports,
    nextReportNumber: state.nextReportNumber,
    messages: state.messages,
    user: state.user
  };
}

// Each school keeps its own catalog, reservations, and requests. The signed-in school's data sits at the top of `state`
// so the rest of the app can use it directly, and every other school's data waits in `schoolData` until someone signs in there.
const SCHOOL_DATA_KEYS = ["resources", "reservations", "requests", "nextRequestNumber", "decisions"];

function ensureSchools() {
  state.schoolData = state.schoolData ?? {};
  state.decisions = state.decisions ?? [];
  state.schoolTemplate = state.schoolTemplate ?? state.resources.map(item => ({ ...item }));
  // Data saved before schools were separate belongs to whichever school was signed in.
  if (state.activeSchool === undefined) state.activeSchool = state.user?.school ?? null;
}

function useSchool(school) {
  if (!school || state.activeSchool === school) return;
  // With no active school yet, the sample data on screen becomes the first school's.
  if (state.activeSchool) {
    state.schoolData[state.activeSchool] = Object.fromEntries(SCHOOL_DATA_KEYS.map(key => [key, state[key]]));
    Object.assign(
      state,
      state.schoolData[school] ?? {
        resources: state.schoolTemplate.map(item => ({ ...item, features: [...(item.features ?? [])] })),
        reservations: [],
        requests: [],
        nextRequestNumber: state.settings.firstRequestNumber,
        decisions: []
      }
    );
  }
  delete state.schoolData[school];
  state.activeSchool = school;
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    toast("Your browser blocked saving, so changes will be lost when you close this tab.", "error");
  }
}

function restore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function loadPrefs() {
  try {
    return JSON.parse(localStorage.getItem(PREFS_KEY)) ?? {};
  } catch {
    return {};
  }
}

function savePref(key, value) {
  const prefs = { ...loadPrefs(), [key]: value };
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch {}
  applyPrefs(prefs);
}

function applyPrefs(prefs = loadPrefs()) {
  const dark = prefs.theme ? prefs.theme === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.documentElement.classList.toggle("large-text", Boolean(prefs.largeText));
  $("#theme-toggle").setAttribute("aria-pressed", String(dark));
  $("#text-size-toggle").setAttribute("aria-pressed", String(Boolean(prefs.largeText)));
}

function commit() {
  persist();
  renderHeader();
  VIEWS[ui.view].render();
}

async function init() {
  applyPrefs();
  bindEvents();
  const saved = restore();
  if (saved?.version === DATA_VERSION) {
    Object.assign(state, saved);
  } else {
    try {
      Object.assign(state, hydrate(await loadSeed()));
      persist();
    } catch {
      showLoadError();
      return;
    }
  }
  ensureAccess();
  ensureSchools();
  if (state.user && !canSignIn(state.user)) state.user = null;
  if (state.user) useSchool(state.user.school);
  persist();
  setupStaticContent();
  renderHeader();
  window.addEventListener("hashchange", route);
  window.addEventListener("storage", syncFromOtherTab);
  route();
}

// Other tabs save to the same storage. Reload their changes so this tab never shows, or saves over, stale data.
function syncFromOtherTab(event) {
  if (event.key !== STORAGE_KEY || !event.newValue) return;
  try {
    Object.assign(state, JSON.parse(event.newValue));
  } catch {
    return;
  }
  ensureAccess();
  ensureSchools();
  if (state.user && !canSignIn(state.user)) state.user = null;
  if (state.user) useSchool(state.user.school);
  renderHeader();
  if ((VIEWS[ui.view].adminOnly && !isAdmin()) || (VIEWS[ui.view].ownerOnly && !isOwner())) route();
  else VIEWS[ui.view].render();
  if (!state.user && !VIEWS[ui.view].public) openLogin();
}

function showLoadError() {
  $("#main").innerHTML = `
    <div class="container">
      <div class="panel load-error" role="alert">
        <h1>We couldn't load the resource data</h1>
        <p>Commons reads its starting data from <code>FBLA.json</code>. Browsers block that file when a page is opened straight from your computer, so open the site through a local web server (such as the VS Code Live Server extension) or a hosted URL.</p>
        <button type="button" class="btn btn-primary" id="retry-load">Try again</button>
      </div>
    </div>`;
  $("#retry-load").addEventListener("click", () => location.reload());
}

function timeOptions(from, to) {
  const options = [];
  for (let minutes = from; minutes <= to; minutes += SLOT) {
    options.push(`<option value="${fromMinutes(minutes)}">${formatTime(fromMinutes(minutes))}</option>`);
  }
  return options.join("");
}

function syncEndTime(startSelect, endSelect) {
  const start = toMinutes(startSelect.value);
  if (toMinutes(endSelect.value) <= start) {
    endSelect.value = fromMinutes(Math.min(start + 60, closeMinutes()));
  }
}

function currentContact() {
  const school = state.user?.school;
  const info = SCHOOL_CONTACTS[school];
  const joined = countySchool(school);
  if (joined) {
    return { office: `${school} administrator`, address: `${joined.county.name}, ${joined.county.state}`, email: joined.school.adminEmail };
  }
  if (!info) return { office: `${DIVISION_NAME} central office`, ...DIVISION_CONTACT };
  return { office: `${school} front office`, address: info.address, phone: info.phone, hours: info.hours, url: `https://${info.site}.henricoschools.us/` };
}

function renderContact() {
  const contact = currentContact();
  const phone = contact.phone && `<a href="tel:+1${contact.phone.replace(/\D/g, "")}">${escapeHTML(contact.phone)}</a>`;
  const email = contact.email && `<a href="mailto:${escapeHTML(contact.email)}">${escapeHTML(contact.email)}</a>`;
  const site = contact.url && `<a href="${contact.url}" target="_blank" rel="noopener">${escapeHTML(contact.url.replace(/^https:\/\/|\/$/g, ""))}</a>`;
  const hours = contact.hours ?? (contact.phone ? `Not posted online. Call ${contact.phone} to confirm.` : null);
  $("#footer-contact").innerHTML = [escapeHTML(contact.office), escapeHTML(contact.address), phone, email, site]
    .filter(Boolean)
    .map(item => `<li>${item}</li>`)
    .join("");
  $("#help-contact").innerHTML = [
    ["Office", escapeHTML(contact.office)],
    ["Address", escapeHTML(contact.address)],
    ["Phone", phone],
    ["Email", email],
    ["Website", site],
    ["Front office hours", hours && escapeHTML(hours)]
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `<li><span>${label}</span>${value}</li>`)
    .join("");
}

function setupStaticContent() {
  $("#footer-year").textContent = new Date().getFullYear();

  const categoryOptions = state.categories.map(category => `<option value="${escapeHTML(category.name)}">${escapeHTML(category.name)}</option>`).join("");
  $("#category-select").innerHTML = `<option value="all">All categories</option>${categoryOptions}`;
  $("#nr-category").innerHTML = categoryOptions;
  $("#req-type").innerHTML = state.requestTypes.map(type => `<option>${escapeHTML(type)}</option>`).join("");

  const open = openMinutes();
  const close = closeMinutes();
  ["#filter-start", "#rf-start"].forEach(selector => ($(selector).innerHTML = timeOptions(open, close - SLOT)));
  ["#filter-end", "#rf-end"].forEach(selector => ($(selector).innerHTML = timeOptions(open + SLOT, close)));

  const maxDate = offsetDays(state.settings.maxDaysAhead);
  ["#filter-date", "#rf-date"].forEach(selector => {
    $(selector).min = todayISO();
    $(selector).max = maxDate;
  });
  setFilterWindow(defaultWindow());
  renderHelp();
}

function setFilterWindow({ date, start, end }) {
  $("#filter-date").value = date;
  $("#filter-start").value = start;
  $("#filter-end").value = end;
}

function bindEvents() {
  $(".skip-link").addEventListener("click", event => {
    event.preventDefault();
    $("#main").focus();
  });
  $(".nav-toggle").addEventListener("click", toggleNav);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeNav();
  });
  $("#theme-toggle").addEventListener("click", () => savePref("theme", document.documentElement.dataset.theme === "dark" ? "light" : "dark"));
  $("#text-size-toggle").addEventListener("click", () => savePref("largeText", !loadPrefs().largeText));
  $("#user-chip").addEventListener("click", openLogin);

  $("#login-form").addEventListener("submit", handleLogin);
  $("#login-email").addEventListener("input", updateLoginMode);
  $("#google-fallback").addEventListener("click", () => {
    $("#login-error").textContent = "Google sign-in isn't set up yet. Add a Google client ID to GOOGLE_CLIENT_ID at the top of FBLA.js (steps are in the README).";
  });
  setupGoogle();
  $("#login-dialog").addEventListener("cancel", event => {
    if (!state.user && !VIEWS[ui.view].public) event.preventDefault();
  });
  $("#login-dialog").addEventListener("close", () => {
    if (!state.user && !VIEWS[ui.view].public) openLogin();
  });

  $("#filter-form").addEventListener("submit", event => event.preventDefault());
  $("#filter-form").addEventListener("input", handleFilterChange);
  $("#filter-form").addEventListener("change", handleFilterChange);
  $("#clear-filters").addEventListener("click", resetFilters);

  $("#reserve-form").addEventListener("change", event => {
    if (event.target.id === "rf-start") syncEndTime($("#rf-start"), $("#rf-end"));
    updateReservePreview();
  });
  $("#reserve-form").addEventListener("input", updateReservePreview);
  $("#reserve-form").addEventListener("submit", handleReserve);

  $("#request-form").addEventListener("submit", handleRequestSubmit);
  $("#req-details").addEventListener("input", event => ($("#req-count").textContent = event.target.value.length));

  $("#resource-form").addEventListener("submit", handleAddResource);
  $("#domain-form").addEventListener("submit", handleAddDomain);
  $("#principal-form").addEventListener("submit", handleSetPrincipal);
  $("#signup-form").addEventListener("submit", handleSignup);
  $("#report-form").addEventListener("submit", handleReport);
  $("#admin-add-form").addEventListener("submit", handleAddAdmin);
  $("#message-form").addEventListener("submit", handleMessageSubmit);
  $("#ask-jump").addEventListener("click", () => {
    showActivityTab("messages");
    $("#tab-messages").focus();
    $("#ask-form").scrollIntoView({ block: "start" });
  });
  ["#compose-form", "#ask-form"].forEach(selector => {
    const form = $(selector);
    const prefix = form.dataset.prefix;
    form.addEventListener("submit", handleSendForm);
    $(`#${prefix}-to`).addEventListener("change", () => {
      updateOtherField(prefix);
      if ($(`#${prefix}-to`).value === "other") $(`#${prefix}-other`).focus();
    });
    $(`#${prefix}-about`).addEventListener("change", handleAboutChange);
  });
  $("#signup-add-school").addEventListener("click", () => addSchoolRow(true));
  $("#signup-signin").addEventListener("click", openLogin);
  $("#login-signup-link").addEventListener("click", event => {
    event.preventDefault();
    history.pushState(null, "", "#signup");
    route();
    $("#login-dialog").close();
  });
  $("#show-resolved").addEventListener("change", event => {
    ui.showResolved = event.target.checked;
    renderAdmin();
  });
  $("#reset-data").addEventListener("click", resetDemoData);
  $("#export-mine").addEventListener("click", () => exportReservations(myReservations(), "my-reservations"));
  $("#export-all").addEventListener("click", () => exportReservations(state.reservations, "all-reservations"));

  $$('[role="tab"]').forEach(tab => {
    tab.addEventListener("click", () => showActivityTab(tab.dataset.tab));
    tab.addEventListener("keydown", event => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const tabs = $$('[role="tab"]').filter(item => !item.hidden);
      const index = tabs.indexOf(tab);
      const nextIndex = {
        ArrowRight: (index + 1) % tabs.length,
        ArrowLeft: (index - 1 + tabs.length) % tabs.length,
        Home: 0,
        End: tabs.length - 1
      }[event.key];
      showActivityTab(tabs[nextIndex].dataset.tab);
      tabs[nextIndex].focus();
    });
  });

  document.addEventListener("click", handleDocumentClick);
  $$("dialog").forEach(dialog => {
    dialog.addEventListener("click", event => {
      if (event.target === dialog && dialog.id !== "login-dialog") dialog.close();
    });
  });
}

function handleDocumentClick(event) {
  const target = event.target.closest(
    "[data-open-resource], [data-cancel], [data-return], [data-approve], [data-deny], [data-remove-resource], [data-remove-domain], [data-reset-password], [data-override], [data-remove-principal], [data-approve-county], [data-decline-county], [data-resolve-report], [data-remove-school-row], [data-request-filter], [data-save-request], [data-remove-admin], [data-message-request], [data-message-reservation], [data-reply-message], [data-close]"
  );
  if (!target) return;
  const { dataset } = target;
  if (dataset.openResource) openResource(dataset.openResource);
  else if (dataset.cancel) cancelReservation(dataset.cancel);
  else if (dataset.return) markReturned(dataset.return);
  else if (dataset.approve) reviewReservation(dataset.approve, "approved");
  else if (dataset.deny) reviewReservation(dataset.deny, "denied");
  else if (dataset.removeResource) removeResource(dataset.removeResource);
  else if (dataset.removeDomain) removeDomain(dataset.removeDomain);
  else if (dataset.resetPassword) resetPassword(dataset.resetPassword);
  else if (dataset.override) overrideDecision(dataset.override);
  else if (dataset.removePrincipal) removePrincipal(dataset.removePrincipal);
  else if (dataset.removeAdmin) removeAddedAdmin(dataset.removeAdmin);
  else if (dataset.messageRequest) messageAboutRecord("request", dataset.messageRequest);
  else if (dataset.messageReservation) messageAboutRecord("reservation", dataset.messageReservation);
  else if (dataset.replyMessage) replyToMessage(dataset.replyMessage);
  else if (dataset.approveCounty) approveCounty(dataset.approveCounty);
  else if (dataset.declineCounty) declineCounty(dataset.declineCounty);
  else if (dataset.resolveReport) resolveReport(dataset.resolveReport);
  else if ("removeSchoolRow" in dataset) removeSchoolRow(target);
  else if (dataset.requestFilter) {
    ui.requestFilter = dataset.requestFilter;
    renderRequests();
  } else if (dataset.saveRequest) saveRequestUpdate(dataset.saveRequest);
  else if ("close" in dataset) target.closest("dialog")?.close();
}

function toggleNav() {
  const toggle = $(".nav-toggle");
  const open = toggle.getAttribute("aria-expanded") !== "true";
  toggle.setAttribute("aria-expanded", String(open));
  $("#primary-nav").classList.toggle("open", open);
}

function closeNav() {
  $(".nav-toggle").setAttribute("aria-expanded", "false");
  $("#primary-nav").classList.remove("open");
}

function route() {
  let name = location.hash.slice(1) || "home";
  if (!VIEWS[name]) name = "home";
  if (VIEWS[name].adminOnly && !isAdmin()) {
    if (state.user) toast("The admin dashboard is only available to administrators.", "error");
    history.replaceState(null, "", "#home");
    name = "home";
  }
  if (VIEWS[name].ownerOnly && !isOwner()) {
    if (state.user) toast("The owner page is only available to the Commons owner.", "error");
    history.replaceState(null, "", "#home");
    name = "home";
  }
  ui.view = name;
  $$(".view").forEach(view => (view.hidden = view.dataset.view !== name));
  $$("[data-route]").forEach(link => {
    if (link.dataset.route === name) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.title = `${VIEWS[name].title} | Commons`;
  closeNav();
  VIEWS[name].render();
  if (ui.routed) {
    window.scrollTo({ top: 0 });
    $(`#view-${name} h1`)?.focus({ preventScroll: true });
  }
  ui.routed = true;
  if (!state.user && !VIEWS[name].public) openLogin();
}

function renderHeader() {
  const user = state.user;
  $$("[data-org-name]").forEach(element => (element.textContent = currentSchool()));
  $("#school-options").innerHTML = allSchools().map(school => `<option value="${escapeHTML(school)}"></option>`).join("");
  renderContact();
  $("[data-user-name]").textContent = user ? user.name : "Sign in";
  $("[data-user-role]").textContent = user ? roleLabel(user) : "";
  $("[data-user-initials]").textContent = user ? initials(user.name) || "?" : "?";
  $("#user-chip").title = user ? `Signed in as ${user.email}. Switch profile` : "Sign in";
  $("[data-admin-only]").hidden = !isAdmin();
  $("[data-owner-only]").hidden = !isOwner();
  $$("[data-principal-only]").forEach(element => (element.hidden = !isPrincipal()));
  $$("[data-not-owner]").forEach(element => (element.hidden = isOwner()));
  const activityItems = unreadMessages().length + pendingRoomBookings().length;
  const messageBadge = $("[data-message-count]");
  messageBadge.hidden = activityItems === 0;
  messageBadge.innerHTML = `${activityItems}<span class="sr-only"> unread messages or room bookings to approve</span>`;
  const ownerItems =
    state.counties.filter(county => county.status === "pending").length +
    state.siteReports.filter(report => report.status === "open").length +
    (isOwner() ? ownerInbox().filter(message => !message.read && message.to.email === OWNER_EMAIL).length : 0);
  const ownerBadge = $("[data-owner-count]");
  ownerBadge.hidden = ownerItems === 0;
  ownerBadge.innerHTML = `${ownerItems}<span class="sr-only"> items to review</span>`;
  const attention = state.reservations.filter(item => item.status === "pending").length + state.requests.filter(isNewRequest).length;
  const badge = $("[data-pending-count]");
  badge.hidden = attention === 0;
  badge.innerHTML = `${attention}<span class="sr-only"> items need attention</span>`;
}

// A request no admin has touched yet: still open with only its "submitted" entry.
function isNewRequest(request) {
  return request.status === "open" && request.updates.length === 1;
}

function statCard(label, value, href, alert = false) {
  const tag = href ? "a" : "div";
  const attrs = href ? ` href="${href}"` : "";
  return `<${tag} class="stat-card${alert ? " stat-card-alert" : ""}"${attrs}><span class="stat-value">${value}</span><span class="stat-label">${escapeHTML(label)}</span></${tag}>`;
}

function resourceCard(resource, slot) {
  const category = getCategory(resource.category);
  const free = availableQuantity(resource, slot.date, slot.start, slot.end);
  let status = ["available", resource.quantity > 1 ? `All ${resource.quantity} free` : "Free"];
  if (free === 0) status = ["unavailable", "Booked"];
  else if (free < resource.quantity) status = ["limited", `${free} of ${resource.quantity} free`];
  const features = (resource.features ?? []).slice(0, 3).map(feature => `<li>${escapeHTML(feature)}</li>`).join("");
  return `
    <article class="resource-card" style="--cat:${category.color}">
      <div class="resource-card-top">
        <span class="cat-icon">${iconFor(resource.category)}</span>
        <span class="badge badge-${status[0]}">${status[1]}</span>
      </div>
      <h3><button type="button" class="card-link" data-open-resource="${resource.id}">${escapeHTML(resource.name)}</button></h3>
      <p class="card-meta">${escapeHTML(resource.category)} · ${escapeHTML(resource.location)}</p>
      <p class="card-desc">${escapeHTML(resource.description)}</p>
      ${features ? `<ul class="tag-list">${features}</ul>` : ""}
      <div class="card-foot">
        <span>${resource.requiresApproval ? "Needs approval" : "Instant booking"}</span>
        <span aria-hidden="true">→</span>
      </div>
    </article>`;
}

function renderHome() {
  const today = todayISO();
  const slot = defaultWindow();
  const freeCount = state.resources.filter(resource => availableQuantity(resource, slot.date, slot.start, slot.end) > 0).length;
  const upcomingMine = myReservations().filter(item => ACTIVE_STATUSES.includes(item.status) && !isPast(item)).length;
  const openRequests = state.requests.filter(item => item.status !== "resolved").length;
  const glanceDate = nextSchoolDay(today, true);
  const glance = state.reservations.filter(item => item.date === glanceDate && ACTIVE_STATUSES.includes(item.status)).sort(byDateTime);

  $("#home-stats").innerHTML = [
    statCard(
      slot.date === today ? "Resources free right now" : `Free ${dayPhrase(slot.date)} at ${formatTime(slot.start)}`,
      `${freeCount}<span>/${state.resources.length}</span>`,
      "#catalog"
    ),
    statCard("Your upcoming reservations", upcomingMine, "#activity"),
    statCard("Open service requests", openRequests, "#requests"),
    statCard(`Bookings ${dayPhrase(glanceDate)}`, glance.length, "#catalog")
  ].join("");

  $("#glance-title").textContent = `${relativeDay(glanceDate)} at a glance`;
  const items = glance.slice(0, 5).map(item => {
    const resource = getResource(item.resourceId);
    return `
      <li>
        <span class="glance-time">${formatTime(item.start)}</span>
        <span class="glance-body">
          <strong>${escapeHTML(resource?.name ?? "Removed resource")}</strong>
          <small>${escapeHTML(displayName(item.user))} · until ${formatTime(item.end)}</small>
        </span>
      </li>`;
  });
  if (glance.length > 5) items.push(`<li class="glance-empty">+ ${plural(glance.length - 5, "more reservation")}</li>`);
  $("#glance-list").innerHTML = items.length ? items.join("") : `<li class="glance-empty">No reservations yet. Be the first to book.</li>`;

  $("#popular-grid").innerHTML = [...state.resources]
    .sort((a, b) => popularity(b.id) - popularity(a.id) || a.name.localeCompare(b.name))
    .slice(0, 4)
    .map(resource => resourceCard(resource, slot))
    .join("");

  $("#announcement-list").innerHTML = state.announcements
    .map(
      item => `
      <li class="announcement">
        <div class="announcement-top">
          <span class="tag tag-${escapeHTML(item.tag.toLowerCase())}">${escapeHTML(item.tag)}</span>
          <time datetime="${item.date}">${formatDate(item.date)}</time>
        </div>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.body)}</p>
      </li>`
    )
    .join("");
}

function catalogWindow() {
  const fallback = defaultWindow();
  return {
    date: $("#filter-date").value || fallback.date,
    start: $("#filter-start").value || fallback.start,
    end: $("#filter-end").value || fallback.end
  };
}

function handleFilterChange(event) {
  if (event.target.id === "filter-start") syncEndTime($("#filter-start"), $("#filter-end"));
  if (event.target.id === "filter-end" && toMinutes($("#filter-end").value) <= toMinutes($("#filter-start").value)) {
    $("#filter-start").value = fromMinutes(Math.max(openMinutes(), toMinutes($("#filter-end").value) - 60));
  }
  renderCatalog();
}

function resetFilters() {
  $("#search-input").value = "";
  $("#category-select").value = "all";
  $("#sort-select").value = "name";
  $("#available-only").checked = false;
  setFilterWindow(defaultWindow());
  renderCatalog();
  $("#search-input").focus();
}

function renderCatalog() {
  const slot = catalogWindow();
  const query = $("#search-input").value.trim().toLowerCase();
  const category = $("#category-select").value;
  const sort = $("#sort-select").value;
  const availableOnly = $("#available-only").checked;

  let list = state.resources.map(resource => ({ resource, free: availableQuantity(resource, slot.date, slot.start, slot.end) }));
  if (query) {
    list = list.filter(({ resource }) =>
      [resource.name, resource.description, resource.location, resource.category, ...(resource.features ?? [])].join(" ").toLowerCase().includes(query)
    );
  }
  if (category !== "all") list = list.filter(({ resource }) => resource.category === category);
  if (availableOnly) list = list.filter(({ free }) => free > 0);

  const sorters = {
    name: (a, b) => a.resource.name.localeCompare(b.resource.name),
    available: (a, b) => b.free / b.resource.quantity - a.free / a.resource.quantity || b.free - a.free,
    popular: (a, b) => popularity(b.resource.id) - popularity(a.resource.id)
  };
  list.sort(sorters[sort]);

  $("#resource-grid").innerHTML = list.map(({ resource }) => resourceCard(resource, slot)).join("");
  $("#catalog-empty").hidden = list.length > 0;

  const closedNote = isWeekend(slot.date) ? ` <span class="results-warning">School is closed on weekends, so reservations can only be made Monday–Friday.</span>` : "";
  $("#results-meta").innerHTML = `Showing <strong>${list.length}</strong> of ${state.resources.length} resources for <strong>${formatDate(slot.date)}, ${formatRange(slot.start, slot.end)}</strong>.${closedNote}`;
}

function openResource(id) {
  const resource = getResource(id);
  if (!resource) return;
  ui.activeResourceId = id;
  const dialog = $("#resource-dialog");
  dialog.style.setProperty("--cat", getCategory(resource.category).color);
  $("#rd-icon").innerHTML = iconFor(resource.category);
  $("#rd-category").textContent = resource.category;
  $("#rd-title").textContent = resource.name;
  $("#rd-location").textContent = resource.location;
  $("#rd-description").textContent = resource.description;
  $("#rd-meta").innerHTML = [
    ["Units", resource.quantity],
    ["Max per booking", plural(resource.maxHours, "hour")],
    ["Approval", resource.requiresApproval ? "Required" : "Instant"],
    resource.capacity ? ["Seats", resource.capacity] : null
  ]
    .filter(Boolean)
    .map(([label, value]) => `<li><span>${label}</span><strong>${escapeHTML(value)}</strong></li>`)
    .join("");

  const slot = ui.view === "catalog" ? catalogWindow() : defaultWindow();
  $("#rf-date").value = slot.date;
  $("#rf-start").value = slot.start;
  $("#rf-end").value = slot.end;
  $("#rf-qty").value = 1;
  $("#rf-qty").max = resource.quantity;
  $("#rf-qty-field").hidden = resource.quantity === 1;
  $("#rf-purpose").value = "";
  clearReserveErrors();

  const needsApproval = resource.requiresApproval && !isAdmin();
  $("#reserve-submit").textContent = needsApproval ? "Send for approval" : "Confirm reservation";
  $("#reserve-note").textContent = needsApproval
    ? "An administrator reviews this item before it is confirmed. You can follow the status in My Activity."
    : "This reservation is confirmed instantly.";

  updateReservePreview();
  dialog.showModal();
}

function readReserveForm() {
  return {
    date: $("#rf-date").value,
    start: $("#rf-start").value,
    end: $("#rf-end").value,
    qty: Number($("#rf-qty").value),
    purpose: $("#rf-purpose").value.trim()
  };
}

function clearReserveErrors() {
  $("#reserve-error").textContent = "";
  $$("#reserve-form input, #reserve-form select").forEach(field => field.removeAttribute("aria-invalid"));
}

function updateReservePreview() {
  const resource = getResource(ui.activeResourceId);
  if (!resource) return;
  const data = readReserveForm();
  renderTimeline(resource, data);

  const hint = $("#reserve-hint");
  let message = "";
  let tone = "neutral";
  if (!data.date) {
    message = "Choose a date to check availability.";
  } else if (isWeekend(data.date)) {
    message = "School is closed on weekends. Pick a weekday.";
    tone = "bad";
  } else if (toMinutes(data.end) <= toMinutes(data.start)) {
    message = "The end time needs to be after the start time.";
    tone = "bad";
  } else {
    const free = availableQuantity(resource, data.date, data.start, data.end);
    const range = formatRange(data.start, data.end);
    if (free === 0) {
      message = `Already booked from ${range}. Try a different time.`;
      tone = "bad";
    } else if (resource.quantity > 1) {
      message = `${free} of ${resource.quantity} available from ${range}.`;
      tone = free < resource.quantity ? "warn" : "good";
    } else {
      message = `Open from ${range}.`;
      tone = "good";
    }
  }
  hint.textContent = message;
  hint.dataset.tone = tone;
}

function renderTimeline(resource, { date, start, end, qty }) {
  const open = openMinutes();
  const close = closeMinutes();
  const span = close - open;
  const percent = minutes => ((Math.min(Math.max(minutes, open), close) - open) / span) * 100;
  const bookings = date ? bookingsFor(resource.id, date) : [];
  const laneEnds = [];

  const blocks = bookings.map(booking => {
    const from = toMinutes(booking.start);
    const to = toMinutes(booking.end);
    let lane = laneEnds.findIndex(laneEnd => laneEnd <= from);
    if (lane === -1) {
      lane = laneEnds.length;
      laneEnds.push(to);
    } else {
      laneEnds[lane] = to;
    }
    const label = `${formatTime(booking.start)}${booking.qty > 1 ? ` · ${booking.qty}` : ""}`;
    return `<div class="timeline-block${booking.status === "pending" ? " is-pending" : ""}" style="left:${percent(from)}%;width:${percent(to) - percent(from)}%;--lane:${lane}">${label}</div>`;
  });

  let selection = "";
  if (date && toMinutes(end) > toMinutes(start)) {
    const from = toMinutes(start);
    const to = toMinutes(end);
    const conflict = availableQuantity(resource, date, start, end) < Math.max(1, qty || 1);
    selection = `<div class="timeline-selection${conflict ? " is-conflict" : ""}" style="left:${percent(from)}%;width:${percent(to) - percent(from)}%"></div>`;
  }

  const timeline = $("#rd-timeline");
  timeline.style.setProperty("--hours", span / 60);
  timeline.style.height = `${Math.max(1, laneEnds.length) * 30 + 12}px`;
  timeline.innerHTML = blocks.join("") + selection;

  const labels = [];
  for (let minutes = open; minutes <= close; minutes += 120) {
    labels.push(`<span style="left:${percent(minutes)}%">${formatTime(fromMinutes(minutes)).replace(":00", "")}</span>`);
  }
  $("#rd-scale").innerHTML = labels.join("");

  $("#rd-schedule-date").textContent = date ? formatDate(date, { weekday: "long", month: "long", day: "numeric" }) : "the selected day";
  $("#rd-bookings").innerHTML = bookings.length
    ? bookings
        .map(
          booking => `
        <li>
          <span class="badge badge-${booking.status}">${STATUS_LABELS[booking.status]}</span>
          <span>${formatRange(booking.start, booking.end)}${booking.qty > 1 ? ` · ${booking.qty} units` : ""} · ${escapeHTML(displayName(booking.user))}</span>
        </li>`
        )
        .join("")
    : `<li class="muted">No reservations yet for this day.</li>`;
}

function validateReservation(resource, data) {
  const today = todayISO();
  const from = toMinutes(data.start);
  const to = toMinutes(data.end);
  if (!data.date) return { field: "rf-date", message: "Choose a date for your reservation." };
  if (data.date < today) return { field: "rf-date", message: "Pick today or a future date." };
  if (data.date > offsetDays(state.settings.maxDaysAhead)) return { field: "rf-date", message: `Reservations open up to ${state.settings.maxDaysAhead} days in advance.` };
  if (isWeekend(data.date)) return { field: "rf-date", message: "Resources can only be reserved on school days (Monday–Friday)." };
  if (to <= from) return { field: "rf-end", message: "The end time needs to be after the start time." };
  if (data.date === today && from < Math.floor(nowMinutes() / SLOT) * SLOT) return { field: "rf-start", message: "That start time has already passed today." };
  if ((to - from) / 60 > resource.maxHours) return { field: "rf-end", message: `${resource.name} can be reserved for up to ${plural(resource.maxHours, "hour")} at a time.` };
  if (!Number.isInteger(data.qty) || data.qty < 1) return { field: "rf-qty", message: "Enter at least 1 unit." };
  if (data.qty > resource.quantity) return { field: "rf-qty", message: `There are only ${resource.quantity} units of this resource.` };
  const free = availableQuantity(resource, data.date, data.start, data.end);
  if (data.qty > free) {
    return {
      field: free === 0 ? "rf-start" : "rf-qty",
      message: free === 0 ? "That time is already booked. Try another time slot." : `Only ${free} ${free === 1 ? "unit is" : "units are"} free during that time.`
    };
  }
  if (data.purpose.length < 3) return { field: "rf-purpose", message: "Briefly describe what this reservation is for." };
  return null;
}

function handleReserve(event) {
  event.preventDefault();
  if (!state.user) {
    openLogin();
    return;
  }
  const resource = getResource(ui.activeResourceId);
  if (!resource) return;
  const data = readReserveForm();
  clearReserveErrors();
  const problem = validateReservation(resource, data);
  if (problem) {
    $("#reserve-error").textContent = problem.message;
    const field = $(`#${problem.field}`);
    field.setAttribute("aria-invalid", "true");
    field.focus();
    return;
  }
  const needsApproval = resource.requiresApproval && !isAdmin();
  state.reservations.push({
    id: uid("res"),
    resourceId: resource.id,
    user: state.user.name,
    email: state.user.email,
    role: state.user.role,
    date: data.date,
    start: data.start,
    end: data.end,
    qty: data.qty,
    purpose: data.purpose,
    status: needsApproval ? "pending" : "approved",
    createdAt: Date.now()
  });
  commit();
  $("#resource-dialog").close();
  toast(
    needsApproval
      ? `Request sent. An administrator will review your ${resource.name} reservation.`
      : `Confirmed: ${resource.name}, ${formatDate(data.date)} at ${formatTime(data.start)}.`,
    "success"
  );
}

function confirmAction({ title, message, confirmLabel = "Confirm", cancelLabel = "Go back", danger = false }) {
  return new Promise(resolve => {
    const dialog = $("#confirm-dialog");
    $("#confirm-title").textContent = title;
    $("#confirm-message").textContent = message;
    $("#confirm-cancel").textContent = cancelLabel;
    const confirmButton = $("#confirm-ok");
    confirmButton.textContent = confirmLabel;
    confirmButton.className = `btn ${danger ? "btn-danger" : "btn-primary"}`;
    dialog.returnValue = "";
    dialog.addEventListener("close", () => resolve(dialog.returnValue === "confirm"), { once: true });
    dialog.showModal();
  });
}

async function cancelReservation(id) {
  const reservation = state.reservations.find(item => item.id === id);
  if (!reservation) return;
  const resource = getResource(reservation.resourceId);
  const confirmed = await confirmAction({
    title: "Cancel this reservation?",
    message: `${resource?.name ?? "This resource"} on ${formatDate(reservation.date)}, ${formatRange(reservation.start, reservation.end)}, will be released for others to book.`,
    confirmLabel: "Cancel reservation",
    cancelLabel: "Keep it",
    danger: true
  });
  if (!confirmed) return;
  reservation.status = "cancelled";
  commit();
  toast("Reservation cancelled. Thanks for freeing it up.");
}

function markReturned(id) {
  const reservation = state.reservations.find(item => item.id === id);
  if (!reservation) return;
  reservation.status = "returned";
  reservation.returnedAt = Date.now();
  commit();
  toast(`${getResource(reservation.resourceId)?.name ?? "Item"} marked as returned.`, "success");
}

function bookingItem(reservation) {
  const resource = getResource(reservation.resourceId);
  const category = getCategory(resource?.category);
  const status = displayStatus(reservation);
  const date = parseISODate(reservation.date);
  const actions = [];
  if (ACTIVE_STATUSES.includes(reservation.status) && !hasStarted(reservation)) {
    actions.push(`<button type="button" class="btn btn-ghost btn-sm" data-cancel="${reservation.id}">Cancel<span class="sr-only"> ${escapeHTML(resource?.name ?? "")}</span></button>`);
  }
  if (reservation.status === "approved" && hasStarted(reservation) && resource?.type === "equipment") {
    actions.push(`<button type="button" class="btn btn-success btn-sm" data-return="${reservation.id}">Mark returned<span class="sr-only"> ${escapeHTML(resource.name)}</span></button>`);
  }
  return `
    <li class="booking-item" style="--cat:${category.color}">
      <div class="date-block" aria-hidden="true">
        <span>${date.toLocaleDateString("en-US", { month: "short" })}</span>
        <strong>${date.getDate()}</strong>
      </div>
      <div class="booking-body">
        <h3>${escapeHTML(resource?.name ?? "Removed resource")}</h3>
        <p class="card-meta">${formatDate(reservation.date)} · ${formatRange(reservation.start, reservation.end)}${reservation.qty > 1 ? ` · ${reservation.qty} units` : ""}</p>
        <p class="muted small">${escapeHTML(reservation.purpose)}${resource ? ` · ${escapeHTML(resource.location)}` : ""}</p>
      </div>
      <div class="booking-side">
        <span class="badge badge-${status}">${STATUS_LABELS[status]}</span>
        ${actions.length ? `<div class="booking-actions">${actions.join("")}</div>` : ""}
      </div>
    </li>`;
}

function requestItem(request) {
  const updates = [...request.updates]
    .reverse()
    .map(
      update => `
      <li>
        <span class="badge badge-${update.status}">${STATUS_LABELS[update.status]}</span>
        <p>${escapeHTML(update.note)}</p>
        <small>${escapeHTML(update.by)} · ${formatDateTime(update.at)}</small>
      </li>`
    )
    .join("");
  return `
    <li class="request-item priority-${request.priority}">
      <div class="request-top">
        <span class="request-id">${escapeHTML(request.id)}</span>
        <span class="badge badge-${request.status}">${STATUS_LABELS[request.status]}</span>
      </div>
      <h3>${escapeHTML(request.title)}</h3>
      <p class="card-meta">${escapeHTML(request.type)} · ${escapeHTML(request.location)} · <span class="priority-tag">${PRIORITY_LABELS[request.priority]} priority</span></p>
      <p class="muted small">Submitted by ${escapeHTML(displayName(request.user))} · ${formatDateTime(request.createdAt)}</p>
      <details class="request-details">
        <summary>Details and ${plural(request.updates.length, "update")}</summary>
        <p>${escapeHTML(request.description)}</p>
        <ol class="update-list">${updates}</ol>
      </details>
    </li>`;
}

function renderRequests() {
  const filters = {
    all: () => true,
    mine: isMine,
    open: request => request.status !== "resolved",
    resolved: request => request.status === "resolved"
  };
  const list = state.requests.filter(filters[ui.requestFilter]).sort((a, b) => b.createdAt - a.createdAt);
  $$("[data-request-filter]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.requestFilter === ui.requestFilter)));
  $("#request-list").innerHTML = list.length ? list.map(requestItem).join("") : `<li class="empty-inline">No requests match this filter.</li>`;
}

function setFieldError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  if (message) input.setAttribute("aria-invalid", "true");
  else input.removeAttribute("aria-invalid");
  if (error) error.textContent = message;
}

function validateFields(rules) {
  let firstInvalid = null;
  rules.forEach(([input, message]) => {
    setFieldError(input, message);
    if (message && !firstInvalid) firstInvalid = input;
  });
  firstInvalid?.focus();
  return !firstInvalid;
}

function handleRequestSubmit(event) {
  event.preventDefault();
  if (!state.user) {
    openLogin();
    return;
  }
  const title = $("#req-title");
  const location = $("#req-location");
  const details = $("#req-details");
  const valid = validateFields([
    [title, title.value.trim().length < 5 ? "Add a short summary of at least 5 characters." : ""],
    [location, location.value.trim() ? "" : "Enter the room number or area, like Room 214."],
    [details, details.value.trim().length < 10 ? "Add a few details (at least 10 characters) so staff can help faster." : ""]
  ]);
  if (!valid) return;

  const now = Date.now();
  const request = {
    id: `REQ-${state.nextRequestNumber}`,
    title: title.value.trim(),
    type: $("#req-type").value,
    location: location.value.trim(),
    priority: $('input[name="priority"]:checked').value,
    description: details.value.trim(),
    status: "open",
    user: state.user.name,
    email: state.user.email,
    createdAt: now,
    updates: [{ status: "open", note: "Request submitted.", by: state.user.name, at: now }]
  };
  state.nextRequestNumber += 1;
  state.requests.push(request);
  event.target.reset();
  $("#req-count").textContent = "0";
  commit();
  toast(`${request.id} submitted. You can track it here or in My Activity.`, "success");
}

function setActivityTab(name) {
  ui.activityTab = name;
  $$('[role="tab"]').forEach(tab => {
    const active = tab.dataset.tab === name;
    tab.setAttribute("aria-selected", String(active));
    tab.tabIndex = active ? 0 : -1;
    $(`#${tab.getAttribute("aria-controls")}`).hidden = !active;
  });
}

function renderActivity() {
  const mine = myReservations();
  const upcoming = mine.filter(item => ACTIVE_STATUSES.includes(item.status) && !isPast(item)).sort(byDateTime);
  const history = mine.filter(item => !upcoming.includes(item)).sort(byDateTime).reverse();
  const requests = state.requests.filter(isMine).sort((a, b) => b.createdAt - a.createdAt);

  $("#count-reservations").textContent = mine.length;
  $("#count-requests").textContent = requests.length;
  $("#upcoming-list").innerHTML = upcoming.length
    ? upcoming.map(bookingItem).join("")
    : `<li class="empty-inline">You have no upcoming reservations. <a href="#catalog">Browse resources</a> to book one.</li>`;
  $("#history-list").innerHTML = history.length ? history.map(bookingItem).join("") : `<li class="empty-inline">Past and cancelled reservations will appear here.</li>`;
  $("#my-request-list").innerHTML = requests.length
    ? requests.map(requestItem).join("")
    : `<li class="empty-inline">You haven't submitted any requests. <a href="#requests">Report an issue</a>.</li>`;

  const messages = myMessages();
  $("#count-messages").textContent = messages.length;
  $("#message-list").innerHTML = messages.length
    ? messages.map(message => messageItem(message)).join("")
    : `<li class="empty-inline">No messages yet. Messages you send and receive show up here.</li>`;
  renderAskAdmin();

  const teacher = canApproveRooms();
  $("#tab-approvals").hidden = !teacher;
  if (!teacher && ui.activityTab === "approvals") ui.activityTab = "reservations";
  if (teacher) renderRoomApprovals();
  setActivityTab(ui.activityTab);
  if (ui.activityTab === "messages") markRead(messages.filter(isToMe));
}

function showActivityTab(name) {
  ui.activityTab = name;
  renderActivity();
}

// Teachers can approve or decline room (space) bookings that need approval, except their own.
function canApproveRooms() {
  return state.user?.role === "teacher";
}

function canReviewReservation(reservation) {
  if (isAdmin()) return true;
  return canApproveRooms() && getResource(reservation.resourceId)?.type === "space" && !isMine(reservation);
}

function pendingRoomBookings() {
  if (!canApproveRooms()) return [];
  return state.reservations.filter(item => item.status === "pending" && !isPast(item) && canReviewReservation(item)).sort(byDateTime);
}

function renderRoomApprovals() {
  const pending = pendingRoomBookings();
  $("#count-approvals").textContent = pending.length;
  $("#teacher-approval-list").innerHTML = pending.length
    ? pending
        .map(item => {
          const resource = getResource(item.resourceId);
          const name = escapeHTML(resource?.name ?? "Room");
          return `
          <li class="approval-item">
            <div>
              <h3>${name}</h3>
              <p class="card-meta">${formatDate(item.date)} · ${formatRange(item.start, item.end)} · ${escapeHTML(resource?.location ?? "")}</p>
              <p class="small">Requested by <strong>${escapeHTML(item.user)}</strong> (${ROLE_LABELS[item.role] ?? "User"})</p>
              <p class="muted small">“${escapeHTML(item.purpose)}”</p>
            </div>
            <div class="approval-actions">
              <button type="button" class="btn btn-success btn-sm" data-approve="${item.id}" aria-label="Approve ${name} for ${escapeHTML(item.user)}">Approve</button>
              <button type="button" class="btn btn-ghost btn-sm" data-deny="${item.id}" aria-label="Decline ${name} for ${escapeHTML(item.user)}">Decline</button>
              <button type="button" class="btn btn-ghost btn-sm" data-message-reservation="${item.id}" aria-label="Message ${escapeHTML(item.user)} about ${name}">Message</button>
            </div>
          </li>`;
        })
        .join("")
    : `<li class="empty-inline">No room bookings are waiting for approval right now.</li>`;
}

function barChart(rows) {
  const max = Math.max(1, ...rows.map(row => row.value));
  return `
    <ul class="bar-chart">
      ${rows
        .map(
          row => `
        <li>
          <span class="bar-label">${escapeHTML(row.label)}</span>
          <span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:${(row.value / max) * 100}%;--bar:${row.color}"></span></span>
          <span class="bar-value">${row.value}</span>
        </li>`
        )
        .join("")}
    </ul>`;
}

function renderAdmin() {
  if (!isAdmin()) return;
  const pending = state.reservations.filter(item => item.status === "pending" && !isPast(item)).sort(byDateTime);
  const unresolved = state.requests.filter(item => item.status !== "resolved");
  const pressing = unresolved.filter(item => item.priority === "urgent" || item.priority === "high").length;

  $("#admin-stats").innerHTML = [
    statCard("New service requests", state.requests.filter(isNewRequest).length, null, state.requests.some(isNewRequest)),
    statCard("Reservations awaiting approval", pending.length, null, pending.length > 0),
    statCard("Unresolved requests", unresolved.length),
    statCard("High or urgent requests", pressing, null, pressing > 0)
  ].join("");

  $("#approval-count").textContent = pending.length;
  $("#approval-list").innerHTML = pending.length
    ? pending
        .map(item => {
          const resource = getResource(item.resourceId);
          const name = escapeHTML(resource?.name ?? "Removed resource");
          return `
          <li class="approval-item">
            <div>
              <h3>${name}</h3>
              <p class="card-meta">${formatDate(item.date)} · ${formatRange(item.start, item.end)}${item.qty > 1 ? ` · ${item.qty} units` : ""}</p>
              <p class="small">Requested by <strong>${escapeHTML(item.user)}</strong> (${ROLE_LABELS[item.role] ?? "User"})</p>
              <p class="muted small">“${escapeHTML(item.purpose)}”</p>
            </div>
            <div class="approval-actions">
              <button type="button" class="btn btn-success btn-sm" data-approve="${item.id}" aria-label="Approve ${name} for ${escapeHTML(item.user)}">Approve</button>
              <button type="button" class="btn btn-ghost btn-sm" data-deny="${item.id}" aria-label="Decline ${name} for ${escapeHTML(item.user)}">Decline</button>
              <button type="button" class="btn btn-ghost btn-sm" data-message-reservation="${item.id}" aria-label="Message ${escapeHTML(item.user)} about ${name}">Message</button>
            </div>
          </li>`;
        })
        .join("")
    : `<li class="empty-inline">All caught up. Reservations that need approval show up here. Service requests are in the request queue below.</li>`;

  const counted = state.reservations.filter(item => !["cancelled", "denied"].includes(item.status));
  $("#category-chart").innerHTML = barChart(
    state.categories.map(category => ({
      label: category.name,
      color: category.color,
      value: counted.filter(item => getResource(item.resourceId)?.category === category.name).length
    }))
  );
  $("#status-chart").innerHTML = barChart([
    { label: "Open", color: "var(--info)", value: state.requests.filter(item => item.status === "open").length },
    { label: "In progress", color: "var(--warning)", value: state.requests.filter(item => item.status === "in-progress").length },
    { label: "Resolved", color: "var(--success)", value: state.requests.filter(item => item.status === "resolved").length }
  ]);
  $("#top-resources").innerHTML = [...state.resources]
    .map(resource => ({ resource, count: popularity(resource.id) }))
    .filter(entry => entry.count > 0)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map(entry => `<li>${escapeHTML(entry.resource.name)} <span>· ${plural(entry.count, "booking")}</span></li>`)
    .join("");

  const queue = state.requests
    .filter(item => ui.showResolved || item.status !== "resolved")
    .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority] || b.createdAt - a.createdAt);
  $("#queue-empty").hidden = queue.length > 0;
  $("#queue-body").innerHTML = queue
    .map(item => {
      const locked = item.principalLock && !isPrincipal() ? " disabled" : "";
      return `
      <tr>
        <th scope="row">${escapeHTML(item.id)}${isNewRequest(item) ? ` <span class="tag tag-new">New</span>` : ""}</th>
        <td><strong>${escapeHTML(item.title)}</strong><span class="cell-sub">${escapeHTML(item.type)} · ${escapeHTML(item.location)}</span></td>
        <td><span class="priority priority-${item.priority}">${PRIORITY_LABELS[item.priority]}</span></td>
        <td>${formatDateTime(item.createdAt)}<span class="cell-sub">${escapeHTML(item.user)}</span></td>
        <td>
          <label class="sr-only" for="status-${item.id}">Status for ${escapeHTML(item.id)}</label>
          <select id="status-${item.id}" data-status-select="${item.id}"${locked}>
            ${REQUEST_STATUSES.map(status => `<option value="${status}"${status === item.status ? " selected" : ""}>${STATUS_LABELS[status]}</option>`).join("")}
          </select>
          ${item.principalLock ? `<span class="cell-sub">Set by the principal</span>` : ""}
        </td>
        <td>
          <label class="sr-only" for="note-${item.id}">Note for ${escapeHTML(item.id)}</label>
          <input type="text" id="note-${item.id}" data-note-input="${item.id}" maxlength="140" placeholder="Add a note"${locked}>
        </td>
        <td>
          <div class="row-actions">
            <button type="button" class="btn btn-primary btn-sm" data-save-request="${item.id}"${locked}>Save<span class="sr-only"> ${escapeHTML(item.id)}</span></button>
            <button type="button" class="btn btn-ghost btn-sm" data-message-request="${item.id}">Message<span class="sr-only"> ${escapeHTML(item.user)} about ${escapeHTML(item.id)}</span></button>
          </div>
        </td>
      </tr>`;
    })
    .join("");

  $("#inventory-count").textContent = state.resources.length;
  $("#inventory-list").innerHTML = [...state.resources]
    .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))
    .map(
      resource => `
      <li style="--cat:${getCategory(resource.category).color}">
        <span class="cat-icon">${iconFor(resource.category)}</span>
        <span class="inventory-info">
          <strong>${escapeHTML(resource.name)}</strong>
          <span>${escapeHTML(resource.category)} · ${plural(resource.quantity, "unit")} · ${escapeHTML(resource.location)}</span>
        </span>
        <button type="button" class="btn btn-ghost btn-sm" data-remove-resource="${resource.id}">Remove<span class="sr-only"> ${escapeHTML(resource.name)}</span></button>
      </li>`
    )
    .join("");

  $("#domain-count").textContent = state.access.allowedDomains.length;
  ["student", "teacher"].forEach(role => {
    const domains = state.access.allowedDomains.filter(rule => rule.role === role);
    $(`#${role}-domain-list`).innerHTML = domains.length
      ? domains
          .map(
            ({ domain }) => `
      <li>
        <span class="inventory-info">
          <strong>@${escapeHTML(domain)}</strong>
          <span>Signs in as ${ROLE_LABELS[role]}, including subdomains</span>
        </span>
        <button type="button" class="btn btn-ghost btn-sm" data-remove-domain="${escapeHTML(domain)}">Remove<span class="sr-only"> @${escapeHTML(domain)}</span></button>
      </li>`
          )
          .join("")
      : `<li class="muted small">No ${role} domains yet.</li>`;
  });
  $("#admin-add-school").textContent = state.user.school;
  $("#admin-email-list").innerHTML = state.access.adminEmails
    .map(email => {
      const added = state.access.addedAdmins[email];
      const addedNote = added ? ` · Added by ${added.addedBy}` : "";
      return `
      <li>
        <span class="inventory-info">
          <strong>${escapeHTML(email)}</strong>
          <span>${email === state.user.email.toLowerCase() ? "You · " : ""}${escapeHTML(adminTitle(email))}${escapeHTML(addedNote)}</span>
        </span>
        ${
          canRemoveAddedAdmin(email)
            ? `<button type="button" class="btn btn-ghost btn-sm" data-remove-admin="${escapeHTML(email)}">Remove<span class="sr-only"> ${escapeHTML(email)}</span></button>`
            : ""
        }
      </li>`;
    })
    .join("");

  const accounts = Object.entries(state.accounts).sort(([a], [b]) => a.localeCompare(b));
  $("#account-list").innerHTML = accounts.length
    ? accounts
        .map(
          ([email, account]) => `
      <li>
        <span class="inventory-info">
          <strong>${escapeHTML(account.name ?? email)}</strong>
          <span>${escapeHTML(email)} · Since ${formatDate(toISODate(new Date(account.createdAt)))}</span>
        </span>
        ${
          email === state.user.email
            ? `<span class="muted small">You</span>`
            : `<button type="button" class="btn btn-ghost btn-sm" data-reset-password="${escapeHTML(email)}">Reset password<span class="sr-only"> for ${escapeHTML(email)}</span></button>`
        }
      </li>`
        )
        .join("")
    : `<li class="muted small">No accounts yet.</li>`;

  renderOversight();

  const mine = state.siteReports.filter(report => report.reporter.email === state.user.email).sort((a, b) => b.createdAt - a.createdAt);
  $("#my-report-list").innerHTML = mine.length
    ? mine.map(report => reportItem(report, false)).join("")
    : `<li class="empty-inline">You haven't reported any website problems.</li>`;

  renderCompose();
}

function renderOwner() {
  if (!isOwner()) return;
  const pending = state.counties.filter(county => county.status === "pending").length;
  const open = state.siteReports.filter(report => report.status === "open").length;
  $("#owner-stats").innerHTML = [
    statCard("Join requests to review", pending, null, pending > 0),
    statCard("Open website reports", open, null, open > 0),
    statCard("Approved counties", approvedCounties().length),
    statCard("Schools on Commons", allSchools().length)
  ].join("");

  const counties = [...state.counties].sort((a, b) => (b.status === "pending") - (a.status === "pending") || b.submittedAt - a.submittedAt);
  $("#county-count").textContent = state.counties.filter(county => county.status === "pending").length;
  $("#county-list").innerHTML = counties.length
    ? counties
        .map(county => {
          const badge = { pending: ["pending", "Awaiting review"], approved: ["approved", "Approved"], declined: ["denied", "Declined"] }[county.status];
          const { teacher, student } = countyDomains(county);
          const domains = [
            `Staff: ${teacher.map(domain => `@${domain}`).join(", ")}`,
            student.length && `Students: ${student.map(domain => `@${domain}`).join(", ")}`
          ]
            .filter(Boolean)
            .join(" · ");
          const schools = county.schools
            .map(
              school =>
                `<li>${escapeHTML(school.name)} <span>· Admin ${escapeHTML(school.adminEmail)}${school.principalEmail ? ` · Principal ${escapeHTML(school.principalEmail)}` : ""}</span></li>`
            )
            .join("");
          return `
          <li class="approval-item">
            <div>
              <h3>${escapeHTML(county.name)}, ${escapeHTML(county.state)} <span class="badge badge-${badge[0]}">${badge[1]}</span></h3>
              <p class="small">County administrator: <strong>${escapeHTML(county.contact.name)}</strong> (${escapeHTML(county.contact.email)})</p>
              <p class="card-meta">${escapeHTML(domains)}</p>
              <ul class="rank-list county-schools">${schools}</ul>
              <p class="muted small">Submitted ${formatDateTime(county.submittedAt)}${county.reviewedAt ? ` · Reviewed ${formatDateTime(county.reviewedAt)}` : ""}</p>
            </div>
            ${
              county.status === "pending"
                ? `<div class="approval-actions">
              <button type="button" class="btn btn-success btn-sm" data-approve-county="${county.id}">Approve<span class="sr-only"> ${escapeHTML(county.name)}</span></button>
              <button type="button" class="btn btn-ghost btn-sm" data-decline-county="${county.id}">Decline<span class="sr-only"> ${escapeHTML(county.name)}</span></button>
            </div>`
                : ""
            }
          </li>`;
        })
        .join("")
    : `<li class="empty-inline">No county sign-ups yet. County administrators can apply from the sign-up page.</li>`;

  const principals = Object.entries(state.access.principals).sort(([a], [b]) => a.localeCompare(b));
  $("#principal-count").textContent = principals.length;
  $("#principal-list").innerHTML = principals.length
    ? principals
        .map(
          ([school, email]) => `
      <li>
        <span class="inventory-info">
          <strong>${escapeHTML(school)}</strong>
          <span>${escapeHTML(email)}</span>
        </span>
        <button type="button" class="btn btn-ghost btn-sm" data-remove-principal="${escapeHTML(school)}">Remove<span class="sr-only"> principal for ${escapeHTML(school)}</span></button>
      </li>`
        )
        .join("")
    : `<li class="muted small">No principals yet.</li>`;

  const reports = [...state.siteReports].sort((a, b) => (b.status === "open") - (a.status === "open") || b.createdAt - a.createdAt);
  $("#owner-report-count").textContent = open;
  $("#owner-report-list").innerHTML = reports.length
    ? reports.map(report => reportItem(report, true)).join("")
    : `<li class="empty-inline">No website problems reported. School administrators can send them from their Admin page.</li>`;

  const messages = ownerInbox();
  const unread = messages.filter(message => !message.read && message.to.email === OWNER_EMAIL);
  $("#owner-message-count").textContent = unread.length;
  $("#owner-message-list").innerHTML = messages.length
    ? messages.map(message => messageItem(message)).join("")
    : `<li class="empty-inline">No messages from administrators yet. They can write to you from their Admin page.</li>`;
  markRead(unread);
}

function reportItem(report, forOwner) {
  const resolved = report.status === "resolved";
  return `
    <li class="request-item${resolved ? "" : " priority-high"}">
      <div class="request-top">
        <span class="request-id">${escapeHTML(report.id)}</span>
        <span class="badge badge-${resolved ? "resolved" : "open"}">${resolved ? "Resolved" : "Open"}</span>
      </div>
      <h3>${escapeHTML(report.category)}</h3>
      <p class="card-meta">Page: ${escapeHTML(report.page)} · ${escapeHTML(report.school)}</p>
      <p class="small">${escapeHTML(report.details)}</p>
      <p class="muted small">${forOwner ? `From ${escapeHTML(report.reporter.name)} (${escapeHTML(report.reporter.email)}) · ` : ""}${formatDateTime(report.createdAt)}${
        resolved ? ` · Resolved ${formatDateTime(report.resolvedAt)}` : ""
      }</p>
      ${forOwner && !resolved ? `<button type="button" class="btn btn-success btn-sm" data-resolve-report="${escapeHTML(report.id)}">Mark resolved<span class="sr-only"> ${escapeHTML(report.id)}</span></button>` : ""}
    </li>`;
}

function handleReport(event) {
  event.preventDefault();
  const details = $("#report-details");
  const text = details.value.trim();
  if (!validateFields([[details, text.length < 10 ? "Describe the problem in at least 10 characters so the owner can fix it." : ""]])) return;
  const report = {
    id: `WEB-${state.nextReportNumber}`,
    category: $("#report-category").value,
    page: $("#report-page").value,
    details: text,
    school: state.user.school,
    reporter: { name: state.user.name, email: state.user.email },
    status: "open",
    createdAt: Date.now()
  };
  state.nextReportNumber += 1;
  state.siteReports.push(report);
  event.target.reset();
  commit();
  toast(`${report.id} sent to the Commons owner.`, "success");
}

function resolveReport(id) {
  const report = state.siteReports.find(item => item.id === id);
  if (!report) return;
  Object.assign(report, { status: "resolved", resolvedAt: Date.now(), resolvedBy: state.user.email });
  commit();
  toast(`${id} marked resolved.`, "success");
}

function approveCounty(id) {
  const county = state.counties.find(item => item.id === id && item.status === "pending");
  if (!county) return;
  county.schools.forEach(school => {
    if (school.principalEmail && !principalSchool(school.principalEmail)) state.access.principals[school.name] = school.principalEmail;
  });
  const admins = [county.contact.email, ...county.schools.flatMap(school => [school.adminEmail, school.principalEmail].filter(Boolean))];
  state.access.adminEmails = [...new Set([...state.access.adminEmails, ...admins])];
  const { teacher, student } = countyDomains(county);
  const domains = [...teacher.map(domain => ({ domain, role: "teacher" })), ...student.map(domain => ({ domain, role: "student" }))];
  domains.forEach(rule => {
    if (!state.access.allowedDomains.some(item => item.domain === rule.domain)) state.access.allowedDomains.push(rule);
  });
  state.access.allowedDomains.sort((a, b) => a.domain.localeCompare(b.domain));
  if (!state.accounts[county.contact.email]) state.accounts[county.contact.email] = { ...county.credential, name: county.contact.name };
  delete county.credential;
  Object.assign(county, { status: "approved", reviewedAt: Date.now(), reviewedBy: state.user.email });
  commit();
  toast(`${county.name} approved. ${plural(domains.length, "email domain")} authorized and ${plural(admins.length, "administrator")} can now sign in.`, "success");
}

function handleSetPrincipal(event) {
  event.preventDefault();
  const schoolInput = $("#principal-school");
  const emailInput = $("#principal-email");
  const school = findSchool(schoolInput.value);
  const email = emailInput.value.trim().toLowerCase();
  const elsewhere = principalSchool(email);
  const valid = validateFields([
    [schoolInput, school ? "" : "Choose a school from the list."],
    [
      emailInput,
      !isValidEmail(email)
        ? "Enter the principal's full email, like principal@school.org."
        : email === OWNER_EMAIL
          ? "The Commons owner can't also be a principal."
          : elsewhere && elsewhere !== school
            ? `${email} is already the principal at ${elsewhere}.`
            : ""
    ]
  ]);
  if (!valid) return;
  const previous = state.access.principals[school];
  state.access.principals[school] = email;
  if (!state.access.adminEmails.includes(email)) state.access.adminEmails.push(email);
  if (previous && previous !== email) dropAdminIfUnused(previous);
  event.target.reset();
  commit();
  toast(`${email} is now the principal at ${school}.`, "success");
}

// Takes away admin access from someone who no longer has any school, county, or owner role.
function dropAdminIfUnused(email) {
  if (email !== OWNER_EMAIL && !adminScope(email)) state.access.adminEmails = state.access.adminEmails.filter(item => item !== email);
}

async function removePrincipal(school) {
  const email = state.access.principals[school];
  if (!email) return;
  const confirmed = await confirmAction({
    title: `Remove ${email} as principal?`,
    message: `${school} will have no principal. If ${email} isn't an administrator some other way, they lose access to the Admin page.`,
    confirmLabel: "Remove principal",
    danger: true
  });
  if (!confirmed) return;
  delete state.access.principals[school];
  dropAdminIfUnused(email);
  commit();
  toast(`${school} no longer has a principal.`);
}

// Any administrator, principals included, can add another administrator for the school they're signed in to.
function handleAddAdmin(event) {
  event.preventDefault();
  if (!isAdmin()) return;
  const input = $("#admin-add-email");
  const email = input.value.trim().toLowerCase();
  const valid = validateFields([
    [
      input,
      !isValidEmail(email)
        ? "Enter the full email, like name@school.org."
        : email === OWNER_EMAIL || isAdminEmail(email)
          ? `${email} is already an administrator.`
          : ""
    ]
  ]);
  if (!valid) return;
  const school = state.user.school;
  state.access.addedAdmins[email] = { school, addedBy: state.user.email, addedAt: Date.now() };
  state.access.adminEmails.push(email);
  input.value = "";
  commit();
  toast(`${email} can now sign in as an Administrator for ${school}.`, "success");
}

// Principals can remove any admin added at their school. Other admins can remove the ones they added.
function canRemoveAddedAdmin(email) {
  const added = state.access.addedAdmins[email];
  if (!added || !isAdmin() || email === state.user.email) return false;
  return added.addedBy === state.user.email || (isPrincipal() && added.school === state.user.school);
}

async function removeAddedAdmin(email) {
  if (!canRemoveAddedAdmin(email)) return;
  const { school } = state.access.addedAdmins[email];
  const confirmed = await confirmAction({
    title: `Remove ${email} as an administrator?`,
    message: `They lose access to ${school}'s Admin page. Their reservations and requests are kept.`,
    confirmLabel: "Remove administrator",
    danger: true
  });
  if (!confirmed) return;
  delete state.access.addedAdmins[email];
  dropAdminIfUnused(email);
  commit();
  toast(`${email} is no longer an administrator.`);
}

// Messages stay inside Commons (My Activity → Messages). Anyone with an email on file can also be written to from
// the sender's own email app, because this browser-only version can't send email by itself.
function isToMe(message) {
  if (!state.user) return false;
  if (message.to.email) return message.to.email === state.user.email;
  return message.school === state.user.school && message.to.name.toLowerCase() === state.user.name.toLowerCase();
}

function isFromMe(message) {
  return Boolean(state.user) && message.from.email === state.user.email;
}

function myMessages() {
  return state.messages.filter(message => isToMe(message) || isFromMe(message)).sort((a, b) => b.at - a.at);
}

function unreadMessages() {
  return state.messages.filter(message => !message.read && isToMe(message) && !isFromMe(message));
}

function ownerInbox() {
  return state.messages.filter(message => message.context?.kind === "owner").sort((a, b) => b.at - a.at);
}

function markRead(messages) {
  const fresh = messages.filter(message => !message.read && isToMe(message));
  if (!fresh.length) return;
  fresh.forEach(message => (message.read = true));
  persist();
  renderHeader();
}

function messageItem(message) {
  const incoming = isToMe(message) && !isFromMe(message);
  const who = incoming
    ? `From <strong>${escapeHTML(message.from.name)}</strong> (${escapeHTML(message.from.title)}${message.from.email ? `, ${escapeHTML(message.from.email)}` : ""})`
    : `To <strong>${escapeHTML(message.to.name)}</strong>${message.to.email ? ` (${escapeHTML(message.to.email)})` : ""}`;
  const replyable = incoming || (isFromMe(message) && message.to.email);
  return `
    <li class="message-item${incoming && !message.read ? " is-unread" : ""}${incoming ? "" : " is-sent"}">
      <div class="message-top">
        <span class="request-id">${message.context ? escapeHTML(message.context.label) : "Message"}</span>
        ${incoming && !message.read ? `<span class="tag tag-new">New</span>` : `<span class="muted small">${incoming ? "Received" : "Sent"}</span>`}
      </div>
      <h3>${escapeHTML(message.subject)}</h3>
      <p class="small">${who} · ${formatDateTime(message.at)}</p>
      <p class="message-body">${escapeHTML(message.body)}</p>
      ${
        replyable
          ? `<div class="message-actions"><button type="button" class="btn btn-ghost btn-sm" data-reply-message="${message.id}">${incoming ? "Reply" : "Write again"}<span class="sr-only"> about ${escapeHTML(message.subject)}</span></button></div>`
          : ""
      }
    </li>`;
}

// Requests and reservations made before emails were saved only have a name. Look that name up in this school's accounts.
function recipientFor(record) {
  const email =
    record.email ??
    Object.entries(state.accounts).find(([, account]) => account.school === state.user.school && account.name?.toLowerCase() === record.user.toLowerCase())?.[0] ??
    null;
  return { name: record.user, email };
}

// A request or reservation plus the subject line and label a message about it uses.
function aboutRecord(kind, id) {
  if (kind === "request") {
    const record = state.requests.find(item => item.id === id);
    if (!record) return null;
    return { record, subject: `About ${record.id}: ${record.title}`, context: { kind, id, label: `${record.id} · Service request` } };
  }
  if (kind === "reservation") {
    const record = state.reservations.find(item => item.id === id);
    if (!record) return null;
    const name = getResource(record.resourceId)?.name ?? "Reservation";
    return { record, subject: `About your ${name} reservation on ${formatDate(record.date)}`, context: { kind, id, label: `${name} · Reservation` } };
  }
  return null;
}

function messageAboutRecord(kind, id) {
  if (!state.user) return;
  const about = aboutRecord(kind, id);
  if (about) openCompose({ to: recipientFor(about.record), subject: about.subject, context: about.context });
}

// ---- Message forms ----
// Two forms share this code: "ask" in My Activity → Messages (everyone) and "compose" on the Admin page.
// Each has a To list of named people, grouped by role, plus "Someone else" for typing any email that's on Commons.

function schoolPeople(role) {
  return Object.entries(state.accounts)
    .filter(([email, account]) => email !== state.user.email && account.school === state.user.school && !isAdminEmail(email) && domainRule(email)?.role === role)
    .map(([email, account]) => ({ email, name: account.name ?? email, title: ROLE_LABELS[role] }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function senderKind() {
  return isAdmin() ? "admin" : state.user.role;
}

// Which kinds of people the signed-in user can write to. Students can't message other students.
function messageableKinds() {
  return { admin: ["admin", "teacher", "student"], teacher: ["admin", "teacher", "student"], student: ["admin", "teacher"] }[senderKind()];
}

function recipientGroups() {
  const kinds = messageableKinds();
  const groups = [];
  if (isAdmin() && !isOwner()) groups.push({ label: "Commons", people: [{ email: OWNER_EMAIL, name: "Commons owner", title: "" }] });
  if (isAdmin()) {
    const admins = state.access.adminEmails
      .filter(email => email !== state.user.email && email !== OWNER_EMAIL)
      .map(email => ({ email, name: state.accounts[email]?.name ?? email, title: adminTitle(email) }))
      .sort((a, b) => a.name.localeCompare(b.name));
    groups.push({ label: "Administrators", people: admins });
  } else {
    const admins = schoolAdmins();
    groups.push({ label: `Administrators at ${state.user.school}`, people: admins, all: admins.length > 1 ? `All administrators at ${state.user.school}` : null });
  }
  if (kinds.includes("teacher")) groups.push({ label: `Teachers at ${state.user.school}`, people: schoolPeople("teacher") });
  if (kinds.includes("student")) groups.push({ label: `Students at ${state.user.school}`, people: schoolPeople("student") });
  return groups;
}

function personOption(person) {
  const name = person.name === person.email ? person.email : `${person.name} (${person.email})`;
  return `<option value="${escapeHTML(person.email)}">${escapeHTML(name)}${person.title ? ` · ${escapeHTML(person.title)}` : ""}</option>`;
}

function renderRecipientPicker(prefix) {
  const select = $(`#${prefix}-to`);
  const picked = select.value;
  const groups = recipientGroups();
  select.innerHTML = `<option value="">Choose someone…</option>${groups
    .filter(group => group.people.length)
    .map(
      group =>
        `<optgroup label="${escapeHTML(group.label)}">${group.all ? `<option value="all-admins">${escapeHTML(group.all)}</option>` : ""}${group.people.map(personOption).join("")}</optgroup>`
    )
    .join("")}<option value="other">Someone else — type their email</option>`;
  if ([...select.options].some(option => option.value === picked)) select.value = picked;
  const kinds = messageableKinds().map(kind => (kind === "admin" ? "administrator" : kind));
  $(`#${prefix}-other-hint`).textContent = `Any ${kinds.slice(0, -1).join(", ")}${kinds.length > 1 ? " or " : ""}${kinds.at(-1)} email on Commons. People show up in the list above after they sign in once.`;
  updateOtherField(prefix);
}

function updateOtherField(prefix) {
  const other = $(`#${prefix}-to`).value === "other";
  $(`#${prefix}-other-field`).hidden = !other;
  if (!other) setFieldError($(`#${prefix}-other`), "");
}

function renderAboutOptions(prefix, mineOnly) {
  const about = $(`#${prefix}-about`);
  const picked = about.value;
  const who = item => (mineOnly ? "" : ` (${escapeHTML(item.user)})`);
  const requests = state.requests
    .filter(item => !mineOnly || isMine(item))
    .sort((a, b) => b.createdAt - a.createdAt)
    .map(item => `<option value="request:${escapeHTML(item.id)}">${escapeHTML(item.id)} · ${escapeHTML(item.title)}${who(item)}</option>`)
    .join("");
  const reservations = state.reservations
    .filter(item => (mineOnly ? isMine(item) && item.status !== "cancelled" : ACTIVE_STATUSES.includes(item.status) && !isPast(item)))
    .sort(byDateTime)
    .map(item => `<option value="reservation:${escapeHTML(item.id)}">${escapeHTML(getResource(item.resourceId)?.name ?? "Reservation")} · ${formatDate(item.date)}${who(item)}</option>`)
    .join("");
  about.innerHTML = `<option value="">Nothing specific</option>${requests ? `<optgroup label="${mineOnly ? "My service requests" : "Service requests"}">${requests}</optgroup>` : ""}${
    reservations ? `<optgroup label="${mineOnly ? "My reservations" : "Upcoming reservations"}">${reservations}</optgroup>` : ""
  }`;
  if ([...about.options].some(option => option.value === picked)) about.value = picked;
}

function selectedAboutFor(prefix) {
  const [kind, ...rest] = $(`#${prefix}-about`).value.split(":");
  return kind ? aboutRecord(kind, rest.join(":")) : null;
}

// Picking a request or reservation fills in a subject. On the Admin page it also picks the person who made it.
function handleAboutChange(event) {
  const prefix = event.target.closest("form").dataset.prefix;
  const about = selectedAboutFor(prefix);
  if (!about) return;
  const subject = $(`#${prefix}-subject`);
  if (!subject.value.trim()) subject.value = prefix === "ask" ? about.subject.replace(/^About your /, "About my ") : about.subject;
  if (prefix !== "compose") return;
  const to = recipientFor(about.record);
  const select = $("#compose-to");
  if (to.email && [...select.options].some(option => option.value === to.email)) {
    select.value = to.email;
  } else {
    select.value = "other";
    $("#compose-other").value = to.email ?? "";
  }
  updateOtherField("compose");
  $("#compose-about-hint").textContent = to.email
    ? `Sending to ${to.name}, who made this.`
    : `There's no email on file for ${to.name}. Leave "Their email" blank to send it to their Commons inbox.`;
}

function resolveRecipients(prefix, about) {
  const select = $(`#${prefix}-to`);
  const input = $(`#${prefix}-other`);
  const choice = select.value;
  if (!choice) return { error: "Choose who to send this to.", field: select };
  if (choice === "all-admins") {
    const admins = schoolAdmins();
    return admins.length ? { to: admins.map(({ name, email }) => ({ name, email })) } : { error: "Your school has no administrators yet.", field: select };
  }
  if (choice !== "other") {
    const person = recipientGroups()
      .flatMap(group => group.people)
      .find(item => item.email === choice);
    return person ? { to: { name: person.name, email: person.email } } : { error: "Choose who to send this to.", field: select };
  }
  const email = input.value.trim().toLowerCase();
  if (!email && about && !recipientFor(about.record).email) return { to: recipientFor(about.record) };
  if (!isValidEmail(email)) return { error: "Enter their full email, like name@school.org.", field: input };
  if (email === state.user.email) return { error: "You can't send a message to yourself.", field: input };
  const kind = isAdminEmail(email) ? "admin" : domainRule(email)?.role;
  if (!kind) return { error: `${email} isn't on an email domain Commons knows.`, field: input };
  if (!messageableKinds().includes(kind)) return { error: `Students can message teachers and administrators, but not other students.`, field: input };
  return { to: { name: email === OWNER_EMAIL ? "Commons owner" : state.accounts[email]?.name ?? email, email } };
}

function renderCompose() {
  renderRecipientPicker("compose");
  renderAboutOptions("compose", false);
  const recent = myMessages().slice(0, 8);
  $("#admin-message-list").innerHTML = recent.length
    ? recent.map(message => messageItem(message)).join("")
    : `<li class="empty-inline">Messages you send and receive show up here and in My Activity → Messages.</li>`;
}

function renderAskAdmin() {
  if (!state.user) return;
  renderRecipientPicker("ask");
  renderAboutOptions("ask", true);
}

function handleSendForm(event) {
  event.preventDefault();
  if (!state.user) {
    openLogin();
    return;
  }
  const prefix = event.target.dataset.prefix;
  if (prefix === "compose" && !isAdmin()) return;
  const select = $(`#${prefix}-to`);
  const input = $(`#${prefix}-other`);
  const subjectInput = $(`#${prefix}-subject`);
  const bodyInput = $(`#${prefix}-body`);
  const about = selectedAboutFor(prefix);
  const result = resolveRecipients(prefix, about);
  const subject = subjectInput.value.trim();
  const body = bodyInput.value.trim();
  const valid = validateFields([
    [select, result.field === select ? result.error : ""],
    [input, result.field === input ? result.error : ""],
    [subjectInput, subject.length < 3 ? "Add a subject of at least 3 characters." : ""],
    [bodyInput, body.length < 5 ? "Write a message of at least 5 characters." : ""]
  ]);
  if (!valid) return;
  const recipients = Array.isArray(result.to) ? result.to : [result.to];
  // Messages between an administrator and the owner also show on the owner page.
  const ownerThread = isAdmin() && recipients.some(person => (!isOwner() && person.email === OWNER_EMAIL) || (isOwner() && isAdminEmail(person.email ?? "")));
  const context = ownerThread ? { kind: "owner", id: null, label: "Administrator ↔ Commons owner" } : about?.context ?? null;
  const mailto = $(`#${prefix}-mailto`).checked;
  [select, input, subjectInput, bodyInput, $(`#${prefix}-about`)].forEach(field => (field.value = ""));
  $(`#${prefix}-mailto`).checked = false;
  if (prefix === "compose") $("#compose-about-hint").textContent = "Picking a request or reservation fills in the person who made it.";
  updateOtherField(prefix);
  deliverMessage({ to: result.to, subject, body, context, mailto });
  toast(recipients.length > 1 ? `Message sent to ${plural(recipients.length, "person")}.`.replace("persons", "people") : `Message sent to ${recipients[0].name}.`, "success");
}

function replyToMessage(id) {
  const message = state.messages.find(item => item.id === id);
  if (!message) return;
  const incoming = !isFromMe(message);
  openCompose({
    to: incoming ? { name: message.from.name, email: message.from.email } : message.to,
    subject: incoming && !/^re:/i.test(message.subject) ? `Re: ${message.subject}` : message.subject,
    context: message.context
  });
}

function openCompose({ to, subject, context }) {
  ui.compose = { to, context };
  $("#message-context").textContent = context?.label ?? "";
  $("#message-to").textContent = `To ${to.name}${to.email ? ` (${to.email})` : ""}`;
  $("#msg-subject").value = subject;
  $("#msg-body").value = "";
  ["#msg-subject", "#msg-body"].forEach(selector => setFieldError($(selector), ""));
  const mailto = $("#msg-mailto");
  mailto.checked = false;
  mailto.disabled = !to.email;
  $("#msg-mailto-hint").textContent = to.email
    ? `${to.name} will see this in My Activity → Messages. Check the box to also send it from your email app.`
    : `${to.name} will see this in My Activity → Messages. There's no email on file for them, so it can't go to an email app.`;
  $("#message-dialog").showModal();
  $("#msg-body").focus();
}

function openMailto(email, subject, body) {
  const link = Object.assign(document.createElement("a"), {
    href: `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  });
  document.body.append(link);
  link.click();
  link.remove();
}

// `to` can be one person or a list. A list gets one copy each, so every recipient has their own unread message.
function deliverMessage({ to, subject, body, context, mailto }) {
  const recipients = Array.isArray(to) ? to : [to];
  const at = Date.now();
  recipients.forEach(person =>
    state.messages.push({
      id: uid("msg"),
      from: {
        name: state.user.name,
        email: state.user.email,
        title: context?.kind === "owner" && isOwner() ? "Commons owner" : `${roleLabel(state.user)}, ${state.user.school}`
      },
      to: person,
      school: state.user.school,
      subject,
      body,
      context: context ?? null,
      at,
      read: false
    })
  );
  commit();
  const emails = recipients.map(person => person.email).filter(Boolean);
  if (mailto && emails.length) openMailto(emails.join(","), subject, body);
}

// Administrators who manage the signed-in user's school (school admins, principals, and county admins).
function schoolAdmins() {
  if (!state.user) return [];
  return state.access.adminEmails
    .filter(email => email !== state.user.email && adminScope(email)?.schools.includes(state.user.school))
    .map(email => ({ email, name: state.accounts[email]?.name ?? email, title: adminTitle(email) }));
}

function readMessageFields(subjectInput, bodyInput) {
  const subject = subjectInput.value.trim();
  const body = bodyInput.value.trim();
  const valid = validateFields([
    [subjectInput, subject.length < 3 ? "Add a subject of at least 3 characters." : ""],
    [bodyInput, body.length < 5 ? "Write a message of at least 5 characters." : ""]
  ]);
  return valid ? { subject, body } : null;
}

function handleMessageSubmit(event) {
  event.preventDefault();
  if (!state.user || !ui.compose) return;
  const fields = readMessageFields($("#msg-subject"), $("#msg-body"));
  if (!fields) return;
  const { to, context } = ui.compose;
  deliverMessage({ to, context, ...fields, mailto: $("#msg-mailto").checked });
  ui.compose = null;
  $("#message-dialog").close();
  toast(`Message sent to ${to.name}.`, "success");
}

async function declineCounty(id) {
  const county = state.counties.find(item => item.id === id && item.status === "pending");
  if (!county) return;
  const confirmed = await confirmAction({
    title: `Decline ${county.name}?`,
    message: "Nobody from this sign-up gets access. The county can apply again later.",
    confirmLabel: "Decline sign-up",
    danger: true
  });
  if (!confirmed) return;
  delete county.credential;
  Object.assign(county, { status: "declined", reviewedAt: Date.now(), reviewedBy: state.user.email });
  commit();
  toast(`${county.name}'s sign-up was declined.`);
}

function renderSignup() {
  if (!$("[data-school-row]")) addSchoolRow(false);
}

function addSchoolRow(focus) {
  ui.schoolRowId += 1;
  const id = ui.schoolRowId;
  $("#signup-schools").insertAdjacentHTML(
    "beforeend",
    `<div class="school-row" data-school-row>
      <div class="field">
        <label for="ss-name-${id}">School name</label>
        <input type="text" id="ss-name-${id}" maxlength="80" data-school-name placeholder="Example: Oak Ridge High School" aria-describedby="ss-name-${id}-error">
        <p class="field-error" id="ss-name-${id}-error"></p>
      </div>
      <div class="field">
        <label for="ss-email-${id}">School administrator's email</label>
        <input type="email" id="ss-email-${id}" maxlength="254" data-school-email spellcheck="false" autocomplete="off" placeholder="admin@county.k12.va.us" aria-describedby="ss-email-${id}-error">
        <p class="field-error" id="ss-email-${id}-error"></p>
      </div>
      <div class="field">
        <label for="ss-principal-${id}">Principal's email <span class="optional">(optional)</span></label>
        <input type="email" id="ss-principal-${id}" maxlength="254" data-school-principal spellcheck="false" autocomplete="off" placeholder="principal@county.k12.va.us" aria-describedby="ss-principal-${id}-error">
        <p class="field-error" id="ss-principal-${id}-error"></p>
      </div>
      <button type="button" class="btn btn-ghost btn-sm" data-remove-school-row>Remove<span class="sr-only"> this school</span></button>
    </div>`
  );
  if (focus) $(`#ss-name-${id}`).focus();
}

function removeSchoolRow(button) {
  const rows = $$("[data-school-row]");
  const row = button.closest("[data-school-row]");
  if (rows.length === 1) {
    $$("input", row).forEach(input => {
      input.value = "";
      setFieldError(input, "");
    });
    return;
  }
  const next = rows[rows.indexOf(row) + 1] ?? rows[rows.indexOf(row) - 1];
  row.remove();
  $("[data-school-name]", next).focus();
}

async function handleSignup(event) {
  event.preventDefault();
  const countyInput = $("#signup-county");
  const stateInput = $("#signup-state");
  const nameInput = $("#signup-name");
  const emailInput = $("#signup-email");
  const passwordInput = $("#signup-password");
  const confirmInput = $("#signup-confirm");
  const teacherInput = $("#signup-teacher-domain");
  const studentInput = $("#signup-student-domain");
  const countyName = countyInput.value.trim().replace(/\s+/g, " ");
  const email = emailInput.value.trim().toLowerCase();
  const teacherDomains = parseDomains(teacherInput.value);
  const studentDomains = parseDomains(studentInput.value);
  const active = state.counties.filter(county => county.status !== "declined");
  const domainTaken = domain =>
    state.access.allowedDomains.some(rule => rule.domain === domain) ||
    active.some(county => [...countyDomains(county).teacher, ...countyDomains(county).student].includes(domain));
  const domainListError = (domains, example) => {
    const bad = domains.find(domain => !DOMAIN_PATTERN.test(domain));
    if (bad) return `"${bad}" isn't a domain. Use something like ${example}, and separate domains with commas.`;
    const taken = domains.find(domainTaken);
    return taken ? `@${taken} is already on Commons.` : "";
  };

  const takenSchools = new Set(allSchools().map(school => school.toLowerCase()));
  const seenSchools = new Set();
  const rows = $$("[data-school-row]").map(row => ({
    nameInput: $("[data-school-name]", row),
    emailInput: $("[data-school-email]", row),
    principalInput: $("[data-school-principal]", row)
  }));
  const schools = rows.map(({ nameInput: schoolName, emailInput: schoolEmail, principalInput }) => ({
    name: schoolName.value.trim().replace(/\s+/g, " "),
    adminEmail: schoolEmail.value.trim().toLowerCase(),
    principalEmail: principalInput.value.trim().toLowerCase() || null
  }));
  const usedPrincipals = new Set(Object.values(state.access.principals));
  const schoolRules = rows.flatMap((row, index) => {
    const { name, adminEmail, principalEmail } = schools[index];
    const key = name.toLowerCase();
    const nameError =
      name.length < 3 ? "Enter the school's name." : takenSchools.has(key) ? "That school is already on Commons." : seenSchools.has(key) ? "This school is listed twice." : "";
    seenSchools.add(key);
    return [
      [row.nameInput, nameError],
      [row.emailInput, isValidEmail(adminEmail) ? "" : "Enter the school administrator's full email."],
      [
        row.principalInput,
        !principalEmail
          ? ""
          : !isValidEmail(principalEmail)
            ? "Enter the principal's full email, or leave it blank."
            : usedPrincipals.has(principalEmail)
              ? "This email is already a principal at another school."
              : ""
      ]
    ];
  });

  const valid = validateFields([
    [
      countyInput,
      countyName.length < 3
        ? "Enter your county or school division's name."
        : active.some(county => county.name.toLowerCase() === countyName.toLowerCase()) || countyName.toLowerCase() === DIVISION_NAME.toLowerCase()
          ? "This county has already signed up."
          : ""
    ],
    [stateInput, stateInput.value.trim().length < 2 ? "Enter your state." : ""],
    [nameInput, nameInput.value.trim().length < 2 ? "Enter your name (at least 2 characters)." : ""],
    [
      emailInput,
      !isValidEmail(email)
        ? "Enter a valid email address, like name@county.k12.va.us."
        : isAdminEmail(email) || active.some(county => county.status === "pending" && county.contact.email === email)
          ? "This email already has administrator access or a sign-up waiting for review."
          : ""
    ],
    [passwordInput, passwordInput.value.length < PASSWORD_MIN ? `Use at least ${PASSWORD_MIN} characters.` : ""],
    [confirmInput, confirmInput.value !== passwordInput.value ? "The passwords don't match." : ""],
    [teacherInput, !teacherDomains.length ? "Enter at least one staff email domain, like county.k12.va.us." : domainListError(teacherDomains, "county.k12.va.us")],
    [
      studentInput,
      studentDomains.find(domain => teacherDomains.includes(domain))
        ? "A domain can't be both a staff and a student domain."
        : domainListError(studentDomains, "students.county.k12.va.us")
    ],
    ...schoolRules
  ]);
  if (!valid) return;
  if (!window.crypto?.subtle) {
    $("#signup-error").textContent = "Passwords need a secure page. Open the site at http://localhost:8000/FBLA.html.";
    return;
  }

  const submit = $("#signup-submit");
  submit.disabled = true;
  try {
    state.counties.push({
      id: uid("county"),
      name: countyName,
      state: stateInput.value.trim(),
      status: "pending",
      contact: { name: nameInput.value.trim().replace(/\s+/g, " "), email },
      credential: await createCredential(passwordInput.value),
      teacherDomains,
      studentDomains,
      schools,
      submittedAt: Date.now()
    });
  } finally {
    submit.disabled = false;
  }
  event.target.reset();
  $("#signup-error").textContent = "";
  $("#signup-schools").innerHTML = "";
  addSchoolRow(false);
  persist();
  renderHeader();
  $("#signup-done-county").textContent = countyName;
  $("#signup-done").hidden = false;
  $("#signup-done").scrollIntoView({ block: "center" });
  $("#signup-done").focus();
  toast(`${countyName} submitted for review.`, "success");
}

async function resetPassword(email) {
  const confirmed = await confirmAction({
    title: `Reset the password for ${email}?`,
    message: "Their current password stops working. They'll create a new one the next time they sign in.",
    confirmLabel: "Reset password",
    danger: true
  });
  if (!confirmed) return;
  delete state.accounts[email];
  commit();
  toast(`${email} will create a new password at their next sign-in.`);
}

function normalizeDomain(value) {
  return value.trim().toLowerCase().replace(/^.*@/, "");
}

// "a.org, @b.org c.org" → ["a.org", "b.org", "c.org"]
function parseDomains(value) {
  return [...new Set(value.split(/[\s,;]+/).map(normalizeDomain).filter(Boolean))];
}

// Sign-ups made before counties could list several domains saved just one of each.
function countyDomains(county) {
  return {
    teacher: county.teacherDomains ?? [county.teacherDomain].filter(Boolean),
    student: county.studentDomains ?? [county.studentDomain].filter(Boolean)
  };
}

function handleAddDomain(event) {
  event.preventDefault();
  const input = $("#domain-input");
  const domain = normalizeDomain(input.value);
  const role = $("#domain-role").value;
  const existing = state.access.allowedDomains.find(rule => rule.domain === domain);
  const valid = validateFields([
    [
      input,
      !DOMAIN_PATTERN.test(domain)
        ? "Enter a domain like jrtucker.k12.example."
        : existing?.role === role
          ? `@${domain} is already a ${role} domain.`
          : ""
    ]
  ]);
  if (!valid) return;
  state.access.allowedDomains = [...state.access.allowedDomains.filter(rule => rule.domain !== domain), { domain, role }].sort((a, b) =>
    a.domain.localeCompare(b.domain)
  );
  input.value = "";
  commit();
  toast(
    existing
      ? `@${domain} moved to ${role} domains. Those emails now sign in as ${ROLE_LABELS[role]}s.`
      : `Anyone with an @${domain} email can now sign in as a ${ROLE_LABELS[role]}.`,
    "success"
  );
}

async function removeDomain(domain) {
  const confirmed = await confirmAction({
    title: `Remove @${domain}?`,
    message: `People with @${domain} emails will no longer be able to sign in. Their past reservations and requests are kept.`,
    confirmLabel: "Remove domain",
    danger: true
  });
  if (!confirmed) return;
  state.access.allowedDomains = state.access.allowedDomains.filter(rule => rule.domain !== domain);
  commit();
  toast(`@${domain} removed from sign-in access.`);
}

// Every approval, decline, and request status change is logged so the school's principal can review and override it.
function logDecision(kind, targetId, from, to, override = null) {
  state.decisions.unshift({
    id: uid("decision"),
    kind,
    targetId,
    from,
    to,
    by: { name: state.user.name, email: state.user.email },
    at: Date.now(),
    override
  });
  state.decisions = state.decisions.slice(0, 200);
}

function reviewReservation(id, decision) {
  const reservation = state.reservations.find(item => item.id === id);
  if (!reservation || reservation.status !== "pending" || !canReviewReservation(reservation)) return;
  logDecision("reservation", id, reservation.status, decision);
  reservation.status = decision;
  reservation.reviewedBy = state.user.name;
  reservation.reviewedAt = Date.now();
  commit();
  const name = getResource(reservation.resourceId)?.name ?? "Reservation";
  toast(`${decision === "approved" ? "Approved" : "Declined"} ${name} for ${reservation.user}.`, decision === "approved" ? "success" : "info");
}

function saveRequestUpdate(id) {
  const request = state.requests.find(item => item.id === id);
  if (!request) return;
  if (request.principalLock && !isPrincipal()) {
    toast("The principal set this request's status, so only the principal can change it.", "error");
    return;
  }
  const status = $(`[data-status-select="${id}"]`).value;
  const note = $(`[data-note-input="${id}"]`).value.trim();
  if (status === request.status && !note) {
    toast("Change the status or add a note before saving.", "error");
    return;
  }
  if (status !== request.status) logDecision("request", id, request.status, status);
  request.updates.push({
    status,
    note: note || `Status changed to ${STATUS_LABELS[status].toLowerCase()}.`,
    by: state.user.name,
    at: Date.now()
  });
  request.status = status;
  commit();
  toast(`${id} updated.`, "success");
}

function decisionTarget(decision) {
  return decision.kind === "reservation"
    ? state.reservations.find(item => item.id === decision.targetId)
    : state.requests.find(item => item.id === decision.targetId);
}

// A principal can undo an admin's decision while it still stands and the reservation hasn't happened yet.
function canOverride(decision) {
  const target = decisionTarget(decision);
  if (!target || decision.override || decision.overriddenAt || decision.by.email === state.user.email) return false;
  if (target.status !== decision.to) return false;
  return decision.kind === "request" || !isPast(target);
}

function overrideDecision(id) {
  const decision = state.decisions.find(item => item.id === id);
  if (!decision || !isPrincipal() || !canOverride(decision)) return;
  const target = decisionTarget(decision);
  const now = Date.now();
  if (decision.kind === "reservation") {
    // Undoing a decline approves it; undoing an approval declines it. Re-approving must still fit the available units.
    const next = decision.to === "approved" ? "denied" : "approved";
    const resource = getResource(target.resourceId);
    if (next === "approved" && (!resource || availableQuantity(resource, target.date, target.start, target.end) < target.qty)) {
      toast("Can't approve this one now. The resource is already booked for that time.", "error");
      return;
    }
    logDecision("reservation", target.id, target.status, next, decision.id);
    Object.assign(target, { status: next, reviewedBy: `${state.user.name} (Principal)`, reviewedAt: now });
    toast(`Overrode ${decision.by.name}. ${resource?.name ?? "Reservation"} for ${target.user} is now ${STATUS_LABELS[next].toLowerCase()}.`, "success");
  } else {
    logDecision("request", target.id, target.status, decision.from, decision.id);
    target.updates.push({ status: decision.from, note: `Principal override: status set back to ${STATUS_LABELS[decision.from].toLowerCase()}.`, by: state.user.name, at: now });
    target.status = decision.from;
    target.principalLock = true;
    toast(`Overrode ${decision.by.name}. ${target.id} is back to ${STATUS_LABELS[decision.from].toLowerCase()}.`, "success");
  }
  Object.assign(decision, { overriddenAt: now, overriddenBy: state.user.name });
  commit();
}

function renderOversight() {
  if (!isPrincipal()) return;
  const others = state.decisions.filter(decision => decision.by.email !== state.user.email);
  $("#oversight-count").textContent = others.filter(canOverride).length;
  $("#oversight-list").innerHTML = others.length
    ? others
        .slice(0, 50)
        .map(decision => {
          const target = decisionTarget(decision);
          const what =
            decision.kind === "reservation"
              ? `${decision.to === "approved" ? "Approved" : "Declined"} ${escapeHTML(getResource(target?.resourceId)?.name ?? "a reservation")}${target ? ` for ${escapeHTML(target.user)} · ${formatDate(target.date)}` : ""}`
              : `${escapeHTML(decision.targetId)}${target ? ` “${escapeHTML(target.title)}”` : ""}: ${STATUS_LABELS[decision.from]} → ${STATUS_LABELS[decision.to]}`;
          const status = decision.overriddenAt
            ? `<span class="badge badge-denied">Overridden</span>`
            : decision.override
              ? `<span class="badge badge-approved">Override</span>`
              : "";
          return `
          <li class="approval-item">
            <div>
              <h3>${what} ${status}</h3>
              <p class="muted small">By ${escapeHTML(decision.by.name)} (${escapeHTML(decision.by.email)}) · ${formatDateTime(decision.at)}${
                decision.overriddenAt ? ` · Overridden by ${escapeHTML(decision.overriddenBy)} ${formatDateTime(decision.overriddenAt)}` : ""
              }</p>
            </div>
            ${
              canOverride(decision)
                ? `<div class="approval-actions"><button type="button" class="btn btn-danger-ghost btn-sm" data-override="${decision.id}">Override<span class="sr-only"> this decision</span></button></div>`
                : ""
            }
          </li>`;
        })
        .join("")
    : `<li class="empty-inline">No decisions from other administrators yet. Approvals, declines, and request status changes show up here.</li>`;
}

async function removeResource(id) {
  const resource = getResource(id);
  if (!resource) return;
  const upcoming = state.reservations.filter(item => item.resourceId === id && ACTIVE_STATUSES.includes(item.status) && !isPast(item));
  const confirmed = await confirmAction({
    title: `Remove ${resource.name}?`,
    message: upcoming.length
      ? `This removes it from the catalog and cancels ${plural(upcoming.length, "upcoming reservation")}.`
      : "This removes it from the catalog. Past reservation history is kept.",
    confirmLabel: "Remove resource",
    danger: true
  });
  if (!confirmed) return;
  upcoming.forEach(item => (item.status = "cancelled"));
  state.resources = state.resources.filter(item => item.id !== id);
  commit();
  toast(`${resource.name} removed from the catalog.`);
}

function handleAddResource(event) {
  event.preventDefault();
  const nameInput = $("#nr-name");
  const locationInput = $("#nr-location");
  const quantityInput = $("#nr-quantity");
  const hoursInput = $("#nr-hours");
  const descriptionInput = $("#nr-description");
  const name = nameInput.value.trim();
  const location = locationInput.value.trim();
  const quantity = Number(quantityInput.value);
  const hours = Number(hoursInput.value);
  const description = descriptionInput.value.trim();
  const duplicate = state.resources.some(resource => resource.name.toLowerCase() === name.toLowerCase());
  const maxHours = (closeMinutes() - openMinutes()) / 60;

  const valid = validateFields([
    [nameInput, name.length < 3 ? "Enter a name of at least 3 characters." : duplicate ? "A resource with this name already exists." : ""],
    [locationInput, location ? "" : "Enter where the resource is kept."],
    [quantityInput, Number.isInteger(quantity) && quantity >= 1 && quantity <= 500 ? "" : "Enter a whole number from 1 to 500."],
    [hoursInput, Number.isInteger(hours) && hours >= 1 && hours <= maxHours ? "" : `Enter a whole number from 1 to ${maxHours}.`],
    [descriptionInput, description.length < 10 ? "Add a description of at least 10 characters." : ""]
  ]);
  if (!valid) return;

  state.resources.push({
    id: uid("item"),
    name,
    category: $("#nr-category").value,
    type: $("#nr-type").value,
    location,
    quantity,
    maxHours: hours,
    requiresApproval: $("#nr-approval").checked,
    description,
    features: $("#nr-features")
      .value.split(",")
      .map(feature => feature.trim())
      .filter(Boolean)
      .slice(0, 4)
  });
  event.target.reset();
  commit();
  toast(`${name} added to the catalog.`, "success");
}

async function resetDemoData() {
  const confirmed = await confirmAction({
    title: "Reset demo data?",
    message: `${currentSchool()}'s resources, reservations, and requests return to the original sample data. Other schools aren't changed. This can't be undone.`,
    confirmLabel: "Reset data",
    danger: true
  });
  if (!confirmed) return;
  try {
    Object.assign(state, hydrate(await loadSeed()));
    setupStaticContent();
    commit();
    toast("Demo data restored.", "success");
  } catch {
    toast("Couldn't reload FBLA.json. Make sure the site is running from a web server.", "error");
  }
}

function exportReservations(list, label) {
  if (!list.length) {
    toast("There are no reservations to export yet.");
    return;
  }
  const header = ["Resource", "Category", "Reserved by", "Role", "Date", "Start", "End", "Units", "Purpose", "Status"];
  const rows = [...list].sort(byDateTime).map(item => {
    const resource = getResource(item.resourceId);
    return [
      resource?.name ?? "Removed resource",
      resource?.category ?? "",
      item.user,
      ROLE_LABELS[item.role] ?? "",
      item.date,
      item.start,
      item.end,
      item.qty,
      item.purpose,
      STATUS_LABELS[displayStatus(item)]
    ];
  });
  const csv = [header, ...rows].map(row => row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  const link = Object.assign(document.createElement("a"), { href: url, download: `commons-${label}-${todayISO()}.csv` });
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast(`Exported ${plural(rows.length, "reservation")}.`, "success");
}

function renderHelp() {
  $("#faq-list").innerHTML = state.faq
    .map(item => `<details><summary>${escapeHTML(item.q)}</summary><p>${escapeHTML(item.a)}</p></details>`)
    .join("");
  $("#policy-list").innerHTML = state.policies.map(policy => `<li>${escapeHTML(policy)}</li>`).join("");
}

function isGoogleEmail(email) {
  return ui.googleProfile?.email === email;
}

function setupGoogle() {
  if (!GOOGLE_CLIENT_ID) return;
  // Google only accepts the origins listed for this client, and a double-clicked file has none.
  if (location.protocol === "file:") {
    $("#google-hint").textContent = "Google sign-in only works when the site runs at http://localhost:8000/FBLA.html. Start it from Run and Debug, then reload.";
    $("#google-fallback").addEventListener("click", () => {
      $("#login-error").textContent = "Open http://localhost:8000/FBLA.html (Run and Debug → Open FBLA Website) to use Google sign-in.";
    });
    return;
  }
  const script = Object.assign(document.createElement("script"), { src: GOOGLE_SCRIPT, async: true });
  script.addEventListener("load", () => {
    window.google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: handleGoogleCredential, auto_select: false });
    window.google.accounts.id.renderButton($("#google-btn"), { theme: "outline", size: "large", text: "continue_with", shape: "rectangular", width: 320 });
    $("#google-btn").hidden = false;
    $("#google-fallback").hidden = true;
  });
  script.addEventListener("error", () => {
    $("#google-hint").textContent = "Couldn't reach Google. Check your connection, or sign in with your email below.";
  });
  document.head.append(script);
}

// Google returns a signed ID token. This demo reads it in the browser, so it checks the audience, expiry, and verified email,
// but a real deployment must verify the token's signature on a server.
function decodeGoogleToken(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = new TextDecoder().decode(Uint8Array.from(atob(payload), char => char.charCodeAt(0)));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function handleGoogleCredential(response) {
  const claims = decodeGoogleToken(response.credential ?? "");
  const email = String(claims?.email ?? "").toLowerCase();
  if (!claims || claims.aud !== GOOGLE_CLIENT_ID || claims.exp * 1000 < Date.now() || !claims.email_verified || !isValidEmail(email)) {
    $("#login-error").textContent = "Google couldn't verify that account. Try again.";
    return;
  }
  ui.googleProfile = { email, name: String(claims.name ?? "").trim() };
  $("#login-email").value = email;
  $("#login-name").value = ui.googleProfile.name || $("#login-name").value;
  $("#login-error").textContent = "";
  updateLoginMode();
  const problem = signInError(email, $('input[name="role"]:checked').value);
  if (problem) {
    $("#login-error").textContent = problem;
    return;
  }
  if (!findSchool($("#login-school").value)) {
    $("#login-email-status").textContent = `✓ Google verified ${email}. Now choose your school, then select Continue.`;
    $("#login-school").focus();
  } else {
    $("#login-form").requestSubmit();
  }
}

function openLogin() {
  const dialog = $("#login-dialog");
  if (dialog.open) return;
  ui.googleProfile = null;
  $("#login-school").value = state.user?.school ?? "";
  $("#login-email").value = state.user?.email ?? "";
  $("#login-name").value = state.user?.name ?? "";
  const role = state.user?.role ?? "student";
  $$('input[name="role"]').forEach(input => (input.checked = input.value === role));
  $("#login-close").hidden = !state.user && !VIEWS[ui.view].public;
  $("#login-title").textContent = state.user ? "Switch profile" : "Welcome to Commons";
  $("#login-password").value = "";
  $("#login-confirm").value = "";
  ["#login-school", "#login-email", "#login-name", "#login-password", "#login-confirm"].forEach(selector => setFieldError($(selector), ""));
  $("#login-error").textContent = "";
  updateLoginMode();
  dialog.showModal();
}

function updateLoginMode() {
  const email = $("#login-email").value.trim().toLowerCase();
  const account = state.accounts[email];
  const valid = isValidEmail(email);
  const isNew = valid && !account;
  const google = isGoogleEmail(email);
  $("#login-password-field").hidden = google;
  $("#login-confirm-field").hidden = !isNew || google;
  $("#login-submit").textContent = google ? "Continue with Google account" : "Sign in";
  $("#login-password-label").textContent = isNew ? "Create a password" : "Password";
  $("#login-password").autocomplete = isNew ? "new-password" : "current-password";
  $("#login-password-hint").textContent = isNew ? `First time signing in? Choose a password with at least ${PASSWORD_MIN} characters.` : "";
  if (account?.name && !$("#login-name").value) $("#login-name").value = account.name;
  if (account?.school && !$("#login-school").value) $("#login-school").value = account.school;
  const scope = valid ? adminScope(email) : null;
  if (scope?.schools.length === 1 && !$("#login-school").value) $("#login-school").value = scope.schools[0];

  const roles = valid ? allowedRoles(email) : [];
  const status = $("#login-email-status");
  let message = "";
  let tone = "";
  if (email && !valid) [message, tone] = ["Not a valid email address yet. Use the full address, like name@school.org.", "bad"];
  else if (valid && !roles.length) [message, tone] = [`@${emailDomain(email)} isn't an approved domain. Ask an administrator to add it.`, "bad"];
  else if (valid) {
    const kind = isAdminEmail(email) ? "Administrator" : ROLE_LABELS[roles[0]];
    [message, tone] = [`✓ Valid ${kind.toLowerCase()} email${account ? ". Welcome back!" : ". New account."}`, "good"];
  }
  status.textContent = message;
  status.dataset.tone = tone;

  // Lock the role cards to what this email's domain allows.
  const inputs = $$('input[name="role"]');
  inputs.forEach(input => (input.disabled = roles.length > 0 && !roles.includes(input.value)));
  const checked = inputs.find(input => input.checked);
  if (roles.length && !roles.includes(checked?.value)) inputs.find(input => input.value === roles[0]).checked = true;
}

async function handleLogin(event) {
  event.preventDefault();
  const schoolInput = $("#login-school");
  const emailInput = $("#login-email");
  const nameInput = $("#login-name");
  const passwordInput = $("#login-password");
  const confirmInput = $("#login-confirm");
  const school = findSchool(schoolInput.value);
  const email = emailInput.value.trim().toLowerCase();
  const name = nameInput.value.trim().replace(/\s+/g, " ");
  const password = passwordInput.value;
  const role = $('input[name="role"]:checked').value;
  const account = state.accounts[email];
  const isNew = isValidEmail(email) && !account;
  const google = isGoogleEmail(email);
  $("#login-error").textContent = "";
  if (!google && !window.crypto?.subtle) {
    $("#login-error").textContent = "Passwords need a secure page. Open the site at http://localhost:8000/FBLA.html.";
    return;
  }
  const valid = validateFields([
    [schoolInput, !school ? "Choose your school from the list." : role === "admin" ? adminSchoolError(email, school) : ""],
    [emailInput, signInError(email, role)],
    [nameInput, name.length < 2 ? "Enter your name (at least 2 characters)." : ""],
    [passwordInput, google ? "" : !password ? "Enter your password." : isNew && password.length < PASSWORD_MIN ? `Use at least ${PASSWORD_MIN} characters.` : ""],
    [confirmInput, !google && isNew && confirmInput.value !== password ? "The passwords don't match." : ""]
  ]);
  if (!valid) return;

  const submit = $("#login-submit");
  submit.disabled = true;
  try {
    if (google) {
      // Google already proved this email. Accounts made this way have no Commons password.
      state.accounts[email] = { ...account, google: true, createdAt: account?.createdAt ?? Date.now() };
    } else if (isNew) {
      state.accounts[email] = await createCredential(password);
    } else if (!account.hash) {
      validateFields([[passwordInput, "This account uses Google. Select Continue with Google to sign in."]]);
      return;
    } else if ((await hashPassword(password, account.salt)) !== account.hash) {
      validateFields([[passwordInput, "That password is incorrect."]]);
      return;
    }
  } finally {
    submit.disabled = false;
  }
  Object.assign(state.accounts[email], { name, school });
  state.user = { name, email, role, school };
  useSchool(school);
  schoolInput.value = school;
  passwordInput.value = "";
  confirmInput.value = "";
  persist();
  $("#login-dialog").close();
  renderHeader();
  route();
  toast(`${isNew ? "Account created. " : ""}Signed in as ${name} (${roleLabel(state.user)}, ${school}).`, "success");
}

function toast(message, type = "info") {
  const region = $("#toast-region");
  const item = document.createElement("div");
  item.className = `toast toast-${type}`;
  item.textContent = message;
  region.append(item);
  setTimeout(() => {
    item.classList.add("is-leaving");
    setTimeout(() => item.remove(), 300);
  }, 4500);
}

document.addEventListener("DOMContentLoaded", init);
