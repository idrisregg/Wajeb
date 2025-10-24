import './App.css';
import '../src/styles/themes.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/authContext';
import { ThemeProvider } from '../context/themeContext';
import { LanguageProvider } from '../context/languageContext';
import Login from '../screens/Login.jsx';
import Signup from '../screens/signup.jsx';
import Dashboard from '../screens/dashboard.jsx';
import UploadFiles from '../screens/uploadFiles.jsx';
import ViewReceivedFiles from '../screens/viewReceivedFiles.jsx';
import NotFound from '../screens/notfound.jsx';
import ProtectedRoute from '../comps/protectedRoutes.jsx';
import ThemeToggle from '../comps/themeToggle';
import LanguageToggle from '../comps/languageToggle';

function App() {
    return (
        <LanguageProvider>
            <ThemeProvider>
                <AuthProvider>
                    <Router>
                        <div className='app'>
                            <LanguageToggle className="floating" />
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/dashboard" element={
                                    <ProtectedRoute>
                                        <Dashboard />
                                    </ProtectedRoute>
                                } />
                                <Route path="/upload" element={
                                    <ProtectedRoute>
                                        <UploadFiles />
                                    </ProtectedRoute>
                                } />
                                <Route path="/received" element={
                                    <ProtectedRoute>
                                        <ViewReceivedFiles />
                                    </ProtectedRoute>
                                } />
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </div>
                    </Router>
                </AuthProvider>
            </ThemeProvider>
        </LanguageProvider>
    );
}

export default App;