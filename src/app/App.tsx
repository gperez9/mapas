import { useMemo, useState } from "react";
import { autonomousCommunities } from "../data/autonomousCommunities";
import { CapitalsDragGame } from "../games/capitals-drag/CapitalsDragGame";
import { CommunityCapitalGame } from "../games/community-capital/CommunityCapitalGame";
import { CommunitiesDragGame } from "../games/communities-drag/CommunitiesDragGame";
import { CommunitiesWriteGame } from "../games/communities-write/CommunitiesWriteGame";
import { GuessCommunityGame } from "../games/guess-community/GuessCommunityGame";
import { ProvinceCountGame } from "../games/province-count/ProvinceCountGame";
import { ProvinceListGame } from "../games/province-list/ProvinceListGame";
import { ProvinceSortGame } from "../games/province-sort/ProvinceSortGame";
import { ProvincesDragGame } from "../games/provinces-drag/ProvincesDragGame";
import { ProvincesWriteGame } from "../games/provinces-write/ProvincesWriteGame";
import { RecognizeCommunityGame } from "../games/recognize-community/RecognizeCommunityGame";
import { RecognizeProvinceGame } from "../games/recognize-province/RecognizeProvinceGame";
import { ResultScreen } from "../games/shared/ResultScreen";
import type { GameResult } from "../games/shared/types";

type Screen =
  | "home"
  | "capitals-drag"
  | "community-capital"
  | "communities-drag"
  | "communities-write"
  | "guess-community"
  | "province-count"
  | "province-list"
  | "province-sort"
  | "provinces-drag"
  | "provinces-write"
  | "recognize-community"
  | "recognize-province"
  | "result";

