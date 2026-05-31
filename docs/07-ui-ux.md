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
- aanbevolen tools onmiddellijk kunnen bekijken
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
| Weersvoorspelling | Risicoforecast komende jaren  |
| Waarschuwingen    | Risicowaarschuwingen          |
| Aanbevelingen     | Aanbevolen flood tools        |

---

# 4. Navigatiestructuur

```text
Aquafin Technieker Platform
│
├── Dashboard       (startpagina, klikbare seizoenskaarten + flood tools)
├── Risicoanalyse   (forecast tabel per seizoen)
├── Materialen      (catalogus, zoeken, filteren, flood tools aanbeveling)
├── Bestellen       (bestelling plaatsen)
└── Beheer          (toevoegen, verwijderen - beheerder)
```

---

# 5. Kleurgebruik

Risiconiveaus worden consistent gekleurd doorheen de hele applicatie:
- **Groen** (#2a9d8f) voor laag risico
- **Oranje** (#f4a261) voor gemiddeld risico
- **Rood** (#e63946) voor hoog risico

---

# 6. Schermen

## 6.1 Dashboard

### Doel

De gebruiker ziet direct een overzicht van alle 4 seizoenen. Door op een seizoenskaart te klikken wordt het risiconiveau van dat seizoen getoond, samen met de relevante flood tools indien van toepassing. Het huidige seizoen is gemarkeerd met een "Huidig" badge.

### Wireframe

```
+------------------------------------------------------------------+
| [navigatie]                                                      |
+------------------------------------------------------------------+
|                                                                  |
|  Seizoensoverzicht                                               |
|  [ Winter ]  [ Lente* ]  [ Zomer ]  [ Herfst ]                   |
|  *huidig seizoen heeft "Huidig" badge, klikbaar                  |
|                                                                  |
|  [  Aanbevolen Flood Tools ] (bij hoog/gemiddeld risico)         |
|  OF                                                              |
|  [ Geen verhoogd overstromingsrisico ] (bij laag risico)         |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 6.2 Risicoanalyse Pagina

### Doel

Forecast tonen per seizoen voor het huidig jaar en de komende 5 jaar.

### Wireframe

```
+------------------------------------------------------------------+
| [navigatie]                                                      |
+------------------------------------------------------------------+
|                                                                  |
|  [ Forecast tabel: seizoenen x jaren, kleurgecodeerd ]           |
|  [ Risiconiveau + voorspelde neerslag in mm per cel ]            |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 6.3 Materialenlijst

### Doel

Volledig overzicht van beschikbare materialen met zoek- en filterfunctionaliteit. Flood tools worden bovenaan geplaatst bij verhoogd risico op basis van het huidig seizoen (via `/api/recommendations`).

### Wireframe

```
+------------------------------------------------------------------+
| [navigatie]                                                      |
+------------------------------------------------------------------+
|                                                                  |
|  [ Zoekbalk ]     [ Categoriefilter ]                            |
|                                                                  |
|  [  Aanbevolen Flood Tools - enkel bij hoog/gemiddeld risico ]   |
|  [ met oranje "Flood Tool" badge markering ]                     |
|                                                                  |
|  [ Alle Materialen ]                                             |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 6.4 Bestelpagina

### Doel

Technieker kan materiaal selecteren, aantallen kiezen en een leverdatum opgeven. Alle feedback (fouten en bevestiging) verloopt via toast meldingen.

### Wireframe

```
+------------------------------------------------------------------+
| [navigatie]                                                      |
+------------------------------------------------------------------+
|                                                                  |
|  [ Naam technieker ]   [ Leverdatum ]                            |
|                                                                  |
|  [ Zoekbalk ]     [ Categoriefilter ]                            |
|                                                                  |
|  [ Materiaallijst met aantallen ]                                |
|                                                                  |
|  [ Bestelling Bevestigen knop ] (sticky onderaan)                |
|                                                                  |
+------------------------------------------------------------------+
```

---

## 6.5 Materiaalbeheer

### Doel

Beheerder kan materialen toevoegen en deactiveren. Alle feedback verloopt via toast meldingen (rechtsonder).

### Wireframe

```
+------------------------------------------------------------------+
| [navigatie]                                                      |
+------------------------------------------------------------------+
|                                                                  |
|  [ Formulier: naam, categorie, flood tool markering ]            |
|  [ Toevoegen knop ]                                              |
|                                                                  |
|  [ Actieve Materialen tabel met Deactiveren knop ]               |
|                                                                  |
+------------------------------------------------------------------+
```

---

# 7. UX Keuzes en Motivatie

## Weather dashboard pattern

Gebruikers herkennen direct de statusinformatie dankzij een vertrouwd visueel patroon. Kleurgecodeerde risico's zijn universeel begrijpbaar.

## Interactieve seizoenskaarten

Het dashboard toont 4 klikbare seizoenskaarten. Door op een kaart te klikken ziet de gebruiker de flood tools die relevant zijn voor dat seizoen. Het huidig seizoen is standaard geselecteerd en krijgt een "Huidig" badge. Dit geeft de technieker zowel een onmiddellijk overzicht als de mogelijkheid om vooruit te plannen.

## Priority-based recommendations

Op de Materialen pagina worden flood tools bovenaan geplaatst bij verhoogd risico (op basis van het huidig seizoen) met een oranje "Flood Tool" badge. Dit vermindert de cognitieve belasting voor techniekers onder tijdsdruk.

## Toast notificaties

Alle feedback aan de gebruiker verloopt via toast meldingen (rechtsonder, verdwijnen automatisch na 3,5 seconden). Dit geldt voor zowel de Beheer pagina als de Bestellen pagina. Toast meldingen zijn minder intrusief dan inline alerts en onderbreken de workflow niet.

---

# 8. Validatie en Feedback

| Situatie | Type | Feedback aan gebruiker |
|---|---|---|
| Bestelling zonder naam technieker | Toast fout | "Naam technieker is verplicht." |
| Bestelling zonder items | Toast fout | "Selecteer minstens één materiaal." |
| Bestelling zonder datum | Toast fout | "Leverdatum is verplicht." |
| Datum in verleden | Toast fout | "Kies een datum in de toekomst." |
| Bestelling bevestigd | Toast succes | "Bestelling geplaatst voor [datum]!" |
| Materiaal toegevoegd | Toast succes | "[naam] succesvol toegevoegd." |
| Materiaal gedeactiveerd | Toast succes | "[naam] gedeactiveerd." |
| Duplicaat materiaalnaam | Toast fout | "Materiaal met deze naam bestaat al." |

---

# 9. Conclusie

De UI combineert monitoring, forecasting en operationele acties in een centrale interface. Door het weather dashboard patroon te volgen, interactieve seizoenskaarten te gebruiken en de kleurcodering consistent toe te passen, kan een technieker binnen enkele seconden de situatie beoordelen en actie ondernemen.