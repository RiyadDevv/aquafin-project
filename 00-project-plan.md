# Project Plan

## Projectnaam
Aquafin Technieker Platform

---

# 1. Inleiding

Dit project heeft als doel het ontwikkelen van een webapplicatie voor Aquafin. De applicatie ondersteunt techniekers bij:
- het raadplegen en visualiseren van overstromingsrisico's
- materiaal opzoeken en bestellen voor dagelijkse interventies

De applicatie combineert historische neerslaggegevens met slimme aanbevelingen voor materiaalgebruik tijdens risicoperiodes.

Het project wordt ontwikkeld door één student als individueel project, volgens een gestructureerde Software Development Life Cycle (SDLC).

---

# 2. Ontwikkelingsmethode

Voor dit project wordt een SDLC-aanpak gevolgd met een iteratief karakter:

```text
Analyse => Design => Implementatie => Testing
```

De fases worden in volgorde doorlopen, maar inzichten uit latere fases kunnen leiden tot bijsturingen in eerdere documenten. Alle wijzigingen worden bijgehouden via GitHub, zodat het volledige ontwikkelingsproces, inclusief alle tussenstappen en bijsturingen, zichtbaar en traceerbaar is. Dit laat toe aan te tonen dat het project een continu en gestructureerd proces is, en geen eenmalige oplevering.

---

# 3. Projectfases

## 3.1 Analyse

### Doel
Het begrijpen van het probleem en de vereiste functionaliteiten van de applicatie.

### Activiteiten
- bestuderen van de Aquafin case via de aangeleverde videoclips
- opstellen van een BPMN-flowchart van het waterzuiveringsproces
- definiëren van functionele requirements (wat het systeem moet kunnen) en non-functionele requirements (kwaliteitseisen zoals browsercompatibiliteit)
- opstellen van user stories met acceptatiecriteria

### Outputs
- `01-project-overview.md`
- `02-business-analysis.md`
- `03-requirements.md`
- `04-user-stories.md`

---

## 3.2 Design

### Doel
Het ontwerpen van de technische structuur van de applicatie voordat er code geschreven wordt.

### Activiteiten
- bepalen van de softwarearchitectuur: hoe frontend, backend en database samenwerken
- ontwerpen van het datamodel en het bijhorende SQL-schema (zie `06-data-model.md`)
- ontwerpen van de gebruikersinterface via wireframes: schetsen van hoe elk scherm eruitziet (zie `07-ui-ux.md`)
- uitwerken van dataflow diagrammen: hoe data door het systeem stroomt van invoer tot resultaat (zie `05-architecture.md`)

### Outputs
- `05-architecture.md`
- `06-data-model.md`
- `07-ui-ux.md`

---

## 3.3 Implementatie

### Doel
Het ontwikkelen van de applicatie op basis van de analyse- en designdocumenten.

### Activiteiten
- opzetten van de projectstructuur
- opzetten van de database met seed data
- ontwikkelen van de Node.js + Express backend (logica en API)
- implementeren van de risicoanalyse op basis van neerslagdata
- implementeren van de aanbevelingslogica voor flood tools
- implementeren van materiaalbeheer en bestellingen
- ontwikkelen van de React frontend (gebruikersinterface)
- koppelen van frontend en backend

### Outputs
- werkende webapplicatie
- SQLite database met seed data
- regelmatige GitHub commits per afgewerkte functionaliteit

---

## 3.4 Testing

### Doel
Het controleren van de correcte werking van de applicatie aan de hand van de acceptatiecriteria uit de user stories.

### Activiteiten
- uitvoeren van testcases per user story
- controleren van randgevallen zoals een lege bestelling of een datum in het verleden
- nagaan of de risicoberekeningen overeenkomen met de verwachte waarden op basis van de seizoensdrempels
- oplossen van gevonden bugs

### Outputs
- `08-testing.md` (ingevuld met resultaten)
- gevalideerde applicatie

---

# 4. Planning

| Week | Periode | Focus |
|---|---|---|
| Week 1 | 29 april | Kickoff met docent + analysefase |
| Week 2 | | Designfase |
| Week 3 | | Implementatie |
| Week 4 | | Implementatie (vervolg) |
| Week 5 | | Testing |
| Week 6 | Eerste week van juni | Finalisatie: bugfixing, documentatie afronden, finale GitHub commit |

---

## Milestones

| Milestone | Beschrijving |
|---|---|
| Repository Setup | GitHub repository aangemaakt met basisstructuur en docs-map |
| Analyse Complete | Alle analysedocumenten afgewerkt en gepusht |
| Design Complete | Architectuur, datamodel en UI/UX gedocumenteerd |
| MVP Ready | Eerste werkende versie van de applicatie |
| Testing Complete | Alle testcases uitgevoerd en gedocumenteerd |
| Go Live | Finale oplevering voor demo en indiening |

---

# 5. Technologieën

| Laag | Technologie | Motivatie |
|---|---|---|
| Frontend | React | Componentgebaseerd, geschikt voor dashboard-applicaties |
| Backend | Node.js + Express | Zelfde taal als frontend, eenvoudig REST API's bouwen |
| Database | SQLite | Geen serverinstallatie nodig, ideaal voor individueel project |
| Version Control | Git en GitHub | Versiebeheer en aantonen van het ontwikkelingsproces |

---

# 6. GitHub Workflow

GitHub wordt gebruikt voor versiebeheer en documentatie. Regelmatige commits per afgewerkte stap tonen aan dat het project stapsgewijs opgebouwd is.

---

# 7. Verwachte Resultaten

De applicatie moet:
- een overzicht tonen van overstromingsrisico's voor de komende 5 jaar op basis van historische neerslagdata
- techniekers toelaten materiaal te bestellen voor dagelijkse interventies
- slimme aanbevelingen tonen op basis van het risiconiveau

Het project als geheel moet aantonen dat:
- een gestructureerde SDLC-aanpak gevolgd werd
- het volledige ontwikkelingsproces gedocumenteerd en traceerbaar is via GitHub
- de student zelfstandig een webapplicatie kan realiseren van analyse tot oplevering

---

# 8. Besluit

Dit project combineert data-analyse en webontwikkeling in één applicatie voor Aquafin. Door elke fase te documenteren en bij te houden via GitHub, wordt niet enkel een werkende applicatie opgeleverd, maar ook een volledig en transparant ontwikkelingsproces.