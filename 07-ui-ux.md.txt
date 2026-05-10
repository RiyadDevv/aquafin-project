# UI/UX Design

## Projectnaam
Aquafin Technieker Platform

---

# 1. Doel

Dit document beschrijft het ontwerp van de gebruikersinterface (UI) en de gebruikerservaring (UX) van de applicatie.

De interface combineert:
- risico-informatie en voorspellingen
- slimme materiaalaanbevelingen
- operationele bestelfunctionaliteit

Het doel is dat techniekers en planners snel en intuïtief kunnen reageren op risicoperiodes.

---

# 2. Gebruikers en hun noden

## Technieker

Prioriteiten:
- snel het huidige risico zien
- aanbevolen tools onmiddellijk kunnen bestellen
- eenvoudig materiaal opzoeken en bestellen

Typisch gebruik: desktop voor vertrek naar een site.

---

## Planner/Beheerder

Prioriteiten:
- forecast voor komende 5 jaar raadplegen
- materiaalcatalogus beheren
- overzicht van geplaatste bestellingen

Typisch gebruik: desktop, meer tijd beschikbaar voor analyse.

---

# 3. Design Concept

De interface volgt een **Weather Dashboard** patroon, vergelijkbaar met een moderne weerapp.

| Weerapp concept    | Aquafin concept                  |
|--------------------|----------------------------------|
| Huidig weer        | Huidig overstromingsrisico       |
| Weersvoorspelling  | Risicoforecast komende 5 jaar    |
| Waarschuwingen     | Risicowaarschuwingen             |
| Aanbevelingen      | Aanbevolen flood tools           |
| Actie              | Snel bestellen                   |

---

# 4. Navigatiestructuur

```text
Aquafin Technieker Platform
│
├── Dashboard       (startpagina, risico-overzicht)
├── Risicoanalyse   (forecast 5 jaar)
├── Materialen      (catalogus, zoeken, filteren)
│   └── Beheer      (toevoegen, verwijderen - enkel beheerder)
└── Bestellingen    (bestelling plaatsen, overzicht)
```

---

# 5. Kleurgebruik en Stijl

## Risiconiveaus

| Risiconiveau | Kleur  | Hex     |
|--------------|--------|---------|
| Laag         | Groen  | #22c55e |
| Gemiddeld    | Oranje | #f97316 |
| Hoog         | Rood   | #ef4444 |

## Algemene stijlkeuzes

- Achtergrond: donkerblauw/navy (professioneel, technisch)
- Kaarten: lichte achtergrond met subtiele schaduw
- Aanbevolen tools: label of badge als visuele markering
- Lettertypes: modern sans-serif (Inter of Roboto)

---

# 6. Schermen

## 6.1 Dashboard

Het dashboard is het primaire scherm en de startpagina.

### Doel

Binnen enkele seconden moet de gebruiker begrijpen:
- Is er momenteel risico?
- Wat komt er aan in de komende seizoenen?
- Welke tools zijn aanbevolen?
- Kan ik direct actie ondernemen?

### Wireframe

```
+------------------------------------------------------------------+
| Aquafin Technieker Platform        [Materialen]  [Bestellingen]  |
+------------------------------------------------------------------+
|                                                                  |
|  +---------------------------+  +------------------------------+ |
|  | Huidig Risico             |  | Forecast Komende Seizoenen   | |
|  |                           |  |                              | |
|  | HOOG                      |  | Lente 2026     GEMIDDELD     | |
|  | Winter 2026               |  | Zomer 2026     LAAG          | |
|  | Verwacht: 318 mm          |  | Herfst 2026    HOOG          | |
|  | Drempel:  300 mm          |  | Winter 2026    HOOG          | |
|  |                           |  | Lente 2027     GEMIDDELD     | |
|  +---------------------------+  +------------------------------+ |
|                                                                  |
|  +--------------------------------------------------------------+ |
|  | [!] Aanbevolen Tools - Hoog Risico gedetecteerd              | |
|  |                                                              | |
|  |  Dompelpomp      Rioolstop      Slangenwagen                 | |
|  |  Gasdetectiemeter   Hogedrukreiniger                         | |
|  |                                                              | |
|  |                      [Bestel Aanbevolen Tools]               | |
|  +--------------------------------------------------------------+ |
+------------------------------------------------------------------+
```

---

## 6.2 Risicoanalyse Pagina

### Doel

Volledige forecast voor de komende 5 jaar tonen per seizoen.

### Wireframe

```
+------------------------------------------------------------------+
| Risicoanalyse -- Forecast 2026-2031                              |
+------------------------------------------------------------------+
|                                                                  |
|  +----------+----------+----------+----------+----------+-----+  |
|  | Seizoen  |   2026   |   2027   |   2028   |   2029   | ... |  |
|  +----------+----------+----------+----------+----------+-----+  |
|  | Winter   |   HOOG   |   HOOG   |   GEM    |   HOOG   |     |  |
|  | Lente    |   GEM    |   LAAG   |   GEM    |   LAAG   |     |  |
|  | Zomer    |   LAAG   |   GEM    |   LAAG   |   GEM    |     |  |
|  | Herfst   |   HOOG   |   GEM    |   HOOG   |   HOOG   |     |  |
|  +----------+----------+----------+----------+----------+-----+  |
|                                                                  |
|  Legenda:  HOOG = boven drempel+10%   GEM = rond drempel        |
|            LAAG = onder drempel                                  |
+------------------------------------------------------------------+
```

