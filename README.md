# TabRes

Vorwarnung:
Größen und Positionen sind allerdings sehr amateurhaft zusammengebaut.
Wenn man width an bestimmten Stellen ändert, verlieren die Knöpfe ihre Position.
Deshalb kann momentan nur width = 100% verwendet werden.



Wie eine Karte hinzufügen funktioniert:
    1) Hinterlege das Bild im Ordner Ressources.
    2) Erstelle eine html im Ordner Maps (siehe Maps/B1L1R1Map.html als Referenz).
       Nutze dazu TemplateMap.html.
        - Benenne die Datei so: Gebäudename_Etagenname_Raumname_Map
          z.B. Building1_Level1_Room1_Map.html
          Wichtig ist dabei, dass die values so auch in Schritt 3 in die Dropdownliste
          eingefügt werden, also mit genau diesen Bezeichnungen!
        - Lade das Bild in den Hintergrund (siehe Template).
        - Lege die Knöpfe an die gewünschte Stelle (relativ zum Container, verwende
          Klasse seat-button!)
        Achtung: Verwende relative Werte, sodass die Knöpfe auf jedem Gerät an der
        gewünschten Stelle erscheinen.
    3) Füge im Kartenselektore MapSelector/MapSelector.html einen Eintrag in den
       Dropdown-Listen hinzu.
    4) Hinterlege die Logik zum Aufruf in SelectorLogic.js.



Zur Buchungslogik:

Die Logik für Buchungen wird in Maps/Booking.js implementiert, und zwar genauer in der
Logik für den "Confirm" button des booking popups (im Moment des Verfassens beginnend
ab Zeile 90).

Ich habe eine mock Database in Maps/Database.js erstellt. Die Struktur dieser Datenbank
ist in Ressources/MockDatabaseStructure.png erklärt. Im Grunde ist die Datenbank ein
Objekt mit key timeSlot und dann einem Array von Buchungen, die wiederum ein Objekt mit
keys seatID (wird im html der map verteilt) und seatData (was die Buchungsdaten enthält).

Database.js kann mit beliebigen Funktionen erweitert werden. Momentan verwende ich die
Java Skripte noch NICHT als Module, damit ich ohne Node.js testen kann und ich noch
Probleme mit Importen hatte. Verwendet man sie nicht als Modul, dann haben sie global
scope und so kann in Booking.js auf Funktionen von Database.js ohne Import zugegriffen
werden, da Database.js zuerst geladen wird. Später sollen sie als Module verwendet
werden, damit Konflikte vermieden werden.

Als nächstes wird die Logik der Buttons angepasst, sodass sie die Datenbank zum Validieren
verwenden anstatt die Farbe des Buttons (bisher nämlich: roter Button = Buchen nicht erlaubt).
Dann füge ich eine weitere Karte hinzu und lade ein paar Buchungen in die Datenbank zum
Testen der neuen Logik.
