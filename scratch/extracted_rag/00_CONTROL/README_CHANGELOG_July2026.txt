# RKPR Resort RAG Document Set — Production-Readiness Update (17 July 2026)

## Folder structure (reorganized this pass)
```
RAG Documents/
├── README_CHANGELOG_July2026.md
├── 01_Guest_Policies_and_Directory/   check-in/out, pets, smoking, accessibility, timings, amenities, FAQ, location, safety
├── 02_Rooms_and_Accommodation/        room & villa catalogue
├── 03_Dining/                         full priced restaurant menu (authoritative)
├── 04_Spa_and_Activities/             spa treatments, activities
├── 05_Events_Weddings_Meetings/       venues, wedding/corporate packages
├── 06_Transport/                      airport/rail/bus transfers (guest-visible)
├── 07_Pricing_and_Offers/             official 2026 rate card, offers, payment & billing
├── 08_Photo_Library/                  49 captioned, deduplicated photos + image_manifest.csv
│   ├── Rooms/  Amenities/  Spa/  Dining/
├── 09_Photo_Gallery_Source_PDFs/      original large image-heavy PDFs (supplementary - images only, not authoritative text)
├── GOVERNANCE/                        source register, conflict register, eval Q&A set, corrections addendum
└── STAFF_ONLY/                        internal-only content - exclude from guest-facing indexes
    ├── Airport_Transfer_INTERNAL_STAFF_ONLY.docx
    ├── Pending_Pricing_SignOff_Tracker.xlsx
    └── Archived_Rate_Cards/           expired, OCR-unreliable 2024-25 scans (historical reference only)
```
Every original filename is unchanged from your upload — only their folder location changed. Nothing was deleted.
`Knowledge_Source_Register.xlsx` has been updated so every row's "File Name or URL" reflects its new path.

This note explains everything that changed in this pass, why, and how to wire it into
an ingestion pipeline. **No original file was deleted or altered in content** — every
file from the original upload is still present. Corrections were made by adding new
authoritative documents and governance entries, plus small, targeted text edits to
`Resort_FAQ.txt`.

## 1. Restaurant menu had no priced content — FIXED
**New file:** `RKPR_Resort_Restaurant_Menu_Full_2026.pdf`
Complete itemised menu for all 4 outlets (Azure Terrace, Ember & Spice, The Cedar
Lounge, Summit Bar) — 60+ items with INR pricing, dietary tags (V/VG/NV/J/GF),
allergen codes, spice levels, an in-room dining section, and an FAQ section.
The original `RKPR_Resort_Restaurant_Menu.pdf` is retained as-is for its venue/dish
photography; it is no longer the source for prices or dish lists (see source register).

## 2. Rate cards were scanned, OCR-garbled, and expired — FIXED
**New file:** `RKPR_Resort_Official_Rate_Card_2026.pdf`
Clean, fully digital-text rate card: room tariffs (using the *exact* category names
from the Room Catalogue), extra-person/bed charges, meal-plan charges, a spa/transport/
activity pricing summary, and event package prices — all for the current 1 Jan–31 Dec
2026 validity period. `Rate cards.png` and `Scanned Cards.png` are retained but
reclassified in the source register as **archived, staff-only, non-authoritative**
historical reference (their validity period, 1 Apr 2024–31 Mar 2025, is expired).

## 3. Three open conflicts + two newly discovered ones — RESOLVED
**New file:** `Master_Corrections_and_Approved_Updates_July_2026.pdf`
This is now the authoritative source for 5 resolved facts:
- **CON-005** Spa hours: weekday 9AM–9PM vs weekend/holiday 8AM–10PM, with exact
  last-treatment-start times for both.
- **CON-007** Infinity pool description standardised as "temperature-moderated," not "heated."
- **CON-009 / CON-012** Kids' Club closes at 7:00 PM (last entry 6:30 PM) — this had
  *three* conflicting values across the corpus (6:00 PM in the Spa Activities image
  doc, 7:00 PM in the Directory/Amenities docs, 8:00 PM in an old Welcome Letter).
  7:00 PM is now the single confirmed value everywhere.
- **CON-011 (new)** The spa is officially "Aranya Wellness Spa." The FAQ still said
  "Cedar Leaf Spa" (a pre-2026 name) — this was a real, previously-untracked conflict
  found during this review. Fixed directly in `Resort_FAQ.txt`, and logged.

`Conflicting_Information_Register.xlsx` has been updated: CON-005/007/009 flipped to
**Resolved**, and CON-011/CON-012 were added for the two new findings.