---

## 6.3 Materialenlijst

### Doel

Volledig overzicht van beschikbare materialen met zoek- en filterfunctionaliteit.

### Wireframe

```
+------------------------------------------------------------------+
| Materialen                                  [+ Nieuw Materiaal]  |
+------------------------------------------------------------------+
|                                                                  |
|  Zoeken: [____________________]   Categorie: [Alle           v] |
|                                                                  |
|  Aanbevolen (Hoog Risico)                                        |
|  +----------------------+--------------------------------------+ |
|  | [!] Dompelpomp       | Categorie: Riolering    [Bestellen]  | |
|  | [!] Rioolstop        | Categorie: Riolering    [Bestellen]  | |
|  | [!] Slangenwagen     | Categorie: Riolering    [Bestellen]  | |
|  +----------------------+--------------------------------------+ |
|                                                                  |
|  Alle materialen                                                 |
|  +----------------------+--------------------------------------+ |
|  | Veiligheidshelm      | Categorie: PBM          [Bestellen]  | |
|  | Bout M8              | Categorie: Bevestiging  [Bestellen]  | |
|  +----------------------+--------------------------------------+ |
+------------------------------------------------------------------+
```

---

## 6.4 Bestelpagina

### Doel

Technieker kan materiaal selecteren, aantallen kiezen en een leverdatum opgeven.

### Wireframe

```
+------------------------------------------------------------------+
| Nieuwe Bestelling                                                |
+------------------------------------------------------------------+
|                                                                  |
|  Naam technieker: [________________________________]             |
|                                                                  |
|  Zoeken: [____________________]   Categorie: [Alle           v] |
|                                                                  |
|  +------------------------------------------------------------+  |
|  | [x] Dompelpomp          Aantal: [ 2 ]    [!] Aanbevolen   |  |
|  | [x] Rioolstop           Aantal: [ 1 ]    [!] Aanbevolen   |  |
|  | [ ] Veiligheidshelm     Aantal: [ 1 ]                      |  |
|  | [ ] Bout M8             Aantal: [ 1 ]                      |  |
|  +------------------------------------------------------------+  |
|                                                                  |
|  Leverdatum: [  2026-05-20  ]                                    |
|                                                                  |
|  Geselecteerd: 2 items                                           |
|                                                                  |
|                          [Annuleren]  [Bestelling Bevestigen]    |
+------------------------------------------------------------------+
```

---

## 6.5 Materiaalbeheer (Beheerder)

### Doel

Beheerder kan materialen toevoegen en verwijderen.

### Wireframe

```
+------------------------------------------------------------------+
| Materiaalbeheer                                                  |
+------------------------------------------------------------------+
|                                                                  |
|  Naam:      [________________________________]                   |
|  Categorie: [Selecteer categorie           v]                    |
|  Flood tool: [x] Relevant bij overstromingen                     |
|                                               [Toevoegen]        |
|                                                                  |
|  +------------------+--------------+-------+--------+--------+  |
|  | Naam             | Categorie    | Flood | Actief | Actie  |  |
|  +------------------+--------------+-------+--------+--------+  |
|  | Dompelpomp       | Riolering    | Ja    | Ja     | [X]    |  |
|  | Rioolstop        | Riolering    | Ja    | Ja     | [X]    |  |
|  | Veiligheidshelm  | PBM          | Nee   | Ja     | [X]    |  |
|  +------------------+--------------+-------+--------+--------+  |
+------------------------------------------------------------------+
```

---

# 7. UX Keuzes en Motivatie

## Weather dashboard pattern

Gebruikers herkennen direct de statusinformatie dankzij een vertrouwd visueel patroon. Kleurgecodeerde risico's (rood/oranje/groen) zijn universeel begrijpbaar.

## Action-oriented design

Elke pagina heeft een duidelijke primaire actie (bv. "Bestel Aanbevolen Tools"). De gebruiker hoeft niet te zoeken wat hij moet doen.

## Priority-based recommendations

Flood tools krijgen een visuele markering ([!]) en worden bovenaan geplaatst bij hoog risico. Dit vermindert de cognitieve belasting voor techniekers onder tijdsdruk.

## Soft delete voor materialen

Materialen worden niet echt verwijderd maar gedeactiveerd. Dit beschermt historische bestellingen en geeft de beheerder een vangnet.

---

# 8. Validatie en Feedback

| Situatie                  | Feedback aan gebruiker                    |
|---------------------------|-------------------------------------------|
| Bestelling zonder items   | "Selecteer minstens een materiaal"        |
| Bestelling zonder datum   | "Leverdatum is verplicht"                 |
| Datum in verleden         | "Kies een datum in de toekomst"           |
| Materiaal toegevoegd      | "Materiaal succesvol toegevoegd"          |
| Bestelling bevestigd      | "Bestelling geplaatst voor [datum]"       |
| Materiaal verwijderd      | "Materiaal gedeactiveerd"                 |

---

# 9. Conclusie

De UI combineert monitoring, forecasting en operationele acties in een centrale interface. Door het weather dashboard patroon te volgen en de kleurcodering consistent toe te passen, kan een technieker binnen enkele seconden de situatie beoordelen en actie ondernemen.