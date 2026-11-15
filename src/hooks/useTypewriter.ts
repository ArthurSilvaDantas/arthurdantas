import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { typing } from '@/src/lib/motion';

export function useTypewriter(words: readonly string[]) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0]);

  useEffect(() => {
    setIndex(0);
    setText(words[0]);
    if (reduce || words.length < 2) return;

    let i = 0;
    let length = words[0].length;
    let erasing = true;
    let timer = 0;

    const schedule = (seconds: number) => {
      timer = window.setTimeout(step, seconds * 1000);
    };

    const step = () => {
      if (erasing) {
        length -= 1;
        setText(words[i].slice(0, length));
        if (length > 0) return schedule(typing.eraseLetter);
        erasing = false;
        i = (i + 1) % words.length;
        setIndex(i);
        return schedule(typing.pauseBeforeNextWord);
      }
      length += 1;
      setText(words[i].slice(0, length));
      if (length < words[i].length) return schedule(typing.typeLetter);
      erasing = true;
      schedule(typing.holdWord);
    };

    schedule(typing.holdWord);
    return () => window.clearTimeout(timer);
  }, [reduce, words]);

  return { text, word: words[index] };
}
