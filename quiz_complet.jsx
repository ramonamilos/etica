import { useState, useEffect, useCallback } from "react";

// ─── DATE ────────────────────────────────────────────────────────────────────
const ALL_QUESTIONS = [
  { id: 1, text: "Modularitatea înseamnă:", options: ["Stabilirea unor ierarhii în program", "Determinarea unor secvențe de program", "Stabilirea riguroasă a intrărilor și ieșirilor", "Delimitarea unor secvențe de program, cu intrări și ieșiri bine precizate, între care se stabilesc relații ierarhice"], correct: 3, explanation: "Modularitatea = dividerea programului în module cu intrări/ieșiri bine delimitate, structurate ierarhic. Este un PRINCIPIU al ingineriei software.", status: "✅", topic: "Ingineria Programării", source: "MPSAM" },
  { id: 2, text: "Obiectivele ingineriei programării stabilesc:", options: ["Dezideratele activității de proiectare software", "Modele de proiectare", "Principii care trebuie urmate la proiectare", "Modelele și principiile de proiectare"], correct: 0, explanation: "Obiectivele = deziderate (aspirații) pe care proiectanții le au în vedere în tot ciclul de viață. Diferit de principii (care sunt modalitățile de atingere a obiectivelor).", status: "⚠️ Barem IP marchează (c)! Discutați cu profesorul.", topic: "Ingineria Programării", source: "MPSAM" },
  { id: 3, text: "Adaptabilitatea se referă la:", options: ["Obiectivul de realizare a unor programe adaptate unor situații concrete de funcționare", "Principiul de programare prin care programul trebuie să fie ușor de modificat", "Obiectivul de realizare a unor programe care să poată fi ușor adaptate pentru condiții diferite de funcționare", "Principiul de proiectare prin care se cere proiectantului să se adapteze ușor la noi cerințe"], correct: 2, explanation: "Adaptabilitatea (Flexibilitatea) este un OBIECTIV al ingineriei software = posibilitatea adaptării la cerințe noi (schimbări fizice, funcții noi, extensii de volum). Nu e un principiu.", status: "✅", topic: "Ingineria Programării", source: "MPSAM" },
  { id: 4, text: "Prototipizarea este o paradigmă a ingineriei programării care se referă la:", options: ["Construirea aplicațiilor prin metoda top-down", "Dezvoltarea rapidă a unui model simplificat al programului, interacțiunea cu clientul și adăugarea ulterioară a funcțiilor omise", "Construirea unui prototip al programului și modificarea acestuia", "Proiectarea folosind descrieri-tip ale modulelor de program disponibile"], correct: 1, explanation: "Prototipizarea = model simplificat rapid + interacțiune cu clientul + adăugarea ulterioară a funcțiilor omise. Riscul: clientul poate crede că aplicația finală e aproape gata.", status: "✅", topic: "Ingineria Programării", source: "MPSAM" },
  { id: 5, text: "Principiile ingineriei programării se referă la:", options: ["Modalitățile de atingere a obiectivelor ingineriei programării", "Modele folosite în procesul de proiectare", "Scopurile programării", "Destinația activității de programare"], correct: 0, explanation: "OBIECTIVE = CE vrem (adaptabilitate, eficiență, fiabilitate, perceptibilitate). PRINCIPII = CUM atingem obiectivele (modularitate, abstractizare, ascundere, localizare, uniformitate, completitudine, confirmabilitate).", status: "✅", topic: "Ingineria Programării", source: "MPSAM" },
  { id: 6, text: "\"Ascunderea\" (information hiding) este utilă pentru:", options: ["Mai buna structurare a programului", "Definirea unor interfețe complexe", "Definirea unor restricții de acces și ascunderea detaliilor nesemnificative ale unui modul", "Ascunderea detaliilor referitoare la tratarea erorilor"], correct: 2, explanation: "Ascunderea = accentuarea elementelor esențiale + definirea restricțiilor de acces (ex: encapsulare OOP). Diferă de abstractizare: ambele accentuează esențialul, dar ascunderea definește EXPLICIT restricțiile de acces.", status: "✅", topic: "Ingineria Programării", source: "MPSAM" },
  { id: 7, text: "Obiectivele ingineriei programării sunt:", options: ["Modularitatea, confirmabilitatea, adaptabilitatea, eficiența", "Adaptabilitatea, eficiența, fiabilitatea, perceptibilitatea", "Adaptabilitatea, eficiența, modularitatea, confirmabilitatea", "Modularitatea, abstractizarea, ascunderea, eficiența, fiabilitatea, perceptibilitatea, confirmabilitatea"], correct: 1, explanation: "⚠️ OBIECTIVE: adaptabilitate, eficiență, fiabilitate, perceptibilitate (+ confirmabilitate). PRINCIPII: modularitate, abstractizare, ascundere, localizare, uniformitate, completitudine. Varianta d amestecă cele două!", status: "⚠️ Distincția obiective vs. principii este ESENȚIALĂ pentru examen", topic: "Ingineria Programării", source: "MPSAM" },
  { id: 8, text: "Un sistem Delta de stocare de versiuni:", options: ["Cuprinde convențiile de nume pentru a discerne între versiuni ale aceluiași produs", "Reprezintă toate versiunile printr-o singură copie + diferențele marcate prin compilare condițională", "Memorează o singură versiune completă și le reprezintă pe celelalte prin reținerea diferențelor de la una la alta", "Stochează toate versiunile complet și independent"], correct: 2, explanation: "Delta = O versiune completă stocată + celelalte reprezentate prin DIFERENȚE față de aceasta. (Varianta b descrie compilarea condițională — tehnică diferită.)", status: "✅", topic: "Managementul Configurațiilor", source: "MPSAM" },
  { id: 9, text: "Ce este o revizie?", options: ["O nouă versiune destinată a înlocui versiunea veche, reflectând evoluția în depanare și îmbunătățiri", "O nouă versiune care realizează aceleași funcționalități pentru situații ușor diferite, ca alternativă interschimbabilă", "Un mecanism care arată organizarea unui set de variații și relațiile dintre acestea", "O copie de siguranță a versiunii curente"], correct: 0, explanation: "REVIZIE = înlocuiește versiunea veche (evoluție, depanare, îmbunătățiri). VARIANTĂ = alternativă interschimbabilă pentru situații ușor diferite (ex: versiuni pentru țări diferite).", status: "✅", topic: "Managementul Configurațiilor", source: "MPSAM" },
  { id: 10, text: "Problema dublei întrețineri rezultă dacă:", options: ["Mai mulți proiectanți au drepturi pentru acces și modificare simultană a acelorași date", "Se mențin copii multiple ale aceluiași cod sursă", "Doi proiectanți actualizează simultan același cod sursă, putând suprascrie modificări", "Un programator modifică același fișier de două ori"], correct: 1, explanation: "Dubla întreținere = menținerea de COPII MULTIPLE ale aceluiași cod. Varianta c descrie problema 'update pierdut' (concurrent update problem) — problemă diferită.", status: "✅", topic: "Managementul Configurațiilor", source: "MPSAM" },
  { id: 11, text: "Un proces de Charge-out (descărcare din depozit) realizează:", options: ["Copierea modulului din depozit în spațiul de lucru și ȘTERGEREA lui din depozit", "Copierea modulului din depozit în spațiul de lucru al programatorului și BLOCAREA (lock) accesului la acel modul", "Crearea unei noi revizii în depozit și eliminarea blocării accesului", "Arhivarea versiunii curente"], correct: 1, explanation: "Charge-out (check-out) = copiere din depozit în spațiul de lucru + BLOCARE (lock). Nimeni altcineva nu mai poate face check-out pe același modul până la check-in.", status: "✅", topic: "Managementul Configurațiilor", source: "MPSAM" },
  { id: 12, text: "Un proces de Charge-in (încărcare în depozit) realizează:", options: ["Copierea modulului din depozit în spațiul de lucru și ștergerea lui din depozit", "Copierea modulului din depozit în spațiul de lucru și blocarea accesului", "Crearea unei noi revizii în depozit și eliminarea blocării accesului (unlock)", "Ștergerea versiunii vechi și înlocuirea cu cea nouă"], correct: 2, explanation: "Charge-in (check-in) = creare nouă revizie în depozit + ELIMINAREA blocării (unlock). Alți programatori pot acum prelua modulul.", status: "✅", topic: "Managementul Configurațiilor", source: "MPSAM" },
  { id: 13, text: "Caracteristica esențială a modelului în V de dezvoltare software este:", options: ["Fiecare pas de proiectare este asociat cu pasul corespunzător de testare, prin completarea directă a echipelor; aripa stângă poate fi reexecutată", "Testele de acceptanță validează cerințele prin conlucrarea client-dezvoltator; aripa stângă poate fi reexecutată", "Realizarea unui produs parțial (prototip) pentru examinarea interfețelor; codarea e în vârful V-ului", "Dezvoltarea se face exclusiv liniar, de sus în jos"], correct: 0, explanation: "Modelul V: stânga = proiectare, dreapta = testare corespunzătoare, legate prin completarea DIRECTĂ a echipelor. Aripa stângă poate fi reexecutată pentru a îmbunătăți cerințele/proiectarea/codificarea.", status: "✅", topic: "Ciclul de Viață Software", source: "MPSAM" },
  { id: 14, text: "Întrebările dintr-un interviu pentru manager de proiect trebuie să fie:", options: ["Lungi și detaliate, pentru a testa cunoștințele tehnice", "Cât mai scurte (fraze de cel mult 2-3 rânduri) și să lase loc de dezvoltare din partea candidatului", "Structurate ca teste grilă cu un singur răspuns corect", "Focusate exclusiv pe experiența tehnică anterioară"], correct: 1, explanation: "Întrebările scurte (max. 2-3 rânduri) care lasă loc de dezvoltare evaluează modul de gândire al candidatului, nu doar cunoștințele factuale.", status: "✅", topic: "Managerul de Proiect", source: "MPSAM" },
  { id: 15, text: "Motivația unui manager de proiect este legată de:", options: ["Conținut, complexitate, anvergura proiectului", "Conținutul și valoarea proiectului", "Prestigiul pe care îl poate aduce succesul proiectului", "Toate variantele de mai sus"], correct: 0, explanation: "Conform cursului, motivația managerului e legată de conținutul, complexitatea și anvergura proiectului — aceștia sunt factorii care îl provoacă și îl motivează profesional.", status: "⚠️ Verificați în curs", topic: "Managerul de Proiect", source: "MPSAM" },
  { id: 16, text: "Succesul unui proiect poate fi măsurat prin:", options: ["Respectarea strictă a bugetului și a termenelor", "Predarea livrabilelor, obținerea beneficiilor, satisfacția clientului", "Numărul de linii de cod livrate și absența bug-urilor", "Absența defectelor după 6 luni de la lansare"], correct: 1, explanation: "Succesul = 3 dimensiuni: (1) predarea livrabilelor, (2) obținerea beneficiilor planificate, (3) satisfacția clientului. Nu e suficient să livrezi la timp și în buget dacă beneficiile nu se materializează.", status: "✅", topic: "Noțiuni de Bază", source: "MPSAM" },
  { id: 17, text: "Cele mai importante cauze de eșec ale proiectelor software sunt:", options: ["Lipsa documentației și bugetul insuficient", "Abordarea necorespunzătoare a riscurilor, neconcordanța produsului cu cerințele, neajunsurile de natură tehnologică", "Echipa prea mică și termenele prea strânse", "Comunicarea deficitară și rotația mare a personalului"], correct: 1, explanation: "3 cauze principale de eșec: (1) gestionarea proastă a riscurilor, (2) produsul nu corespunde cerințelor, (3) probleme tehnologice.", status: "✅", topic: "Noțiuni de Bază", source: "MPSAM" },
  { id: 18, text: "Pentru a comunica eficient cu clienții, managerul de proiect trebuie să:", options: ["Trimită rapoarte săptămânale standardizate tuturor clienților", "Identifice și categorizeze clienții, ierarhizeze influența lor, stabilească informații relevante, aleagă momentul/mijloacele optime și identifice ce are nevoie în schimb de la client", "Comunice exclusiv în scris pentru a păstra documentația", "Delege comunicarea cu clienții echipei tehnice"], correct: 1, explanation: "5 pași pentru comunicare eficientă: identificare+categorizare clienți → ierarhizare influență → stabilire informații relevante → alegere moment/mijloace optime → identificare ce ai nevoie în schimb.", status: "✅", topic: "Comunicarea", source: "MPSAM" },
  { id: 19, text: "Complexitatea Halstead estimează numărul de linii de cod pe baza:", options: ["Numărului de funcții și clase din program", "Numărului de operatori și operanzi și numărul de apariții în program al acestora", "Numărului de comentarii și nivelului de documentație", "Numărului de fișiere sursă și module"], correct: 1, explanation: "Modelul Halstead (1977): 4 entități: n1=nr. operatori diferiți, n2=nr. operanzi diferiți, N1=nr. total apariții operatori, N2=nr. total apariții operanzi. Oferă măsură mai bună decât simpla numărare a liniilor.", status: "✅", topic: "Estimarea Efortului", source: "MPSAM" },
  { id: 20, text: "Modelul COCOMO de estimare a efortului de proiectare dă o estimare prin:", options: ["Analiza punctelor funcționale și complexitatea algoritmilor", "Numărul de teste unitare și de integrare planificate", "Formula E = b × KLOC^c, cu 3 clase de proiecte (organice, semidetașate, integrate) ce determină constantele b și c", "Numărul de întâlniri cu clientul și documentele produse"], correct: 2, explanation: "COCOMO (Boehm, 1981): E = b × KLOC^c. Organice: b=2.4, c=1.05. Semidetașate: b=3.0, c=1.12. Integrate: b=3.6, c=1.20 (constrângeri severe, ex: control trafic aerian).", status: "✅", topic: "Estimarea Efortului", source: "MPSAM" },
  { id: 21, text: "În cadrul proiectelor software, procesele primare sunt:", options: ["Analiză, proiectare, implementare, testare, mentenanță", "Achiziție, furnizare, dezvoltare, utilizare, întreținere", "Planificare, execuție, control, finalizare", "Cerințe, arhitectură, codificare, validare, integrare"], correct: 1, explanation: "Procesele PRIMARE (standard): achiziție, furnizare, dezvoltare, utilizare, întreținere. Diferite de activitățile de management (stabilire domeniu, planificare, execuție+control, analiză+evaluare, finalizare).", status: "✅", topic: "Procese și Activități", source: "MPSAM" },
  { id: 22, text: "În cadrul procesului de management, activitățile sunt:", options: ["Analiză, proiectare, implementare, testare", "Stabilirea domeniului aplicației, planificarea, execuția și controlul, analiza și evaluarea, finalizarea", "Inițiere, planificare, execuție, monitorizare, închidere", "Cerințe, design, cod, test, mentenanță"], correct: 1, explanation: "5 activități de management: (1) Stabilirea domeniului, (2) Planificarea, (3) Execuția și controlul, (4) Analiza și evaluarea, (5) Finalizarea.", status: "✅", topic: "Procese și Activități", source: "MPSAM" },
  { id: 23, text: "Echipa de intervenție are ca scop:", options: ["Gestionarea crizelor în producție și suportul utilizatorilor", "Investigarea unor aspecte neclare ale sistemului, validarea unor alternative de proiectare, depistarea și înlăturarea unor bug-uri", "Înlocuirea membrilor echipei care pleacă din proiect", "Realizarea auditurilor de calitate ale codului"], correct: 1, explanation: "Echipa de intervenție = echipă specializată pentru: investigare aspecte neclare + validare alternative proiectare + depistare și înlăturare bug-uri. Nu e un helpdesk.", status: "✅", topic: "Procese și Activități", source: "MPSAM" },
  { id: 24, text: "Structura de alocare a activităților (WBS) este:", options: ["Un grafic Gantt cu toate activitățile proiectului", "O diagramă de flux a proceselor software", "O matrice de responsabilități a echipei", "O structură de tip arbore prin care întreaga activitate ce trebuie desfășurată este defalcată pe pachete care sunt împărțite în elemente"], correct: 3, explanation: "WBS (Work Breakdown Structure) = ARBORE care defalcă TOATĂ activitatea proiectului pe pachete de lucru → fiecare pachet pe elemente mai mici. Baza planificării detaliate.", status: "✅", topic: "Planificarea Lucrărilor", source: "MPSAM" },
  { id: 25, text: "Criteriile SMART pentru stabilirea jaloanelor în timp sunt:", options: ["Documentate, aprobate, realiste, bugetate, controlabile", "Specifice, măsurabile, acceptabile, realiste, temporale", "Simple, monitorizabile, agreate, relevante, timp-limitate", "Scurte, măsurabile, aprobate, realizabile, tehnice"], correct: 1, explanation: "SMART = Specifice, Măsurabile, Acceptabile, Realiste, Temporale. Asigură că jaloanele pot fi verificate obiectiv și că sunt agreate de toți.", status: "✅", topic: "Planificarea Lucrărilor", source: "MPSAM" },
  { id: 26, text: "Ideea fundamentală la construirea unei rețele cu activități este de a:", options: ["Calcula automat durata totală a proiectului", "Aloca resurse umane și financiare fiecărei activități", "Reprezenta grafic relațiile de precedență dintre activități pentru a cunoaște termenele de începere", "Identifica activitățile critice"], correct: 2, explanation: "Rețeaua = reprezentare grafică a relațiilor de PRECEDENȚĂ, permițând cunoașterea de la bun început a termenelor de începere ale fiecărei activități.", status: "✅", topic: "Planificarea Lucrărilor", source: "MPSAM" },
  { id: 27, text: "În rețelele cu activități pe săgeți (AoA), fiecare nod reprezintă:", options: ["O activitate cu o durată estimată", "Un eveniment — punct cu durată 0 ce semnifică finalizarea TUTUROR activităților care conduc la acel nod", "O resursă alocată proiectului", "Un jalon aprobat de client"], correct: 1, explanation: "Rețele AoA: SĂGEȚILE = activitățile, NODURILE = EVENIMENTE (durată 0). Un eveniment semnifică că TOATE activitățile care sosesc în el sunt terminate.", status: "✅", topic: "Planificarea Lucrărilor", source: "MPSAM" },
  { id: 28, text: "În rețelele cu activități pe săgeți, o activitate fictivă (dummy activity):", options: ["Este un nod suplimentar necesar doar pentru scopuri de identificare", "Reprezintă o săgeată cu durată zero, necesară pentru reprezentarea logică corectă a dependențelor", "Este o activitate planificată dar neconfirmată", "Reprezintă o activitate delegată unui subcontractor"], correct: 1, explanation: "⚠️ EROARE ÎN GRILĂ! O activitate fictivă este o SĂGEATĂ cu durată ZERO, adăugată pentru a reprezenta corect dependențele. NU este un nod!", status: "⚠️ EROARE în grilă originală — răspunsul corect este (b)", topic: "Planificarea Lucrărilor", source: "MPSAM" },
  { id: 29, text: "Rețeaua unui proiect:", options: ["Poate conține bucle dacă activitățile sunt repetitive", "Nu trebuie să conțină bucle", "Trebuie să aibă exact un nod de start și unul de final", "Poate fi bidirectională"], correct: 1, explanation: "Rețeaua NU trebuie să conțină bucle (cicluri). O buclă ar crea o dependență circulară (A depinde de B care depinde de A) — imposibil de planificat.", status: "✅", topic: "Planificarea Lucrărilor", source: "MPSAM" },
  { id: 30, text: "Calcularea celui mai devreme moment de realizare se face prin:", options: ["Parcurgerea INVERSĂ a rețelei (backward pass)", "Parcurgerea NORMALĂ a rețelei (forward pass, de la start la final)", "Calculul mediei ponderate a duratelor", "Identificarea drumului critic prin inspecție"], correct: 1, explanation: "Forward pass (parcurgere normală) → cel mai DEVREME moment (ES/EF). Backward pass (parcurgere inversă) → cel mai TÂRZIU moment (LS/LF).", status: "✅", topic: "Planificarea Lucrărilor", source: "MPSAM" },
  { id: 31, text: "Marja de timp (float/slack) este:", options: ["Durata estimată a unei activități minus durata reală", "Intervalul de timp dintre două jaloane consecutive", "Timpul de care se dispune ca rezervă pentru efectuarea unei activități în plus față de durata sa estimată", "Perioada de testare planificată la finalul proiectului"], correct: 2, explanation: "Marja (float) = rezerva de timp disponibilă fără a afecta termenul final. Activitățile cu marjă = 0 sunt pe DRUMUL CRITIC.", status: "✅", topic: "Planificarea Lucrărilor", source: "MPSAM" },
  { id: 32, text: "Dependența de la sfârșit la început (Finish-to-Start) este de tipul:", options: ["O activitate poate fi începută simultan cu alta", "O activitate nu poate fi ÎNCEPUTĂ până când o altă activitate nu este FINALIZATĂ", "O activitate trebuie să se termine înaintea alteia, dar poate începe în paralel", "Două activități trebuie să înceapă în același timp"], correct: 1, explanation: "Finish-to-Start (FS) = cea mai comună dependență: B nu poate ÎNCEPE până când A nu este TERMINATĂ.", status: "✅", topic: "Planificarea Lucrărilor", source: "MPSAM" },
  { id: 33, text: "Planificarea strategică reprezintă:", options: ["Planificarea detaliată a activităților pentru sprint-ul următor", "Alocarea bugetului pe departamente pentru anul fiscal", "Dezvoltarea unui plan coerent, pe termen lung pentru controlarea activităților dintr-o instituție, stabilind direcții și priorități în conformitate cu resursele existente", "Stabilirea obiectivelor de calitate pentru un proiect software specific"], correct: 2, explanation: "Planificarea strategică = plan coerent pe TERMEN LUNG, la nivelul instituției, stabilind DIRECȚII și PRIORITĂȚI în funcție de resursele disponibile.", status: "✅", topic: "Planificarea Strategică", source: "MPSAM" },
  { id: 34, text: "Analiza Pareto este:", options: ["O metodă de prioritizare a bug-urilor după severitate", "O tehnică de estimare a costurilor bazată pe experiența anterioară", "O tehnică formală pentru găsirea schimbărilor care aduc cele mai mari beneficii: 20% din volum → 80% din avantaje", "O metodă de analiză a riscurilor prin simulare"], correct: 2, explanation: "Principiul Pareto: 20% din efort → 80% din rezultate. Analiza Pareto identifică acel 20% cu impact maxim.", status: "✅", topic: "Planificarea Strategică", source: "MPSAM" },
  { id: 35, text: "Deciziile pe baza arborilor de decizie se iau prin:", options: ["Calculul probabilității cumulate a tuturor scenariilor", "Metoda de înfășurare înapoi (rollback/backward induction) și retezare, pe baza valorii așteptate", "Alegerea alternativei cu cel mai mic risc identificat", "Consultarea experților și medierea răspunsurilor (metoda Delphi)"], correct: 1, explanation: "Arborii de decizie: (1) Rollback = calculul valorii așteptate de la dreapta la stânga; (2) Retezarea = eliminarea ramurilor suboptimale.", status: "✅", topic: "Analiza Deciziilor", source: "MPSAM" },
  { id: 36, text: "Tipurile de riscuri recomandate a fi identificate (lista de bifare) sunt:", options: ["Riscuri financiare, legale, tehnice, de comunicare", "Riscuri tehnologice, de personal, organizaționale, privind instrumentele de dezvoltare, privind cerințele, de estimare", "Riscuri interne, externe, tehnice, de management", "Riscuri de buget, de timp, de calitate, de resurse umane"], correct: 1, explanation: "6 categorii de riscuri: T-P-O-I-C-E = Tehnologice, Personal, Organizaționale, Instrumente, Cerințe, Estimare.", status: "✅", topic: "Managementul Riscului", source: "MPSAM" },
  { id: 37, text: "Conform Maslow, indivizii sunt motivați de:", options: ["Nevoia de recunoaștere profesională și avansare în carieră", "Nevoile de rang inferior până când sunt satisfăcute, după care încetează să mai motiveze și apar nevoile de rang superior", "Factorii de igienă mai mult decât factorii motivatori (Herzberg)", "Nevoia de autoactualizare în primul rând, indiferent de nevoile de bază"], correct: 1, explanation: "Ierarhia Maslow: Fiziologice → Siguranță → Sociale → Stimă → Autorealizare. O nevoie SATISFĂCUTĂ nu mai motivează.", status: "✅", topic: "Motivația", source: "MPSAM" },
  { id: 38, text: "Avantajele financiare (benefits) pentru motivarea membrilor echipei:", options: ["Sunt plăți bonus directe în numerar, pe lângă salariu", "Nu sunt plătite efectiv către angajați, ci sunt bunuri și servicii pentru aceștia, plătite de companie", "Reprezintă participarea la profitul companiei prin dividende", "Sunt opțiuni pe acțiuni ale companiei acordate angajaților performanți"], correct: 1, explanation: "Benefits (avantaje) ≠ cash. Sunt bunuri/servicii plătite de COMPANIE în beneficiul angajatului (mașină de serviciu, abonament medical, etc.).", status: "✅", topic: "Motivația", source: "MPSAM" },
  { id: 39, text: "Succesul unei tactici de îmbunătățire a motivării personalului depinde de:", options: ["Bugetul alocat pentru beneficii și mărimea echipei", "Statutul relațiilor din firmă, atitudinea sindicatelor, claritatea diagnosticului problemelor, modul de aplicare a tacticii, stilul de management adoptat", "Experiența managerului și numărul de proiecte anterioare de succes", "Claritatea obiectivelor de business și satisfacția clienților finali"], correct: 1, explanation: "5 factori de succes: (1) Statutul relațiilor din firmă, (2) Atitudinea sindicatelor, (3) Claritatea diagnosticului, (4) Modul de aplicare, (5) Stilul de management.", status: "✅", topic: "Motivația", source: "MPSAM" },
  { id: 40, text: "Dezvoltarea iterativă furnizează clientului o versiune de program care:", options: ["Conține de la început TOATE funcțiile și cu fiecare versiune nouă acestea sunt perfectionate și performanțele îmbunătățite", "Conține inițial un subset de funcții, extins progresiv în iterații", "Este completă tehnic, dar nevalidată de client", "Reprezintă exclusiv interfața utilizator, fără logică de business"], correct: 0, explanation: "Iterativă ≠ Incrementală! La ITERATIVĂ: toate funcțiile de la v1, perfecționate cu fiecare iterație. La INCREMENTALĂ: funcțiile se adaugă treptat.", status: "✅", topic: "Ciclul de Viață Software", source: "MPSAM" },
  { id: 41, text: "O aplicație de gestiune a configurațiilor permite stocarea:", options: ["Doar a codului sursă, în versiunea curentă aprobată", "Tuturor fișierelor unui proiect (cod sursă, documentații, planificări etc.), distribuit sub forma tuturor versiunilor create de echipă", "Doar a documentației și specificațiilor proiectului", "Numai a versiunilor validate de QA și aprobate pentru release"], correct: 1, explanation: "SCM stochează TOATE tipurile de fișiere (nu doar cod!) și TOATE versiunile create de TOȚI proiectanții echipei.", status: "✅", topic: "Managementul Configurațiilor", source: "MPSAM" },
  { id: 42, text: "Riscul cerințelor neclare ale proiectului se poate rezolva prin:", options: ["Adăugarea mai multor programatori experimentați în echipă", "Includerea unor clauze adecvate în partea de contractare a lucrării cu beneficiarul", "Utilizarea exclusivă a metodologiei Agile cu sprint-uri scurte", "Crearea unui prototip rapid înainte de semnarea contractului"], correct: 1, explanation: "Cerințe neclare = risc major gestionat prin CLAUZE CONTRACTUALE adecvate care definesc responsabilitățile și mecanismele de gestionare a schimbărilor.", status: "✅", topic: "Managementul Riscului", source: "MPSAM" },
  { id: 43, text: "Sarcina principală a echipei de management software este de a:", options: ["Livra proiectul la timp și în buget", "Asigura calitatea tehnică a produsului final", "Echilibra un set incomplet, inconsistent și schimbător de cerințe tehnice și non-tehnice, producând un sistem optim față de un set minimal de caracteristici", "Coordona comunicarea dintre client și echipa de dezvoltare"], correct: 2, explanation: "Echilibrarea cerințelor INCOMPLETE + INCONSISTENTE + ÎN SCHIMBARE (tehnice și non-tehnice), optimizând față de un set MINIMAL de caracteristici.", status: "✅", topic: "Noțiuni de Bază", source: "MPSAM" },
  { id: 44, text: "Un manager de proiect software trebuie să aibă cunoștințe despre:", options: ["Toate limbajele de programare folosite în proiect", "Metodele de estimare a costurilor și tehnicile de planificare", "Luarea deciziei corecte într-o împrejurare concretă și alegerea soluției care implică cel mai mic risc pentru evoluția proiectului", "Arhitectura sistemelor software distribuite"], correct: 2, explanation: "Managerul trebuie să știe să ia DECIZII CORECTE în situații concrete, alegând soluția cu RISCUL MINIM.", status: "✅", topic: "Managerul de Proiect", source: "MPSAM" },
  { id: 45, text: "Noțiunea de timp real implică:", options: ["Proprietatea de a reacționa în condiții reale ale sistemului", "Reacția sistemului în condiții precizate", "Proprietatea sistemului de a reacționa la schimbări în proces, într-un timp mai mic decât o limită prestabilită", "Timp minim de reacție"], correct: 2, explanation: "Timp real = sistemul reacționează la schimbările din proces într-un timp mai mic decât o LIMITĂ PRESTABILITĂ (nu neapărat timp minim absolut).", status: "✅", topic: "Sisteme de Conducere de Proces", source: "IP" },
  { id: 46, text: "Într-un sistem de conducere de proces interacționează următoarele componente:", options: ["Echipamente, software, proceduri de operare, operator uman", "Software, hardware", "Programe, calculatoare, interfețe de proces, manuale de utilizare", "Interfețe, sisteme de reglare, sisteme de calcul"], correct: 0, explanation: "Un sistem de conducere de proces = 4 componente: (1) Echipamente, (2) Software, (3) Proceduri de operare, (4) Operator uman. Operatorul uman este o componentă esențială!", status: "✅", topic: "Sisteme de Conducere de Proces", source: "IP" },
  { id: 47, text: "Sistemele pentru conducere de proces ridică probleme speciale, deoarece:", options: ["Sunt foarte scumpe și necesită hardware dedicat", "Impun cerințe speciale privind siguranța în funcționare (sisteme safety-critical), respectiv cele mai multe au cerințe privind răspunsul în timp real", "Necesită echipe mari de programatori specializați", "Nu pot folosi metodologii standard de proiectare software"], correct: 1, explanation: "Dificultățile specifice: (1) cerințe safety-critical și (2) cerințe de timp real. Acestea impun tehnici speciale de proiectare, testare și redundanță.", status: "✅", topic: "Sisteme de Conducere de Proces", source: "IP" },
  { id: 48, text: "Ingineria programării se ocupă cu:", options: ["Scrierea de cod sursă de calitate înaltă", "Managementul echipelor de programatori", "Utilizarea într-o manieră disciplinată, sistematică și cu pricepere a unor metode și instrumente asociate, adecvate, având în vedere anumite obiective și principii de bază", "Proiectarea arhitecturilor software complexe"], correct: 2, explanation: "Ingineria programării = utilizare DISCIPLINATĂ, SISTEMATICĂ și cu PRICEPERE a metodelor și instrumentelor adecvate, conform obiectivelor și principiilor de bază.", status: "✅", topic: "Ingineria Programării", source: "IP" },
  { id: 49, text: "O paradigmă în ingineria software este:", options: ["Un set de reguli stricte de programare", "O anumită abordare a procesului de proiectare software, care descrie cum se realizează elemente de proiectare, ce metode, unelte și proceduri se aplică la fiecare fază", "Un limbaj de programare de nivel înalt", "Un standard internațional de calitate software"], correct: 1, explanation: "Paradigmă în IS = o ABORDARE a procesului de proiectare: descrie CUM se realizează, CE metode/unelte/proceduri se aplică la fiecare fază.", status: "✅", topic: "Ingineria Programării", source: "IP" },
  { id: 50, text: "Metoda MASCOT presupune elaborarea unei diagrame ACR care reflectă:", options: ["Ierarhia modulelor programului", "Structura bazei de date", "Relațiile dintre obiectele sistemului", "Fluxurile de date din program, care își au obârșiile în Dispozitivele de intrare și se termină totdeauna la Dispozitive de ieșire"], correct: 3, explanation: "Diagrama ACR din MASCOT reflectă FLUXURILE DE DATE: pornesc din Dispozitivele de INTRARE și se termină TOTDEAUNA la Dispozitivele de IEȘIRE.", status: "✅", topic: "MASCOT", source: "IP" },
  { id: 51, text: "Într-o diagramă ACR (MASCOT) apar reprezentate următoarele entități:", options: ["Taskuri și dispozitive", "Taskuri, conducte, cutii poștale, dispozitive, semafoare, blocuri eveniment", "Module de program, funcții, canale, rezervoare", "Taskuri (activități), dispozitive, canale, rezervoare"], correct: 3, explanation: "Entitățile MASCOT: Taskuri/Activități, Dispozitive (intrare/ieșire), Canale (FIFO), Rezervoare (acces direct). Semafoarele și cutiile poștale sunt din alte metodologii.", status: "✅", topic: "MASCOT", source: "IP" },
  { id: 52, text: "Etapele de aplicare a metodologiei MASCOT sunt:", options: ["Proiectare generală, proiectare în detaliu, asistență tehnică", "Proiectare preliminară de ansamblu, proiectare detaliată, implementare și testare", "Specificații, programare, implementare", "Analiză de sistem, analiză de proces, proiectare de detaliu"], correct: 1, explanation: "MASCOT = 3 etape: (1) Proiectare preliminară de ansamblu (diagrama ACR), (2) Proiectare detaliată, (3) Implementare și testare.", status: "✅", topic: "MASCOT", source: "IP" },
  { id: 53, text: "Ce sunt regulile euristice de proiectare?", options: ["Reguli rezultate din aplicarea teoriilor euristice", "Reguli rezultate din experiența practică", "Metodologii de proiectare ale organizațiilor software", "Metode sistematice de proiectare"], correct: 1, explanation: "Regulile euristice = reguli rezultate din EXPERIENȚA PRACTICĂ (nu din teorii formale). Sunt 'bune practici' acumulate în timp.", status: "✅", topic: "Proiectare Structurată", source: "IP" },
  { id: 54, text: "Câte module de program pot fi subordonate unui modul, conform regulilor euristice?", options: ["Maxim 5 și minim 2", "Între 3 și 6", "Mai mult de 4", "De obicei între 3-4 și 7, iar dacă fan-out este mai mare de 9 sau mai mic de 3-4, este necesară reproiectarea"], correct: 3, explanation: "Fan-out optim: 3-4 până la 7. Fan-out > 9: prea mult (de descompus). Fan-out < 3-4: prea puțin (poate fi comasat).", status: "✅", topic: "Proiectare Structurată", source: "IP" },
  { id: 55, text: "Proiectarea structurată se realizează prin:", options: ["Proiectarea îngrijită a programelor, astfel încât acestea să aibă o structură clară", "Folosirea unor structuri standard de control al programului: procesare secvențială, decizie, reunire", "Folosirea proiectării top-down și a unor structuri standard de control al programului: procesare secvențială, decizie, reunire", "Proiectarea top-down și modularizare structurală"], correct: 2, explanation: "Proiectarea structurată = TOP-DOWN + structuri standard de control: (1) Procesare secvențială, (2) Decizie, (3) Reunire (loop). Ambele componente sunt necesare.", status: "✅", topic: "Proiectare Structurată", source: "IP" },
  { id: 56, text: "Documentația software de proiectare este necesară pentru:", options: ["Prezentarea produsului", "Prezentarea produsului și relațiile cu clienții", "Elaborarea unui prototip", "Activitatea de asistență tehnică și refolosire software"], correct: 3, explanation: "Documentația = necesară pentru ASISTENȚĂ TEHNICĂ (mentenanță, depanare) și REFOLOSIRE SOFTWARE. Nu e pentru prezentări sau reclame.", status: "✅", topic: "Proiectare Structurată", source: "IP" },
  { id: 57, text: "Sistemul UNIX nu este foarte răspândit în conducerea de proces deoarece prezintă:", options: ["Preț ridicat", "Lipsă de unitate, sintaxă criptică, lipsă de interfețe grafice și de software", "Nepotrivire cu necesitățile de timp real", "Imposibilitatea implementării multitaskingului"], correct: 1, explanation: "UNIX: dezavantaje = lipsă de unitate (fragmentare), sintaxă criptică, lipsă interfețe grafice, lipsă software dedicat de automatizare. (Nu e problema de timp real în sine.)", status: "✅", topic: "Sisteme de Operare", source: "IP" },
  { id: 58, text: "Familiile mai reprezentative de sisteme de operare dedicate (timp real) sunt:", options: ["OS-2, WARP, QNX, OS-9", "OS-9, QNX, Windows 95 CE", "OS-9, QNX, VxWorks/Microworks", "OS-900, QTRM, RTS"], correct: 2, explanation: "SO dedicate: OS-9 (Microware), QNX (BlackBerry), VxWorks/Microworks (Wind River). Sunt RTOS cu kerneluri preemptive și determinism temporal garantat.", status: "✅", topic: "Sisteme de Operare", source: "IP" },
  { id: 59, text: "Sistemele de operare dedicate folosesc pentru alocarea unității centrale:", options: ["Priorități fixe", "256 priorități", "Mesaje și variabile", "Planificarea circulară (round-robin)"], correct: 0, explanation: "SO dedicate (RTOS) = PRIORITĂȚI FIXE pentru planificarea CPU. Taskul cu prioritatea cea mai înaltă rulează preemptiv. (Comunicare = mesaje și variabile comune — altă întrebare!)", status: "✅", topic: "Sisteme de Operare", source: "IP" },
  { id: 60, text: "Sistemele de operare dedicate folosesc pentru comunicare:", options: ["Mesaje și variabile comune", "Protocoale TCP/IP", "Fișiere de sistem", "Apeluri DLL"], correct: 0, explanation: "SO dedicate pentru comunicare între taskuri: MESAJE (cozi de mesaje, canale) și VARIABILE COMUNE (memorie partajată, protejată prin semafoare).", status: "✅", topic: "Sisteme de Operare", source: "IP" },
  { id: 61, text: "Penetrabilitatea sistemelor de operare este:", options: ["Capacitatea de a rezista la atacuri externe (securitate)", "Performanța la sarcini intensive", "Răspândirea și asimilarea de către specialiști și utilizatori", "Capacitatea de a rula pe hardware diferit"], correct: 2, explanation: "Penetrabilitate SO = gradul de RĂSPÂNDIRE și ASIMILARE de către specialiști și utilizatori.", status: "✅", topic: "Sisteme de Operare", source: "IP" },
  { id: 62, text: "La Windows NT 4, concurența era implementată prin:", options: ["Preempțiune, cu ordonarea după 31 priorități pe câte 4 paliere (IDLE, NORMAL, HIGH, REALTIME)", "Preempțiune, cu ordonarea după 31 priorități, ordonate pe 2 paliere: 4 clase de prioritate și 5 niveluri pe fiecare clasă", "Multithreading simplu fără priorități", "Întreruperi event-driven cu planificare circulară (round-robin)"], correct: 1, explanation: "Windows NT 4: preempțiune cu 31 priorități, structurate pe 2 paliere: 4 clase de prioritate × 5 niveluri/clasă.", status: "✅", topic: "Sisteme de Operare", source: "IP" },
  { id: 63, text: "Categoriile de prestatori (server) în arhitectura client-server la Windows NT 4 sunt:", options: ["Monitorul, WIN32, DLL", "Windows NT Executive, WIN32", "I/O Manager, Win NT Executive, WIN32", "NTFS, HPFS, FAT"], correct: 1, explanation: "Prestatorii Windows NT 4: Windows NT Executive (kernel mode) și WIN32 (user mode). NTFS/FAT sunt sisteme de fișiere, nu servere.", status: "✅", topic: "Sisteme de Operare", source: "IP" },
  { id: 64, text: "Un fir de execuție (thread) în Windows NT 4 este:", options: ["Un proces", "Un task", "Un modul de program care realizează apeluri DLL", "O cale de execuție în interiorul unui proces"], correct: 3, explanation: "Thread = O CALE DE EXECUȚIE în interiorul unui proces. Un proces poate avea mai multe thread-uri care partajează spațiul de adrese.", status: "✅", topic: "Sisteme de Operare", source: "IP" },
  { id: 65, text: "Configurația larg distribuită utilizează:", options: ["Legătură multipunct", "Field-bus", "Rețele WAN și protocoale de comunicații potrivite", "Protocoale de comunicație Novell și rețele LAN"], correct: 2, explanation: "Configurație LARG DISTRIBUITĂ (site-uri geografic dispersate) = rețele WAN + protocoale adecvate.", status: "✅", topic: "Sisteme de Operare", source: "IP" },
  { id: 66, text: "Redundanța statică se aplică prin:", options: ["Multiplicarea paralelă a unei funcții de procesare și compararea rezultatelor", "Dublarea unei funcții", "Verificarea unor condiții de funcționare corectă", "Compararea unor rezultate"], correct: 0, explanation: "Redundanță STATICĂ = multiplicare PARALELĂ + compararea rezultatelor (ex: sistem cu votare majoritară 2-din-3). Este permanentă, hardware/software duplicat rulează simultan.", status: "✅", topic: "Fiabilitate și Redundanță", source: "IP" },
  { id: 67, text: "Redundanța dinamică se realizează prin:", options: ["Dublarea unei funcții permanent active", "Efectuarea unor teste de acceptanță și eventuala rulare a unei versiuni alternative", "Efectuarea unor teste de acceptanță și rularea OBLIGATORIE a unei versiuni alternative", "Testarea stării taskurilor"], correct: 1, explanation: "Redundanță DINAMICĂ = teste de acceptanță + EVENTUALA rulare a versiunii alternative (dacă testul eșuează). 'Eventuală' e cuvântul cheie față de varianta c ('obligatorie').", status: "✅", topic: "Fiabilitate și Redundanță", source: "IP" },
  { id: 68, text: "De ce sunt necesare taskurile de \"luare la cunoștință\" într-un sistem de telemecanică?", options: ["Deoarece evenimentele din proces trebuie aduse la cunoștința sistemului", "Deoarece telecomenzile trebuie confirmate de către operator", "Deoarece operatorul trebuie să confirme că a luat la cunoștință de evenimentele din proces și sunt necesare alte taskuri decât cele de tratare a evenimentelor, din pricina asincronismului reacțiilor operatorului cu evenimentele din proces", "Deoarece sistemul trebuie să reacționeze suficient de rapid la evenimentele din proces"], correct: 2, explanation: "Taskuri de 'luare la cunoștință': operatorul CONFIRMĂ că a văzut evenimentul. Sunt SEPARATE de taskurile de tratare, deoarece reacția operatorului e ASINCRONĂ față de evenimentele din proces.", status: "✅", topic: "Telemecanică", source: "IP" },
  { id: 69, text: "Într-un sistem de telemecanică, efectuarea unei telecomenzi parcurge etapele:", options: ["Selecție, execuție", "Selecție, confirmare", "Selecție, execuție, confirmare din proces", "Trimiterea telecomenzii, răspunsul procesului"], correct: 2, explanation: "Telecomandă = 3 etape: (1) SELECȚIE, (2) EXECUȚIE, (3) CONFIRMARE DIN PROCES. Fără confirmare nu știm dacă comanda a avut efect.", status: "✅", topic: "Telemecanică", source: "IP" },
  { id: 70, text: "Modelul de dezvoltare în spirală presupune:", options: ["Dezvoltare liniară cu feedback la final", "O abordare iterativă în cadrul căreia, la fiecare iterație, prin analiza riscurilor se compară diferitele alternative, iar prototipizarea verifică fezabilitatea înainte ca o alternativă să fie aleasă", "Prototipuri rapide fără analiză de risc", "Cascade de faze cu jaloane fixe"], correct: 1, explanation: "Spirala (Boehm): iterativă + analiza riscurilor la fiecare iterație + prototipizare pentru verificarea fezabilității. Combină avantajele cascadei și prototipizării.", status: "✅", topic: "Ciclul de Viață Software", source: "IP" },
  { id: 71, text: "În accepțiunea UML, relațiile dintre clase sunt:", options: ["Moduri, constrângeri, stereotipuri, asociații, compoziții, generalizare, dependență, multiplicitate", "Asociații, agregare, compoziții, generalizare, dependență", "Asociații, agregare, cazuri de utilizare, actori, compoziție, generalizare, multiplicitate", "Clase, obiecte, interfețe, pachete"], correct: 1, explanation: "Relații UML: (1) Asociație, (2) Agregare ('parte din'), (3) Compoziție (agregare tare), (4) Generalizare (moștenire), (5) Dependență. Multiplicitatea și stereotipurile sunt PROPRIETĂȚI ale relațiilor.", status: "✅", topic: "UML", source: "IP" },
  { id: 72, text: "Ce este o stare în abordarea UML?", options: ["O diagramă reprezentând relațiile dintre componentele unui sistem", "O condiție de existență a unui sistem care persistă pentru o perioadă semnificativă", "O condiție de existență a unui obiect care persistă pentru o perioadă semnificativă de timp și poate fi distinsa de altă condiție", "Un eveniment care declanșează o tranziție"], correct: 2, explanation: "Stare UML = condiție de existență a unui OBIECT (nu sistem!) care persistă și poate fi DISTINSĂ de alte stări.", status: "✅", topic: "UML", source: "IP" },
  { id: 73, text: "Când o clasă trebuie să gestioneze un număr de obiecte de aceeași clasă, abordarea potrivită este:", options: ["Un model (pattern) de proiectare generic", "O clasă observator între clasa primară și setul de obiecte", "O clasă container între clasa primară și setul de obiecte", "O interfață abstractă între clase"], correct: 2, explanation: "Pattern Container: când o clasă gestionează MULTIPLE obiecte de aceeași clasă → introduci o CLASĂ CONTAINER intermediară care encapsulează colecția.", status: "✅", topic: "UML", source: "IP" },
  { id: 74, text: "Un mesaj (UML) este:", options: ["Un apel de funcție în cod sursă C++", "O notificare de eroare trimisă între module", "O abstractizare a unei unități de comunicare între un obiect sursă și un obiect destinație", "O metodă a unei clase"], correct: 2, explanation: "Mesaj UML = abstractizare a comunicării între obiecte (sursă → destinație). Poate fi apel sincron, asincron, de retur etc.", status: "✅", topic: "UML", source: "IP" },
  { id: 75, text: "Strategia \"sublinierea substantivelor\" permite depistarea:", options: ["Doar a claselor și obiectelor", "Atributelor și metodelor claselor", "Unor asociații, unor obiecte, clase, atribute, metode și generalizări", "Exclusiv a relațiilor dintre clase"], correct: 2, explanation: "Substantivele → candidați pentru obiecte/clase/atribute; verbele → candidați pentru metode/asociații/generalizări. Permite identificarea TUTUROR elementelor OO.", status: "✅", topic: "UML", source: "IP" },
  { id: 76, text: "Ce fel de relații sunt implementate în codul sursă de mai jos? (clasă Animal → câine, pește, pisică)", options: ["Asociere", "Agregare", "Specializare (generalizare/moștenire)", "Dependență"], correct: 2, explanation: "Animal → câine/pește/pisică = SPECIALIZARE (Moștenire). Câinele IS-A Animal. În cod: clasa Caine extends Animal. Nu e agregare (HAS-A).", status: "✅", topic: "UML", source: "IP" },
  { id: 77, text: "Implementarea asociațiilor se poate realiza prin:", options: ["Exclusiv prin pointeri în C++", "Exclusiv prin tabele în baze de date relaționale", "Pentru asociații '1 la 1' cu pointeri, referințe sau declarații inline; asociațiile '1 la mai mulți' se implementează cu pattern 'container'", "Prin interfețe abstracte în toate cazurile"], correct: 2, explanation: "Asociații 1:1 → pointer/referință/declarație inline. 1:N → pattern Container.", status: "✅", topic: "UML", source: "IP" },
  { id: 78, text: "În modelul (pattern) Rendezvous participă următoarele obiecte:", options: ["Rendezvous, Lock, Thread", "Rendezvous, Lock, Client, Context, Thread", "Rendezvous, Wait, Semaphore, Client, Context, Thread", "Rendezvous, Mutex, Signal, Thread"], correct: 0, explanation: "Pattern Rendezvous = sincronizare între thread-uri: Rendezvous (punctul de întâlnire), Lock (mecanismul de blocare), Thread (firele de execuție).", status: "✅", topic: "Pattern-uri de Proiectare", source: "IP" },
  { id: 79, text: "Sablonul Factory:", options: ["Permite crearea de obiecte fără a specifica clasa exactă la compilare", "Definește un algoritm într-o clasă de bază, cu pași implementați în subclase", "Definește o interfață pentru crearea unui obiect, dar lasă subclasele să decidă ce clasă trebuie instanțiată", "Oferă o interfață unificată pentru un set de interfețe dintr-un subsistem"], correct: 2, explanation: "Factory Method: definește o INTERFAȚĂ pentru creare, dar SUBCLASELE DECID ce clasă instanțiază. (Varianta d = Facade.)", status: "✅", topic: "Pattern-uri de Proiectare", source: "IP" },
  { id: 80, text: "Model-View-Controller (MVC) este:", options: ["Un limbaj de modelare vizuală", "Un cadru compus din două șabloane Observer", "Un pattern arhitectural cu trei straturi independente", "Un framework de testare automată"], correct: 1, explanation: "MVC = DOUĂ șabloane Observer: (1) View observă Model-ul, (2) Controller observă View-ul. Model nu știe de View sau Controller.", status: "✅", topic: "Pattern-uri de Proiectare", source: "IP" },
  { id: 81, text: "Un șablon Facade oferă:", options: ["Acces securizat la obiecte din alte spații de nume", "Crearea de obiecte fără a cunoaște clasa lor exactă", "O interfață unificată pentru un set de interfețe dintr-un subsistem", "Notificarea automată a observatorilor la schimbări de stare"], correct: 2, explanation: "Facade = INTERFAȚĂ UNIFICATĂ pentru un subsistem complex. Clientul interacționează cu un singur obiect Facade în loc de multe obiecte interne.", status: "✅", topic: "Pattern-uri de Proiectare", source: "IP" },
  { id: 82, text: "Soluția pentru șablonul Real-Time Observer constă în aceea că:", options: ["Fiecare client sondează periodic serverul", "Serverul trimite broadcast tuturor clienților la fiecare schimbare", "Un singur obiect Server furnizează automat date pentru Observers care s-au înregistrat cu Subscribe(); sunt clase abstracte cu clase derivate (Concrete Server și Concrete Observer)", "Clienții și serverul comunică prin cozi de mesaje asincrone"], correct: 2, explanation: "RT Observer: Server → furnizor automat. Observers se înregistrează cu Subscribe(). Server și Observer sunt CLASE ABSTRACTE cu clase derivate concrete.", status: "✅", topic: "Pattern-uri de Proiectare", source: "IP" },
  { id: 83, text: "Sablonul Smart Pointer elimină surse de erori din utilizarea pointerilor obișnuiți prin:", options: ["Interzicerea accesului la memorie neagreat de OS", "Gestionarea automată a garbage collection", "Folosirea constructorilor pentru inițializare cu NULL/precondiții; determinarea momentului de eliberare a memoriei; detectarea automată a obiectelor inexistente și refuzarea accesului", "Criptarea adreselor de memorie pentru securitate"], correct: 2, explanation: "Smart Pointer: (1) inițializează cu NULL sau forțează precondiții, (2) determină automat dacă/când memoria trebuie eliberată, (3) detectează că obiectul nu mai există și REFUZĂ accesul.", status: "✅", topic: "Pattern-uri de Proiectare", source: "IP" },
  { id: 84, text: "Atingerea unui prag fixat pentru încrederea în software este:", options: ["Un obiectiv de calitate al proiectului", "O metodă de estimare a costurilor", "Un criteriu de oprire a testării", "O cerință a clientului"], correct: 2, explanation: "Criteriu de oprire a testării = când ai atins un PRAG DE ÎNCREDERE prestabilit. Testarea nu poate fi exhaustivă — trebuie un criteriu obiectiv de oprire.", status: "✅", topic: "Testare Software", source: "IP" },
  { id: 85, text: "Testele de integrare verifică dacă:", options: ["Aplicația funcționează corect în mediul în care va fi folosită", "Fiecare modul funcționează corect în izolare", "Codul respectă standardele de codificare", "Aplicația satisface cerințele de performanță"], correct: 0, explanation: "⚠️ Atenție la formulare! 'Funcționează corect în MEDIUL în care va fi folosită' = teste de INTEGRARE. (Testele de unitate = modul în izolare.)", status: "⚠️ Formularea poate părea contra-intuitivă", topic: "Testare Software", source: "IP" },
  { id: 86, text: "În cadrul testelor de acceptanță:", options: ["Sistemul este testat conform descrierii cerințelor clientului", "Se testează fiecare modul în izolare", "Se verifică performanța sub sarcină maximă", "Se verifică securitatea aplicației"], correct: 0, explanation: "Teste de acceptanță = sistemul testat conform CERINȚELOR CLIENTULUI. Clientul validează că produsul face ce a cerut.", status: "✅", topic: "Testare Software", source: "IP" },
  { id: 87, text: "Inspecția codului:", options: ["Este o testare automată prin instrumente statice de analiză", "Se folosește la testele de modul și presupune desemnarea unei echipe, prezentarea prealabilă a codului, studiul acestuia, formularea unei liste de obiective și o ședință de analiză; se verifică corectitudinea algoritmilor, performanțele, interfețele", "Este specifică testelor de sistem și nu necesită ședințe", "Se face exclusiv de autorul codului"], correct: 1, explanation: "Inspecție cod = revizuire FORMALĂ la testele de modul: echipă desemnată + prezentare prealabilă + studiu individual + ședință de analiză colectivă.", status: "✅", topic: "Testare Software", source: "IP" },
  { id: 88, text: "Metoda de dezvoltare Cleanroom este bazată pe:", options: ["Testare exhaustivă automată", "Metodologie Agile cu livrări frecvente", "Metode formale", "Prototipizare rapidă"], correct: 2, explanation: "Cleanroom = bazată pe METODE FORMALE (specificații formale matematice, verificare formală). Scopul: eliminarea defectelor înainte de testare.", status: "✅", topic: "Testare Software", source: "IP" },
  { id: 89, text: "În depanarea aplicațiilor în cadrul întreținerii, este bine dacă:", options: ["Avem acces la codul sursă original nemodificat", "Putem reproduce eroarea în mediul de dezvoltare", "Avem un log al utilizatorilor, al activităților, al erorilor, al utilizatorilor care au modificat înregistrări în baza de date", "Avem documentație completă a arhitecturii"], correct: 2, explanation: "Depanare = log-urile sunt esențiale: log utilizatori (cine?), log activități (ce?), log erori (ce a mers greșit?), log modificări BD (cine a schimbat ce?).", status: "✅", topic: "Testare Software", source: "IP" },
  { id: 90, text: "Nivelurile cerințelor software sunt:", options: ["Funcționale, non-funcționale, de interfață", "Tehnice, manageriale, financiare", "De business, utilizator, funcționale", "De sistem, de subsistem, de modul"], correct: 2, explanation: "3 niveluri: (1) De BUSINESS (ce vrea organizația), (2) De UTILIZATOR (ce face sistemul din perspectiva utilizatorului), (3) FUNCȚIONALE (ce face sistemul tehnic).", status: "✅", topic: "Cerințe și Analiză", source: "IP" },
  { id: 91, text: "Analiza software este:", options: ["Procesul de scriere a codului sursă", "Disciplina care determină CE trebuie făcut, preluând problema clientului și exprimând-o într-un mod inteligibil de către dezvoltator", "Procesul de testare și validare a software-ului", "Proiectarea arhitecturii tehnice a sistemului"], correct: 1, explanation: "Analiza software = determină CE trebuie făcut (nu CUM). Preia problema clientului și o transformă într-un model inteligibil pentru dezvoltator.", status: "✅", topic: "Cerințe și Analiză", source: "IP" },
  { id: 92, text: "Analiza orientată pe obiecte (OOA) este:", options: ["Scrierea codului orientat pe obiecte", "Proiectarea diagramelor de clasă UML", "Crearea unui model OO plecând de la cerințele externe (un model al domeniului problemei)", "Optimizarea performanței aplicațiilor OOP"], correct: 2, explanation: "OOA = creare model OO plecând de la CERINȚELE EXTERNE (domeniul problemei). Nu e despre cod sau implementare.", status: "✅", topic: "Cerințe și Analiză", source: "IP" },
  { id: 93, text: "Specificațiile urmăresc:", options: ["Descrierea arhitecturii interne a sistemului software", "Descrierea comunicării dintre aplicația software (văzută ca o cutie neagră) și mediul (mulțimea tuturor actorilor exteriori cu care aplicația interacționează)", "Documentarea codului sursă și a algoritmilor", "Planificarea activităților de dezvoltare"], correct: 1, explanation: "Specificațiile = descriu ce face sistemul din exterior (CUTIE NEAGRĂ) față de ACTORI (entitățile exterioare). Nu descriu interiorul!", status: "✅", topic: "Cerințe și Analiză", source: "IP" },
  { id: 94, text: "Activitățile de proiectare software cuprind:", options: ["Analiza cerințelor, codificarea, testarea, livrarea", "Planificarea, estimarea, codificarea, depanarea", "Proiectarea arhitecturii, specificarea abstractă, proiectarea componentelor și a interfețelor, proiectarea structurilor de date, proiectarea algoritmilor", "Cerințe, design, cod, test, mentenanță"], correct: 2, explanation: "Activitățile de proiectare: (1) Arhitectura, (2) Specificarea abstractă, (3) Componente și interfețe, (4) Structuri de date, (5) Algoritmi.", status: "✅", topic: "Cerințe și Analiză", source: "IP" },
  { id: 95, text: "Obiectivul primordial al proiectării software este să se ajungă la o descriere care să permită:", options: ["Prezentarea produsului clientului pentru validare", "Delimitarea exactă a muncii în cadrul echipei prin definirea unei arhitecturi împreună cu descrierea componentelor, astfel încât membrii echipei să poată continua cu codificarea, fiecare știind exact ce să facă", "Estimarea precisă a costurilor și duratei proiectului", "Generarea automată a codului sursă"], correct: 1, explanation: "Obiectivul proiectării = arhitectură + descriere componente → DELIMITAREA EXACTĂ A MUNCII în echipă, astfel încât fiecare programator să știe EXACT ce cod să scrie.", status: "✅", topic: "Cerințe și Analiză", source: "IP" },
  { id: 96, text: "Middleware este:", options: ["Un sistem de operare pentru servere", "Un software de conectivitate care constă dintr-un set de servicii ce permit rularea proceselor multiple pe una sau mai multe echipamente/mașini în vederea interacțiunii de-a lungul unei rețele", "Un protocol de comunicație rețea", "Un framework de testare distribuit"], correct: 1, explanation: "Middleware = 'glue software' — conectivitate care permite proceselor de pe ECHIPAMENTE DIFERITE să interacționeze în rețea.", status: "✅", topic: "Arhitecturi Software", source: "IP" },
  { id: 97, text: "În cadrul arhitecturii three-tier, nivelele aplicației sunt:", options: ["Prezentare, Logica aplicației (business logic), Acces la date", "Client, Server, Bază de date", "Hardware, Sistem de operare, Aplicație", "Frontend, Backend, Middleware"], correct: 0, explanation: "Three-tier = 3 straturi: (1) PREZENTARE (UI), (2) LOGICA APLICAȚIEI (business logic), (3) ACCES LA DATE (persistență, baze de date).", status: "✅", topic: "Arhitecturi Software", source: "IP" },
  { id: 98, text: "Uzual, Service Oriented Architecture (SOA) se bazează pe:", options: ["Protocoale proprietare de comunicație între servicii", "Standarde de acces specifice Serviciilor WEB (SOAP/REST), interfețele descrise în WSDL, înregistrate în directori publici UDDI, cu transport XML", "Comunicare directă peer-to-peer între module", "Baze de date distribuite pentru partajarea stării"], correct: 1, explanation: "SOA: SOAP sau REST pentru comunicare, WSDL pentru descrierea interfețelor, UDDI pentru registrul serviciilor, XML ca format de transport.", status: "✅", topic: "Arhitecturi Software", source: "IP" },
  { id: 99, text: "Obiectivul partenerilor care au definit AUTOSAR (Automotive Open System Architecture) este:", options: ["Crearea unui sistem de operare unic pentru toate vehiculele", "Crearea și stabilirea de standarde deschise pentru arhitecturile software, care vor oferi o infrastructură de bază pentru dezvoltarea de software de vehicule, interfețe utilizator și management pentru toate domeniile specifice industriei auto", "Reducerea costurilor de producție prin standardizarea hardware-ului auto", "Definirea protocoalelor de comunicație CAN și LIN"], correct: 1, explanation: "AUTOSAR = standarde DESCHISE pentru arhitecturi software auto. Scopul: infrastructură de bază pentru SOFTWARE de vehicule, interfețe și management.", status: "✅", topic: "Arhitecturi Software", source: "IP" },
  { id: 100, text: "În timpul Sprint-ului (în metodologia SCRUM):", options: ["Se pot adăuga oricând cerințe noi dacă clientul le solicită urgent", "Nu se admit modificări care ar putea afecta ținta Sprint-ului", "Echipa se reorganizează zilnic în funcție de priorităti", "Product Owner-ul poate schimba Sprint Backlog-ul oricând"], correct: 1, explanation: "SCRUM Sprint: NICIO modificare care afectează ȚINTA Sprint-ului nu este admisă. Sprint Goal-ul rămâne fix. Modificările merg în Product Backlog pentru sprint-uri viitoare.", status: "✅", topic: "Metodologii Agile", source: "IP" },
  { id: 101, text: "Mecanismul watchdog funcționează astfel:", options: ["Un timer hardware resetează periodic sistemul pentru a preveni blocajele", "Un thread de monitorizare verifică periodic starea celorlalte thread-uri", "Periodic, o secvență software apelată printr-o întrerupere de la un ceas HW verifică dacă un indicator a fost resetat de la precedentul apel; dacă nu a fost resetat → secvența principală s-a blocat → produce un restart special", "Operatorul confirmă periodic că sistemul funcționează corect"], correct: 2, explanation: "Watchdog: (1) secvența principală resetează periodic un indicator, (2) o ISR verifică periodic că indicatorul a fost resetat, (3) dacă NU → secvența s-a blocat → RESTART SPECIAL.", status: "✅", topic: "Fiabilitate și Redundanță", source: "IP" },
  { id: 102, text: "O aplicație informatică de gestiune a configurațiilor (IP varianta) permite stocarea:", options: ["Doar a codului sursă, în versiunea curentă aprobată", "Tuturor fișierelor unui proiect (cod sursă, documentații, planificări etc.), stocate într-un depozit și sub forma tuturor versiunilor create de proiectanții din cadrul echipei", "Doar a documentației și specificațiilor proiectului", "Numai a versiunilor validate de QA"], correct: 1, explanation: "SCM stochează TOATE tipurile de fișiere și TOATE versiunile create de TOȚI proiectanții. Stocate ÎNTR-UN DEPOZIT (centralizat) — diferit de varianta MPSAM care spune 'distribuit'.", status: "⚠️ Mică diferență față de Q41: 'depozit' vs. 'distribuit'", topic: "Managementul Configurațiilor", source: "IP" },
];

