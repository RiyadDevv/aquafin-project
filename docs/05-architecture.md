# Architecture

## Projectnaam
Aquafin Technieker Platform

---

# 1. Doel

Dit document beschrijft de technische architectuur van de applicatie.

De architectuur documenteert:
- hoe de applicatie is opgebouwd
- welke componenten samenwerken
- hoe data door het systeem stroomt
- welke technische keuzes gemaakt zijn en waarom

---

# 2. Architectuur Overzicht

De applicatie volgt een klassieke 3-lagenarchitectuur:

```text
┌─────────────────────────────────┐
│         Presentatielaag         │  React (Frontend)
├─────────────────────────────────┤
│          Businesslaag           │  Node.js + Express (Backend API)
├─────────────────────────────────┤
│           Datalaag              │  SQLite (Database)
└─────────────────────────────────┘
```

De drie lagen zijn bewust gescheiden zodat elke laag onafhankelijk aangepast kan worden.

---

# 3. Frontend

De frontend is de gebruikersinterface waarmee techniekers en beheerders interageren.

## Verantwoordelijkheden

- tonen van het dashboard
- visualiseren van risicoanalyse en voorspellingen
- tonen van aanbevolen tools
- beheren en bestellen van materialen
- communiceren met de backend via REST API calls

## Technologie

**React** is gekozen omdat het componentgebaseerd werkt (i.e. elk scherm is een herbruikbaar component) en omdat het breed gedocumenteerd is en goed geschikt voor dashboard-applicaties.

---

# 4. Backend

De backend bevat alle businesslogica en stelt een REST API ter beschikking.

## Verantwoordelijkheden

- verwerken van API-verzoeken van de frontend
- uitvoeren van risicoberekeningen
- genereren van aanbevelingen
- beheren van materialen en bestellingen
- valideren van invoer

## Technologie

**Node.js + Express** is gekozen omdat het dezelfde taal gebruikt als de frontend (JavaScript), en omdat Express eenvoudig REST API's mogelijk maakt. **Nodemon** wordt gebruikt tijdens development zodat de server automatisch herstart bij wijzigingen (`npm start`).

---

# 5. Database

## Technologie

**SQLite** is gekozen omdat het geen serverinstallatie vereist en als één bestand in de projectmap leeft. Voor een individueel project is dit de meest pragmatische keuze; er is geen externe infrastructuur nodig.

## Inhoud

De database bevat:
- materialen en categorieën
- bestellingen en orderregels
- historische neerslaggegevens (seed data)

---

# 6. Technische Componenten

## 6.1 Risk Analysis Engine

**Verantwoordelijkheid:** het berekenen van seizoensgebonden neerslagverwachtingen en het bepalen van het risiconiveau.

### Algoritme

```text
Stap 1: Laad historische neerslagdata (2004-2025)
Stap 2: Groepeer per seizoen (Winter/Lente/Zomer/Herfst)
Stap 3: Bereken totale neerslag per seizoen per jaar
Stap 4: Bereken trend (lineaire regressie over de jaren)
Stap 5: Projecteer trendlijn voor het huidig jaar + de komende 5 jaar
Stap 6: Vergelijk voorspelde waarde met seizoensdrempel
Stap 7: Ken risiconiveau toe
```

> **Opmerking seizoensgroepering:** December wordt toegewezen aan het winterseizoen van het volgende jaar (bv. december 2024 → Winter 2025). Dit zorgt voor een correcte groepering van de meteorologische winter.

### Seizoensdrempels

| Seizoen | Maanden | Drempel (mm/seizoen) |
|---|---|---|
| Winter | December, Januari, Februari | 300 mm |
| Lente | Maart, April, Mei | 250 mm |
| Zomer | Juni, Juli, Augustus | 260 mm |
| Herfst | September, Oktober, November | 280 mm |

### Risicoklassificatie

| Risiconiveau | Conditie |
|---|---|
| Laag | Voorspelde neerslag < drempel |
| Gemiddeld | Voorspelde neerslag tussen drempel en drempel + 10% |
| Hoog | Voorspelde neerslag > drempel + 10% |

---

## 6.2 Recommendation Engine

**Verantwoordelijkheid:** op basis van het risiconiveau van het huidige seizoen relevante materialen aanbevelen voor de Materialen pagina.

### Logica

```text
IF risiconiveau == "Hoog" OF "Gemiddeld"
  => toon flood tools bovenaan de materiaallijst met visuele markering

ELSE (Laag)
  => toon normale materiaallijst zonder prioritering
```

> **Opmerking:** De Recommendation Engine wordt enkel gebruikt door de Materialen pagina via `/api/recommendations`. Het Dashboard berekent het risiconiveau zelf op basis van de forecast data en het geselecteerde seizoen.

