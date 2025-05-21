# TabRes

**Vorwarnung:**  
Größen und Positionen sind sehr amateurhaft zusammengebaut.  
Wenn man `width` an bestimmten Stellen ändert, verlieren die Knöpfe ihre Position.  
Deshalb kann momentan nur `width = 100%` verwendet werden.

---

## Wie eine Karte hinzufügen funktioniert:

1. Hinterlege das Bild im Ordner `Ressources`.
2. Erstelle eine HTML-Datei im Ordner `Maps` (siehe `Maps/B1L1R1Map.html` als Referenz).  
   Nutze dazu `TemplateMap.html`.
   - Benenne die Datei so: `Gebäudename_Etagenname_Raumname_Map`  
     z. B. `Building1_Level1_Room1_Map.html`
   - Wichtig: Die Benennungen müssen genau so auch in Schritt 3 in die Dropdownliste eingefügt werden.
   - Lade das Bild in den Hintergrund (siehe Template).
   - Lege die Knöpfe an die gewünschte Stelle (relativ zum Container, verwende Klasse `seat-button`!)  
     **Achtung:** Verwende relative Werte, sodass die Knöpfe auf jedem Gerät an der gewünschten Stelle erscheinen.
3. Füge im Kartenselektor `MapSelector/MapSelector.html` einen Eintrag in den Dropdown-Listen hinzu.
4. Hinterlege die Logik zum Aufruf in `SelectorLogic.js`.

---

## Zur Buchungslogik:

- Die Logik für Buchungen wird in `Maps/Booking.js` implementiert, genauer in der Logik für den *"Confirm"* Button des Buchungs-Popups  
  *(Stand: ab Zeile 90)*.

- Eine Mock-Datenbank liegt in `Maps/Database.js`.  
  Die Struktur der Datenbank ist in `Ressources/MockDatabaseStructure.png` erklärt.

- Struktur:
  - Ein Objekt mit Key `timeSlot`
  - Wert ist ein Array von Buchungen
  - Jede Buchung ist ein Objekt mit:
    - `seatID` (kommt aus dem HTML der Map)
    - `seatData` (enthält die Buchungsdaten)

- `Database.js` kann beliebig erweitert werden.  
  Aktuell **nicht** als Modul implementiert, um Node.js zu vermeiden und Importprobleme zu umgehen:
  - Dadurch haben die Dateien globalen Scope
  - `Booking.js` kann direkt auf Funktionen von `Database.js` zugreifen, wenn diese vorher geladen wurde

- Geplant:
  - Umstellung auf Module zur Vermeidung von Namenskonflikten

---

## Nächste Schritte:

- Logik der Buttons anpassen:
  - Validierung über Datenbank statt Buttonfarbe  
    *(bisher: roter Button = Buchung nicht erlaubt)*

- Weitere Karte hinzufügen

- Testbuchungen in Datenbank laden

