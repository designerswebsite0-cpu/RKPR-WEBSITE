const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");

console.log("=========================================");
console.log("   RKPR RESORT CONTENT VALIDATOR SERVICE ");
console.log("=========================================");

let failed = false;
const checks = [];

function pass(message) {
  checks.push({ status: "PASS", message });
  console.log(`[PASS] ${message}`);
}

function fail(message) {
  checks.push({ status: "FAIL", message });
  console.log(`[FAIL] ${message}`);
  failed = true;
}

// 1. Validate Rooms Data (Rates, Sizes, Occupancy)
try {
  const roomsFilePath = path.join(projectRoot, "src", "data", "rooms.ts");
  if (!fs.existsSync(roomsFilePath)) {
    fail("rooms.ts data file does not exist.");
  } else {
    const content = fs.readFileSync(roomsFilePath, "utf-8");

    const expectedRooms = [
      { id: "GDR", size: "42 sq m / 452 sq ft", cap: 3, low: 9500, high: 12500 },
      { id: "VPR", size: "48 sq m / 517 sq ft", cap: 4, low: 11500, high: 14500 },
      { id: "MPS", size: "68 sq m / 732 sq ft", cap: 4, low: 16500, high: 21000 },
      { id: "FCS", size: "78 sq m / 840 sq ft", cap: 5, low: 19500, high: 24500 },
      { id: "HPV", size: "92 sq m / 990 sq ft", cap: 2, low: 26500, high: 33500 },
      { id: "G2PV", size: "165 sq m / 1,776 sq ft", cap: 7, low: 42000, high: 52000 }
    ];

    expectedRooms.forEach((room) => {
      const idRegex = new RegExp(`"id"\\s*:\\s*"${room.id}"`);
      if (!idRegex.test(content)) {
        fail(`Room ${room.id} not found in rooms.ts`);
        return;
      }

      // Extract the room object using string index finding
      const startIdx = content.indexOf(`"id": "${room.id}"`);
      const endIdx = content.indexOf("}", startIdx);
      const roomChunk = content.substring(startIdx, endIdx + 1);

      // Verify Size
      if (!roomChunk.includes(room.size)) {
        fail(`Room ${room.id} size does not match. Expected: ${room.size}`);
      } else {
        pass(`Room ${room.id} size matches: ${room.size}`);
      }

      // Verify Max Occupancy
      const maxOccRegex = /"maximumOccupancy"\s*:\s*(\d+)/;
      const matchOcc = roomChunk.match(maxOccRegex);
      if (!matchOcc || Number(matchOcc[1]) !== room.cap) {
        fail(`Room ${room.id} occupancy mismatch. Expected: ${room.cap}`);
      } else {
        pass(`Room ${room.id} occupancy matches: ${room.cap}`);
      }

      // Verify Tariffs
      const lowSeasonRegex = /"lowSeason"\s*:\s*(\d+)/;
      const highSeasonRegex = /"highSeason"\s*:\s*(\d+)/;
      const matchLow = roomChunk.match(lowSeasonRegex);
      const matchHigh = roomChunk.match(highSeasonRegex);

      if (!matchLow || Number(matchLow[1]) !== room.low) {
        fail(`Room ${room.id} low season tariff mismatch. Expected: ${room.low}`);
      } else {
        pass(`Room ${room.id} low season tariff matches: INR ${room.low}`);
      }

      if (!matchHigh || Number(matchHigh[1]) !== room.high) {
        fail(`Room ${room.id} high season tariff mismatch. Expected: ${room.high}`);
      } else {
        pass(`Room ${room.id} high season tariff matches: INR ${room.high}`);
      }
    });
  }
} catch (e) {
  fail(`Rooms validation failed with error: ${e.message}`);
}

