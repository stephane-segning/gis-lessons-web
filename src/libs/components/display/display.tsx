import { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import RevealMermaid from 'reveal.js-mermaid-plugin';
import Highlight from 'reveal.js/plugin/highlight/highlight';
import RevealMarkdown from 'reveal.js/plugin/markdown/markdown';
import Notes from 'reveal.js/plugin/notes/notes';
import RevealSearch from 'reveal.js/plugin/search/search';
import './display.scss';

const htmlContent = (data: string) => `
<section data-markdown>
  <textarea data-template>
    ${data}
  </textarea>
</section>
`;

export interface DisplayProps {
  data: string;
}

export default function Display({ data }: DisplayProps) {
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance

  useEffect(() => {
    // Prevents double initialization in strict mode
    if (deckRef.current) return;

    deckRef.current = new Reveal(deckDivRef.current!, {
      plugins: [Notes, Highlight, RevealSearch, RevealMermaid, RevealMarkdown],
      controls: true,
      embedded: true,
    });
    //console.log(deckRef.current);

    deckRef.current.initialize().then(() => {
      console.log('Deck initialized');
      // good place for event handlers and plugin setups
    });

    return () => {
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn('Reveal.js destroy call failed.', e);
      }
    };
  }, []);

  return (
    <div className='display'>
      <div className='reveal' ref={deckDivRef}>
        <div
          className='slides'
          dangerouslySetInnerHTML={{ __html: htmlContent(data) }}
        />
      </div>
    </div>
  );
}
