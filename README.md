# Dom BALCON — Náhled varianty A

Responzivní statická stránka podle schváleného náhledu. **Fotografie, označení jednotek, dispozice, výměry a dostupnost jsou fiktivní a viditelně označené.** Nejde o skutečnou prodejní nabídku. Dom BALCON je pracovní název.

## Spuštění

Node.js 24 nebo novější:

```sh
npm ci
npm run dev
```

Vývojový server používá port 4173, lze změnit přes `PORT`. Použijte existující checkout; cloudová úloha už běží izolovaně a další Git worktree není potřeba.

```sh
npm run build
npm run preview
```

Složka `dist/` obsahuje samostatnou statickou stránku. Nepotřebuje běžící Node server na hostingu. Fonty Manrope i všechny ilustrace se načítají lokálně. Licence fontu je v `assets/fonts/LICENSE`.

V cloudovém stroji, pokud není zapisovatelná výchozí npm cache, použijte `npm_config_cache=/tmp/moskovska-npm-cache npm ci`; nevyřazujte ověřování TLS ani integritu balíčků.

## Ověření

```sh
npx playwright install chromium
npm run build
npm test
```

V cloudovém prostředí lze browser cache zvolit pomocí `PLAYWRIGHT_BROWSERS_PATH=/workspace/scratch/playwright-browsers` při instalaci i testech. Testy kontrolují skutečné načtení obrázků a fontu, nabídku, kombinované filtry a prázdný výsledek, všechny přímé odkazy jednotek, formulář bez odesílání a ukládání, galerii, mobilní navigaci, přetečení a automatickou přístupnost. `BASE_URL` dovoluje stejnou sadu spustit proti veřejnému webu.

## Nasazení

Cíl: GitHub Pages repozitáře `petrmachml-ctrl/moskovska`, větev `main`, kořen `/`. Soubor `.nojekyll` umožňuje přímo obsluhovat statické soubory bez Jekyllu. Po zveřejnění je očekávaná adresa `https://petrmachml-ctrl.github.io/moskovska/`. Skutečný stav nasazení je třeba ověřit HTTP požadavkem, nikoli jen úspěšným pushem.

Pro jiný statický hosting lze použít obsah `dist/`. Všechny cesty jsou relativní a detail jednotky používá fragment, například `#jednotka/B3.1`, takže funguje i v podadresáři bez přepisování URL. Tlačítko „Mám záujem“ otevírá přímo předvolený formulář přes `#dopyt/B3.1`; samotné označení jednotky otevírá detail.

## Co funguje

- Responzivní stránka, navigace a kombinované filtry typu a stavu.
- Samostatně sdílitelný detail každé z osmi ukázkových jednotek.
- Oddělené plochy interiéru, balkónu, terasy a skladu.
- Zvětšování fotografií a ovládání klávesnicí.
- Formulář s předvolenou jednotkou, validací a výslovným potvrzením, že nic neodeslal.

## Hranice náhledu

Formulář **nemá serverový endpoint**, nic neodesílá a žádné osobní údaje neukládá. Kontakty, podklady pro ochranu osobních údajů ani reálné půdorysy nebyly dodány. Neexistují falešné telefony, e-maily, PDF plány ani platební akce. Odkaz na mapu otevírá externí vyhledávání ulice; mapa se na pozadí nenačítá.

Stránka nepoužívá analytiku, reklamní tagy, cookies, externí fonty ani vložené mapy. Je označená `noindex, nofollow` a `robots.txt` blokuje procházení. Jde o pokyn vyhledávačům, nikoli řízení přístupu: publikovaný náhled je veřejný.

Před skutečným prodejem vyměňte ilustrace a `data/units.js` za ověřené podklady, potvrďte název, doplňte kontakty, reálný backend formuláře, ochranu proti spamu a odpovídající informace o zpracování údajů. Teprve poté upravte indexaci a případné měření. Ceny a dostupnost se nyní spravují verzovaným souborem; CMS není součástí této ukázky.

## Podklady

`PRODUCT.md` rozlišuje fakta a pracovní obsah. `DESIGN.md` a `.impeccable/design.json` popisují implementovaný systém. `.impeccable/mocks/approved-a.png` uchovává schválenou předlohu; `assets/provenance.json` zaznamenává vznik ilustrací. Přesná shoda generovaných fotek s reálnou stavbou se nepředpokládá.
