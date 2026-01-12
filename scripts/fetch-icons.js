/**
 * Script to fetch all Superhuman icons from Figma
 * 
 * This script needs to be run while Figma Desktop is open with the icon file
 * and the Figma MCP server is running on port 3845.
 * 
 * Usage: node scripts/fetch-icons.js
 */

const fs = require('fs');
const path = require('path');
const https = require('http'); // localhost uses http

// Icon node IDs from the Figma file
const iconNodes = {
  "4591:28168": "arrow-clockwise",
  "4591:28173": "arrow-counter-clockwise",
  "4502:27555": "arrow-down",
  "4628:28979": "arrow-down-bars",
  "2416:23706": "arrow-down-line",
  "4525:2234": "arrow-forward",
  "4502:27546": "arrow-left",
  "4502:27606": "arrow-left-line",
  "2416:23725": "arrow-out-squircle",
  "4525:2235": "arrow-reply",
  "4525:2233": "arrow-return",
  "2416:23707": "arrow-right",
  "4502:27599": "arrow-right-line",
  "4567:5067": "arrow-right-rectangle",
  "4591:28170": "arrow-share",
  "4756:24139": "arrow-trend-down-squircle",
  "4756:24138": "arrow-trend-up-squircle",
  "4502:27550": "arrow-up",
  "4628:28973": "arrow-up-bars",
  "4502:27603": "arrow-up-line",
  "4502:28195": "arrow-upload",
  "2416:23724": "arrows-clockwise",
  "4603:26833": "arrows-collapse",
  "2416:23690": "arrows-expand",
  "4603:26835": "arrows-in-bar",
  "4777:26342": "arrows-merge",
  "4666:1541": "arrows-out",
  "4525:2241": "arrows-reply-all",
  "4727:24126": "arrows-sort-horizontal",
  "4727:24130": "arrows-sort-vertical",
  "4777:26341": "arrows-split",
  "4603:2150": "at",
  "4553:28860": "basketball",
  "2416:23710": "bell",
  "4666:1548": "bell-fill",
  "4666:1547": "bell-ring",
  "4731:25056": "bell-slash",
  "4603:26837": "bell-z",
  "2416:23694": "blocks-plus",
  "4542:31743": "book",
  "4553:27916": "book-a",
  "4603:2148": "book-open",
  "4553:28861": "book-sparkle",
  "4735:25698": "bookmark",
  "4735:25697": "bookmark-fill",
  "4553:27147": "box-sparkle",
  "4727:24129": "box-x",
  "4727:24128": "box-x-slash",
  "4591:28171": "bug",
  "4564:27008": "building",
  "4567:5073": "building-search",
  "4522:30139": "button",
  "4542:31745": "button-cursor",
  "4553:27153": "button-plus",
  "4553:27148": "button-search",
  "2416:23716": "calendar",
  "4666:1540": "calendar-arrow-up",
  "4666:1539": "calendar-check",
  "4666:25655": "calendar-clock",
  "4666:25656": "calendar-stack",
  "4666:25657": "calendar-x",
  "4666:25660": "car",
  "4619:27771": "card",
  "4619:27765": "card-stack",
  "4502:28264": "caret-large-down",
  "4502:28263": "caret-large-left",
  "4502:28262": "caret-large-right",
  "4502:28261": "caret-large-up",
  "4502:27361": "caret-small-double-down",
  "4502:27366": "caret-small-double-left",
  "2416:23714": "caret-small-double-right",
  "4502:27357": "caret-small-double-up",
  "2416:23719": "caret-small-down",
  "2416:23711": "caret-small-left",
  "4502:26954": "caret-small-right",
  "4502:26951": "caret-small-up",
  "4591:28164": "carets-in",
  "4591:28169": "carets-out",
  "4698:26673": "chart-area",
  "4540:30678": "chart-bar",
  "4540:30677": "chart-bubble",
  "4564:27009": "chart-flow",
  "4816:60426": "chart-label-x-axis",
  "4816:60423": "chart-label-y-axis",
  "4698:26679": "chart-line",
  "4542:31741": "chart-line-smooth",
  "4542:31742": "chart-pie",
  "4542:31749": "chart-scatter",
  "4628:28976": "chart-timeline",
  "2416:23681": "chat-dots-typing",
  "2416:23717": "chat-lines",
  "4522:30144": "chat-plus",
  "4553:27913": "chat-x",
  "4816:60428": "chats",
  "2416:23720": "check",
  "2416:23708": "check-squircle",
  "4525:5115": "check-squircle-fill",
  "4666:25661": "check-squircle-stack",
  "4525:5119": "checks",
  // ... Add remaining icons here
};

const ICONS_DIR = path.join(__dirname, '..', 'public', 'icons');

// Ensure icons directory exists
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

console.log(`Icon directory: ${ICONS_DIR}`);
console.log(`Total icons to fetch: ${Object.keys(iconNodes).length}`);
console.log('\nNote: This script requires the Figma MCP server to be running.');
console.log('Make sure Figma Desktop is open with the icon file.\n');
