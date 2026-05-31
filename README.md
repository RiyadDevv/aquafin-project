# Aquafin Technieker Platform

Webapplicatie voor overstromingsrisicoanalyse, materiaalbeheer en bestellingen voor Aquafin-techniekers.

---

## Vereisten

- Node.js (v18 of hoger): https://nodejs.org
- Git

---

## Installatie en opstarten

### 1. Repository clonen

    git clone https://github.com/RiyadDevv/aquafin-project.git
    cd aquafin-project

### 2. Backend opstarten

Open een terminal en voer uit:

    cd backend
    npm install
    node db/seed.js
    npm start

De backend draait op http://localhost:5000

### 3. Frontend opstarten

Open een tweede terminal en voer uit:

    cd frontend
    npm install
    npm start

De applicatie opent automatisch op http://localhost:3000

---

## Functionaliteiten

- **Dashboard** - huidig overstromingsrisico + forecast komende seizoenen + flood tools bij verhoogd risico
- **Risicoanalyse** - forecast tabel per seizoen met kleurcodering (huidig jaar + 5 jaar)
- **Materialen** - catalogus met zoek- en filterfunctie + flood tools bovenaan bij verhoogd risico
- **Bestellen** - materiaal bestellen met leverdatum en validatie
- **Beheer** - materialen toevoegen en deactiveren met toast feedback

---

## Technologieën

| Laag | Technologie |
|---|---|
| Frontend | React 18 |
| Backend | Node.js + Express + Nodemon |
| Database | SQLite (better-sqlite3) |

---

## Projectdocumentatie

Alle analysedocumenten staan in de /docs map:

- 00-project-plan.md - projectplan
- 01-project-overview.md - probleemstelling en doelstellingen
- 02-business-analysis.md - businessanalyse + BPMN
- 03-requirements.md - functionele en non-functionele requirements
- 04-user-stories.md - user stories met acceptatiecriteria
- 05-architecture.md - architectuur en dataflow
- 06-data-model.md - datamodel en ERD
- 07-ui-ux.md - UI/UX design en wireframes
- 08-testing.md - testplan en testresultaten