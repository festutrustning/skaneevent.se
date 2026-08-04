# Keyword ownership map – Skaneevent.se vs Festutrustning.se

Senast uppdaterad: 2026-08-04

## Princip

| Domän | Roll |
|-------|------|
| **skaneevent.se** | B2B-lösning, planering, lokal SEO, use-case |
| **festutrustning.se** | Transaktionell uthyrning, katalog, bokning, SKU |

## Ownership

| Intent | Ägare | Skaneevent-URL | Festutrustning-URL |
|--------|-------|----------------|-------------------|
| hyra högtalare/PA + ort | FEST | – | `/hyra-hogtalare-malmo` |
| hyra ljud/ljus Malmö/Skåne | FEST | – | `/ljud-ljus-malmo`, `/ljud-ljus-skane` |
| produkter, paket, priser | FEST | – | `/produkter` |
| företagsevent Skåne/Malmö/Lund/HBG | SKANEEVENT | `/foretagsevent/`, `/malmo/…` | stöd: `/foretag` |
| eventteknik Skåne/Malmö | SKANEEVENT | `/eventteknik/`, `/malmo/eventteknik/` | stöd: `/eventteknik-foretag` |
| eventproduktion Skåne | SKANEEVENT | `/eventproduktion/` | `/foretag`, `/scen` |
| teknik till konferens/gala/lansering | SKANEEVENT | `/konferens/`, `/gala/`, `/produktlansering/` | deep links |
| företagsfest / julfest / kickoff (planering) | SKANEEVENT | `/foretagsfest/`, `/julfest/`, `/kickoff/` | `/foretag` |
| ljud/ljus till företagsevent | SKANEEVENT | `/ljud-ljus-foretagsevent/` | `/ljud-ljus-skane` |
| scen till företagsevent | SKANEEVENT | `/scen-till-event/` | `/scen` |
| mikrofoner till paneldiskussion | SKANEEVENT | `/guider/mikrofoner-paneldiskussion/` | – |

## Kannibaliseringsrisker (HIGH)

1. FEST `/foretag` vs SKANEEVENT `/foretagsevent/`
2. FEST `/eventteknik-foretag` vs SKANEEVENT `/eventteknik/`
3. FEST `/julfest-foretag` vs SKANEEVENT `/julfest/`

Se `docs/festutrustning-koordinering.md` för åtgärdsförslag.
