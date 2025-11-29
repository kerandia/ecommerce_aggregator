'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function SettingsPage() {
    const [apiKey, setApiKey] = useState('');
    const [provider, setProvider] = useState('openai');

    const handleSave = () => {
        // In a real app, this would save to local storage or a secure backend
        console.log('Saving settings:', { provider, apiKey });
        alert('Settings saved (simulated). In a real app, this would persist your API key securely.');
    };

    return (
        <div className="container max-w-2xl py-12">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Settings</h1>

            <div className="card space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-4">AI Configuration</h2>
                    <p className="text-[var(--muted-foreground)] mb-6">
                        Connect your preferred AI provider to enable personalized product recommendations.
                    </p>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">AI Provider</label>
                            <select
                                value={provider}
                                onChange={(e) => setProvider(e.target.value)}
                                className="input"
                            >
                                <option value="openai">OpenAI (GPT-4)</option>
                                <option value="gemini">Google Gemini</option>
                                <option value="mock">Mock (Demo Mode)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">API Key</label>
                            <input
                                type="password"
                                value={apiKey}
                                onChange={(e) => setApiKey(e.target.value)}
                                placeholder="sk-..."
                                className="input"
                            />
                            <p className="text-xs text-[var(--muted-foreground)]">
                                Your key is stored locally in your browser and never sent to our servers.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-[var(--card-border)] flex justify-end">
                    <button onClick={handleSave} className="btn btn-primary gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
