import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import SignUpModal from './components/SignUpModal';
import { User } from './models/user';
import { getLoggedInUser } from './services/user.service';
import TasksPage from './pages/TasksPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutMePage from './pages/AboutMePage';
import styles from "./styles/App.module.css";

function App() {

	const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

	const [showSignUpModal, setShowSignUpModal] = useState(false);
	const [showLoginModal, setShowLoginModal] = useState(false);

	useEffect(() => {
		async function fetchLoggedInUser() {
			try {
				const user = await getLoggedInUser();
				setLoggedInUser(user);
			} catch (error) {
				console.error(error);
			}
		}
		fetchLoggedInUser();
	}, []);

	return (
		<BrowserRouter>
			<div>
				<NavBar
					loggedInUser={loggedInUser}
					onLoginClicked={() => setShowLoginModal(true)}
					onSignUpClicked={() => setShowSignUpModal(true)}
					onLogoutSuccessful={() => setLoggedInUser(null)}
				/>
				<Container className={styles.pageContainer}>
					<Routes>
						<Route
							path='/'
							element={<TasksPage loggedInUser={loggedInUser} />}
						/>
						<Route
							path='/about-me'
							element={<AboutMePage />}
						/>
						<Route
							path='/*'
							element={<NotFoundPage />}
						/>
					</Routes>
				</Container>
				{showSignUpModal &&
					<SignUpModal
						onDismiss={() => setShowSignUpModal(false)}
						onSignUpSuccessful={(user: User) => {
							setLoggedInUser(user);
							setShowSignUpModal(false);
						}}
					/>
				}
				{showLoginModal &&
					<LoginModal
						onDismiss={() => setShowLoginModal(false)}
						onLoginSuccessful={(user: User) => {
							setLoggedInUser(user);
							setShowLoginModal(false);
						}}
					/>
				}
			</div>
		</BrowserRouter>
	);
}

export default App;