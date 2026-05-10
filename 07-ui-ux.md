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

Het doel is dat techniekers en beheerders snel en intuïtief kunnen reageren op risicoperiodes.

---

# 2. Gebruikers en hun noden

## Technieker

Prioriteiten:
- snel het huidige risico zien
- aanbevolen tools onmiddellijk kunnen bestellen
- eenvoudig materiaal opzoeken en bestellen

---

## Beheerder

Prioriteiten:
- materiaalcatalogus beheren
- overzicht van geplaatste bestellingen

---

# 3. Design Concept

De interface volgt een Weather Dashboard patroon, vergelijkbaar met een moderne weerapp.

| Weerapp concept   | Aquafin concept               |
|-------------------|-------------------------------|
| Huidig weer       | Huidig overstromingsrisico    |
| Weersvoorspelling | Risicoforecast komende 5 jaar |
| Waarschuwingen    | Risicowaarschuwingen          |
| Aanbevelingen     | Aanbevolen flood tools        |

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

# 5. Kleurgebruik

Risiconiveaus worden consistent gekleurd doorheen de hele applicatie: groen voor laag risico, oranje voor gemiddeld risico en rood voor hoog risico.

---

# 6. Schermen

## 6.1 Dashboard

### Doel

Binnen enkele seconden moet de gebruiker begrijpen:
- Is er momenteel risico?
- Wat komt er aan in de komende seizoenen?
- Welke tools zijn aanbevolen?
- Kan ik direct actie ondernemen?

### Wireframe

```
+------------------------------------------------------------------+
| [navigatie]                                                      |
+------------------------------------------------------------------+
|                                                                  |
|  [ Huidig Risico ]          [ Forecast Komende Seizoenen ]       |
|                                                                  |
|  [ Aanbevolen Tools bij verhoogd risico ]                        |
|                                                                  |
|  [ Actieknop ]                                                   |
|                                                                  |
+------------------------------------------------------------------+
```
---

## 6.2 Risicoanalyse Pagina

### Doel

Volledige forecast voor de komende 5 jaar tonen per seizoen.

### Wireframe

```
+------------------------------------------------------------------+
| [navigatie]                                                      |
+------------------------------------------------------------------+
|                                                                  |
|  [ Forecast tabel: seizoenen x jaren ]                           |
|                                                                  |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 6.3 Materialenlijst

### Doel

Volledig overzicht van beschikbare materialen met zoek- en filterfunctionaliteit.

### Wireframe

```
+------------------------------------------------------------------+
| [navigatie]                                                      |
+------------------------------------------------------------------+
|                                                                  |
|  [ Zoekbalk ]     [ Categoriefilter ]                            |
|                                                                  |
|  [ Aanbevolen tools bij verhoogd risico ]                        |
|                                                                  |
|  [ Volledige materiaallijst ]                                    |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 6.4 Bestelpagina

### Doel

Technieker kan materiaal selecteren, aantallen kiezen en een leverdatum opgeven.

### Wireframe

```
+------------------------------------------------------------------+
| [navigatie]                                                      |
+------------------------------------------------------------------+
|                                                                  |
|  [ Naam technieker ]                                             |
|                                                                  |
|  [ Zoekbalk ]     [ Categoriefilter ]                            |
|                                                                  |
|  [ Materiaallijst met selectie en aantallen ]                    |
|                                                                  |
|  [ Leverdatum ]                                                  |
|                                                                  |
|  [ Bevestigingsknop ]                                            |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 6.5 Materiaalbeheer

### Doel

Beheerder kan materialen toevoegen en verwijderen.

### Wireframe

```
+------------------------------------------------------------------+
| [navigatie]                                                      |
+------------------------------------------------------------------+
|                                                                  |
|  [ Formulier: naam, categorie, flood tool markering ]            |
|                                                                  |
|  [ Materiaallijst met deactiveerknop ]                           |
|                                                                  |
+------------------------------------------------------------------+
```

---

# 7. UX Keuzes en Motivatie

## Weather dashboard pattern

Gebruikers herkennen direct de statusinformatie dankzij een vertrouwd visueel patroon. Kleurgecodeerde risico's zijn universeel begrijpbaar.

## Action-oriented design

Elke pagina heeft een duidelijke primaire actie. De gebruiker hoeft niet te zoeken wat hij moet doen.

## Priority-based recommendations

Flood tools krijgen een visuele markering en worden bovenaan geplaatst bij verhoogd risico. Dit vermindert de cognitieve belasting voor techniekers onder tijdsdruk.

---

# 8. Validatie en Feedback

| Situatie                | Feedback aan gebruiker                  |
|-------------------------|-----------------------------------------|
| Bestelling zonder items | "Selecteer minstens een materiaal"      |
| Bestelling zonder datum | "Leverdatum is verplicht"               |
| Datum in verleden       | "Kies een datum in de toekomst"         |
| Materiaal toegevoegd    | "Materiaal succesvol toegevoegd"        |
| Bestelling bevestigd    | "Bestelling geplaatst voor [datum]"     |
| Materiaal verwijderd    | "Materiaal verwijderd"               |

---

# 9. Conclusie

De UI combineert monitoring, forecasting en operationele acties in een centrale interface. Door het weather dashboard patroon te volgen en de kleurcodering consistent toe te passen, kan een technieker binnen enkele seconden de situatie beoordelen en actie ondernemen.