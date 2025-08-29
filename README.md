:

🎬 Semantic Movie Search App

I built a semantic search web app powered by Upstash Search where users can explore a collection of movies with natural language queries. Instead of relying on plain keyword matching, the search uses semantic embeddings to understand context — so you can type queries like “sci-fi movies about space exploration” or “comedies with Jim Carrey” and get meaningful results.

⚡ Key Features

Semantic Search with Upstash → Natural language queries return contextually relevant movies.

Movie Dataset → Indexed metadata includes title, year, cast, genres, and a short plot summary.

Fast & Serverless → Built on Next.js + Upstash, no heavyweight infrastructure required.

Dark & Light Mode → Vintage-inspired UI that adapts to your system theme.

Keyboard Shortcut (Ctrl/⌘+S) → Instantly open the search dialog without touching your mouse.

Rich Movie Details → Each result links to a dedicated page with poster, genres, cast, and plot.

🛠️ Tech Stack

Frontend → Next.js (App Router), TailwindCSS, shadcn/ui

Search → Upstash Semantic Search

Database → Prisma + SQLite/Postgres (for movie data)

Icons & Styling → Lucide, vintage-inspired UI with smooth dark/light support

🌐 Example Queries

“thrillers about mind control”

“romantic movies set in New York”

“animated films from the 90s”

👉 It’s essentially a semantic-powered IMDb-style app, but lightweight, serverless, and built for experimentation with modern search infra.
installayion guide for upstash:
npm install @upstash/search

#add env
UPSTASH_SEARCH_REST_URL=<YOUR_SEARCH_REST_URL>
UPSTASH_SEARCH_REST_TOKEN=<YOUR_SEARCH_REST_TOKEN> use read only token as tis is being done on client not on server in this file

\\for the search ui i have used upstash serach ui only not other lib 
guiide to install:
npm install @upstash/search-ui
then import 
// 👇 import package and optimized styles
import { SearchBar } from "@upstash/search-ui"
import "@upstash/search-ui/dist/index.css"