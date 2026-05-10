# Data Model

## Projectnaam
Aquafin Smart Maintenance Platform

---

# 1. Doel

Dit document beschrijft het datamodel van de applicatie.

Het datamodel bepaalt:
- welke gegevens opgeslagen worden
- hoe gegevens met elkaar verbonden zijn
- welke entiteiten nodig zijn
- welke designkeuzes gemaakt zijn en waarom

---

# 2. Entiteiten Overzicht

De applicatie gebruikt volgende hoofdentiteiten:

| Entiteit | Beschrijving |
|---|---|
| Category | Materiaalcategorieën |
| Material | Beschikbare materialen |
| Order | Geplaatste bestellingen |
| OrderItem | Individuele materiaalregels binnen een bestelling |
| RainfallData | Historische neerslaggegevens (seed data) |
| RiskResult | Berekende risicoresultaten per seizoen |

> **Opmerking over authenticatie:** Voor dit project wordt geen volledige authenticatie geïmplementeerd. De naam van de technieker wordt als vrij tekstveld opgeslagen bij een bestelling. Reden: de scope van dit project ligt bij risicoanalyse, materiaalbeheer en bestellen — niet bij gebruikersbeheer. Dit is een bewuste, gedocumenteerde vereenvoudiging.

---

# 3. Entity Relationship Diagram

```text
┌────────────┐       ┌────────────────┐
│  Category  │       │    Material    │
│────────────│       │────────────────│
│ id (PK)    │◄──────│ id (PK)        │
│ name       │  1:N  │ name           │
└────────────┘       │ categoryId(FK) │
                     │ isFloodTool    │
                     │ isActive       │
                     └───────┬────────┘
                             │ 1:N
                             ▼
┌────────────┐       ┌────────────────┐
│   Order    │       │   OrderItem    │
│────────────│       │────────────────│
│ id (PK)    │◄──────│ id (PK)        │
│ technician │  1:N  │ orderId (FK)   │
│ Name       │       │ materialId(FK) │──► Material
│ deliveryDt │       │ quantity       │
│ createdAt  │       └────────────────┘
│ status     │
└────────────┘

┌──────────────┐       ┌────────────────┐
│ RainfallData │       │   RiskResult   │
│──────────────│       │────────────────│
│ id (PK)      │──────►│ id (PK)        │
│ year         │ berek.│ year           │
│ month        │       │ season         │
│ rainfallMm   │       │ predictedMm    │
└──────────────┘       │ threshold      │
                       │ riskLevel      │
                       └────────────────┘
```

---

# 4. Tabellen

## 4.1 Category

Materiaalcategorieën voor het groeperen van materialen.

| Veld | Type | Constraints | Beschrijving |
|---|---|---|---|
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unieke identifier |
| name | TEXT | NOT NULL, UNIQUE | Naam van de categorie |

**Seed data (voorbeelden):**
- Bevestigingsmateriaal
- Gereedschap
- Technisch onderhoud
- Riolering & Aquafin tools
- Diversen

---

## 4.2 Material

Alle beschikbare materialen in de catalogus.

| Veld | Type | Constraints | Beschrijving |
|---|---|---|---|
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unieke identifier |
| name | TEXT | NOT NULL | Materiaalnaam |
| categoryId | INTEGER | FOREIGN KEY → Category.id | Categorie |
| isFloodTool | INTEGER | DEFAULT 0 (0=nee, 1=ja) | Relevant bij overstromingsrisico |
| isActive | INTEGER | DEFAULT 1 (0=nee, 1=ja) | Beschikbaar in catalogus |

> **Opmerking:** SQLite heeft geen native BOOLEAN type. Waarden 0 en 1 worden gebruikt als boolean vervanging.

**Voorbeelden flood tools (isFloodTool = 1):**
- Dompelpomp
- Rioolstop
- Slangenwagen
- Gasdetectiemeter
- Hogedrukreiniger
- Ontstoppingsveer

---

## 4.3 Order

Bestellingen geplaatst door techniekers.

| Veld | Type | Constraints | Beschrijving |
|---|---|---|---|
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unieke identifier |
| technicianName | TEXT | NOT NULL | Naam van de technieker |
| deliveryDate | TEXT | NOT NULL | Gewenste leverdatum (ISO 8601 formaat) |
| createdAt | TEXT | DEFAULT CURRENT_TIMESTAMP | Aanmaaktijdstip |
| status | TEXT | DEFAULT 'pending' | Status van de bestelling |

**Mogelijke statussen:**

| Status | Beschrijving |
|---|---|
| pending | Bestelling geplaatst, nog niet verwerkt |
| approved | Bestelling goedgekeurd |
| delivered | Materiaal geleverd |
| cancelled | Bestelling geannuleerd |

---

## 4.4 OrderItem

Individuele materiaalregels binnen een bestelling.

| Veld | Type | Constraints | Beschrijving |
|---|---|---|---|
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unieke identifier |
| orderId | INTEGER | FOREIGN KEY → Order.id | Verwijzing naar bestelling |
| materialId | INTEGER | FOREIGN KEY → Material.id | Verwijzing naar materiaal |
| quantity | INTEGER | NOT NULL, CHECK > 0 | Aantal besteld |

