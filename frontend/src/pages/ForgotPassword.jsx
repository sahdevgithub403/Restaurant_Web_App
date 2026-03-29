import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would typically call an API to send a password reset link
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
                <div className="w-full max-w-md p-8 relative shadow-2xl animate-fade-in border-t-4 border-black bg-[#FDFBF7]">
                    <div className="text-center mb-8">
                        <h2 className="font-display text-3xl font-bold mb-2">Reset Password</h2>
                        <p className="font-body text-xs text-stone-500 uppercase tracking-widest">
                            We'll send you a link to reset your password
                        </p>
                    </div>

                    {submitted ? (
                        <div className="text-center space-y-6 animate-fade-in-up">
                            <p className="font-body text-sm text-green-600">
                                If an account exists for {email}, you will receive a password reset link shortly.
                            </p>
                            <Link
                                to="/login"
                                className="inline-block bg-black text-white px-6 py-4 font-body text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors"
                            >
                                Back to Login
                            </Link>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-1 animate-fade-in-up">
                                <label className="font-body text-[10px] uppercase tracking-widest text-stone-400">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full border-b border-stone-300 py-2 text-black focus:outline-none focus:border-black font-body text-sm bg-transparent"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-4 font-body text-xs uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors mt-4 animate-fade-in-up delay-100"
                            >
                                Send Reset Link
                            </button>
                            <div className="text-center pt-4 animate-fade-in-up delay-200">
                                <Link
                                    to="/login"
                                    className="font-body text-[10px] uppercase tracking-widest text-stone-500 hover:text-black transition-colors"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ForgotPassword;
