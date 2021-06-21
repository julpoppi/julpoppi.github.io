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
          minInterval: 1000 * 60 * 60 * 24, // 1 day
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
  
  Notification.requestPermission().then(permission => {
    if (permission !== 'granted') {
      alert('Merci d\'activer les notifications pour vous permettre de vous assurer que le vote auto fonctionne (il peut s\'arrêter sans prévenir et il faut alors lancer l\'application.');
    } 
  });
  
  const url = `https://www.starmaxx-club.fr/vote/29/5`;
  const response = await fetch(url, {mode: 'no-cors'});

  const timestamp = new Date()
  const body = "Vote pour Clément effectué à " + timestamp;

  await registration.showNotification('Vote pour Clément effectué',
      {
          tag: timestamp, // a unique ID
          silent: true,
          body: body, // content of the push notification
      });

  console.info('Result of the fetch is ' + response);

};

};

main();
