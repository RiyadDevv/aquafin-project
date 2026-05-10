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

**Node.js + Express** is gekozen omdat het dezelfde taal gebruikt als de frontend (JavaScript), en omdat Express eenvoudig REST API's mogelijk maakt.

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
Stap 3: Bereken gemiddelde neerslag per seizoen
Stap 4: Bereken trend (lineaire regressie over de jaren)
Stap 5: Projecteer trendlijn voor de komende 5 jaar
Stap 6: Vergelijk voorspelde waarde met seizoensdrempel
Stap 7: Ken risiconiveau toe
```

### Seizoensdrempels

| Seizoen | Maanden | Drempel (mm) |
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

**Verantwoordelijkheid:** op basis van het risiconiveau relevante materialen aanbevelen.

### Logica

```text
IF risiconiveau == "Hoog"
  => toon flood tools bovenaan met visuele markering

ELSE IF risiconiveau == "Gemiddeld"
  => toon flood tools in een aparte "Aanbevolen" sectie

ELSE (Laag)
  => toon normale materiaallijst zonder prioritering
```

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
- toevoegen van nieuw materiaal
- deactiveren van materiaal (soft delete)
- zoeken en filteren op categorie

---

## 6.4 Order Management

**Verantwoordelijkheid:** aanmaken en opslaan van bestellingen.

Functionaliteiten:
- aanmaken van een bestelling met technieker, leverdatum en items
- validatie van invoer (leverdatum verplicht, minimaal 1 item)
- opslaan van orderregels per bestelling

---

# 7. Dataflow Diagrammen

## Risicoanalyse

```text
Historische neerslagdata (database)
         ↓
  Seizoensgroepering
         ↓
  Trendberekening (lineaire regressie)
         ↓
  Vergelijking met drempelwaarden
         ↓
  Risiconiveau (Laag / Gemiddeld / Hoog)
         ↓
  Frontend Dashboard
```

---

## Slimme Aanbevelingen

```text
Risiconiveau (van Risk Analysis Engine)
         ↓
  Recommendation Engine
         ↓
  Flood tools gefilterd en geprioriteerd
         ↓
  Frontend Aanbevelingssectie
```

---

## Bestellingen

```text
Technieker selecteert materialen + leverdatum
         ↓
  Frontend validatie
         ↓
  POST /api/orders
         ↓
  Backend validatie
         ↓
  Database opslag
         ↓
  Frontend bevestiging
```

---

# 8. REST API Overzicht

| Endpoint | Methode | Beschrijving |
|---|---|---|
| `/api/materials` | GET | Alle actieve materialen ophalen |
| `/api/materials` | POST | Nieuw materiaal toevoegen |
| `/api/materials/:id` | DELETE | Materiaal deactiveren |
| `/api/categories` | GET | Alle categorieën ophalen |
| `/api/orders` | GET | Alle bestellingen ophalen |
| `/api/orders` | POST | Nieuwe bestelling aanmaken |
| `/api/risk/forecast` | GET | Risicoforecast voor 5 jaar ophalen |
| `/api/recommendations` | GET | Aanbevolen tools ophalen |

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
| Database | SQLite | 3.x |
| Version Control | Git + GitHub | - |

---

# 11. Conclusie

De gekozen architectuur is modulair, eenvoudig op te zetten en schaalbaar voor de scope van dit project. De scheiding tussen frontend, backend en database zorgt voor onderhoudbaarheid en maakt het mogelijk elke laag onafhankelijk te testen.