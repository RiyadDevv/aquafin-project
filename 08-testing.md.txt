# Testing

## Projectnaam
Aquafin Smart Maintenance Platform

---

# 1. Doel

Dit document beschrijft het testplan voor de Aquafin Smart Maintenance Platform applicatie.

De testcases zijn rechtstreeks afgeleid van de acceptatiecriteria uit de user stories (03-user-stories.md). Dit garandeert dat elke user story gevalideerd wordt voor oplevering.

Het document bestaat uit twee delen:
- **Testplan** (nu ingevuld): wat wordt getest en hoe
- **Testresultaten** (in te vullen na implementatie): wat het resultaat was

---

# 2. Teststrategie

## Testmethode
Voor dit project wordt **manueel functioneel testen** toegepast. Elke testcase wordt handmatig uitgevoerd in de browser.

## Testomgeving
- Browser: Chrome (meest recente versie)
- Frontend: React applicatie lokaal gestart (`npm start`)
- Backend: Node.js + Express lokaal gestart (`node app.js`)
- Database: SQLite met seed data geladen

## Wanneer wordt getest?
Na afronding van elke module worden de bijhorende testcases uitgevoerd. Na volledige implementatie wordt een finale regressietest uitgevoerd op alle testcases.

## Statussen

| Status | Betekenis |
|---|---|
| PASS | Verwacht resultaat komt overeen met werkelijk resultaat |
| FAIL | Werkelijk resultaat wijkt af van verwacht resultaat |
| PARTIAL | Functionaliteit werkt deels correct |
| TODO | Testcase nog niet uitgevoerd |

---

# 3. Testcases

## TC-01 — Materiaal bestellen (US-01)

### TC-01a - Succesvolle bestelling

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-01a |
| User Story | US-01 |
| Beschrijving | Technieker plaatst een geldige bestelling met materialen en leverdatum |
| Precondities | Applicatie is gestart, seed data is geladen, materialen zijn beschikbaar |

**Stappen:**
1. Navigeer naar de bestelpagina
2. Selecteer minstens één materiaal
3. Geef een geldige leverdatum op (datum in de toekomst)
4. Klik op "Bestelling Bevestigen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Bevestigingsmelding verschijnt, bestelling is opgeslagen in de database | | TODO |

---

### TC-01b - Bestelling zonder materialen

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-01b |
| User Story | US-01 |
| Beschrijving | Technieker probeert te bevestigen zonder materialen te selecteren |
| Precondities | Applicatie is gestart, bestelpagina is open |

**Stappen:**
1. Navigeer naar de bestelpagina
2. Selecteer geen materialen
3. Klik op "Bestelling Bevestigen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Foutmelding "Selecteer minstens één materiaal" verschijnt, bestelling wordt niet aangemaakt | | TODO |

---

## TC-02 - Leverdatum validatie (US-02)

### TC-02a - Geldige leverdatum

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-02a |
| User Story | US-02 |
| Beschrijving | Technieker geeft een geldige datum in de toekomst op |
| Precondities | Bestelpagina is open, minstens één materiaal geselecteerd |

**Stappen:**
1. Vul een datum in die in de toekomst ligt
2. Klik op "Bestelling Bevestigen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Datum wordt opgeslagen bij de bestelling, bestelling slaagt | | TODO |

---

### TC-02b - Geen leverdatum

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-02b |
| User Story | US-02 |
| Beschrijving | Technieker laat het datumveld leeg |
| Precondities | Bestelpagina is open, minstens één materiaal geselecteerd |

**Stappen:**
1. Laat het datumveld leeg
2. Klik op "Bestelling Bevestigen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Foutmelding "Leverdatum is verplicht" verschijnt, bestelling wordt niet aangemaakt | | TODO |

---

### TC-02c - Datum in het verleden

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-02c |
| User Story | US-02 |
| Beschrijving | Technieker vult een datum in die al voorbij is |
| Precondities | Bestelpagina is open, minstens één materiaal geselecteerd |

**Stappen:**
1. Vul een datum in die in het verleden ligt (bv. 2020-01-01)
2. Klik op "Bestelling Bevestigen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Foutmelding "Kies een datum in de toekomst" verschijnt, bestelling wordt niet aangemaakt | | TODO |

---

