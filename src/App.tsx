import { Suspense } from 'react';
import Header from './components/Header/Header';
import MapComponent from './components/Map/Map';
import { Occurrence } from './types';
import { useState, useEffect } from 'react';
import { getOccurrences } from './services/api';
import socket from './services/socket';

import './App.css';

const App: React.FC = () => {
    const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

    useEffect(() => {
        // 1. Fetch initial occurrences
        const fetchOccurrences = async () => {
            try {
                const response = await getOccurrences();
                console.log('ocorrencias fetchOccurrences', response.data);
                setOccurrences(response.data);
            } catch (error) {
                console.error('Error while fetching occurrences', error);
            }
        };

        fetchOccurrences();

        // 2. Subscribe to new occurrences with socket.io
        socket.on('newOccurrence', (newOccurrence: Occurrence) => {
            setOccurrences((prevOccurrences) => [
                ...prevOccurrences,
                newOccurrence,
            ]);
        });

        // 3. Clean socket event on unmount
        return () => {
            socket.off('newOccurrence');
        };
    }, []);

    return (
        <div className="grid">
            <Header />
            <main id="section-example">
                <Suspense fallback={<div>Page is Loading...</div>}>
                    <MapComponent occurrences={occurrences} />
                </Suspense>
            </main>
        </div>
    );
};

export default App;
