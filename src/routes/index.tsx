import { Suspense, lazy } from "react";
import { useRoutes, BrowserRouter } from "react-router-dom";

const Home = lazy(() => import("./Home"));
const AuthorQuotes = lazy(() => import("./author-quotes"));

function Routes() {
	const publicRoutes = [
		{
			path: "/",
			element: (
				<Suspense fallback={null}>
					<Home />
				</Suspense>
			),
		},

		{
			path: "/:author",
			element: (
				<Suspense fallback={null}>
					<AuthorQuotes />
				</Suspense>
			),
		},
	];

	return useRoutes([...publicRoutes]);
}

function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes />
		</BrowserRouter>
	);
}

export default AppRoutes;