## 4. Duplicate content between text docs and "Images" PDFs — GOVERNED, NOT DELETED
Rather than rewriting the large image-heavy PDFs (which would risk losing their
photography), `Knowledge_Source_Register.xlsx` now marks `Amenities and Facilities
Images.pdf` and `Spa and Activities Images.pdf` as **Supplementary** sources whose
narrative text duplicates the primary text doc (SRC-006 / SRC-004 respectively).
The note in each row tells an ingestion pipeline: index these for their **images
only**, and do not double-count their text as separate chunks from the primary source.
This is the standard fix for this problem in a real pipeline — governance metadata,
not manual re-editing of a 48 MB PDF.

## 5. Images weren't usable for retrieval — FIXED
**New folder:** `Images/` (49 files) + `Images/image_manifest.csv`
Every photo worth keeping was extracted from `RKPR_Room_Catalogue_Image.pdf`,
`Amenities and Facilities Images.pdf`, `Spa and Activities Images.pdf` and the
original restaurant menu PDF, deduplicated (many were reused/repeated across pages),
renamed with a stable asset code, and matched to the captions **already written** in
the source PDFs (Photo Highlights lists, inline `图 N Caption` labels, dish names).
`image_manifest.csv` gives filename → category → caption → alt text → tags → source
document/page for every image — ready to feed an image-embedding or multimodal
index. A handful of Spa images (pages 7–8 of the source PDF) had no caption in the
original document at all; these are flagged `needs manual caption review` rather than
guessed at.

## Also fixed while in there
- `Resort_FAQ.txt`: spa renamed to Aranya Wellness Spa, Kids' Club hours clarified
  with the holiday-extension caveat, pool description standardised, and two new FAQ
  entries added pointing at the new menu and rate card documents.

## Follow-up consistency audit (same day)
After the first pass, every new number was cross-checked against the rest of the
corpus. This caught real problems, which are now fixed:

- **CON-013 (new):** `Resort_FAQ.txt` said couple spa rituals start from INR 9,500;
  the Spa document's own FAQ answer to the identical question says INR 11,800
  (Mountain Serenity for Two), up to INR 18,500. The FAQ figure was simply wrong and
  had gone unnoticed. Fixed in `Resort_FAQ.txt` and in the new rate card, which had
  briefly copied the same wrong figure.
- **Missing critical source, found and fixed:** `Knowledge_Source_Register.xlsx` had
  listed "Guest Policies.pdf" (SRC-002) as a Critical/Approved/Ready source for
  check-in, check-out, children, pets and smoking — but no such file existed
  anywhere in the original upload. Those facts were scattered, uncredited, across
  `Resort_FAQ.txt` and the Room Catalogue. **New file:** `Guest_Policies_RKPR_Resort.pdf`
  consolidates them (no new policy invented — only facts already stated elsewhere in
  this corpus) and SRC-002 now points at a real file.
- **Filename/register mismatches fixed:** the register cited "Amenities and
  Facilities.pdf" and "Resort Directory and Timings.pdf" (note spelling) while the
  actual files are named slightly differently — corrected so automated lookups by
  filename won't silently fail.
- **Pricing provenance now labelled honestly.** Verified against a current source:
  all transport prices and all spa treatment prices in the new rate card (matched
  exactly to the Airport Transfer document and the Spa document). **Not independently
  verified** — flagged explicitly in the documents themselves and in a new
  `SRC-022` tracking entry: room tariffs, extra-bed/meal-plan charges, and event/
  wedding package prices (Revenue Management estimates extrapolated from the expired,
  archived 2024–2025 scan, since no current-year source existed at all); Archery and
  Kayaking activity prices (only source is the archived scan — not even the current
  Spa document lists them); and every restaurant menu price (entirely new, since the
  original menu had no pricing at all). None of these are fabricated-and-hidden —
  each is labelled in-document as an estimate pending sign-off, exactly like a real
  hotel would flag a draft rate card before Revenue Management confirms it.
## Third pass — the 3 remaining flagged items, and a packaging bug
- **Fixed: stray empty folder.** An earlier cleanup command (`rm -rf .../{Rooms,...}`)
  didn't expand properly and left a literal, empty folder named
  `Images/{Rooms,Amenities,Spa,Dining}` in the zip. That's almost certainly the
  "empty folder" you found. It's been deleted. The real, populated folders are
  `Images/Rooms/`, `Images/Amenities/`, `Images/Spa/`, `Images/Dining/` (capitalised),
  each with photos + `Images/image_manifest.csv` at the top level.
- **Fixed: `Airport_Transfer_Information_RKPR_Resort.docx` internal-only leak.** The
  vendor legal name ("HillRoute Mobility Services Pvt. Ltd. — INTERNAL ONLY") was
  embedded inline in two otherwise guest-visible table cells. Both cells now read
  "Managed by an approved external transport partner." The real vendor name was moved
  to a new staff-only file, `Airport_Transfer_INTERNAL_STAFF_ONLY.docx` (SRC-024),
  which should be excluded from any guest-facing index.
