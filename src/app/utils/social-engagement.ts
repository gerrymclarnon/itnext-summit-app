export function openSpeakerTwitter(speaker: any) {
  window.open(`https://twitter.com/${speaker.twitter}`, '_blank');
}

export function mentionSpeakerTwitter(twitter: string, sessionName: string) {
  window.open(`https://twitter.com/intent/tweet?screen_name=\
${twitter}&text=${encodeURIComponent(sessionName)}&hashtags=itnextsummit,itnext`, '_blank');
}
