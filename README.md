# 📘 AI Vocabulary Learning App

[English Version](#english) | [Wersja Polska](#polska)

---

<a name="english"></a>
# English Version

AI Vocabulary Learning App is an interactive web application designed to help you master new vocabulary (e.g., from foreign languages) quickly and effectively using the power of the **OpenAI GPT-4o-mini** model.

The app creates personalized stories and intelligent quizzes based on the specific words you are currently learning.

## ✨ Key Features

- **🤖 AI Story Generation**: Based on your input words, the AI creates a coherent, logical story tailored to your chosen difficulty level and category.
- **🖱️ Interactive Translations**: Click on any keyword within the story to instantly see its translation in an animated tooltip.
- **❓ Intelligent Quizzes**: Automatically generated question sets that check your reading comprehension and vocabulary knowledge.
- **💡 Hint System**: Stuck on a word in the quiz? Use intelligent hints (translations or clues) to help you out.
- **🎨 Premium UI/UX**: A modern, dark *Glassmorphism* design with smooth animations (powered by Framer Motion).
- **⚙️ API Configuration**: Simple setup to manage your own OpenAI API Key, stored securely in `localStorage`.

## 🛠️ Tech Stack

- **Frontend**: React.js
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Icons**: Lucide-React
- **Styling**: Vanilla CSS (Modern Design System)
- **AI Model**: OpenAI GPT-4o-mini

## 🚀 Quick Start

### 1. Clone and Install
```bash
cd english-quiz
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. AI Configuration
Once the app is running, enter your **OpenAI API Key** (starting with `sk-`). This key is saved locally in your browser only.

## 📝 How to Use

1. **Add Words**: Enter between 5 to 20 words you want to learn.
2. **Choose Category**: Customize the story context (e.g., Food, Travel).
3. **Read and Interact**: Read the generated story. Click on words you don't remember to see their translation.
4. **Take the Quiz**: Test your knowledge and earn points!

## 🛡️ Security and Privacy
Your data (API Key) is stored exclusively in your browser's **localStorage**. The application does not collect any user data and does not send your keys to any external servers.

---

<a name="polska"></a>
# Wersja Polska

AI Vocabulary Learning App to interaktywna aplikacja webowa zaprojektowana do szybkiego i skutecznego opanowywania nowego słownictwa przy użyciu modelu **OpenAI GPT-4o-mini**.

Aplikacja tworzy spersonalizowane historie i inteligentne quizy na podstawie słów, których aktualnie się uczysz.

## ✨ Główne Funkcjonalności

- **🤖 Generowanie Historii przez AI**: Na podstawie wpisanych słówek, AI tworzy spójną historię dostosowaną do wybranego poziomu i kategorii.
- **🖱️ Interaktywne Tłumaczenia**: Kliknij na słowo w historii, aby zobaczyć jego tłumaczenie w animowanym dymku.
- **❓ Inteligentne Quizy**: Automatycznie generowane zestawy pytań sprawdzające rozumienie tekstu.
- **💡 System Podpowiedzi**: Skorzystaj z podpowiedzi, jeśli brakuje Ci słowa w quizie.
- **🎨 Premium UI/UX**: Nowoczesny design typu *Glassmorphism* z płynnymi animacjami (Framer Motion).
- **⚙️ Konfiguracja API**: Prosty system zarządzania Twoim własnym OpenAI API Key, przechowywanym w `localStorage`.

## 🛠️ Technologie

- **Frontend**: React.js
- **Budowa**: Vite
- **Animacje**: Framer Motion
- **Ikony**: Lucide-React
- **Stylizacja**: Vanilla CSS
- **Model AI**: OpenAI GPT-4o-mini

## 🚀 Szybki Start

### 1. Instalacja
```bash
cd english-quiz
npm install
```

### 2. Uruchomienie
```bash
npm run dev
```

### 3. Konfiguracja AI
Wprowadź swój klucz **OpenAI API Key**. Jest on zapisywany wyłącznie lokalnie w Twojej przeglądarce.

## 📝 Instrukcja Użytkowania

1. **Dodaj Słówka**: Wpisz od 5 do 20 słów.
2. **Wybierz Kategorię**: Dostosuj kontekst historii.
3. **Czytaj i Klikaj**: Czytaj historię i sprawdzaj tłumaczenia kliknięciem.
4. **Zrób Quiz**: Sprawdź swoją wiedzę!

## 🛡️ Bezpieczeństwo i Prywatność
Twoje dane są przechowywane wyłącznie w **localStorage** Twojej przeglądarki. Aplikacja nie wysyła kluczy na zewnętrzne serwery (oprócz API OpenAI).

*Made with ❤️ for faster learning.*