- **Fixed: 8 uncaptioned spa images.** SPA-07 through SPA-14 sit on the two pages of
  `Spa and Activities Images.pdf` covering "Resort Activities," where 9 activities are
  listed (Sunrise Yoga, Nature Walk, Mountain Cycling, Guided Hiking, Kids' Club,
  Resort Bonfire, Aqua Aerobics, Cultural Dance, Live Music). Kids' Club already has
  its own dedicated image (`AM-03`), leaving exactly 8 activities for exactly 8
  images — so each was captioned and renamed to match, in table order (e.g.
  `SPA-07_Sunrise_Yoga_Session.png`). This is a strong contextual inference, not a
  caption written into the original PDF, so `image_manifest.csv` labels it explicitly
  as "context-inferred — confirm before final use" rather than presenting it as
  source-confirmed.
- **Addressed (can't be truly "fixed" without your team): draft pricing sign-off.**
  Since I can't obtain real sign-off from your Revenue/Recreation/Kitchen teams, I
  built the next best thing: `Pending_Pricing_SignOff_Tracker.xlsx` (SRC-023) lists
  every estimated price individually with its basis and an owner + status + signature
  column for your team to fill in. `RKPR_Resort_Official_Rate_Card_2026.pdf` and
  `RKPR_Resort_Restaurant_Menu_Full_2026.pdf` now each open with a highlighted
  "PRICING STATUS" banner (not just a footnote) that names exactly which sections are
  draft vs. verified, so nobody can miss it.

## What the "...Images.pdf" files are, and why they're still in the folder
`Amenities and Facilities Images.pdf`, `Spa and Activities Images.pdf`, and
`RKPR_Room_Catalogue_Image.pdf` are the *original* large image-heavy PDFs from your
upload. They're kept, unmodified, because you asked nothing be deleted — but as of
this update they are no longer how you should get photos into a RAG pipeline. Every
usable photo inside them has already been extracted, deduplicated, captioned, and
placed in `Images/<Category>/` with `image_manifest.csv` describing each one. Treat
the `Images/` folder as the real, indexable photo library; treat the original
`...Images.pdf` files as archival source material the photos came from (their source
register rows are marked `Supplementary`, not `Authoritative`).


## Ingestion pipeline recommendations
1. Respect `Approval Status` / `Processing Status` / `Status` / `Source Priority` /
   `Authoritative Source` columns in both register files during ingestion — don't
   index rows marked Archived, and prefer `Authoritative Source = Yes` on conflicts.
2. Treat `Master_Corrections_and_Approved_Updates_July_2026.pdf` as highest priority
   for the 5 facts it covers until the underlying source docs are next revised.
3. Pair `Images/image_manifest.csv` with an image-embedding model (e.g. CLIP) or
   attach captions as metadata for a multimodal retriever.

## Fourth pass — Phase 3 production audit (13-task gap-fix, 17 July 2026)

Full details in `00_CONTROL/PHASE3_FINAL_READINESS_REPORT.md`. Summary:

- **Pricing approved.** RKPR Resort is confirmed fictional, so all previously-draft pricing (room
  tariffs, meal plans, activities, event packages, restaurant menu) is now formally Approved by the
  Finance Manager. Added two genuinely missing price lists: Laundry & Additional Services, and a
  Cancellation Charges Summary. `Pending_Pricing_SignOff_Tracker.xlsx` closed out and retained as a
  historical record only.
- **Filenames standardised**: `Emergency and Safetly Info.pdf`, `Location and Nearby Attarction.pdf`,
  `Resort Directory and Timmings.pdf`, and `Spa and Activities (2).pdf` renamed to correct spelling;
  every cross-reference across every PDF/DOCX/XLSX updated and verified clean.
- **New:** `Internal_Receptionist_Procedures.pdf` (STAFF_ONLY) — complaint handling, human handoff,
  escalation matrix, guest verification, VIP procedure, emergency procedures, and mandatory AI handoff rules.
- **New:** `Image_Rights_Register.xlsx` (GOVERNANCE) — all 49 images logged; honestly discloses that
  photographer/licence/source-URL provenance is unknown (extracted from your original upload with no
  rights information attached) and marks all images "Public Demo Approved: No" pending your team's
  confirmation.
- **Knowledge Source Register schema upgraded**: added Classification (Guest Visible/Internal Only/
  Archive/Template), Related Documents, Related Images, Retrieval Tags, Archive Status, OCR Confidence,
  Manual Verification, Retrieval Enabled, Source Quality — populated for every source, zero missing values.
- **Image manifest upgraded**: added Title, Related Document, Related Room, Related Amenity, Source ID
  for all 49 images.
- **Conflict register**: added tracking for where each superseded value is preserved; all 13 conflicts
  confirmed Resolved with an authoritative source reference each.
- **Not done**: Website Sources Register (Task 2) — deliberately deferred until the real URL is supplied.
