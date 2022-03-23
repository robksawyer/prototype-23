/**
 * @file SpeechDemo.js
 * @see https://mikeyparton.github.io/react-speech-kit/
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';

import { useTheme } from '@/hooks/useTheme';

import styles from './SpeechDemo.module.css';

const SpeechDemo = ({
  tagName: Tag = 'div',
  className = 'flex flex-col items-center justify-center w-screen h-screen',
  variant = 'default',
  children = '',
}) => {
  const ref = React.useRef(null);
  const { toggle, getTheme } = useTheme();
  const [value, setValue] = React.useState('');
  const [voiceIndex, setVoiceIndex] = React.useState(10);
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: result => {
      console.log('--> result', result);
      ref.current.value = result;
      setValue(result);
    },
  });
  const onEnd = React.useCallback(() => {
    // You could do something here after speaking has finished
    console.log('Finished speaking.');
  }, []);
  const { speak, speaking, voices, cancel, supported } = useSpeechSynthesis({
    onEnd,
  });
  console.log('speaking', speaking);
  console.log('listening', listening);

  const voice = voices[voiceIndex] || null;
  console.log('voice', voiceIndex);

  return supported ? (
    <Tag
      className={`${styles.speech_demo} ${
        styles[`speech_demo__${variant}`]
      } ${className}`}
    >
      <p className="max-w-sm py-2 mx-auto text-black dark:text-white">
        Type a message below then click &apos;Speak&apos; and SpeechSynthesis
        will read it out.
      </p>
      <textarea
        ref={ref}
        value={value}
        onChange={event => setValue(event.target.value)}
        className={`font-mono leading-loose tracking-wide text-white bg-black outline-none focus:ring-none focus:shadow-none focus:outline-none focus:outline-dashed dark:bg-white dark:text-black ${
          speaking ? 'animate-talk' : ''
        }`}
      />
      <div className="mt-2">
        {/* <label htmlFor="voice" className="pr-2 text-black dark:text-white">
          Voice
        </label> */}
        <select
          id="voice"
          name="voice"
          value={voiceIndex || ''}
          onChange={event => {
            setVoiceIndex(event.target.value);
          }}
          className="text-white bg-black dark:text-black dark:bg-white"
        >
          <option value="">Default</option>
          {voices.map((option, index) => (
            <option key={option.voiceURI} value={index}>
              {`${option.lang} - ${option.name}`}
            </option>
          ))}
        </select>
      </div>
      <div className="flex items-center justify-center w-full mt-2 space-x-2">
        <button
          className="px-4 py-2 font-mono font-light leading-loose tracking-wide text-white lowercase bg-black underline-offset-2 decoration-from-font hover:underline decoration-dashed dark:bg-white dark:text-black"
          onClick={() => {
            if (!value) return;
            toggle();
            speak({ text: value, voice });
          }}
        >
          Speak
        </button>
        <button
          onMouseDown={listen}
          onMouseUp={stop}
          className="px-4 py-3 bg-black rounded-full hover:bg-accent4 active:bg-accent1 dark:bg-white"
        >
          {!listening ? '🎤' : '👂'}
        </button>
      </div>
    </Tag>
  ) : (
    <div className="flex items-center justify-center w-screen h-screen">
      <p className="font-mono text-xl tracking-wide text-black dark:text-white">
        Sorry, your browser does not support this.
      </p>
    </div>
  );
};

SpeechDemo.propTypes = {
  tagName: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default']),
  children: PropTypes.node,
};

export default SpeechDemo;
