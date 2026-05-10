# Project Overview

## Projectnaam
Aquafin Smart Maintenance Platform

---

# 1. Probleemstelling

Aquafin is een Belgische organisatie die instaat voor het transport en de zuivering van rioolwater. Technische medewerkers controleren dagelijks pompstations, leidingen en waterzuiveringsinstallaties om ervoor te zorgen dat vervuild water correct verwerkt wordt tot proper water dat veilig in de natuur terechtkomt.

Tijdens deze processen moeten techniekers:
- waterniveaus controleren
- pompen onderhouden
- verstoppingen verwijderen
- installaties inspecteren
- materiaal bestellen
- snel reageren op verhoogd overstromingsgevaar

Momenteel ontbreekt een geïntegreerd digitaal systeem waarin:
- overstromingsrisico's op basis van historische data voorspeld worden
- techniekers materiaal kunnen bestellen voor onderhoudswerken
- belangrijke tools automatisch geprioriteerd worden tijdens risicoperiodes

---

# 2. Doel van de Applicatie

Het doel van dit project is het ontwikkelen van één geïntegreerd platform waarmee Aquafin-techniekers:

1. Overstromingsrisico's kunnen analyseren op basis van historische neerslaggegevens
2. Een forecast kunnen raadplegen voor de komende 5 jaar
3. Materiaal kunnen bestellen voor onderhoudswerken
4. Slimme aanbevelingen ontvangen tijdens risicoperiodes

De applicatie combineert:
- analyse van het Aquafin bedrijfsproces
- data-analyse van KMI-neerslaggegevens (2004–2025)
- seizoensgebonden risicoforecast
- materiaalbeheer en bestellingen
- slimme aanbevelingen op basis van risiconiveau

---

# 3. Beschrijving van het Proces

Het proces start wanneer rioolwater aankomt in een pompstation. Het water wordt via pompen getransporteerd naar een waterzuiveringsinstallatie, waar het meerdere zuiveringsfasen doorloopt voordat het gezuiverde water terug in de natuur terechtkomt.

Belangrijke stappen in het proces:
1. Detectie van hoog waterniveau
2. Activeren van pompen
3. Transport van rioolwater naar de installatie
4. Verwijderen van vuil en afval via roosters en filters
5. Beluchting van het water met zuurstof
6. Biologische afbraak van resterende vervuiling
7. Nabezinking
8. Controle van waterkwaliteit
9. Lozing van proper water in de rivier

Naast het zuiveringsproces voeren techniekers dagelijks onderhoud uit:
- vervangen van olie en smeermiddelen
- verwijderen van verstoppingen
- controleren en herstellen van pompen
- inspecteren van leidingen en installaties

---

# 4. Modules van de Applicatie

## 4.1 Procesanalyse Module

Bevat de documentatie van het Aquafin bedrijfsproces:
- BPMN-flowchart van het waterzuiveringsproces
- beschrijving van beslissingspunten
- analyse van onderhoudsactiviteiten

Doel: aantonen dat het bedrijfsproces correct begrepen wordt.

---

## 4.2 Weers- en Risicoanalyse Module

Deze module:
- verwerkt historische KMI-neerslaggegevens (2004–2025)
- groepeert neerslag per seizoen
- berekent een trendlijn via lineaire regressie
- voorspelt overstromingsrisico's voor de komende 5 jaar
- vergelijkt voorspellingen met seizoensdrempelwaarden

Doel: preventief risico's detecteren zodat techniekers tijdig kunnen anticiperen.

---

## 4.3 Materiaalbeheer Module

Techniekers en beheerders kunnen:
- de volledige materiaalcatalogus bekijken
- zoeken en filteren op categorie
- nieuwe materialen toevoegen
- bestaande materialen deactiveren

Doel: onderhoudswerken efficiënter organiseren met een up-to-date catalogus.

---

## 4.4 Bestelmodule

Techniekers kunnen:
- materialen selecteren uit de catalogus
- aantallen opgeven
- een leverdatum instellen
- de bestelling bevestigen

Doel: dagelijkse materiaalbevoorrading digitaal en gestructureerd afhandelen.

---

## 4.5 Slimme Aanbevelingen

Wanneer een periode een verhoogd overstromingsrisico heeft:
- worden relevante flood tools automatisch bovenaan de materiaallijst geplaatst
- krijgen deze tools een visuele markering

Voorbeelden van flood tools:
- dompelpompen
- slangenwagens
- rioolstoppen
- hogedrukreinigers
- gasdetectiemeters

Doel: techniekers sneller voorbereiden op interventies zonder zelf te hoeven zoeken.

---

# 5. Gebruikers

| Rol | Taken |
|---|---|
| Technieker | Installaties controleren, materiaal bestellen, risico's raadplegen |
| Planner | Risicoperiodes analyseren, onderhoudswerken preventief plannen |
| Beheerder | Materiaalcatalogus beheren (toevoegen, verwijderen, categoriseren) |

---

# 6. Technologieën

| Laag | Technologie | Motivatie |
|---|---|---|
| Frontend | React | Componentgebaseerd, geschikt voor dashboard-applicaties |
| Backend | Node.js + Express | Zelfde taal als frontend, eenvoudig REST API's bouwen |
| Database | SQLite | Geen serverinstallatie nodig, ideaal voor individueel project |
| Version Control | Git + GitHub | Versiebeheer en documentatie-opvolging |

---

# 7. Verwachte Resultaten

De applicatie moet:
- een duidelijk overzicht geven van overstromingsrisico's voor de komende 5 jaar
- techniekers ondersteunen bij materiaalbeheer en dagelijkse bestellingen
- onderhoudswerken efficiënter maken via slimme aanbevelingen
- historische neerslagdata combineren met praktische acties

Het project als geheel moet aantonen dat:
- een gestructureerde analyse uitgevoerd werd
- software engineering best practices toegepast werden
- het volledige ontwikkelingsproces gedocumenteerd is
- de student zelfstandig een volwaardige webapplicatie kan realiseren