---

## 4.5 RainfallData

Historische neerslaggegevens (2004–2025), ingevoerd als seed data.

| Veld | Type | Constraints | Beschrijving |
|---|---|---|---|
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unieke identifier |
| year | INTEGER | NOT NULL | Jaar van meting |
| month | INTEGER | NOT NULL, CHECK 1–12 | Maand van meting |
| rainfallMm | REAL | NOT NULL | Neerslag in millimeter |

> De gegevens komen rechtstreeks uit de KMI-meetdata die Aquafin aanleverde (2004–2025).

---

## 4.6 RiskResult

Berekende risicoresultaten per seizoen en jaar.

| Veld | Type | Constraints | Beschrijving |
|---|---|---|---|
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unieke identifier |
| year | INTEGER | NOT NULL | Voorspeld jaar |
| season | TEXT | NOT NULL | Seizoen (Winter/Lente/Zomer/Herfst) |
| predictedRainfall | REAL | NOT NULL | Voorspelde seizoensneerslag (mm) |
| threshold | REAL | NOT NULL | Seizoensdrempel (mm) |
| riskLevel | TEXT | NOT NULL | Risiconiveau (low/medium/high) |

---

# 5. Relaties

## Category → Material (1:N)

```text
Één categorie bevat nul of meer materialen.
Elk materiaal behoort tot precies één categorie.
```

## Order → OrderItem (1:N)

```text
Één bestelling bevat één of meer orderregels.
Elke orderregel behoort tot precies één bestelling.
```

## Material → OrderItem (1:N)

```text
Één materiaal kan voorkomen in nul of meer orderregels.
Elke orderregel verwijst naar precies één materiaal.
```

## RainfallData → RiskResult (logische koppeling)

```text
Historische neerslagdata wordt verwerkt door de Risk Analysis Engine
om RiskResult-records te genereren. Er is geen directe foreign key,
omdat de berekening runtime plaatsvindt.
```

---

# 6. SQL Schema

```sql
CREATE TABLE Category (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT    NOT NULL UNIQUE
);

CREATE TABLE Material (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  categoryId  INTEGER NOT NULL,
  isFloodTool INTEGER NOT NULL DEFAULT 0,
  isActive    INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (categoryId) REFERENCES Category(id)
);

CREATE TABLE "Order" (
  id              INTEGER PRIMARY KEY AUTOINCREMENT,
  technicianName  TEXT    NOT NULL,
  deliveryDate    TEXT    NOT NULL,
  createdAt       TEXT    DEFAULT CURRENT_TIMESTAMP,
  status          TEXT    NOT NULL DEFAULT 'pending'
);

CREATE TABLE OrderItem (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  orderId    INTEGER NOT NULL,
  materialId INTEGER NOT NULL,
  quantity   INTEGER NOT NULL CHECK(quantity > 0),
  FOREIGN KEY (orderId)    REFERENCES "Order"(id),
  FOREIGN KEY (materialId) REFERENCES Material(id)
);

CREATE TABLE RainfallData (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  year        INTEGER NOT NULL,
  month       INTEGER NOT NULL CHECK(month BETWEEN 1 AND 12),
  rainfallMm  REAL    NOT NULL
);

CREATE TABLE RiskResult (
  id                 INTEGER PRIMARY KEY AUTOINCREMENT,
  year               INTEGER NOT NULL,
  season             TEXT    NOT NULL,
  predictedRainfall  REAL    NOT NULL,
  threshold          REAL    NOT NULL,
  riskLevel          TEXT    NOT NULL
);
```
---

# 7. Designkeuzes

## SQLite als database

SQLite is gekozen omdat het geen serverinstallatie vereist. De database leeft als één bestand in de projectmap en integreert eenvoudig met Node.js via `better-sqlite3`.

## Forecasts worden dynamisch berekend

RiskResult-records worden runtime berekend en kunnen optioneel gecacht worden, maar worden niet permanent opgeslagen als primaire bron van waarheid. Dit vermijdt synchronisatieproblemen met de onderliggende neerslagdata.

## Soft delete voor materialen

Materialen worden niet fysiek verwijderd (`DELETE`), maar gedeactiveerd via `isActive = 0`. Dit beschermt historische ordergegevens die nog naar dat materiaal verwijzen.

## isFloodTool als expliciete markering

Door flood tools expliciet te markeren met een boolean, kan de Recommendation Engine eenvoudig filteren zonder complexe business logic.

## Geen authenticatie

Gebruikersbeheer en authenticatie vallen buiten de scope van dit project. De naam van de technieker wordt als vrij tekstveld opgeslagen. Dit is een gedocumenteerde vereenvoudiging.

---

# 9. Conclusie

Het datamodel ondersteunt alle kernfunctionaliteiten op een onderhoudbare en uitbreidbare manier. De keuze voor SQLite, soft deletes en expliciete flood tool markering maakt de implementatie eenvoudig zonder in te boeten op functionaliteit.