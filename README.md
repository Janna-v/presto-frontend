# Presto.it

Prototipo frontend di un portale di annunci, realizzato durante Hackademy di Aulab.

**Progetto individuale.** Il repository è un fork; questa caratteristica tecnica non indica un progetto di gruppo.

## Funzionalità

- Homepage con categorie caricate da JSON.
- Pagina annunci con generazione dinamica delle schede.
- Ricerca per nome e filtri per categoria e intervallo di prezzo.
- Ordinamento per prezzo e nome.
- Caricamento dei dati tramite Fetch API.

## Tecnologie

HTML, CSS, JavaScript, Bootstrap 5, Bootstrap Icons e JSON.

## Struttura

- `index.Presto.html`: homepage.
- `announcements.Presto.html`: elenco, ricerca, filtri e ordinamento.
- `public/js/index.Presto.js`: caricamento e visualizzazione delle categorie.
- `public/js/announcements.Presto.js`: gestione degli annunci.
- `public/css/style.css`: stili.
- `public/img/`: immagini.
- `server/api/categorie.json` e `server/api/annunci.json`: dati statici.

## Avvio locale

Servono un browser moderno e un server HTTP statico. Per esempio, con Python disponibile, dalla radice del repository:

```powershell
python -m http.server 8080
```

Aprire `http://localhost:8080/index.Presto.html` oppure `http://localhost:8080/announcements.Presto.html`.

Il server deve usare la radice del repository come document root: le chiamate Fetch usano percorsi assoluti come `/server/api/annunci.json`. L'apertura tramite `file://` non è la modalità prevista. Serve Internet per le dipendenze Bootstrap distribuite via CDN.

## Stato

È un prototipo frontend con dati statici, non un servizio per pubblicare e conservare annunci reali. I controlli grafici non implicano la presenza di un backend. Le funzionalità elencate sono state individuate nel codice; il comportamento nel browser non è stato verificato durante questa revisione.