// 2. Validate Kids' Club Timings
try {
  const dirFilePath = path.join(projectRoot, "src", "data", "directory.ts");
  if (!fs.existsSync(dirFilePath)) {
    fail("directory.ts data file does not exist.");
  } else {
    const content = fs.readFileSync(dirFilePath, "utf-8");
    if (!content.includes("Kids' Club") || !content.includes("7:00 PM")) {
      fail("Kids' Club closing timing does not match 7:00 PM in directory.ts");
    } else if (!content.includes("Last entry 6:30 PM")) {
      fail("Kids' Club last entry timing does not match 6:30 PM in directory.ts");
    } else {
      pass("Kids' Club timings matches: closes at 7:00 PM, last entry at 6:30 PM.");
    }
  }
} catch (e) {
  fail(`Kids' Club validation failed: ${e.message}`);
}

// 3. Validate Spa timings
try {
  const spaFilePath = path.join(projectRoot, "src", "data", "directory.ts");
  if (fs.existsSync(spaFilePath)) {
    const content = fs.readFileSync(spaFilePath, "utf-8");
    if (
      !content.includes("9:00 AM (Weekdays)") ||
      !content.includes("9:00 PM (Weekdays)")
    ) {
      fail("Spa weekdays timings do not match 9 AM - 9 PM.");
    } else {
      pass("Spa weekdays timings match: 9:00 AM - 9:00 PM.");
    }
  }
} catch (e) {
  fail(`Spa validation failed: ${e.message}`);
}

// 4. Validate Billing Security Warnings in Core Pages
const pagesToCheck = [
  { name: "Homepage", file: "src/app/page.tsx" },
  { name: "Contact Page", file: "src/app/contact/page.tsx" },
  { name: "Payments Page", file: "src/app/payments/page.tsx" },
  { name: "Footer Component", file: "src/components/Footer.tsx" }
];

pagesToCheck.forEach((page) => {
  try {
    const filePath = path.join(projectRoot, page.file);
    if (!fs.existsSync(filePath)) {
      fail(`${page.name} (${page.file}) does not exist.`);
    } else {
      const content = fs.readFileSync(filePath, "utf-8");
      // Search for warning strings
      const hasWarning =
        content.includes("OTP") ||
        content.includes("CVV") ||
        content.includes("PIN") ||
        content.includes("password");
      if (!hasWarning) {
        fail(`Billing fraud security warning is missing in ${page.name}`);
      } else {
        pass(`Billing fraud security warning confirmed in ${page.name}`);
      }
    }
  } catch (e) {
    fail(`Security warning validation failed on ${page.name}: ${e.message}`);
  }
});

// 5. Nomenclature and spelling checks
const spellingChecks = [
  { correct: "Aranya Wellness Spa", pattern: /aranya\s+wellness\s+spa/i },
  { correct: "Azure Terrace", pattern: /azure\s+terrace/i },
  { correct: "Ember & Spice", pattern: /ember\s*&\s*spice/i },
  { correct: "The Cedar Lounge", pattern: /the\s+cedar\s+lounge/i },
  { correct: "Summit Bar", pattern: /summit\s+bar/i }
];

try {
  const allFiles = [
    "src/data/dining.ts",
    "src/data/directory.ts",
    "src/data/navigation.ts",
    "src/data/rooms.ts",
    "src/data/spa.ts"
  ];
  allFiles.forEach((file) => {
    const filePath = path.join(projectRoot, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf-8");
      spellingChecks.forEach((check) => {
        const matches = content.match(check.pattern);
        if (matches) {
          // Check if it exactly matches the case-sensitive correct spelling
          const hasInvalidSpelling = matches.some(m => m !== check.correct);
          if (hasInvalidSpelling) {
            fail(`Incorrect spelling found for ${check.correct} in ${file}`);
          }
        }
      });
    }
  });
  pass("Nomenclature and spelling checks passed successfully.");
} catch (e) {
  fail(`Nomenclature check failed: ${e.message}`);
}

console.log("=========================================");
console.log(`VALIDATION SUMMARY: ${checks.filter(c => c.status === "PASS").length} Passed, ${checks.filter(c => c.status === "FAIL").length} Failed.`);
console.log("=========================================");

if (failed) {
  process.exit(1);
} else {
  console.log("All RAG integrity and design system requirements are fully verified!");
  process.exit(0);
}
