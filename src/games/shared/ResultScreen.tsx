import { useState } from "react";
import { SpainCommunitiesResultMap } from "../../maps/SpainCommunitiesResultMap";
import { SpainProvincesResultMap } from "../../maps/SpainProvincesResultMap";
import type { GameResult } from "./types";

type ResultScreenProps = {
  result: GameResult;
  onBackHome: () => void;
  onReplay: () => void;
};

export function ResultScreen({
  result,
  onBackHome,
  onReplay,
}: ResultScreenProps) {
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const wrongAnswers = result.answers.filter((answer) => !answer.isCorrect);
  const visibleAnswers = showAllAnswers ? result.answers : wrongAnswers;
  const resultActions = (
    <>
      <button type="button" onClick={onReplay}>
        Repetir juego
      </button>
      <button className="secondary-button" type="button" onClick={onBackHome}>
        Volver al inicio
      </button>
    </>
  );

  return (
    <main className="app-shell result-shell">
      <section className="hero-card result-hero">
        <p className="eyebrow">Has terminado</p>
        <h1>{result.score.toLocaleString("es-ES")} / 10</h1>
        <p className="lede">
          {result.correctAnswers} de {result.totalAnswers} correctas
        </p>
      </section>

      <div className="action-row result-action-row result-action-row-top" aria-label="Acciones de resultado">
        {resultActions}
      </div>

      <section className="panel result-panel">
        <div className="result-map-section">
          <h2>Mapa final</h2>
          {result.mapKind === "none" ? (
            <p>Este juego se revisa pregunta a pregunta en la lista inferior.</p>
          ) : (
            <p>Verde: acierto. Rojo: respuesta incorrecta o sin colocar.</p>
          )}
          {result.mapKind === "communities" ? (
            <SpainCommunitiesResultMap answers={result.answers} />
          ) : result.mapKind === "provinces" ? (
            <SpainProvincesResultMap answers={result.answers} />
          ) : (
            <p className="empty-state">No hay mapa específico para este modo.</p>
          )}
        </div>
      </section>

      <section className="panel result-panel">
        <div className="section-heading">
          <div>
            <h2>{showAllAnswers ? "Todas las respuestas" : "Errores"}</h2>
            <p>
              {wrongAnswers.length === 0
                ? "¡Todo correcto!"
                : "Revisa qué respuestas puedes mejorar la próxima vez."}
            </p>
          </div>
          <button
            className="secondary-button"
            type="button"
            onClick={() => setShowAllAnswers((current) => !current)}
          >
            {showAllAnswers ? "Ver solo errores" : "Ver todas las respuestas"}
          </button>
        </div>

        {visibleAnswers.length === 0 ? (
          <p className="empty-state">No hay errores que revisar.</p>
        ) : (
          <div className="answer-list">
            {visibleAnswers.map((answer) => (
              <article
                className={`answer-row ${answer.isCorrect ? "correct" : "incorrect"}`}
                key={answer.regionId}
              >
                <h3>{answer.regionName}</h3>
                <p>
                  <strong>Tu respuesta:</strong>{" "}
                  {answer.givenAnswer ?? "Sin respuesta"}
                </p>
                <p>
                  <strong>Correcta:</strong> {answer.expectedAnswer}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <div className="action-row result-action-row" aria-label="Acciones de resultado">
        {resultActions}
      </div>
    </main>
  );
}