## TC-03 - Materiaalcatalogus raadplegen (US-03)

### TC-03a - Overzicht laden

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-03a |
| User Story | US-03 |
| Beschrijving | Technieker navigeert naar de materiaallijst |
| Precondities | Applicatie is gestart, seed data is geladen |

**Stappen:**
1. Navigeer naar de materiaallijst pagina

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Alle actieve materialen worden getoond, gesorteerd per categorie | | TODO |

---

### TC-03b - Zoeken op naam

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-03b |
| User Story | US-03 |
| Beschrijving | Technieker zoekt op een materiaalnaam |
| Precondities | Materiaallijst is geladen |

**Stappen:**
1. Typ "Dompelpomp" in het zoekveld

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Enkel materialen die "Dompelpomp" bevatten worden getoond | | TODO |

---

### TC-03c - Filteren op categorie

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-03c |
| User Story | US-03 |
| Beschrijving | Technieker filtert op een specifieke categorie |
| Precondities | Materiaallijst is geladen |

**Stappen:**
1. Selecteer de categorie "Riolering & Aquafin tools" in het filterdropdown

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Enkel materialen uit die categorie worden getoond | | TODO |

---

## TC-04 - Aanbevolen tools (US-04)

### TC-04a — Flood tools bovenaan bij hoog risico

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-04a |
| User Story | US-04 |
| Beschrijving | Flood tools verschijnen bovenaan wanneer het risiconiveau hoog is |
| Precondities | Risicoforecast geeft "Hoog" terug voor het huidig seizoen |

**Stappen:**
1. Open de materiaallijst of het dashboard

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Flood tools staan bovenaan met een visuele markering (badge of label) | | TODO |

---

### TC-04b - Geen prioritering bij laag risico

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-04b |
| User Story | US-04 |
| Beschrijving | Flood tools worden niet speciaal geprioriteerd bij laag risico |
| Precondities | Risicoforecast geeft "Laag" terug voor het huidig seizoen |

**Stappen:**
1. Open de materiaallijst

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Materialen worden getoond zonder speciale prioritering van flood tools | | TODO |

---

## TC-05 - Overstromingsrisico bekijken (US-05)

### TC-05a - Huidig risico op dashboard

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-05a |
| User Story | US-05 |
| Beschrijving | Dashboard toont het risiconiveau van het huidig seizoen |
| Precondities | Applicatie is gestart, risicoanalyse engine is actief |

**Stappen:**
1. Open het dashboard

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Het risiconiveau van het huidige seizoen (Laag / Gemiddeld / Hoog) is zichtbaar zonder te scrollen | | TODO |

---

### TC-05b - Forecast komende 5 jaar

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-05b |
| User Story | US-05, US-06 |
| Beschrijving | Risicoanalyse pagina toont forecast voor de komende 5 jaar |
| Precondities | Applicatie is gestart, seed data is geladen |

**Stappen:**
1. Navigeer naar de risicoanalyse pagina

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Per jaar en per seizoen wordt een risiconiveau getoond voor de komende 5 jaar | | TODO |

---

### TC-05c - Kleurcodering risiconiveaus

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-05c |
| User Story | US-05, US-06 |
| Beschrijving | Risiconiveaus zijn visueel onderscheiden via kleur |
| Precondities | Risicoanalyse pagina is geladen met resultaten |

**Stappen:**
1. Bekijk de risicoanalyse pagina

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Hoog risico = rood, Gemiddeld = oranje, Laag = groen | | TODO |

---

## TC-06 — Materiaal toevoegen (US-08)

### TC-06a - Nieuw materiaal toevoegen

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-06a |
| User Story | US-08 |
| Beschrijving | Beheerder voegt een nieuw materiaal toe aan de catalogus |
| Precondities | Beheerderspagina is open |

**Stappen:**
1. Vul een materiaalnaam in (bv. "Testpomp")
2. Selecteer een categorie
3. Klik op "Toevoegen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Het nieuwe materiaal verschijnt in de catalogus | | TODO |

---

### TC-06b - Duplicaat materiaalnaam

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-06b |
| User Story | US-08 |
| Beschrijving | Beheerder probeert een naam toe te voegen die al bestaat |
| Precondities | Beheerderspagina is open, "Dompelpomp" bestaat al |

