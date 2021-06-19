const main = async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }

  const registration = await navigator.serviceWorker.ready;
  // Check if periodicSync is supported
  if ('periodicSync' in registration) {
    // Request permission
    const status = await navigator.permissions.query({
      name: 'periodic-background-sync',
    });

    if (status.state === 'granted') {
      try {
        // Register new sync every 24 hours
        await registration.periodicSync.register('vote', {
          minInterval: 1000, // 1 day
        });
        console.log('Periodic background sync registered!');
      } catch(e) {
        console.error(`Periodic background sync failed:\nx${e}`);
      }
    } else {
      console.info('Periodic background sync is not granted.');
    }
  } else {
    console.log('Periodic background sync is not supported.');
  }
};

main();
