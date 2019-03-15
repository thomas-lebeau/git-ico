import { useEffect, useContext } from 'react';
import { StdinContext } from 'ink';

export default function useKeyHandler(keyHandler) {
    const { stdin, setRawMode } = useContext(StdinContext);

    useEffect(() => {
        setRawMode(true);
        stdin.on('data', keyHandler);

        return () => {
            stdin.off('data', keyHandler);
            setRawMode(false);
        };
    }, [stdin, setRawMode]);
}