const TOPICS = [...new Set(ALL_QUESTIONS.map(q => q.topic))].sort();
const SOURCES = ["MPSAM", "IP"];

// ─── HOOK: SPACED REPETITION ──────────────────────────────────────────────────
function useProgress() {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem("quiz_progress_v2");
      return saved ? JSON.parse(saved) : {};
    } catch { return {}; }
  });

  const save = useCallback((newProgress) => {
    setProgress(newProgress);
    try { localStorage.setItem("quiz_progress_v2", JSON.stringify(newProgress)); } catch {}
  }, []);

  const recordAnswer = useCallback((qId, correct) => {
    setProgress(prev => {
      const entry = prev[qId] || { correct: 0, wrong: 0, streak: 0, lastSeen: 0 };
      const updated = {
        ...prev,
        [qId]: {
          correct: entry.correct + (correct ? 1 : 0),
          wrong: entry.wrong + (correct ? 0 : 1),
          streak: correct ? entry.streak + 1 : 0,
          lastSeen: Date.now(),
        }
      };
      try { localStorage.setItem("quiz_progress_v2", JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const resetProgress = useCallback(() => {
    save({});
  }, [save]);

  return { progress, recordAnswer, resetProgress };
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const getMastery = (prog, qId) => {
  const e = prog[qId];
  if (!e) return "new";
  if (e.streak >= 3) return "mastered";
  if (e.correct > 0 && e.wrong === 0) return "learning";
  if (e.wrong > 0) return "weak";
  return "new";
};

const masteryColor = { new: "#64748b", learning: "#3b82f6", weak: "#ef4444", mastered: "#22c55e" };
const masteryLabel = { new: "Nou", learning: "În învățare", weak: "De revăzut", mastered: "Stăpânit ✓" };
const masteryBg = { new: "rgba(100,116,139,0.12)", learning: "rgba(59,130,246,0.12)", weak: "rgba(239,68,68,0.12)", mastered: "rgba(34,197,94,0.12)" };

// ─── COMPONENTA PRINCIPALĂ ────────────────────────────────────────────────────
export default function QuizComplet() {
  const { progress, recordAnswer, resetProgress } = useProgress();
  const [screen, setScreen] = useState("home"); // home | quiz | results | stats | review
  const [settings, setSettings] = useState({
    topics: [],
    sources: [],
    mode: "all", // all | weak | new | smart
    shuffle: true,
  });
  const [queue, setQueue] = useState([]);
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showExp, setShowExp] = useState(false);
  const [sessionAnswers, setSessionAnswers] = useState({});
  const [reviewFilter, setReviewFilter] = useState("wrong");
  const [flashcard, setFlashcard] = useState(false);
  const [fcFlipped, setFcFlipped] = useState(false);

  const filterQuestions = useCallback((s) => {
    let qs = [...ALL_QUESTIONS];
    if (s.topics.length > 0) qs = qs.filter(q => s.topics.includes(q.topic));
    if (s.sources.length > 0) qs = qs.filter(q => s.sources.includes(q.source));
    if (s.mode === "weak") qs = qs.filter(q => getMastery(progress, q.id) === "weak");
    if (s.mode === "new") qs = qs.filter(q => getMastery(progress, q.id) === "new");
    if (s.mode === "smart") {
      qs = qs.filter(q => {
        const m = getMastery(progress, q.id);
        return m !== "mastered";
      }).sort((a, b) => {
        const pa = progress[a.id], pb = progress[b.id];
        const scoreA = pa ? (pa.wrong * 3 - pa.correct) : 5;
        const scoreB = pb ? (pb.wrong * 3 - pb.correct) : 5;
        return scoreB - scoreA;
      });
    }
    if (s.shuffle && s.mode !== "smart") {
      for (let i = qs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [qs[i], qs[j]] = [qs[j], qs[i]];
      }
    }
    return qs;
  }, [progress]);

  const startQuiz = (s = settings, fc = false) => {
    const qs = filterQuestions(s);
    if (qs.length === 0) return;
    setQueue(qs);
    setQIdx(0);
    setSelected(null);
    setConfirmed(false);
    setShowExp(false);
    setSessionAnswers({});
    setFlashcard(fc);
    setFcFlipped(false);
    setScreen("quiz");
  };

  const currentQ = queue[qIdx];
  const totalQ = queue.length;
  const sessionScore = Object.values(sessionAnswers).filter(a => a.correct).length;

  const handleConfirm = () => {
    if (selected === null) return;
    const isCorrect = selected === currentQ.correct;
    recordAnswer(currentQ.id, isCorrect);
    setSessionAnswers(prev => ({ ...prev, [currentQ.id]: { selected, correct: isCorrect } }));
    setConfirmed(true);
  };

  const handleNext = () => {
    if (qIdx + 1 >= totalQ) { setScreen("results"); return; }
    setQIdx(i => i + 1);
    setSelected(null);
    setConfirmed(false);
    setShowExp(false);
    setFcFlipped(false);
  };

  const toggleTopic = (t) => {
    setSettings(prev => ({
      ...prev,
      topics: prev.topics.includes(t) ? prev.topics.filter(x => x !== t) : [...prev.topics, t]
    }));
  };

  const toggleSource = (s) => {
    setSettings(prev => ({
      ...prev,
      sources: prev.sources.includes(s) ? prev.sources.filter(x => x !== s) : [...prev.sources, s]
    }));
  };

  // STATS
  const masteryCount = { new: 0, learning: 0, weak: 0, mastered: 0 };
  ALL_QUESTIONS.forEach(q => { masteryCount[getMastery(progress, q.id)]++; });
  const totalAnswered = ALL_QUESTIONS.filter(q => progress[q.id]).length;

  // DESIGN TOKENS
  const C = {
    bg: "#0a0f1e",
    surface: "rgba(255,255,255,0.04)",
    surfaceHover: "rgba(255,255,255,0.07)",
    border: "rgba(255,255,255,0.09)",
    accent: "#6366f1",
    accentGlow: "rgba(99,102,241,0.3)",
    text: "#e2e8f0",
    muted: "#94a3b8",
    dim: "#475569",
  };
  const base = { minHeight: "100vh", background: C.bg, fontFamily: "'Inter', system-ui, sans-serif", color: C.text };
  const card = { background: C.surface, borderRadius: 16, border: `1px solid ${C.border}`, padding: "18px 22px" };
  const btn = (active, color = C.accent) => ({
    padding: "8px 16px", borderRadius: 10, border: `1px solid ${active ? color : C.border}`,
    background: active ? `${color}22` : "transparent",
    color: active ? color : C.muted, cursor: "pointer", fontSize: 13, fontWeight: active ? 600 : 400,
    transition: "all 0.15s",
  });

  // ── HOME ──────────────────────────────────────────────────────────────────
  if (screen === "home") return (
    <div style={{ ...base, padding: "0 0 60px" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(180deg,rgba(99,102,241,0.15) 0%,transparent 100%)", borderBottom: `1px solid ${C.border}`, padding: "28px 20px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 32 }}>🎓</span>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px", background: "linear-gradient(135deg,#818cf8,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Quiz MPSAM + IP
              </h1>
              <p style={{ margin: 0, fontSize: 13, color: C.muted }}>102 întrebări • Prof. Stoicu-Tivadar • UPT Timișoara</p>
            </div>
          </div>

          {/* Progress bar overview */}
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {Object.entries(masteryCount).map(([k, v]) => (
              <div key={k} style={{ ...card, padding: "10px 12px", borderColor: `${masteryColor[k]}33` }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: masteryColor[k] }}>{v}</div>
                <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{masteryLabel[k]}</div>
              </div>
            ))}
          </div>

          {totalAnswered > 0 && (
            <div style={{ marginTop: 10, height: 6, background: C.border, borderRadius: 3, overflow: "hidden", display: "flex" }}>
              {["new","learning","weak","mastered"].map(k => (
                <div key={k} style={{ width: `${(masteryCount[k]/102)*100}%`, background: masteryColor[k], transition: "width 0.5s" }} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 700, margin: "0 auto", padding: "20px 20px 0" }}>

        {/* Quick start buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          <button onClick={() => startQuiz({ topics: [], sources: [], mode: "smart", shuffle: false })}
            style={{ padding: "14px 16px", borderRadius: 14, border: "none", background: "linear-gradient(135deg,#6366f1,#4f46e5)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", textAlign: "left" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>🧠</div>
            <div>Mod Smart</div>
            <div style={{ fontSize: 11, opacity: 0.8, fontWeight: 400 }}>Prioritizează punctele slabe</div>
          </button>
          <button onClick={() => startQuiz({ topics: [], sources: [], mode: "all", shuffle: true })}
            style={{ padding: "14px 16px", borderRadius: 14, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 14, fontWeight: 700, cursor: "pointer", textAlign: "left" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>🎲</div>
            <div>Toate întrebările</div>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 400 }}>Ordine aleatorie</div>
          </button>
          <button onClick={() => startQuiz({ topics: [], sources: [], mode: "weak", shuffle: true })}
            style={{ padding: "14px 16px", borderRadius: 14, border: `1px solid rgba(239,68,68,0.3)`, background: "rgba(239,68,68,0.06)", color: "#f87171", fontSize: 14, fontWeight: 700, cursor: "pointer", textAlign: "left" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>🔥</div>
            <div>De revăzut ({masteryCount.weak})</div>
            <div style={{ fontSize: 11, opacity: 0.8, fontWeight: 400 }}>Numai întrebările greșite</div>
          </button>
          <button onClick={() => startQuiz({ topics: [], sources: [], mode: "new", shuffle: true })}
            style={{ padding: "14px 16px", borderRadius: 14, border: `1px solid rgba(100,116,139,0.3)`, background: "rgba(100,116,139,0.06)", color: C.muted, fontSize: 14, fontWeight: 700, cursor: "pointer", textAlign: "left" }}>
            <div style={{ fontSize: 20, marginBottom: 4 }}>✨</div>
            <div>Noi ({masteryCount.new})</div>
            <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 400 }}>Întrebări nevăzute</div>
          </button>
        </div>

        {/* Custom filter */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.accent, marginBottom: 12 }}>⚙️ Filtrare personalizată</div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: C.dim, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Curs</div>
            <div style={{ display: "flex", gap: 8 }}>
              {SOURCES.map(s => (
                <button key={s} onClick={() => toggleSource(s)} style={btn(settings.sources.includes(s), s === "MPSAM" ? "#38bdf8" : "#4ade80")}>
                  {s === "MPSAM" ? "🏥 MPSAM (44)" : "💻 IP (58)"}
                </button>
              ))}
              {settings.sources.length > 0 && (
                <button onClick={() => setSettings(p => ({ ...p, sources: [] }))} style={{ ...btn(false), color: C.dim }}>Toate</button>
              )}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 11, color: C.dim, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Capitol</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {TOPICS.map(t => {
                const count = ALL_QUESTIONS.filter(q => q.topic === t).length;
                const weakCount = ALL_QUESTIONS.filter(q => q.topic === t && getMastery(progress, q.id) === "weak").length;
                const masteredCount = ALL_QUESTIONS.filter(q => q.topic === t && getMastery(progress, q.id) === "mastered").length;
                const active = settings.topics.includes(t);
                return (
                  <button key={t} onClick={() => toggleTopic(t)} style={{
                    ...btn(active, C.accent),
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    <span>{t}</span>
                    <span style={{ fontSize: 10, opacity: 0.7 }}>({count})</span>
                    {weakCount > 0 && <span style={{ fontSize: 10, color: "#f87171" }}>•{weakCount}❌</span>}
                    {masteredCount === count && count > 0 && <span style={{ fontSize: 10, color: "#22c55e" }}>✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: C.dim, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>Mod</div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {[["all","Toate"],["smart","Smart 🧠"],["weak","De revăzut 🔥"],["new","Noi ✨"]].map(([val, label]) => (
                <button key={val} onClick={() => setSettings(p => ({ ...p, mode: val }))} style={btn(settings.mode === val)}>{label}</button>
              ))}
            </div>
          </div>

          {(() => {
            const count = filterQuestions(settings).length;
            return (
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => startQuiz(settings, false)}
                  disabled={count === 0}
                  style={{ flex: 1, padding: "12px", borderRadius: 12, border: "none", background: count > 0 ? "linear-gradient(135deg,#6366f1,#4f46e5)" : C.surface, color: count > 0 ? "#fff" : C.dim, fontSize: 14, fontWeight: 700, cursor: count > 0 ? "pointer" : "not-allowed" }}>
                  🚀 Start ({count} întrebări)
                </button>
                <button onClick={() => startQuiz(settings, true)}
                  disabled={count === 0}
                  style={{ padding: "12px 16px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.surface, color: count > 0 ? C.text : C.dim, fontSize: 13, cursor: count > 0 ? "pointer" : "not-allowed" }}>
                  🃏 Flashcard
                </button>
              </div>
            );
          })()}
        </div>

        {/* Bottom actions */}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setScreen("stats")} style={{ ...btn(false), flex: 1, padding: "10px", textAlign: "center" }}>📊 Statistici</button>
          {totalAnswered > 0 && (
            <button onClick={() => { if (window.confirm("Resetezi tot progresul?")) resetProgress(); }}
              style={{ ...btn(false), padding: "10px 16px", color: "#f87171", borderColor: "rgba(239,68,68,0.2)" }}>🗑️ Reset</button>
          )}
        </div>
      </div>
    </div>
  );

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  if (screen === "quiz" && currentQ) {
    const mastery = getMastery(progress, currentQ.id);
    const pct = (qIdx / totalQ) * 100;

    // FLASHCARD MODE
    if (flashcard) return (
      <div style={{ ...base, display: "flex", flexDirection: "column", padding: "20px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", width: "100%" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
            <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 13 }}>← Meniu</button>
            <span style={{ fontSize: 13, color: C.muted }}>{qIdx + 1} / {totalQ}</span>
          </div>
          <div style={{ height: 4, background: C.border, borderRadius: 2, marginBottom: 24 }}>
            <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 2 }} />
          </div>

          <div onClick={() => setFcFlipped(f => !f)}
            style={{ ...card, minHeight: 220, cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", gap: 12, position: "relative", transition: "transform 0.2s", userSelect: "none" }}>
            <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 8, background: `${masteryBg[mastery]}`, color: masteryColor[mastery], border: `1px solid ${masteryColor[mastery]}33`, position: "absolute", top: 14, right: 14 }}>
              {masteryLabel[mastery]}
            </span>
            {!fcFlipped
              ? <><div style={{ fontSize: 11, color: C.dim, marginBottom: 4 }}>📋 {currentQ.topic} · {currentQ.source}</div>
                  <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6, margin: 0 }}>{currentQ.text}</p>
                  <div style={{ fontSize: 12, color: C.dim, marginTop: 8 }}>Apasă pentru răspuns</div></>
              : <><div style={{ fontSize: 11, color: "#4ade80", marginBottom: 8 }}>✓ Răspuns corect</div>
                  <p style={{ fontSize: 15, color: "#86efac", fontWeight: 600, margin: 0 }}>{currentQ.options[currentQ.correct]}</p>
                  <p style={{ fontSize: 13, color: C.muted, marginTop: 10, lineHeight: 1.5 }}>{currentQ.explanation}</p></>
            }
          </div>

          {fcFlipped && (
            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button onClick={() => { recordAnswer(currentQ.id, false); handleNext(); }}
                style={{ flex: 1, padding: 12, borderRadius: 12, border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.08)", color: "#f87171", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                ✗ Nu știam
              </button>
              <button onClick={() => { recordAnswer(currentQ.id, true); handleNext(); }}
                style={{ flex: 1, padding: 12, borderRadius: 12, border: "1px solid rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.08)", color: "#4ade80", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                ✓ Știam
              </button>
            </div>
          )}
        </div>
      </div>
    );

    // QUIZ MODE
    return (
      <div style={{ ...base, padding: "16px 20px 40px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", fontSize: 13 }}>← Meniu</button>
            <div style={{ display: "flex", gap: 16, fontSize: 13 }}>
              <span style={{ color: "#4ade80", fontWeight: 700 }}>✓ {sessionScore}</span>
              <span style={{ color: C.dim }}>{qIdx + 1}/{totalQ}</span>
            </div>
          </div>

          {/* Progress */}
          <div style={{ height: 4, background: C.border, borderRadius: 2, marginBottom: 18 }}>
            <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg,${C.accent},#818cf8)`, borderRadius: 2, transition: "width 0.25s" }} />
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 8, background: currentQ.source === "MPSAM" ? "rgba(56,189,248,0.1)" : "rgba(74,222,128,0.1)", color: currentQ.source === "MPSAM" ? "#38bdf8" : "#4ade80", border: `1px solid ${currentQ.source === "MPSAM" ? "rgba(56,189,248,0.2)" : "rgba(74,222,128,0.2)"}` }}>
              {currentQ.source === "MPSAM" ? "🏥" : "💻"} {currentQ.source}
            </span>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 8, background: C.surface, color: C.muted, border: `1px solid ${C.border}` }}>
              {currentQ.topic}
            </span>
            <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 8, background: masteryBg[mastery], color: masteryColor[mastery], border: `1px solid ${masteryColor[mastery]}33` }}>
              {masteryLabel[mastery]}
            </span>
            {currentQ.status.startsWith("⚠️") && (
              <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 8, background: "rgba(234,179,8,0.1)", color: "#fbbf24", border: "1px solid rgba(234,179,8,0.2)" }}>⚠️ Verificați!</span>
            )}
          </div>

          {/* Question */}
          <div style={{ ...card, marginBottom: 12 }}>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, fontWeight: 500 }}>
              <span style={{ color: C.accent, fontWeight: 800, marginRight: 6, fontSize: 12 }}>Q{currentQ.id}</span>
              {currentQ.text}
            </p>
          </div>

          {/* Options */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            {currentQ.options.map((opt, i) => {
              let bg = C.surface, bc = C.border, col = C.text;
              if (confirmed) {
                if (i === currentQ.correct) { bg = "rgba(34,197,94,0.1)"; bc = "rgba(34,197,94,0.4)"; col = "#86efac"; }
                else if (i === selected) { bg = "rgba(239,68,68,0.08)"; bc = "rgba(239,68,68,0.4)"; col = "#fca5a5"; }
                else { col = C.dim; }
              } else if (selected === i) {
                bg = "rgba(99,102,241,0.12)"; bc = `rgba(99,102,241,0.5)`; col = "#a5b4fc";
              }
              return (
                <button key={i} onClick={() => !confirmed && setSelected(i)} style={{
                  textAlign: "left", padding: "13px 16px", borderRadius: 12,
                  background: bg, border: `1px solid ${bc}`, color: col,
                  cursor: confirmed ? "default" : "pointer", fontSize: 14, lineHeight: 1.5,
                  display: "flex", gap: 10, alignItems: "flex-start", transition: "all 0.12s",
                }}>
                  <span style={{
                    minWidth: 22, height: 22, borderRadius: "50%",
                    background: confirmed && i === currentQ.correct ? "rgba(34,197,94,0.2)"
                      : confirmed && i === selected && i !== currentQ.correct ? "rgba(239,68,68,0.2)"
                      : selected === i ? "rgba(99,102,241,0.2)" : C.border,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: 700,
                    color: confirmed && i === currentQ.correct ? "#4ade80"
                      : confirmed && i === selected && i !== currentQ.correct ? "#f87171"
                      : selected === i ? "#818cf8" : C.dim,
                  }}>
                    {confirmed && i === currentQ.correct ? "✓" : confirmed && i === selected && i !== currentQ.correct ? "✗" : String.fromCharCode(65 + i)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {confirmed && (
            <div style={{ marginBottom: 12 }}>
              <button onClick={() => setShowExp(v => !v)}
                style={{ background: "none", border: `1px solid ${C.border}`, borderRadius: 8, padding: "5px 12px", color: C.muted, cursor: "pointer", fontSize: 12 }}>
                {showExp ? "▲ Ascunde explicația" : "▼ Arată explicația"}
              </button>
              {showExp && (
                <div style={{ marginTop: 8, padding: "14px 16px", borderRadius: 12, background: "rgba(99,102,241,0.05)", border: `1px solid rgba(99,102,241,0.15)` }}>
                  <p style={{ margin: "0 0 6px", fontSize: 13, color: C.text, lineHeight: 1.6 }}>{currentQ.explanation}</p>
                  <p style={{ margin: 0, fontSize: 11, color: currentQ.status.startsWith("✅") ? "#4ade80" : "#fbbf24" }}>{currentQ.status}</p>
                </div>
              )}
            </div>
          )}

          {/* Action */}
          {!confirmed
            ? <button onClick={handleConfirm} disabled={selected === null}
                style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: selected !== null ? `linear-gradient(135deg,${C.accent},#4f46e5)` : C.surface, color: selected !== null ? "#fff" : C.dim, fontSize: 15, fontWeight: 700, cursor: selected !== null ? "pointer" : "not-allowed", boxShadow: selected !== null ? `0 4px 20px ${C.accentGlow}` : "none" }}>
                Confirmă răspunsul
              </button>
            : <button onClick={handleNext}
                style={{ width: "100%", padding: 14, borderRadius: 12, border: "none", background: `linear-gradient(135deg,${C.accent},#4f46e5)`, color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 20px ${C.accentGlow}` }}>
                {qIdx + 1 >= totalQ ? "📊 Rezultate finale" : "Înainte →"}
              </button>
          }
        </div>
      </div>
    );
  }

  // ── RESULTS ───────────────────────────────────────────────────────────────
  if (screen === "results") {
    const pct = Math.round((sessionScore / totalQ) * 100);
    const byTopic = {};
    queue.forEach(q => {
      if (!byTopic[q.topic]) byTopic[q.topic] = { total: 0, correct: 0 };
      byTopic[q.topic].total++;
      if (sessionAnswers[q.id]?.correct) byTopic[q.topic].correct++;
    });

    return (
      <div style={{ ...base, padding: "28px 20px 50px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 52, marginBottom: 8 }}>{pct >= 80 ? "🏆" : pct >= 60 ? "📈" : "📚"}</div>
            <h2 style={{ fontSize: 26, fontWeight: 800, margin: "0 0 4px", background: `linear-gradient(135deg,#818cf8,${C.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {sessionScore} / {totalQ}
            </h2>
            <p style={{ color: C.muted, margin: 0 }}>{pct}% — {pct >= 80 ? "Excelent! Ești pregătit!" : pct >= 60 ? "Bine! Mai exersează puțin." : "Continuă — repetarea e cheia!"}</p>
          </div>

          {/* Topic breakdown */}
          <div style={{ ...card, marginBottom: 16 }}>
            <div style={{ fontSize: 12, color: C.dim, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>Rezultate pe capitol</div>
            {Object.entries(byTopic).map(([topic, { total, correct }]) => {
              const p = Math.round((correct / total) * 100);
              return (
                <div key={topic} style={{ marginBottom: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                    <span style={{ fontSize: 13, color: C.text }}>{topic}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: p >= 80 ? "#4ade80" : p >= 50 ? "#fbbf24" : "#f87171" }}>{correct}/{total}</span>
                  </div>
                  <div style={{ height: 4, background: C.border, borderRadius: 2 }}>
                    <div style={{ height: "100%", width: `${p}%`, background: p >= 80 ? "#4ade80" : p >= 50 ? "#fbbf24" : "#f87171", borderRadius: 2, transition: "width 0.5s" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Review toggle */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            {["wrong","right","all"].map(f => (
              <button key={f} onClick={() => setReviewFilter(f)} style={btn(reviewFilter === f)}>
                {f === "wrong" ? `❌ Greșite (${totalQ - sessionScore})` : f === "right" ? `✅ Corecte (${sessionScore})` : `Toate (${totalQ})`}
              </button>
            ))}
          </div>

          {/* Review list */}
          {queue.filter(q => {
            const ans = sessionAnswers[q.id];
            if (reviewFilter === "wrong") return ans && !ans.correct;
            if (reviewFilter === "right") return ans && ans.correct;
            return true;
          }).map(q => {
            const ans = sessionAnswers[q.id];
            return (
              <div key={q.id} style={{ ...card, marginBottom: 8, borderColor: ans?.correct ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)", background: ans?.correct ? "rgba(34,197,94,0.04)" : "rgba(239,68,68,0.04)" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 4, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 16 }}>{ans?.correct ? "✓" : "✗"}</span>
                  <p style={{ margin: 0, fontSize: 13, fontWeight: 600, lineHeight: 1.5, color: C.text }}>{q.text}</p>
                </div>
                {!ans?.correct && ans && (
                  <p style={{ margin: "4px 0 4px 24px", fontSize: 12, color: C.muted }}>
                    Răspunsul tău: <span style={{ color: "#f87171" }}>{q.options[ans.selected]}</span>
                    <span style={{ color: C.dim, margin: "0 6px" }}>→</span>
                    Corect: <span style={{ color: "#4ade80" }}>{q.options[q.correct]}</span>
                  </p>
                )}
                <p style={{ margin: "4px 0 0 24px", fontSize: 12, color: C.dim, lineHeight: 1.5 }}>{q.explanation}</p>
              </div>
            );
          })}

          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <button onClick={() => setScreen("home")} style={{ flex: 1, padding: 13, borderRadius: 12, border: `1px solid ${C.border}`, background: "transparent", color: C.muted, fontSize: 14, cursor: "pointer" }}>
              ← Meniu
            </button>
            <button onClick={() => { startQuiz({ topics: [], sources: [], mode: "weak", shuffle: true }); }}
              style={{ flex: 1, padding: 13, borderRadius: 12, border: "none", background: `linear-gradient(135deg,${C.accent},#4f46e5)`, color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              🔄 Reia punctele slabe
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── STATS ─────────────────────────────────────────────────────────────────
  if (screen === "stats") return (
    <div style={{ ...base, padding: "24px 20px 50px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", fontSize: 13 }}>← Înapoi</button>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>📊 Progresul tău</h2>
        </div>

        {/* Overall */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 16 }}>
          {Object.entries(masteryCount).map(([k, v]) => (
            <div key={k} style={{ ...card, padding: "14px", textAlign: "center", borderColor: `${masteryColor[k]}33` }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: masteryColor[k] }}>{v}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{masteryLabel[k]}</div>
            </div>
          ))}
        </div>

        {/* Per topic */}
        <div style={{ ...card, marginBottom: 16 }}>
          <div style={{ fontSize: 12, color: C.dim, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Detalii pe capitol</div>
          {TOPICS.map(t => {
            const qs = ALL_QUESTIONS.filter(q => q.topic === t);
            const counts = { new: 0, learning: 0, weak: 0, mastered: 0 };
            qs.forEach(q => counts[getMastery(progress, q.id)]++);
            return (
              <div key={t} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{t}</span>
                  <span style={{ fontSize: 12, color: counts.mastered === qs.length ? "#4ade80" : C.muted }}>
                    {counts.mastered}/{qs.length} stăpânite
                  </span>
                </div>
                <div style={{ height: 6, background: C.border, borderRadius: 3, overflow: "hidden", display: "flex" }}>
                  {["mastered","learning","weak","new"].map(k => (
                    <div key={k} style={{ width: `${(counts[k]/qs.length)*100}%`, background: masteryColor[k], transition: "width 0.5s" }} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Per question detail for weak ones */}
        {ALL_QUESTIONS.filter(q => getMastery(progress, q.id) === "weak").length > 0 && (
          <div style={{ ...card }}>
            <div style={{ fontSize: 12, color: "#f87171", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 12 }}>🔥 Întrebări de revăzut</div>
            {ALL_QUESTIONS.filter(q => getMastery(progress, q.id) === "weak").map(q => {
              const e = progress[q.id];
              return (
                <div key={q.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${C.border}` }}>
                  <span style={{ fontSize: 13, color: C.text, flex: 1, marginRight: 12 }}>{q.text}</span>
                  <span style={{ fontSize: 12, color: "#f87171", whiteSpace: "nowrap" }}>✓{e.correct} ✗{e.wrong}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return null;
}