export function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [result, setResult] = useState<GameResult | null>(null);

  const availableGames = useMemo(
    () => [
      {
        title: "Arrastra las comunidades autónomas",
        description: "Coloca cada nombre en su lugar del mapa.",
        level: "easy",
        onStart: () => setScreen("communities-drag"),
      },
      {
        title: "Escribe las comunidades autónomas",
        description: "Completa el mapa escribiendo los nombres.",
        level: "hard",
        onStart: () => setScreen("communities-write"),
      },
      {
        title: "Arrastra las provincias",
        description: "Coloca cada provincia en su lugar.",
        level: "hard",
        onStart: () => setScreen("provinces-drag"),
      },
      {
        title: "Escribe las provincias",
        description: "Pincha una provincia y escribe su nombre.",
        level: "hard",
        onStart: () => setScreen("provinces-write"),
      },
      {
        title: "Reconoce la Comunidad",
        description: "Identifica la comunidad por su silueta aislada.",
        level: "hard",
        onStart: () => setScreen("recognize-community"),
      },
      {
        title: "Reconoce la Provincia",
        description: "Identifica 20 provincias por su silueta aislada.",
        level: "hard",
        onStart: () => setScreen("recognize-province"),
      },
      {
        title: "Adivina la Comunidad",
        description: "Responde a qué comunidad pertenece cada provincia.",
        level: "easy",
        onStart: () => setScreen("guess-community"),
      },
      {
        title: "Cuántas Provincias",
        description: "Di cuántas provincias tiene cada comunidad.",
        level: "easy",
        onStart: () => setScreen("province-count"),
      },
      {
        title: "Dime la capital",
        description: "Escribe la capital de cada comunidad autónoma.",
        level: "easy",
        onStart: () => setScreen("community-capital"),
      },
      {
        title: "Arrastra la capital",
        description: "Coloca cada capital en su punto del mapa.",
        level: "easy",
        onStart: () => setScreen("capitals-drag"),
      },
      {
        title: "Dime las provincias",
        description: "Escribe las provincias de cada comunidad autónoma.",
        level: "easy",
        onStart: () => setScreen("province-list"),
      },
      {
        title: "Clasifica provincias",
        description: "Arrastra cada provincia a su comunidad.",
        level: "easy",
        onStart: () => setScreen("province-sort"),
      },
    ],
    [],
  );

  if (screen === "communities-drag") {
    return (
      <CommunitiesDragGame
        onFinish={(nextResult) => {
          setResult(nextResult);
          setScreen("result");
        }}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "community-capital") {
    return (
      <CommunityCapitalGame
        onFinish={(nextResult) => {
          setResult(nextResult);
          setScreen("result");
        }}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "capitals-drag") {
    return (
      <CapitalsDragGame
        onFinish={(nextResult) => {
          setResult(nextResult);
          setScreen("result");
        }}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "communities-write") {
    return (
      <CommunitiesWriteGame
        onFinish={(nextResult) => {
          setResult(nextResult);
          setScreen("result");
        }}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "provinces-drag") {
    return (
      <ProvincesDragGame
        onFinish={(nextResult) => {
          setResult(nextResult);
          setScreen("result");
        }}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "provinces-write") {
    return (
      <ProvincesWriteGame
        onFinish={(nextResult) => {
          setResult(nextResult);
          setScreen("result");
        }}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "guess-community") {
    return (
      <GuessCommunityGame
        onFinish={(nextResult) => {
          setResult(nextResult);
          setScreen("result");
        }}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "province-count") {
    return (
      <ProvinceCountGame
        onFinish={(nextResult) => {
          setResult(nextResult);
          setScreen("result");
        }}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "province-list") {
    return (
      <ProvinceListGame
        onFinish={(nextResult) => {
          setResult(nextResult);
          setScreen("result");
        }}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "province-sort") {
    return (
      <ProvinceSortGame
        onFinish={(nextResult) => {
          setResult(nextResult);
          setScreen("result");
        }}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "recognize-community") {
    return (
      <RecognizeCommunityGame
        onFinish={(nextResult) => {
          setResult(nextResult);
          setScreen("result");
        }}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "recognize-province") {
    return (
      <RecognizeProvinceGame
        onFinish={(nextResult) => {
          setResult(nextResult);
          setScreen("result");
        }}
        onExit={() => setScreen("home")}
      />
    );
  }

  if (screen === "result" && result) {
    return (
      <ResultScreen
        result={result}
        onBackHome={() => setScreen("home")}
        onReplay={() =>
          setScreen(
            result.mapKind === "provinces"
              ? result.title.startsWith("Reconoce")
                ? "recognize-province"
                : result.title.startsWith("Escribe")
                ? "provinces-write"
                : "provinces-drag"
              : result.title === "Arrastra la capital"
                ? "capitals-drag"
              : result.title.startsWith("Clasifica")
                ? "province-sort"
              : result.title.startsWith("Dime")
                ? result.title === "Dime la capital"
                  ? "community-capital"
                  : "province-list"
              : result.title.startsWith("Cuántas")
                ? "province-count"
              : result.title.startsWith("Adivina")
                ? "guess-community"
              : result.title.startsWith("Reconoce")
                ? "recognize-community"
              : result.title.startsWith("Escribe")
                ? "communities-write"
                : "communities-drag",
          )
        }
      />
    );
  }

  return (
    <main className="app-shell">
      <section className="hero-card home-hero">
        <p className="eyebrow">Mapas de España</p>
        <h1>Aprende jugando</h1>
        <p className="lede">
          Practica el mapa político de España con juegos sencillos y visuales.
        </p>
      </section>

      <section className="home-grid" aria-label="Juegos disponibles">
        <section className="game-level-section easy-level" aria-labelledby="easy-games-title">
          <div className="level-heading">
            <span className="level-badge" aria-hidden="true">1</span>
            <div>
              <h2 id="easy-games-title">Fácil</h2>
              <p>Para empezar o repasar sin demasiada presión.</p>
            </div>
          </div>
          <div className="level-game-grid">
            {availableGames.filter((game) => game.level === "easy").map((game) => (
              <article className="game-card" key={game.title}>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <button type="button" onClick={game.onStart}>
                  Jugar
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="game-level-section hard-level" aria-labelledby="hard-games-title">
          <div className="level-heading">
            <span className="level-badge" aria-hidden="true">2</span>
            <div>
              <h2 id="hard-games-title">Difícil</h2>
              <p>Para practicar con más detalle y afinar provincias.</p>
            </div>
          </div>
          <div className="level-game-grid">
            {availableGames.filter((game) => game.level === "hard").map((game) => (
              <article className="game-card" key={game.title}>
                <h3>{game.title}</h3>
                <p>{game.description}</p>
                <button type="button" onClick={game.onStart}>
                  Jugar
                </button>
              </article>
            ))}
          </div>
        </section>
      </section>
      <footer className="home-footer">
        {autonomousCommunities.length} comunidades autónomas y 50 provincias
        preparadas para practicar.
      </footer>
    </main>
  );
}
