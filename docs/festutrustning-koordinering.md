# Festutrustning-koordinering (kannibalisering)

**Status:** Dokumentation för manuell åtgärd på festutrustning.se (utanför denna repo).

## Mål

Skaneevent.se ska äga lösningsintentioner (företagsevent, eventteknik, konferens/gala som planering).
Festutrustning.se ska äga uthyrning, katalog och bokning.

## Åtgärder på festutrustning.se

### 1. `/foretag`
- Softa title/H1 mot paket/uthyrning: t.ex. "Hyra eventpaket till företag"
- Lägg intern/extern länk till `https://skaneevent.se/foretagsevent/` för "planera företagsevent"
- Undvik att targeta exakt "företagsevent Skåne" som primärt keyword

### 2. `/eventteknik-foretag`
- Softa mot produkt/uthyrningsvinkel ELLER canonical/redirect-strategi till skaneevent `/eventteknik/` efter GSC-data
- Lägg länk: "Läs mer om eventteknik som lösning på Skåne Event"

### 3. `/julfest-foretag`
- Behåll uthyrningsvinkel ("hyra ljud och ljus till julfest")
- Länk till `https://skaneevent.se/julfest/` för planering

### 4. Cross-links från FEST → Skaneevent
- Från `/foretag` → skaneevent `/foretagsevent/`
- Från `/scen` → skaneevent `/scen-till-event/` (planering) där relevant

## Tracking
Alla länkar skaneevent → festutrustning mäts via `festutrustning_click` i GA4 (`G-0K4XG6F43Q`).
