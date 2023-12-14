import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
interface Quote {
	quoteText: string;
	quoteAuthor: string;
	quoteGenre: string;
}

function App() {
	const [count, setCount] = useState(0);
	const [quote, setQuote] = useState<Quote | null>(null);
	console.log(quote);

	useEffect(() => {
		fetchQuote();
	}, []);

	const fetchQuote = async () => {
		console.log("hayu");
		try {
			const response = await axios.get<Quote>(
				"https://quote-garden.onrender.com/api/v3/quotes/random"
			);
			setQuote(response.data.data[0]);
		} catch (error) {
			console.error("Error fetching quote: ", error);
		}
	};

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount(count => count + 1)}>
					count is {count}
				</button>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
			<div>
				{quote && (
					<>
						<p>Quote: {quote.quoteText}</p>
						<p>Author: {quote.quoteAuthor}</p>
						<p>Genre: {quote.quoteGenre}</p>
					</>
				)}
				<button onClick={fetchQuote}>Get New Quote</button>
			</div>
		</>
	);
}

export default App;
