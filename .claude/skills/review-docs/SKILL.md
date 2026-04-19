Przeprowadź weryfikację kodu lub wskazanego pliku pod kątem poprawności składni i użycia najnowszych wersji bibliotek/frameworków.

## Kroki

1. Zidentyfikuj wszystkie używane biblioteki i frameworki w pliku (importy, wywołania API, składnia).
2. Dla każdej biblioteki użyj narzędzia `mcp__context7__resolve-library-id` aby znaleźć jej ID, a następnie `mcp__context7__get-library-docs` aby pobrać aktualną dokumentację.
3. Porównaj użytą składnię z dokumentacją i zweryfikuj:
   - czy użyte API/metody/hooki istnieją w aktualnej wersji
   - czy składnia jest zgodna z najnowszymi wzorcami (np. nowe App Router zamiast Pages Router, nowe hooki zamiast starych)
   - czy nie używane są przestarzałe (deprecated) metody lub wzorce
   - czy importy wskazują na właściwe pakiety/ścieżki
4. Sprawdź czy wersje w package.json są aktualne względem dokumentacji.

## Format odpowiedzi

Dla każdej biblioteki podaj:
- **Wersja użyta** vs **Wersja aktualna** (jeśli różna - oznacz jako `OUTDATED`)
- Lista problemów ze składnią lub przestarzałymi API (poziom: `BREAKING` / `DEPRECATED` / `SUGGESTION`)
- Konkretna sugestia poprawki z przykładem kodu

Jeśli wszystko jest aktualne i poprawne - powiedz to wprost i wskaż które wzorce są dobrze użyte.
