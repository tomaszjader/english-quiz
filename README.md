# 📘 AI Vocabulary Learning App

AI Vocabulary Learning App to interaktywna aplikacja webowa zaprojektowana do szybkiego i skutecznego opanowywania nowego słownictwa (np. z języków obcych) przy użyciu potęgi modelu **OpenAI GPT-4o-mini**. 

Aplikacja tworzy spersonalizowane historie i inteligentne quizy na podstawie słów, których aktualnie się uczysz.

---

## ✨ Główne Funkcjonalności

- **🤖 Generowanie Historii przez AI**: Na podstawie wpisanych słówek, AI tworzy spójną, logiczną opowieść dostosowaną do wybranego poziomu trudności i kategorii.
- **🖱️ Interaktywne Tłumaczenia**: Kliknij na dowolne słowo kluczowe w historii, aby natychmiast zobaczyć jego polskie tłumaczenie w animowanym dymku.
- **❓ Inteligentne Quizy**: Automatycznie generowane zestawy pytań sprawdzające Twoje rozumienie tekstu oraz znajomość słownictwa.
- **💡 System Podpowiedzi**: Brakuje Ci słowa w quizie? Skorzystaj z inteligentnych podpowiedzi (tłumaczeń lub wskazówek).
- **🎨 Premium UI/UX**: Nowoczesny, ciemny design typu *Glassmorphism* z płynnymi animacjami (Framer Motion).
- **⚙️ Konfiguracja API**: Prosty system dodawania i zarządzania Twoim własnym OpenAI API Key, przechowywanym bezpiecznie w `localStorage`.

---

## 🛠️ Technologie

- **Frontend**: React.js
- **Budowa**: Vite
- **Animacje**: Framer Motion
- **Ikony**: Lucide-React
- **Stylizacja**: Vanilla CSS (Modern Design System)
- **Model AI**: OpenAI GPT-4o-mini

---

## 🚀 Szybki Start

### 1. Klonowanie i Instalacja
```bash
# Sklonuj repozytorium (jeśli wymagane)
cd english-quiz

# Zainstaluj zależności
npm install
```

### 2. Uruchomienie deweloperskie
```bash
npm run dev
```

### 3. Konfiguracja AI
Po uruchomieniu aplikacji, wprowadź swój klucz **OpenAI API Key** (zaczynający się od `sk-`). Jest on zapisywany wyłącznie lokalnie w Twojej przeglądarce.

---

## 📝 Instrukcja Użytkowania

1. **Dodaj Słówka**: Wpisz od 5 do 20 słów, których chcesz się nauczyć.
2. **Wybierz Kategorię**: Dostosuj kontekst historii (np. Jedzenie, Podróże).
3. **Czytaj i Klikaj**: Przeczytaj wygenerowaną historię. Klikaj w słówka, których nie pamiętasz, by zobaczyć tłumaczenie.
4. **Zrób Quiz**: Sprawdź swoją wiedzę i zbieraj punkty!

---

## 🛡️ Bezpieczeństwo i Prywatność
Twoje dane (klucz API) są przechowywane wyłącznie w **localStorage** Twojej przeglądarki. Aplikacja nie zbiera żadnych danych użytkownika i nie wysyła kluczy na zewnętrzne serwery (oprócz bezpośredniego połączenia z oficjalnym API OpenAI).

*Made with ❤️ for faster learning.*
