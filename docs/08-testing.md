# Testing

## Projectnaam
Aquafin Technieker Platform

---

# 1. Doel

Dit document beschrijft het testplan voor de Aquafin Technieker Platform applicatie.

De testcases zijn rechtstreeks afgeleid van de acceptatiecriteria uit de user stories (04-user-stories.md). Dit garandeert dat elke user story gevalideerd wordt voor oplevering.

Het document bestaat uit twee delen:
- **Testplan** (ingevuld): wat wordt getest en hoe
- **Testresultaten** (ingevuld na implementatie): wat het resultaat was

---

# 2. Teststrategie

## Testmethode
Voor dit project wordt **manueel functioneel testen** toegepast. Elke testcase wordt handmatig uitgevoerd in de browser.

## Testomgeving
- Browser: Chrome (meest recente versie)
- Frontend en backend lokaal gestart via `npm start`
- Database: SQLite met seed data geladen via `node db/seed.js`

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

## TC-01 - Materiaal bestellen (US-01)

### TC-01a - Succesvolle bestelling

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-01a |
| User Story | US-01 |
| Beschrijving | Technieker plaatst een geldige bestelling met materialen en leverdatum |
| Precondities | Applicatie is gestart, seed data is geladen, materialen zijn beschikbaar |

**Stappen:**
1. Zorg dat de backend én frontend draaien
2. Navigeer naar de Bestellen pagina
3. Vul een naam in bij "Naam technieker"
4. Selecteer minstens één materiaal en geef een aantal in
5. Kies een leverdatum in de toekomst
6. Klik op "Bestelling Bevestigen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Bevestigingsmelding verschijnt: "Bestelling geplaatst voor [datum]". De bestelling wordt opgeslagen in de database. | Bevestigingsmelding verschijnt met de correcte datum. Bestelling opgeslagen. | PASS |

---

### TC-01b - Bestelling zonder materialen

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-01b |
| User Story | US-01 |
| Beschrijving | Technieker probeert te bevestigen zonder materialen te selecteren |
| Precondities | Applicatie is gestart, bestelpagina is open |

**Stappen:**
1. Navigeer naar de Bestellen pagina
2. Vul wel een naam en een datum in
3. Selecteer geen materialen
4. Klik op "Bestelling Bevestigen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Foutmelding "Selecteer minstens één materiaal" verschijnt. Er wordt geen bestelling aangemaakt. | Foutmelding verschijnt. Geen bestelling aangemaakt. | PASS |

---

## TC-02 - Leverdatum validatie (US-02)

### TC-02a - Geen leverdatum

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-02a |
| User Story | US-02 |
| Beschrijving | Technieker laat het datumveld leeg |
| Precondities | Bestelpagina is open, minstens één materiaal geselecteerd |

**Stappen:**
1. Navigeer naar de Bestellen pagina
2. Vul een naam in bij "Naam technieker"
3. Selecteer minstens één materiaal
4. Laat het datumveld leeg
5. Klik op "Bestelling Bevestigen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Foutmelding "Leverdatum is verplicht" verschijnt. Bestelling wordt niet aangemaakt. | Foutmelding verschijnt. Bestelling niet aangemaakt. | PASS |

---

### TC-02b - Datum in het verleden

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-02b |
| User Story | US-02 |
| Beschrijving | Technieker vult een datum in die al voorbij is |
| Precondities | Bestelpagina is open, minstens één materiaal geselecteerd |

**Stappen:**
1. Navigeer naar de Bestellen pagina
2. Vul een naam in bij "Naam technieker"
3. Selecteer minstens één materiaal
4. Vul een datum in die in het verleden ligt (bv. 2020-01-01)
5. Klik op "Bestelling Bevestigen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Foutmelding "Kies een datum in de toekomst" verschijnt. Bestelling wordt niet aangemaakt. | Foutmelding verschijnt. Bestelling niet aangemaakt. | PASS |

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
1. Navigeer naar de Materialen pagina

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Alle actieve materialen worden getoond. | Alle 25 seed materialen worden correct weergegeven. | PASS |

---

