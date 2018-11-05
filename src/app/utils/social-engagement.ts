export function openSpeakerTwitter(speaker: any) {
  window.open(`https://twitter.com/${speaker.twitter}`, '_blank');
}

export function mentionSpeakerTwitter(twitter: string, sessionName: string) {
  window.open(`https://twitter.com/intent/tweet?screen_name=\
${twitter}&text=${encodeURIComponent('"' + sessionName + '"')}&hashtags=itnextsummit,itnextpwa`, '_blank');
}

export function shareOnNetwork(network: string) {
  switch (network) {
    case 'LinkedIn':
      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=https%3A//itnext-summit-2018.firebaseapp.com&title=\
ITNEXT%20Summit%202018%20PWA&summary=Check%20out%20the%20PWA%20of%20ITNEXT%20Summit%202018.%20It%20rocks!&source=`, '_blank');
      break;
    case 'Facebook':
      window.open('https://www.facebook.com/sharer/sharer.php?u=https%3A//itnext-summit-2018.firebaseapp.com', '_blank');
      break;
    case 'Twitter':
      window.open(`https://twitter.com/intent/tweet?screen_name=itnext_io\
&text=https%3A//itnext-summit-2018.firebaseapp.com&hashtags=itnextsummit,itnextpwa`,
        '_blank');
      break;
  }
}
