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