**Stappen:**
1. Vul "Dompelpomp" in als naam
2. Selecteer een categorie
3. Klik op "Toevoegen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Waarschuwingsmelding verschijnt, materiaal wordt niet dubbel toegevoegd | | TODO |

---

## TC-07 - Materiaal verwijderen (US-09)

### TC-07a - Materiaal deactiveren

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-07a |
| User Story | US-09 |
| Beschrijving | Beheerder verwijdert een materiaal uit de catalogus |
| Precondities | Beheerderspagina is open, materiaal bestaat en is actief |

**Stappen:**
1. Klik op de verwijderknop naast een materiaal
2. Bevestig de verwijdering

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Materiaal verdwijnt uit de actieve catalogus, is nog aanwezig in de database met isActive = 0 | | TODO |

---

## TC-08 - Categorieën beheren (US-10)

### TC-08a - Materiaal correct gecategoriseerd

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-08a |
| User Story | US-10 |
| Beschrijving | Nieuw materiaal wordt correct ingedeeld in de gekozen categorie |
| Precondities | Beheerderspagina is open |

**Stappen:**
1. Voeg een nieuw materiaal toe met categorie "Gereedschap"
2. Navigeer naar de materiaallijst
3. Filter op "Gereedschap"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Het nieuwe materiaal verschijnt in de categorie "Gereedschap" | | TODO |

---

# 4. Risicoberekening Verificatie

Deze sectie verifieert de correctheid van de Risk Analysis Engine op basis van de bekende inputdata.

### TC-09 - Risicodrempels correct toegepast

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-09 |
| Beschrijving | Verifieer dat de seizoensdrempels correct worden toegepast |
| Precondities | Seed data (2004-2025) is geladen |

**Verwachte drempelwaarden:**

| Seizoen | Drempel | Gemiddeld risico vanaf | Hoog risico vanaf |
|---|---|---|---|
| Winter | 300 mm | 300 mm | 330 mm |
| Lente | 250 mm | 250 mm | 275 mm |
| Zomer | 260 mm | 260 mm | 286 mm |
| Herfst | 280 mm | 280 mm | 308 mm |

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Risiconiveaus in de forecast komen overeen met de drempelwaarden uit de opdracht | | TODO |

---

# 5. Overzicht Testresultaten

*In te vullen na uitvoering van alle testcases.*

| Testcase | Beschrijving | Status |
|---|---|---|
| TC-01a | Succesvolle bestelling | TODO |
| TC-01b | Bestelling zonder materialen | TODO |
| TC-02a | Geldige leverdatum | TODO |
| TC-02b | Geen leverdatum | TODO |
| TC-02c | Datum in het verleden | TODO |
| TC-03a | Materiaaloverzicht laden | TODO |
| TC-03b | Zoeken op naam | TODO |
| TC-03c | Filteren op categorie | TODO |
| TC-04a | Flood tools bij hoog risico | TODO |
| TC-04b | Geen prioritering bij laag risico | TODO |
| TC-05a | Huidig risico op dashboard | TODO |
| TC-05b | Forecast komende 5 jaar | TODO |
| TC-05c | Kleurcodering risiconiveaus | TODO |
| TC-06a | Nieuw materiaal toevoegen | TODO |
| TC-06b | Duplicaat materiaalnaam | TODO |
| TC-07a | Materiaal deactiveren | TODO |
| TC-08a | Materiaal correct gecategoriseerd | TODO |
| TC-09 | Risicodrempels correct toegepast | TODO |

**Totaal:** 18 testcases — 0 geslaagd / 0 gefaald / 18 niet getest

---

# 6. Gevonden Bugs

*In te vullen tijdens en na het testen.*

| Bug ID | Testcase | Beschrijving | Ernst | Status |
|---|---|---|---|---|
| — | — | — | — | — |

**Ernst niveaus:**
- **Kritiek**: functionaliteit werkt niet, blokkeert gebruik
- **Hoog**: functionaliteit werkt incorrect, workaround mogelijk
- **Laag**: visueel of miniem probleem

---

# 7. Conclusie

*In te vullen na uitvoering van alle testcases.*

Totaal aantal testcases: 18
Geslaagd: —
Gefaald: —
Niet getest: 18

Opmerkingen: —