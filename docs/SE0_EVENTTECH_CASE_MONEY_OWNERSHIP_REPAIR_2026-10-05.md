# SE-0 — Case → Money Ownership Repair (Helsingborg)

**Status:** Implemented in Astro source 2026-10-05 (deploy required for LIVE SERP)  
**Site:** skaneevent.se  
**Experiment ID (Enta):** `skaneevent-se0-hbg-case-money-ownership-2026-10-05`

## Root cause (pre-change)

| Asset | Role today | Why case wins money-intent |
|-------|------------|----------------------------|
| `/case/ljud-ljus-foretagsfest/` | Article/case | Title/H1 = commercial service phrasing (“Ljud och ljus till företagsfest i Helsingborg”); strong local+service semantics; better/equal share on teknikleverantör* HBG; **no link** to `/helsingborg/foretagsevent/` |
| `/helsingborg/foretagsevent/` | Desired money (seed) | Service schema + geo; better position on some queries (e.g. konferens @~6) but lower share; **no case proof link**; weaker explicit teknikleverans framing vs case title |
| `/malmo/eventteknik/` | WORKING_OWNER bare ET | Dedicated eventteknik H1, process, case→money pattern — **PROTECT, untouched** |

Not primary causes: redirect/canonical (both self), noindex (both indexable), cross-domain FEST ownership.

## Case role after

PROOF / EXPERIENCE / INFORMATION GAIN — still indexable, self-canonical, no redirect/noindex.

## Money role after

Commercial geo offer for Helsingborg företagsevent + eventteknik context + link to case as proof. Not a clone of `/malmo/eventteknik/`.

## Mutations

1. Case body: related resources → money page + clarify proof role  
2. Money page: `areaServedName=Helsingborg`, teknikleverans paragraph, case proof section, FAQ  
3. No title/H1 change on case or money (avoid deopt / keyword stuffing)

## Protect

`/malmo/eventteknik/` · FEST festival/Phase1/DJ/ljud-geo · zero FEST mutation

## Checkpoints

- D+7: 2026-10-12 diagnostic  
- D+14: 2026-10-19 leading  
- D+28: 2026-11-02 primary  

## Rollback

Material drop in family total impressions OR money+case combined visibility without money-share gain → revert internal-link/body deltas only (keep pages indexable).
