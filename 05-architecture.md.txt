# Architecture

## Projectnaam
Aquafin Smart Maintenance Platform

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

De applicatie volgt een klassieke **3-lagenarchitectuur** (Three-Tier Architecture):

```text
┌─────────────────────────────────┐
│         Presentatielaag         │  React (Frontend)
├─────────────────────────────────┤
│          Businesslaag           │  Node.js + Express (Backend API)
│  ┌──────────┐  ┌─────────────┐  │
│  │   Risk   │  │Recommenda-  │  │
│  │ Analysis │  │tion Engine  │  │
│  └──────────┘  └─────────────┘  │
│  ┌──────────┐  ┌─────────────┐  │
│  │ Material │  │   Order     │  │
│  │  Mgmt    │  │   Mgmt      │  │
│  └──────────┘  └─────────────┘  │
├─────────────────────────────────┤
│           Datalaag              │  SQLite (Database)
└─────────────────────────────────┘
```

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

**React**

Keuze gemotiveerd door:
- componentgebaseerde opbouw: elk scherm is een herbruikbaar component
- efficiënte rendering bij dataupdates
- breed ondersteuning en documentatie
- geschikt voor responsive webapplicaties

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

**Node.js + Express**

Keuze gemotiveerd door:
- zelfde taal als frontend (JavaScript), wat de leercurve beperkt
- eenvoudig REST API's bouwen met Express
- goede integratie met SQLite via npm-packages

---

# 5. Database

## Keuze: SQLite

Voor dit project wordt **SQLite** gebruikt als database.

### Motivatie

| Criterium | SQLite | MySQL |
|---|---|---|
| Serverinstallatie nodig | Nee | Ja |
| Geschikt voor individueel project | Ja | Overkill |
| Integratie met Node.js | Eenvoudig (better-sqlite3) | Vereist extra configuratie |
| Bestandsgebaseerd | Ja (1 .db bestand) | Nee |
| Performantie voor deze schaal | Voldoende | Voldoende |

SQLite is de meest pragmatische keuze voor een individueel project zonder aparte serverinfrastructuur. De database leeft als één bestand in de projectmap en vereist geen externe installatie.

## Inhoud

De database bevat:
- materialen en categorieën
- bestellingen en orderregels
- historische neerslaggegevens (seed data)

---

# 6. Modules

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

### Seizoensdrempels uit de opdracht

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
  => toon alle materialen met isFloodTool = true bovenaan
  => markeer met visuele badge
  
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

## 6.3 Material Management Module

**Verantwoordelijkheid:** CRUD-operaties op materialen en categorieën.

Functionaliteiten:
- opvragen van alle materialen (gefilterd op actief/inactief)
- toevoegen van nieuw materiaal
- deactiveren van materiaal (soft delete)
- categoriseren en filteren
- zoeken op naam

---

## 6.4 Order Management Module

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
  Season Aggregation
  (groepeer per seizoen)
         ↓
  Trend Calculation
  (lineaire regressie)
         ↓
  Threshold Comparison
  (vergelijk met drempelwaarden)
         ↓
  Risk Level toekenning
  (Laag/Gemiddeld/Hoog)
         ↓
  Frontend Dashboard
  (visualisatie per seizoen)
```

---

## Slimme Aanbevelingen

```text
Risk Level (van Risk Analysis Engine)
         ↓
  Recommendation Engine
  (regel-gebaseerde logica)
         ↓
  Filter: isFloodTool = true
         ↓
  Frontend Aanbevelingssectie
  (gesorteerd bovenaan bij hoog risico)
```

---

## Bestellingen

```text
Technieker selecteert materialen + leverdatum
         ↓
  Frontend validatie
  (datum aanwezig? items geselecteerd?)
         ↓
  POST /api/orders
         ↓
  Backend validatie
  (datum in toekomst? geldige materiaal-IDs?)
         ↓
  Database opslag
  (Order + OrderItems)
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
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── RiskAnalysis.jsx
│   │   │   ├── MaterialList.jsx
│   │   │   └── OrderForm.jsx
│   │   ├── App.jsx
│   │   └── index.js
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── materials.js
│   │   │   ├── orders.js
│   │   │   └── risk.js
│   │   ├── engines/
│   │   │   ├── riskAnalysis.js
│   │   │   └── recommendations.js
│   │   ├── db/
│   │   │   ├── database.js
│   │   │   └── seed.js
│   │   └── app.js
│   └── package.json
│
├── docs/
│   └── (alle .md documentatiebestanden)
│
└── README.md
```

---

# 10. Technologieënoverzicht

| Laag | Technologie | Versie | Motivatie |
|---|---|---|---|
| Frontend | React | 18.x | Componentgebaseerd, breed gebruikt |
| Backend | Node.js | 20.x LTS | Zelfde taal als frontend |
| API Framework | Express | 4.x | Eenvoudig en lichtgewicht |
| Database | SQLite | 3.x | Geen serverinstallatie nodig |
| Version Control | Git + GitHub | - | Versiebeheer en documentatie |

---

# 11. Conclusie

De gekozen architectuur is modulair, eenvoudig op te zetten en goed schaalbaar voor de scope van dit project. De keuze voor SQLite elimineert onnodige infrastructuurcomplexiteit voor een individueel project. De scheiding tussen frontend, backend en database zorgt voor onderhoudbaarheid en maakt het mogelijk elke laag onafhankelijk te testen.