### Voorbeelden van flood tools

- Dompelpompen
- Rioolstoppen
- Slangenwagens
- Gasdetectiemeters
- Hogedrukreinigers
- Ontstoppingsveren

---

## 6.3 Material Management

**Verantwoordelijkheid:** beheren van materialen en categorieën.

Functionaliteiten:
- opvragen van alle actieve materialen
- toevoegen van nieuw materiaal (met duplicaatcontrole op actieve materialen)
- deactiveren van materiaal (soft delete)
- zoeken en filteren op categorie

---

## 6.4 Order Management

**Verantwoordelijkheid:** aanmaken en opslaan van bestellingen.

Functionaliteiten:
- aanmaken van een bestelling met technieker, leverdatum en items
- validatie van invoer (naam verplicht, leverdatum verplicht en in toekomst, minimaal 1 item)
- opslaan van orderregels per bestelling

---

# 7. Dataflow Diagrammen

## Risicoanalyse

```text
Historische neerslagdata (database)
         ↓
  Seizoensgroepering (totaal per seizoen per jaar)
         ↓
  Trendberekening (lineaire regressie)
         ↓
  Vergelijking met drempelwaarden
         ↓
  Risiconiveau per seizoen (Laag / Gemiddeld / Hoog)
         ↓
  Frontend: Dashboard (klikbare seizoenskaarten) + Risicoanalyse pagina (tabel)
```

---

## Dashboard — Seizoensoverzicht en Flood Tools

```text
GET /api/risk/forecast + GET /api/materials
         ↓
  Frontend Dashboard
         ↓
  4 klikbare seizoenskaarten (huidig seizoen gemarkeerd met "Huidig" badge)
         ↓
  Gebruiker klikt op een seizoenskaart
         ↓
  Frontend berekent risiconiveau van geselecteerd seizoen
         ↓
  Hoog/Gemiddeld → Flood tools sectie zichtbaar
  Laag           → Bericht "Geen verhoogd overstromingsrisico"
```

---

## Slimme Aanbevelingen — Materialen pagina

```text
GET /api/recommendations (Recommendation Engine op basis van huidig seizoen)
         ↓
  Risiconiveau huidig seizoen
         ↓
  Hoog/Gemiddeld → Flood tools bovenaan materiaallijst met "Flood Tool" badge
  Laag           → Normale materiaallijst zonder prioritering
```

---

## Bestellingen

```text
Technieker selecteert materialen + leverdatum
         ↓
  Frontend validatie (toast bij fout)
         ↓
  POST /api/orders
         ↓
  Backend validatie
         ↓
  Database opslag
         ↓
  Frontend toast bevestiging: "Bestelling geplaatst voor [datum]!"
```

---

# 8. REST API Overzicht

| Endpoint | Methode | Gebruikt door | Beschrijving |
|---|---|---|---|
| `/api/materials` | GET | Materialen, Bestellen, Beheer, Dashboard | Alle actieve materialen ophalen |
| `/api/materials` | POST | Beheer | Nieuw materiaal toevoegen |
| `/api/materials/:id` | DELETE | Beheer | Materiaal deactiveren (soft delete) |
| `/api/categories` | GET | Bestellen, Beheer | Alle categorieën ophalen |
| `/api/orders` | GET | — | Alle bestellingen ophalen |
| `/api/orders` | POST | Bestellen | Nieuwe bestelling aanmaken |
| `/api/risk/forecast` | GET | Dashboard, RisicoAnalyse | Risicoforecast ophalen (huidig jaar + 5 jaar) |
| `/api/recommendations` | GET | Materialen | Aanbevolen tools ophalen op basis van huidig seizoen |

---

# 9. Projectstructuur

```text
aquafin-platform/
├── frontend/     (gebruikersinterface)
├── backend/      (API en businesslogica)
│   └── db/       (database en seed data)
├── docs/         (documentatie)
└── README.md
```

---

# 10. Technologieënoverzicht

| Laag | Technologie | Versie |
|---|---|---|
| Frontend | React | 18.x |
| Backend | Node.js | 20.x LTS |
| API Framework | Express | 4.x |
| Dev Server | Nodemon | - |
| Database | SQLite (better-sqlite3) | 3.x |
| Version Control | Git + GitHub | - |

---

# 11. Conclusie

De gekozen architectuur is modulair, eenvoudig op te zetten en schaalbaar voor de scope van dit project. De scheiding tussen frontend, backend en database zorgt voor onderhoudbaarheid en maakt het mogelijk elke laag onafhankelijk te testen.