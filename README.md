# ITNEXT Summit 2018 PWA

This is a prototype app which was built to show capabilities of a typical PWA. Commits on this repo is designed to show developers how to transform a typical Angular/ionic app into a powerful PWA. It also features a couple of nice UX ideas on top of original ionic conference app along with some bugfixes.

This repo is forked from ionic-team/ionic-conference-app. To see original ionic conference app and it's features, see following [README.md](https://github.com/ionic-team/ionic-conference-app/blob/master/README.md)

## DEMO

You can experiment with live demo of [ITNEXT Summit 2018 PWA](https://github.com/ionic-team/ionic-conference-app/blob/master/README.md) by opening it on different platforms and devices.

## Changes

### New Features!

  - Added ngsw to support Angular's Service Worker capabilities
  - Added IndexedDB storage to store persistent app data
  - Added reminder notifications for the favorite sessions that users pick to remind guests 5 minutes before the start of the session
  - Now schedule acts like a conference watch where you can see overall progress of active sessions
  - Introduced speaker mentions to engage with speakers on a specific session
  - Added push notifications service worker of firebase, to engage users through GCM
  - Added Web Payment Request API demo with a **Buy Ticket** link on navigation
  - Added copy link action for speaker share to demonstrate Clipboard API

### Bug fixes

  - Fixed a bug which prevents remembering active session filters

### Improvements

  - Abstracted data manipulation from components to services and refactored to align with observable pattern

## Tech

This PWA uses a number of Web APIs and web technologies to work properly:

* Service Worker API
* Cache API
* Fetch API
* IndexedDB
* Notifications API
* Web App Manifest
* Payment Requiest API
* CSS Variables
* Background Sync API
* Push API
* Angular
* Ionic
* Firebase