### TC-03b - Zoeken op naam

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-03b |
| User Story | US-03 |
| Beschrijving | Technieker zoekt op een materiaalnaam |
| Precondities | Materiaallijst is geladen |

**Stappen:**
1. Navigeer naar de Materialen pagina
2. Typ "Dompelpomp" in het zoekveld

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Enkel materialen die "Dompelpomp" bevatten worden getoond. | Enkel "Dompelpomp" wordt getoond. | PASS |

---

### TC-03c - Filteren op categorie

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-03c |
| User Story | US-03 |
| Beschrijving | Technieker filtert op een specifieke categorie |
| Precondities | Materiaallijst is geladen |

**Stappen:**
1. Navigeer naar de Materialen pagina
2. Selecteer een categorie in het filterdropdown

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Enkel materialen uit die categorie worden getoond. | Filter werkt correct per categorie. | PASS |

---

## TC-04 - Aanbevolen tools (US-04)

### TC-04a - Flood tools bij hoog/gemiddeld risico

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-04a |
| User Story | US-04 |
| Beschrijving | Flood tools verschijnen wanneer het risiconiveau hoog of gemiddeld is |
| Precondities | Risicoforecast geeft "Hoog" of "Gemiddeld" terug voor het huidig seizoen |

**Stappen:**
1. Navigeer naar het Dashboard
2. Klik op een seizoen met risiconiveau "Hoog" of "Gemiddeld" (bv. Zomer of Herfst)

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Flood tools verschijnen onderaan het dashboard met een visuele markering. | Flood tools sectie verschijnt onderaan het dashboard met badge markering. | PASS |

---

### TC-04b - Geen prioritering bij laag risico

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-04b |
| User Story | US-04 |
| Beschrijving | Flood tools worden niet speciaal geprioriteerd bij laag risico |
| Precondities | Risicoforecast geeft "Laag" terug voor het huidig seizoen |

**Stappen:**
1. Navigeer naar het Dashboard
2. Klik op een seizoen met risiconiveau "Laag" (bv. Winter of Lente)

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Geen flood tools sectie verschijnt. Bericht toont dat er geen verhoogd risico is. | Geen flood tools sectie zichtbaar. | PASS |

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
1. Open het Dashboard

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Het risiconiveau van het huidige seizoen (Laag/Gemiddeld/Hoog) is zichtbaar zonder te scrollen. | Risiconiveau zichtbaar bovenaan het dashboard zonder te scrollen. | PASS |

---

### TC-05b - Forecast komende jaren

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-05b |
| User Story | US-05 |
| Beschrijving | Risicoanalyse pagina toont forecast per seizoen |
| Precondities | Applicatie is gestart, seed data is geladen |

**Stappen:**
1. Navigeer naar de Risicoanalyse pagina

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Per jaar en per seizoen wordt een risiconiveau getoond in een overzichtstabel. | Forecast tabel toont huidig jaar + 5 jaar vooruit, per seizoen. | PASS |

---

### TC-05c - Kleurcodering risiconiveaus

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-05c |
| User Story | US-05 |
| Beschrijving | Risiconiveaus zijn visueel onderscheiden via kleur |
| Precondities | Risicoanalyse pagina is geladen met resultaten |

