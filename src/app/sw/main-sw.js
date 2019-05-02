importScripts('ngsw-worker.js');
importScripts('firebase-messaging-sw.js');
importScripts('idb-keyval-iife.min.js');

let sessionIdsOfSentNotifications = [];

async function getStoredNotifications() {
  sessionIdsOfSentNotifications = await idbKeyval.get('sessionIdsOfSentNotifications') || [];
}

const showNotification = (session) => {
  return self.registration.showNotification(
    'Your favorite session will start soon',
    {
      body: `${session.location} will host "${session.name}".`,
      icon: 'https://itnext-summit-2018.firebaseapp.com/assets/icons/icon-192x192.png',
      vibrate: [100, 100, 200, 300],
      tag: 'session',
      data: session,
    }).then(() => {
    sessionIdsOfSentNotifications.push(session.id);
    idbKeyval.set('sessionIdsOfSentNotifications', sessionIdsOfSentNotifications);
  });
};

const isSessionAboutToStart = (session) => {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const [sessionHours, sessionMinutes] = session.timeStart.split(':');

  const getNotificationTime = () => {
    const minutesReference = parseInt(sessionMinutes, 10) - 5;
    if (minutesReference < 0) {
      return `${parseInt(sessionHours, 10) - 1}:${60 + minutesReference}`;
    } else {
      return `${sessionHours}:${minutesReference}`;
    }
  };

  const notificationTime = getNotificationTime();

  return Date.parse(`01/01/2018 ${hours}:${minutes}`) >= Date.parse(`01/01/2018 ${notificationTime}`) &&
    Date.parse(`01/01/2018 ${hours}:${minutes}`) <= Date.parse(`01/01/2018 ${session.timeStart}`);
};

const isNotificationNotSentForSession = (session) => {
  return !sessionIdsOfSentNotifications.includes(session.id);
};

const sendNotificationForSessionsAboutToStart = (sessions) => {
  sessions
    .filter(isSessionAboutToStart)
    .filter(isNotificationNotSentForSession)
    .forEach((session) => {
      showNotification(session);
    });
};

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  event.waitUntil(clients.matchAll({
    type: 'window'
  }).then((clientList) => {
    if (event.notification.tag && event.notification.tag === 'session' && clients.openWindow) {
      return clients.openWindow(`/(schedule:session/${event.notification.data.id})`);
    } else {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        return client.focus();
      }
    }
  }));
});

setInterval(async () => {
  const favorites = await idbKeyval.get('favorites') || [];
  await getStoredNotifications();
  sendNotificationForSessionsAboutToStart(favorites);
}, 1000 * 5);
