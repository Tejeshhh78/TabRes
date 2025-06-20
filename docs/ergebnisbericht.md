# Ergebnisbericht zum Anwendungsprojekt: Tischbuchungssystem für die DHBW Bad Mergentheim

## Inhaltsverzeichnis

- [Ergebnisbericht zum Anwendungsprojekt: Tischbuchungssystem für die DHBW Bad Mergentheim](#ergebnisbericht-zum-anwendungsprojekt-tischbuchungssystem-für-die-dhbw-bad-mergentheim)
  - [Inhaltsverzeichnis](#inhaltsverzeichnis)
  - [1. Projektthema \& Zielsetzung](#1-projektthema--zielsetzung)
  - [2. Projektteam](#2-projektteam)
  - [3. Projektverlauf](#3-projektverlauf)
    - [Planung \& Meilensteine](#planung--meilensteine)
    - [Konzeption \& Design](#konzeption--design)
    - [Frontend-Entwicklung](#frontend-entwicklung)
    - [Backend-Entwicklung](#backend-entwicklung)
    - [Teamkommunikation \& Tools](#teamkommunikation--tools)
  - [4. Technische Umsetzung](#4-technische-umsetzung)
  - [5. Ergebnisse](#5-ergebnisse)
  - [6. Reflexion](#6-reflexion)
  - [7. Ausblick](#7-ausblick)

---

## 1. Projektthema & Zielsetzung

Im Rahmen unseres zweiten Semesters im Studiengang Informatik an der DHBW Bad Mergentheim standen wir vor der spannenden Aufgabe, gemeinsam ein praxisnahes Anwendungsprojekt zu realisieren. Folgendes Thema haben wir uns für diese Aufgabe ausgesucht: **Entwicklung eines modernen Tischbuchungssystems für die Mitarbeiter der DHBW**. Gerade in Zeiten flexibler Arbeitsmodelle und wechselnder Präsenzzeiten ist es wichtig, dass Arbeitsplätze effizient und unkompliziert verwaltet werden können. Unsere Projektidee zielte daher darauf ab, eine digitale Lösung zu schaffen, die den Buchungsprozess für Arbeitsplätze deutlich vereinfacht und gleichzeitig die Zusammenarbeit im Team fördert.

Das Herzstück unseres Projekts ist eine **responsive Website**, die es den Mitarbeitern ermöglicht, flexibel und intuitiv Tische zu reservieren – unabhängig davon, ob sie gerade am Laptop im Büro oder mit dem Smartphone unterwegs sind. Die Plattform sollte nicht nur technisch zuverlässig funktionieren, sondern auch durch eine benutzerfreundliche Oberfläche überzeugen. Ein besonderes Augenmerk lag darauf, die Anwendung so zu gestalten, dass sie den unterschiedlichen Anforderungen der Nutzer gerecht wird: von der einfachen Einzelbuchung bis hin zur Teamkoordination und der Verwaltung von Favoriten.

Um die Sicherheit und Exklusivität der Plattform zu gewährleisten, war vorgesehen, den Zugang ausschließlich über die **DHBW-E-Mail-Adressen** zu ermöglichen. Das Buchungssystem selbst sollte möglichst flexibel sein: Nutzer können Tische frei wählen und in festgelegten Zeitslots – etwa für den Vor- oder Nachmittag – reservieren. Dabei werden relevante Informationen wie Name, Teamzugehörigkeit und Buchungszeitraum erfasst und können gezielt für andere freigegeben werden. Ergänzt wird das System durch verschiedene Übersichts- und Darstellungsfunktionen, wie eine **tabellarische Ansicht** und eine **3D-Visualisierung** der Sitzplätze, um die Orientierung zu erleichtern. Auch die Performance spielte eine wichtige Rolle, damit die Seite auch bei hoher Auslastung schnell und zuverlässig bleibt.

> **Ziel:** Den Arbeitsalltag an der DHBW Bad Mergentheim digitaler, flexibler und effizienter gestalten und die Zusammenarbeit sowie Kommunikation unter den Mitarbeitern stärken.

---

## 2. Projektteam

Das Projektteam setzte sich aus den drei Studierenden **Tejesh, Lukas und Maxim** zusammen. Die Aufgabenverteilung erfolgte grundsätzlich so, dass Lukas und Tejesh sich überwiegend mit der Entwicklung der Anwendung beschäftigten, während Maxim vor allem die Kommunikation, Planung und Dokumentation übernahm. Dennoch waren alle Teammitglieder in sämtliche Bereiche involviert und wichtige Entscheidungen wurden stets gemeinsam getroffen. Die Zusammenarbeit war geprägt von Offenheit und Kollegialität, sodass jeder seine Ideen und Vorschläge einbringen konnte. Durch die enge Abstimmung im Team konnten Herausforderungen gemeinsam bewältigt und die Projektziele konsequent verfolgt werden.

---

## 3. Projektverlauf

### Planung & Meilensteine

Die Planung des Projekts begann mit der Erstellung wichtiger Dokumente für den ersten Meilenstein, wie **Zieldefinition, Projektstrukturplan (PSP), Ressourcenplan** (mit je 100 Stunden Workload pro Person), einem **Zeitplan** und einer **kritischen Pfadanalyse**. Diese Unterlagen wurden in Abstimmung mit dem Auftraggeber erstellt und nach der Abgabe des ersten Meilensteins als Grundlage für die weitere Arbeit genutzt.

### Konzeption & Design

Die Konzeption und das Design des Projekts verliefen insgesamt sehr strukturiert und zielgerichtet. Nach der 1. Meilenstein-Abgabe wurde die Zieldefinition noch einmal im Team analysiert und geschärft, um sicherzustellen, dass alle Anforderungen und Wünsche klar verstanden wurden. Darauf aufbauend wurden sowohl technische als auch funktionale Spezifikationen detailliert ausgearbeitet. Dazu gehörte unter anderem die Festlegung, wie die Benutzeroberfläche aussehen und funktionieren soll, welche Benutzerrollen und Rechte es geben muss und wie die Datenbank strukturiert werden soll. Diese Konzepte dienten im weiteren Verlauf als wichtige Orientierung und wurden im Team regelmäßig überprüft und angepasst.

### Frontend-Entwicklung

Ein wichtiger Meilenstein war die Entwicklung des **Frontends**. Hier wurde zunächst ein Prototyp erstellt, um die grundlegende Bedienung und das Design zu testen. Im Anschluss daran wurden die verschiedenen Ansichten und Funktionen Schritt für Schritt umgesetzt, wie zum Beispiel die Login-Maske, die Übersicht der Buchungen, die Kartenansicht zur Auswahl von Tischen und die Verwaltung der eigenen Buchungen. Während der Entwicklung wurde viel Wert auf eine intuitive Bedienung und ein ansprechendes Design gelegt. Die Umsetzung erfolgte iterativ, das heißt, es wurden regelmäßig neue Funktionen ergänzt und bestehende verbessert.

<div style="page-break-after: always;"></div>

### Backend-Entwicklung

Parallel dazu wurde mit der Planung und ersten Umsetzung des **Backends** begonnen. Ziel war es, eine stabile und sichere Serverstruktur mit Node.js und MongoDB zu schaffen, die die Buchungsdaten verwaltet und die Kommunikation zwischen Frontend und Datenbank ermöglicht. Da das Team in diesem Bereich jedoch noch wenig Erfahrung hatte, gestaltete sich die Entwicklung des Backends als besonders herausfordernd und zeitintensiv. Es wurden erste Schnittstellen und Datenmodelle entwickelt, die jedoch im Rahmen des Projekts nicht vollständig fertiggestellt werden konnten.

### Teamkommunikation & Tools

Während des gesamten Projektverlaufs wurde die Zusammenarbeit im Team großgeschrieben. Über **Discord** und **Notion** wurden Aufgaben verteilt, Fortschritte dokumentiert und Probleme gemeinsam gelöst. Besonders hilfreich war das Kanban-Board in Notion, das einen guten Überblick über den aktuellen Stand und die nächsten Schritte bot. Auch die Kommunikation mit dem Auftraggeber verlief regelmäßig und konstruktiv, sodass auf Änderungswünsche und Feedback schnell reagiert werden konnte.

> **Zusammenfassung:** Trotz einiger Herausforderungen – insbesondere im Backend-Bereich – konnten viele wichtige Meilensteine erreicht und wertvolle Erfahrungen im Bereich der Softwareentwicklung, Teamarbeit und Projektorganisation gesammelt werden.

---

## 4. Technische Umsetzung

Die technische Umsetzung des Projekts erfolgte mit einem klaren Fokus auf moderne Webtechnologien und eine saubere Trennung zwischen Frontend und Backend.

- **Frontend:** HTML5, JavaScript und CSS für eine responsive und benutzerfreundliche Oberfläche, die sowohl auf Desktop-Computern als auch auf mobilen Endgeräten zuverlässig funktioniert. Besonderes Augenmerk lag auf der intuitiven Bedienbarkeit und einem ansprechenden Design.
- **Backend:** Umsetzung mit Node.js und JavaScript, geplant war die Nutzung einer MongoDB für die flexible Speicherung der Buchungsdaten, Nutzerinformationen und Konfigurationen. Die Entwicklung des Backends stellte das Team jedoch vor besondere Herausforderungen, da in diesem Bereich noch wenig Erfahrung vorhanden war. Aus diesem Grund wurde das Backend zwar begonnen, konnte aber im Rahmen des Projekts nicht vollständig fertiggestellt werden. Dennoch wurden bereits erste Schnittstellen und Datenmodelle entwickelt, die als Grundlage für eine spätere Fertigstellung dienen können.
- **Versionierung:** Der gesamte Quellcode des Projekts wurde über **GitHub** versioniert und im Team geteilt. Dadurch war es möglich, Änderungen transparent nachzuverfolgen, gemeinsam an verschiedenen Komponenten zu arbeiten und den aktuellen Stand jederzeit abzugleichen. Die Nutzung von GitHub trug wesentlich zur effizienten Zusammenarbeit und zur Qualitätssicherung im Projekt bei.

<div style="page-break-after: always;"></div>

## 5. Ergebnisse

Im Verlauf des Projekts konnten verschiedene zentrale Funktionen erfolgreich umgesetzt werden:

- **Login-Bereich:** In der Datei `config.js` besteht die Möglichkeit, Benutzer in einer Simulationsdatenbank anzulegen. Mit diesen Benutzerdaten kann man sich anschließend in das System einloggen. Dies bildet die Grundlage für die individuelle Nutzung der Plattform und sorgt dafür, dass Buchungen personalisiert und nachvollziehbar sind.
- **Konfiguration:** Die Konfiguration von Karten, Räumen und Tischen erfolgt ebenfalls über die `config.js`. So können verschiedene Raum- und Tischkonstellationen flexibel abgebildet werden, was die Anwendung vielseitig und anpassbar macht.
- **Buchungsverwaltung:** Nutzer haben die Möglichkeit, ihre eigenen Buchungen einzusehen, zu verwalten, zu stornieren oder zu ändern. Dies gibt den Anwendern die volle Kontrolle über ihre Reservierungen und sorgt für Transparenz.
- **Top-Down-Kartenmenü:** Über das Kartenmenü können neue Tische für den Vormittag, Nachmittag oder den ganzen Tag gebucht werden. Die grafische Darstellung der Räume und Tische erleichtert die Orientierung und macht den Buchungsprozess besonders intuitiv. Bereits gebuchte Tische sowie noch verfügbare Plätze werden übersichtlich angezeigt.
- **Backend-Entwicklung:** Obwohl das Backend im Rahmen des Projekts nicht vollständig fertiggestellt werden konnte, wurden bereits erste Schnittstellen und Datenmodelle entwickelt. Diese bilden eine solide Basis für die spätere Weiterentwicklung und Integration weiterer Funktionen, wie etwa die Anbindung an eine echte Datenbank oder die Umsetzung komplexerer Buchungslogiken.

> **Fazit:** Die wichtigsten Grundfunktionen der Plattform wurden umgesetzt und die Anwendung kann in einer Testumgebung genutzt werden. Die modulare Struktur und die klare Trennung zwischen Frontend und Backend ermöglichen eine gezielte Erweiterung und Anpassung an neue Anforderungen.

---

## 6. Reflexion

Die Projektplanung und die interne Kommunikation im Team verliefen insgesamt sehr gut. Die Aufgaben wurden mithilfe von Tools wie Notion und Discord verteilt und der Fortschritt regelmäßig dokumentiert. Besonders das Kanban-Board in Notion erwies sich als hilfreich, um den Überblick über offene Aufgaben und bereits erledigte Arbeitsschritte zu behalten. Die Zusammenarbeit war geprägt von gegenseitiger Unterstützung und einem offenen Austausch, sodass Herausforderungen gemeinsam bewältigt werden konnten.

Rückblickend hätte die Aufgabenverteilung noch effizienter gestaltet werden können, um Engpässe – insbesondere bei der Backend-Entwicklung – zu vermeiden. Die Entwicklung des Backends stellte das Team vor große Herausforderungen, da in diesem Bereich wenig Erfahrung vorhanden war. Im Nachhinein wäre es sinnvoll gewesen, sich früher und intensiver mit den benötigten Technologien auseinanderzusetzen oder gezielt externe Unterstützung einzuholen. Diese Erkenntnis wird das Team in zukünftigen Projekten berücksichtigen.

Ein weiterer Punkt ist das Verhältnis zwischen Planung und Umsetzung: Es wurde viel Zeit in die Konzeption und Dokumentation investiert, wodurch die eigentliche Entwicklung teilweise zu kurz kam. Für kommende Projekte ist geplant, die Balance zwischen Planung und praktischer Umsetzung besser zu steuern, um die Entwicklungszeit optimal zu nutzen.

> **Lernmoment:** Insgesamt hat das Team wertvolle Erfahrungen im Bereich der Softwareentwicklung, der Teamarbeit und der Projektorganisation gesammelt. Die Zusammenarbeit verlief konstruktiv und lösungsorientiert, was sich positiv auf das Projektergebnis ausgewirkt hat.

---

## 7. Ausblick

Das Projekt bietet eine Vielzahl an Möglichkeiten für die Weiterentwicklung und Optimierung. Ein wichtiger nächster Schritt ist die Fertigstellung und Integration des Backends, um die Anwendung auch im produktiven Einsatz nutzen zu können. Hierzu gehört insbesondere die Anbindung an eine echte Datenbank, die Implementierung sicherer Schnittstellen und die Erweiterung der Buchungslogik, beispielsweise für Gruppenbuchungen oder wiederkehrende Reservierungen.

Auch die Benutzerfreundlichkeit und das Design der Website können weiter verbessert werden. Dazu zählen eine noch intuitivere Navigation, ansprechende Visualisierungen und die Optimierung für verschiedene Endgeräte. Die Implementierung der DHBW-Mail-Authentifizierung ist ein weiterer wichtiger Punkt, um die Sicherheit und Exklusivität der Plattform zu gewährleisten.

Darüber hinaus fehlen aktuell noch einige geplante Features, wie die tabellarische Übersicht der Buchungen, die gezielte Informationsfreigabe für andere Nutzer oder Teams sowie die Möglichkeit, Favoriten und Teams zu verwalten. Auch die Integration von Filter- und Suchfunktionen, eine 3D-Visualisierung der Sitzplätze und die Möglichkeit, regelmäßige Buchungen anzulegen, stehen auf der Liste der zukünftigen Erweiterungen.

> **Perspektive:** Die bisher geschaffene Basis ermöglicht es, neue Funktionen und Verbesserungen schrittweise zu integrieren und die Anwendung an die Bedürfnisse der Nutzer anzupassen. Das Team sieht in der Weiterentwicklung des Projekts eine spannende Gelegenheit, die im Rahmen des Studiums erworbenen Kenntnisse weiter zu vertiefen und praxisnah anzuwenden.
