import { ANSWERS_COLORS, ANSWERS_ICONS } from "../../../constants";
import clsx from "clsx";
import { createElement } from "react";

export default function Prepared({ data: { totalAnswers, questionNumber } }) {
  return (
    <section style={{ position: 'relative', margin: '0 auto', display: 'flex', width: '100%', maxWidth: '7xl', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center', fontSize: '3rem', fontWeight: 'bold', color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
        Question #{questionNumber}
      </h2>
      <div style={{ display: 'grid', aspectRatio: '1 / 1', width: '60px', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px', borderRadius: '2xl', backgroundColor: '#4b5563', padding: '5px' }}>
        {[...Array(totalAnswers)].map((_, key) => (
          <div
            key={key}
            className={clsx(
              "button shadow-inset flex aspect-square h-full w-full items-center justify-center rounded-2xl",
              ANSWERS_COLORS[key],
            )}
            style={{ display: 'flex', aspectRatio: '1 / 1', height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: '2xl' }}
          >
            {createElement(ANSWERS_ICONS[key], { style: { height: '10px', md: { height: '14px' } } })}
          </div>
        ))}
      </div>
    </section>
  );
}