**Stappen:**
1. Navigeer naar de Risicoanalyse pagina
2. Controleer de kleur per risiconiveau

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Hoog risico = rood, Gemiddeld = oranje, Laag = groen. | Kleurcodering correct: rood (#e63946), oranje (#f4a261), groen (#2a9d8f). | PASS |

---

## TC-06 - Materiaal toevoegen (US-06)

### TC-06a - Nieuw materiaal toevoegen

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-06a |
| User Story | US-06 |
| Beschrijving | Beheerder voegt een nieuw materiaal toe aan de catalogus |
| Precondities | Beheerderspagina is open |

**Stappen:**
1. Navigeer naar de Beheer pagina
2. Vul een materiaalnaam in (bv. "Testpomp")
3. Selecteer een categorie
4. Klik op "Toevoegen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Het nieuwe materiaal verschijnt in de catalogus. Toast melding: "[naam] succesvol toegevoegd." | "Testpomp" verschijnt in de lijst. Toast melding correct weergegeven. | PASS |

---

### TC-06b - Duplicaat materiaalnaam

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-06b |
| User Story | US-06 |
| Beschrijving | Beheerder probeert een naam toe te voegen die al bestaat |
| Precondities | Beheerderspagina is open, "Dompelpomp" bestaat al |

**Stappen:**
1. Navigeer naar de Beheer pagina
2. Vul "Dompelpomp" in als naam (bestaat al)
3. Selecteer een categorie
4. Klik op "Toevoegen"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Toast waarschuwing verschijnt: "Materiaal met deze naam bestaat al." Materiaal wordt niet dubbel toegevoegd. | Toast foutmelding verschijnt. Geen duplicaat aangemaakt. | PASS |

---

## TC-07 - Materiaal verwijderen (US-07)

### TC-07a - Materiaal deactiveren

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-07a |
| User Story | US-07 |
| Beschrijving | Beheerder verwijdert een materiaal uit de catalogus |
| Precondities | Beheerderspagina is open, materiaal bestaat en is actief |

**Stappen:**
1. Navigeer naar de Beheer pagina
2. Klik op de Deactiveren knop naast een materiaal
3. Bevestig de verwijdering in het bevestigingsvenster

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Materiaal verdwijnt uit de actieve catalogus na bevestiging. Toast melding: "[naam] gedeactiveerd." | Materiaal verdwijnt uit de lijst. Toast melding correct weergegeven. | PASS |

---

## TC-08 - Categorieën beheren (US-08)

### TC-08a - Materiaal correct gecategoriseerd

| Veld | Inhoud |
|---|---|
| Testcase ID | TC-08a |
| User Story | US-08 |
| Beschrijving | Nieuw materiaal wordt correct ingedeeld in de gekozen categorie |
| Precondities | Beheerderspagina is open |

**Stappen:**
1. Voeg een nieuw materiaal toe met categorie "Gereedschap"
2. Navigeer naar de Materialen pagina
3. Filter op "Gereedschap"

| Verwacht resultaat | Werkelijk resultaat | Status |
|---|---|---|
| Het nieuwe materiaal verschijnt in de categorie "Gereedschap". | Materiaal correct zichtbaar onder "Gereedschap" filter. | PASS |

---

# 4. Overzicht Testresultaten

| Testcase | Beschrijving | Status |
|---|---|---|
| TC-01a | Succesvolle bestelling | PASS |
| TC-01b | Bestelling zonder materialen | PASS |
| TC-02a | Geen leverdatum | PASS |
| TC-02b | Datum in het verleden | PASS |
| TC-03a | Materiaaloverzicht laden | PASS |
| TC-03b | Zoeken op naam | PASS |
| TC-03c | Filteren op categorie | PASS |
| TC-04a | Flood tools bij hoog/gemiddeld risico | PASS |
| TC-04b | Geen prioritering bij laag risico | PASS |
| TC-05a | Huidig risico op dashboard | PASS |
| TC-05b | Forecast komende jaren | PASS |
| TC-05c | Kleurcodering risiconiveaus | PASS |
| TC-06a | Nieuw materiaal toevoegen | PASS |
| TC-06b | Duplicaat materiaalnaam | PASS |
| TC-07a | Materiaal deactiveren | PASS |
| TC-08a | Materiaal correct gecategoriseerd | PASS |

**Totaal:** 16 testcases — 16 geslaagd / 0 gefaald / 0 niet getest

---

# 5. Gevonden Bugs

Geen bugs gevonden tijdens de testfase.

| Bug ID | Testcase | Beschrijving | Ernst | Status |
|---|---|---|---|---|
| — | — | — | — | — |

---

# 6. Conclusie

Alle 16 testcases zijn succesvol doorlopen. De applicatie voldoet aan alle acceptatiecriteria uit de user stories. Zowel de happy paths als de validatiescenario's (lege invoer, datum in verleden, duplicaat naam) werken correct.

- Totaal aantal testcases: 16
- Geslaagd: 16
- Gefaald: 0
- Niet getest: 0