# User Stories

## Projectnaam
Aquafin Technieker Platform

---

# 1. Introductie

Dit document beschrijft de user stories voor de Aquafin Technieker Platform applicatie.

Elke user story beschrijft:
- welke gebruiker een actie uitvoert
- wat die gebruiker wil bereiken
- waarom dit belangrijk is
- wanneer de story als "klaar" beschouwd wordt (acceptatiecriteria)

De user stories vormen de basis voor de requirements, implementatie en testing.

---

# 2. Rollen

| Rol | Beschrijving |
|---|---|
| Technieker | Voert onderhoud uit op het terrein, bestelt materiaal, raadpleegt risico's |
| Beheerder | Beheert de materiaalcatalogus (toevoegen, verwijderen, categoriseren) |

---

# 3. User Stories

## 3.1 Technieker

---

### US-01 - Materiaal bestellen

```
Als technieker
wil ik materiaal kunnen bestellen
zodat ik de nodige middelen heb om onderhoudswerken uit te voeren.
```

**Acceptatiecriteria:**

- Given: ik ben op de bestelpagina
- When: ik één of meerdere materialen selecteer en een leverdatum kies
- Then: kan ik de bestelling bevestigen en verschijnt er een bevestigingsmelding

- Given: ik geen materialen heb geselecteerd
- When: ik probeer te bevestigen
- Then: toont het systeem een foutmelding "Selecteer minstens één materiaal"

---

### US-02 - Leverdatum kiezen

```
Als technieker
wil ik een leverdatum kunnen opgeven bij mijn bestelling
zodat het materiaal tijdig aanwezig is voor mijn geplande onderhoud.
```

**Acceptatiecriteria:**

- Given: ik ben op de bestelpagina
- When: ik een datum invul in het datumveld
- Then: wordt die datum opgeslagen bij de bestelling

- Given: ik geen datum invul
- When: ik probeer te bevestigen
- Then: toont het systeem een foutmelding "Leverdatum is verplicht"

- Given: ik een datum invul die in het verleden ligt
- When: ik probeer te bevestigen
- Then: toont het systeem een foutmelding "Kies een datum in de toekomst"

---

### US-03 - Materiaalcatalogus raadplegen

```
Als technieker
wil ik de beschikbare materialen kunnen bekijken
zodat ik weet wat ik kan bestellen.
```

**Acceptatiecriteria:**

- Given: ik navigeer naar de materiaallijst
- When: de pagina laadt
- Then: zie ik een overzicht van alle beschikbare materialen

- Given: er zijn materialen beschikbaar
- When: ik zoek op een naam of categorie
- Then: worden enkel de overeenkomende materialen getoond

---

### US-04 - Aanbevolen tools bekijken

```
Als technieker
wil ik aanbevolen overstromingstools bovenaan zien tijdens risicoperiodes
zodat ik snel kan reageren zonder zelf te hoeven zoeken.
```

**Acceptatiecriteria:**

- Given: het huidige of voorspelde seizoen heeft een hoog of gemiddeld overstromingsrisico
- When: ik de materiaallijst of het dashboard open
- Then: verschijnen flood-gerelateerde tools bovenaan met een visuele markering

- Given: het risico is laag
- When: ik de materiaallijst open
- Then: worden flood tools niet speciaal geprioriteerd

---

### US-05 - Overstromingsrisico bekijken

```
Als technieker
wil ik het huidige en toekomstige overstromingsrisico kunnen bekijken
zodat ik voorbereid ben op mogelijke interventies.
```

**Acceptatiecriteria:**

- Given: ik open het dashboard
- When: de pagina laadt
- Then: zie ik het risiconiveau van het huidige seizoen (Laag / Gemiddeld / Hoog)

- Given: ik open de risicoanalyse pagina
- When: de pagina laadt
- Then: zie ik per jaar en per seizoen het voorspelde risiconiveau voor de komende 5 jaar

- Given: een seizoen heeft een hoog risico
- When: ik dat seizoen bekijk
- Then: is het visueel onderscheiden van lage en gemiddelde risico's via kleurcodering

---

## 3.2 Beheerder

---

### US-06 - Materiaal toevoegen

```
Als beheerder
wil ik nieuwe materialen kunnen toevoegen aan de catalogus
zodat techniekers altijd beschikken over een up-to-date lijst.
```

**Acceptatiecriteria:**

- Given: ik ben op de beheerderspagina
- When: ik een naam en categorie invul en bevestig
- Then: verschijnt het nieuwe materiaal in de catalogus

- Given: ik een naam invul die al bestaat
- When: ik probeer op te slaan
- Then: toont het systeem een waarschuwing

---

### US-07 - Materiaal verwijderen

```
Als beheerder
wil ik materialen kunnen verwijderen uit de catalogus
zodat verouderde of niet-beschikbare items niet meer zichtbaar zijn.
```

**Acceptatiecriteria:**

- Given: ik selecteer een materiaal om te verwijderen
- When: ik de verwijdering bevestig
- Then: verdwijnt het materiaal uit de actieve catalogus

- Given: een materiaal is onderdeel van een bestaande bestelling
- When: ik het probeer te verwijderen
- Then: wordt het materiaal gemarkeerd als inactief in plaats van volledig verwijderd

---

### US-08 - Categorieën beheren

```
Als beheerder
wil ik materialen kunnen categoriseren
zodat techniekers snel het juiste materiaal vinden.
```

**Acceptatiecriteria:**

- Given: ik voeg een materiaal toe
- When: ik een categorie kies uit de lijst
- Then: wordt het materiaal correct ingedeeld in die categorie

- Given: ik filter op een categorie
- When: de lijst geladen is
- Then: zie ik enkel materialen van die categorie

---

# 4. Story Map Overzicht

| ID | Rol | Story | Prioriteit |
|---|---|---|---|
| US-01 | Technieker | Materiaal bestellen | Must have |
| US-02 | Technieker | Leverdatum kiezen | Must have |
| US-03 | Technieker | Catalogus raadplegen | Must have |
| US-04 | Technieker | Aanbevolen tools bekijken | Must have |
| US-05 | Technieker | Overstromingsrisico bekijken | Must have |
| US-06 | Beheerder | Materiaal toevoegen | Must have |
| US-07 | Beheerder | Materiaal verwijderen | Must have |
| US-08 | Beheerder | Categorieën beheren | Should have |

---

# 5. Conclusie

De user stories beschrijven alle kernfunctionaliteiten vanuit het perspectief van de twee gebruikersrollen. De acceptatiecriteria laten toe om elke story concreet te testen en te valideren tijdens de testfase.