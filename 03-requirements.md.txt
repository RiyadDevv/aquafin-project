# Requirements

## Projectnaam
Aquafin Smart Maintenance Platform

---

# 1. Introductie

Dit document beschrijft de functionele en non-functionele requirements van de Aquafin Smart Maintenance Platform applicatie.

De requirements definiëren:
- welke functionaliteiten het systeem moet bevatten
- welke kwaliteitsvoorwaarden van toepassing zijn
- welke technische verplichtingen gelden

Elke functionele requirement is gekoppeld aan de user story die hem motiveert (**traceability**). Dit laat toe om tijdens de testfase te verifiëren of alle user stories correct geïmplementeerd zijn.

---

# 2. Functional Requirements

## 2.1 Risicoanalyse

### FR-01 - Historische data verwerken
Het systeem moet de historische KMI-neerslaggegevens (2004–2025) kunnen inladen en opslaan als seed data.

*Gelinkt aan: US-05, US-06*

---

### FR-02 - Seizoensgroepering
Het systeem moet neerslaggegevens correct groeperen per seizoen:
- Winter: december, januari, februari
- Lente: maart, april, mei
- Zomer: juni, juli, augustus
- Herfst: september, oktober, november

*Gelinkt aan: US-05, US-06*

---

### FR-03 - Seizoensneerslag berekenen
Het systeem moet de totale neerslag per seizoen berekenen op basis van de maandelijkse meetwaarden.

*Gelinkt aan: US-05, US-06*

---

### FR-04 - Risicoforecast genereren
Het systeem moet op basis van historische neerslagdata en een trendberekening (lineaire regressie) overstromingsrisico's voorspellen voor de komende 5 jaar, per seizoen.

*Gelinkt aan: US-05, US-06*

---

### FR-05 - Risicoklassificatie
Het systeem moet elk voorspeld seizoen classificeren als:
- **Laag**: voorspelde neerslag onder de seizoensdrempel
- **Gemiddeld**: voorspelde neerslag tussen drempel en drempel + 10%
- **Hoog**: voorspelde neerslag boven drempel + 10%

Seizoensdrempels (conform de opdracht):

| Seizoen | Drempel |
|---|---|
| Winter | 300 mm |
| Lente | 250 mm |
| Zomer | 260 mm |
| Herfst | 280 mm |

*Gelinkt aan: US-05, US-06*

---

### FR-06 - Risico visueel weergeven
Het systeem moet het risiconiveau per seizoen visueel tonen via kleurcodering (groen / oranje / rood).

*Gelinkt aan: US-05, US-06*

---

## 2.2 Materiaalbeheer

### FR-07 - Materialen weergeven
Het systeem moet alle actieve materialen tonen, gesorteerd per categorie.

*Gelinkt aan: US-03*

---

### FR-08 - Materialen zoeken en filteren
Het systeem moet gebruikers toelaten te zoeken op naam en te filteren op categorie.

*Gelinkt aan: US-03*

---

### FR-09 - Materiaal toevoegen
Het systeem moet een beheerder toelaten nieuwe materialen toe te voegen met naam, categorie en flood tool markering.

*Gelinkt aan: US-08*

---

### FR-10 - Materiaal deactiveren
Het systeem moet een beheerder toelaten materialen te deactiveren (soft delete), zodat ze niet meer zichtbaar zijn in de catalogus maar historische bestellingen intact blijven.

*Gelinkt aan: US-09*

---

### FR-11 - Materialen categoriseren
Het systeem moet materialen indelen in categorieën en filteren op categorie ondersteunen.

*Gelinkt aan: US-10*

---

## 2.3 Bestellingen

### FR-12 - Bestelling aanmaken
Het systeem moet een technieker toelaten een bestelling aan te maken met naam, geselecteerde materialen en leverdatum.

*Gelinkt aan: US-01*

---

### FR-13 - Leverdatum opslaan en valideren
Het systeem moet de leverdatum opslaan bij de bestelling. De datum moet verplicht zijn en in de toekomst liggen.

*Gelinkt aan: US-02*

---

### FR-14 - Meerdere materialen per bestelling
Het systeem moet toelaten dat één bestelling meerdere materialen bevat, elk met een eigen hoeveelheid.

*Gelinkt aan: US-01*

---

### FR-15 - Validatie bij bevestiging
Het systeem moet bij het bevestigen van een bestelling controleren of:
- minstens één materiaal geselecteerd is
- een geldige leverdatum opgegeven is

Bij een fout wordt een duidelijke foutmelding getoond.

*Gelinkt aan: US-01, US-02*

---

## 2.4 Slimme Aanbevelingen

### FR-16 — Risicoperiodes detecteren
Het systeem moet automatisch detecteren of het huidige of komende seizoen een verhoogd overstromingsrisico heeft.

*Gelinkt aan: US-04, US-07*

---

### FR-17 - Flood tools aanbevelen
Het systeem moet tijdens een periode met hoog of gemiddeld risico de materialen met `isFloodTool = true` automatisch prioriteren.

*Gelinkt aan: US-04, US-07*

---

### FR-18 - Aanbevolen tools visueel markeren
Het systeem moet aanbevolen tools bovenaan de materiaallijst tonen met een duidelijke visuele markering (badge of ster).

*Gelinkt aan: US-04*

---

## 2.5 Gebruikersinterface

