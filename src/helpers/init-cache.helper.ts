import { createClient } from 'redis';

export const cache = createClient({
    url: 'redis://localhost:6379',
});

cache.on('connect', () => {
    console.log(`Cache connected to redis...`);
});

cache.on('ready', () => {
    console.log(`Cache ready to use...`);
});

cache.on('error', (err) => {
    console.log(err.message);
});

cache.on('end', () => {
    console.log('Cache disconnected from redis')
})

process.on('SIGINT', () => {
    cache.quit()
})

cache.connect();
