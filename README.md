# Sri Mayam React App

Sri Mayam is now a Vite + React single-page application for online puja and seva booking.
The app renders fallback devotional content locally and can be configured to load sevas,
benefits, testimonials, FAQs, and booking submissions from backend APIs.

## Getting started

```bash
npm install
npm run dev
```

## API configuration

Copy `.env.example` to `.env.local` and update the values for your backend:

```bash
cp .env.example .env.local
```

| Variable                     | Purpose                                                                  |
| ---------------------------- | ------------------------------------------------------------------------ |
| `VITE_API_BASE_URL`          | Base URL for the backend API. Leave empty to use built-in fallback data. |
| `VITE_API_TIMEOUT_MS`        | Request timeout in milliseconds.                                         |
| `VITE_SEVAS_ENDPOINT`        | Endpoint for seva cards.                                                 |
| `VITE_BENEFITS_ENDPOINT`     | Endpoint for benefit cards.                                              |
| `VITE_TESTIMONIALS_ENDPOINT` | Endpoint for testimonials.                                               |
| `VITE_FAQS_ENDPOINT`         | Endpoint for FAQs.                                                       |
| `VITE_BOOKING_ENDPOINT`      | Endpoint that accepts booking enquiries by `POST`.                       |

Collection endpoints may return either a JSON array or an object with an `items` array.
The booking endpoint receives JSON with `name`, `phone`, and `seva`.

## Build

```bash
npm run build
```