### FR-19 - Dashboard
Het systeem moet een dashboard bevatten dat toont:
- het risiconiveau van het huidige seizoen
- een beknopt overzicht van de komende seizoenen
- de aanbevolen tools bij verhoogd risico

*Gelinkt aan: US-05*

---

### FR-20 - Risicoanalyse pagina
Het systeem moet een aparte pagina bevatten met de volledige forecast voor de komende 5 jaar, per seizoen en per jaar.

*Gelinkt aan: US-06*

---

### FR-21 - Materiaallijst pagina
Het systeem moet een overzichtelijke materiaallijst tonen met zoek-, filter- en bestelopties.

*Gelinkt aan: US-03, US-04*

---

### FR-22 - Bestelpagina
Het systeem moet een bestelpagina bevatten waarop een technieker materialen kan selecteren, aantallen opgeven en een leverdatum instellen.

*Gelinkt aan: US-01, US-02*

---

### FR-23 - Beheerderspagina
Het systeem moet een beheerderspagina bevatten voor het toevoegen en deactiveren van materialen.

*Gelinkt aan: US-08, US-09, US-10*

---

# 3. Non-Functional Requirements

## 3.1 Gebruiksvriendelijkheid

### NFR-01 - Directe feedback
De applicatie geeft bij elke gebruikersactie zichtbare feedback: een bevestigingsmelding bij een geslaagde bestelling, een foutmelding bij een ongeldige invoer.

---

### NFR-02 - Overzichtelijk dashboard
Het risiconiveau van het huidige seizoen moet zichtbaar zijn zonder te scrollen, zodat een technieker de situatie onmiddellijk beoordeelt bij het openen van de applicatie.

---

### NFR-03 - Aanbevelingen zonder extra stappen
Aanbevolen flood tools worden automatisch bovenaan geplaatst bij verhoogd risico, zonder dat de gebruiker daarvoor een extra actie moet ondernemen.

---

## 3.2 Betrouwbaarheid

### NFR-04 - Correcte risicoberekening
De risicoforecast moet consistent dezelfde resultaten geven bij dezelfde inputdata. De berekening is gebaseerd op de seizoensdrempels uit de opdracht.

---

### NFR-05 - Validatie van invoer
Het systeem weigert ongeldige bestellingen (geen datum, geen items, datum in het verleden) en informeert de gebruiker met een duidelijke melding.

---

## 3.3 Compatibiliteit

### NFR-06 - Browserondersteuning
De applicatie werkt correct in moderne browsers: Chrome, Firefox en Edge (meest recente versies).

---

### NFR-07 - Responsief design
De applicatie is bruikbaar op zowel desktop als mobiele schermen. De lay-out past zich aan aan de schermgrootte.

---

## 3.4 Onderhoudbaarheid

### NFR-08 - Modulaire code
De applicatie is opgebouwd uit duidelijk afgebakende modules (Risk Engine, Recommendation Engine, Material Management, Order Management) die onafhankelijk aangepast kunnen worden.

---

### NFR-09 - Gedocumenteerde code
Functies en modules worden voorzien van korte commentaar zodat de werking begrijpbaar is zonder de documentatie erbij te raadplegen.

---

### NFR-10 - Versiebeheer
Alle code en documentatie worden bijgehouden in een GitHub repository met betekenisvolle commit messages per afgewerkte functionaliteit.

---

# 4. Technische Requirements

### TR-01 — Webgebaseerde frontend
De applicatie beschikt over een webgebaseerde React frontend die toegankelijk is via een browser.

---

### TR-02 - REST API backend
De businesslogica (risicoanalyse, aanbevelingen, materiaalbeheer, bestellingen) wordt verwerkt door een Node.js + Express backend die een REST API aanbiedt.

---

### TR-03 - Persistente dataopslag
Materialen, categorieën, bestellingen en neerslagdata worden persistent opgeslagen in een SQLite database.

---

### TR-04 - Seed data
De database wordt bij initialisatie gevuld met de historische neerslaggegevens (2004–2025), de materiaalcatalogus en de standaardcategorieën.

---

# 5. Traceability Matrix

Overzicht van de koppeling tussen user stories en functionele requirements.

| User Story | Functionele Requirements |
|---|---|
| US-01 Materiaal bestellen | FR-12, FR-14, FR-15 |
| US-02 Leverdatum kiezen | FR-13, FR-15 |
| US-03 Catalogus raadplegen | FR-07, FR-08, FR-21 |
| US-04 Aanbevolen tools bekijken | FR-17, FR-18, FR-21 |
| US-05 Risico bekijken | FR-01, FR-02, FR-03, FR-04, FR-05, FR-06, FR-19 |
| US-06 Risicoperiodes analyseren | FR-01, FR-02, FR-03, FR-04, FR-05, FR-06, FR-20 |
| US-07 Prioritaire materialen | FR-16, FR-17 |
| US-08 Materiaal toevoegen | FR-09, FR-23 |
| US-09 Materiaal verwijderen | FR-10, FR-23 |
| US-10 Categorieën beheren | FR-11, FR-23 |

---

# 6. Conclusie

Deze requirements beschrijven volledig wat het systeem moet doen, hoe het zich moet gedragen en aan welke technische voorwaarden het moet voldoen. De traceability matrix toont dat alle user stories gedekt zijn door minstens één functionele requirement, wat garandeert dat niets over het hoofd gezien wordt tijdens implementatie en testing.