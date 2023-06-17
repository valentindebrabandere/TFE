// audioUtils.ts
export function createAudioElement(src: string) {
    const audio = new Audio(src);
    return audio;
  }
  
  export function updateProgress(audio: HTMLAudioElement) {
    return audio.currentTime / audio.duration;
  }
  
  export function playOrPauseAudio(audio: HTMLAudioElement, isPlaying: boolean) {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  
    return !isPlaying;
  }
  
  