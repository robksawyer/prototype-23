/**
 * SpeechDemo.jsx
 */
 import * as React from 'react';

 // Component(s)
 import SpeechDemo from './SpeechDemo';

 export default {
   title: 'SpeechDemo',
   component: SpeechDemo,
   // Sets the layout parameter component wide.
   parameters: {
     layout: 'centered',
   },
 };

 export const Default = () => <SpeechDemo />;

 Default.storyName = 'default';
