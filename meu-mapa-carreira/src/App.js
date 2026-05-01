import { useState, useEffect } from "react";
import "./App.css";
import foto from "./foto.png";

function Header() {
  return (
    <header className="header">
      <img src={foto} alt="Iasmin Lopes" className="header-foto" />
      <div className="header-info">
        <h1>Iasmin Lopes Moreira</h1>
        <p className="header-cargo">Fullstack · React · Java · Python</p>
        <a href="mailto:iasminmoreira09@gmail.com" className="header-email">
          iasminmoreira09@gmail.com
        </a>
      </div>
      <div className="header-links">
        <a
          href="https://www.linkedin.com/in/iasmin-lopes-moreira-902639200/"
          target="_blank"
          rel="noreferrer"
        >
          linkedin.com/in/iasmin-lopes-moreira-902639200/
        </a>
        <a
          href="https://github.com/IasminMoreira"
          target="_blank"
          rel="noreferrer"
        >
          github.com/IasminMoreira
        </a>
      </div>
    </header>
  );
}

function SobreMim() {
  return (
    <section className="sobre">
      <h2>Prazer em conhecer</h2>
      <p>
        Futura Engenheira de Computação apaixonada por transformar linhas de
        código em soluções que impactam vidas. Atualmente curso Desenvolvimento
        Web Java no <span className="destaque">Instituto PROA</span>, onde
        também atuo como{" "}
        <span className="destaque">monitora e ponto focal</span> — porque
        acredito que o sucesso de um é o sucesso de todos. Tenho experiência
        prática com{" "}
        <span className="destaque">Java, React, JavaScript e CSS</span>, base em
        automação industrial com{" "}
        <span className="destaque">Arduino e ESP32</span>, e busco evoluir como
        desenvolvedora Fullstack focada em código limpo e colaboração.
      </p>
      <a
        href="https://drive.google.com/uc?export=download&id=1sURoS7-aQWgpetPVEvOwADu4WW74Vn03"
        download="Curriculo_Iasmin_Lopes.pdf"
        className="btn-cv"
        target="_blank"
        rel="noreferrer"
      >
        Baixar meu CV
      </a>
    </section>
  );
}

function Etapa({ titulo, status, descricao, softSkills, techs }) {
  const [aberta, setAberta] = useState(status === "atual");

  return (
    <div className="etapa-wrapper">
      <div className="timeline-dot" />
      <div className={`etapa ${status}`}>
        <div className="etapa-header" onClick={() => setAberta(!aberta)}>
          <h3>{titulo}</h3>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <span className="badge">
              {status === "atual"
                ? "Você está aqui"
                : status === "proximo"
                  ? "Próximo passo"
                  : "Objetivo"}
            </span>
            <span className="seta">{aberta ? "▲" : "▼"}</span>
          </div>
        </div>

        {aberta && (
          <div className="etapa-corpo">
            <p className="etapa-desc">{descricao}</p>

            <p className="etapa-subtitulo">Soft skills essenciais:</p>
            <ul className="etapa-lista">
              {softSkills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <p className="etapa-subtitulo">Roadmap de aprendizado:</p>
            <div className="etapa-tags">
              {techs.map((t, i) => (
                <span key={i} className="tech-tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MapaCarreira() {
  return (
    <section className="mapa">
      <h2>Mapa de Carreira</h2>
      <div className="timeline">
        <Etapa
          titulo="Desenvolvedora Fullstack Júnior"
          status="atual"
          descricao="Fase de unir o que aprendo na faculdade com o instituto. Entregar features completas com React e Java."
          softSkills={[
            "Comunicação clara com o time",
            "Curiosidade ativa — pesquisar antes de perguntar",
            "Resiliência com bugs e feedback de code review",
            "Organização entre estudos e projetos",
          ]}
          techs={["React", "Java", "Python", "JavaScript", "SQL", "Git"]}
        />
        <Etapa
          titulo="Desenvolvedora Fullstack Plena"
          status="proximo"
          descricao="Autonomia total em features. Liderar tecnicamente, revisar código e pensar em performance."
          softSkills={[
            "Estimar esforço e cumprir prazos",
            "Dar e receber feedback com maturidade",
            "Colaborar com designers e PMs",
            "Identificar problemas antes de virem incidentes",
          ]}
          techs={["Spring Boot", "TypeScript", "Next.js", "PostgreSQL", "Jest"]}
        />
        <Etapa
          titulo="Engenheira de Software Sênior"
          status="futuro"
          descricao="Referência técnica do time. Definir padrões, mentorar e tomar decisões de arquitetura."
          softSkills={[
            "Mentoria de pessoas menos experientes",
            "Visão de produto — entender o porquê",
            "Comunicar decisões técnicas para não-devs",
            "Liderança técnica com influência",
          ]}
          techs={["Docker", "AWS", "System Design", "CI/CD", "Microsserviços"]}
        />
      </div>
    </section>
  );
}

function SkillBar({ nome, porcentagem, origem }) {
  return (
    <div className="skill">
      <div className="skill-topo">
        <span className="skill-nome">{nome}</span>
        {origem && <span className="skill-origem">{origem}</span>}
        <span className="skill-pct">{porcentagem}%</span>
      </div>
      <div className="skill-barra-bg">
        <div className="skill-barra" style={{ width: `${porcentagem}%` }} />
      </div>
    </div>
  );
}

function Skills() {
  const [linguagens, setLinguagens] = useState({});
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function buscarLinguagens() {
      try {
        const resposta = await fetch(
          "https://api.github.com/users/IasminMoreira/repos",
        );
        const repos = await resposta.json();

        const contagem = {};
        repos.forEach((repo) => {
          if (repo.language) {
            contagem[repo.language] = (contagem[repo.language] || 0) + 1;
          }
        });

        setLinguagens(contagem);
      } catch (erro) {
        console.error("Erro ao buscar GitHub:", erro);
      } finally {
        setCarregando(false);
      }
    }

    buscarLinguagens();
  }, []);

  const total = Object.values(linguagens).reduce((a, b) => a + b, 0);

  const calcularPct = (quantidade) => Math.round((quantidade / total) * 100);

  return (
    <section className="skills">
      <h2>Skills</h2>

      {carregando ? (
        <p style={{ fontSize: "13px", color: "#888" }}>
          Carregando dados do GitHub...
        </p>
      ) : (
        <>
          <p className="skill-grupo-titulo">Do GitHub</p>
          {Object.entries(linguagens)
            .sort((a, b) => b[1] - a[1])
            .map(([lang, qtd]) => (
              <SkillBar key={lang} nome={lang} porcentagem={calcularPct(qtd)} />
            ))}
        </>
      )}

      <div className="idiomas">
        <p className="skill-grupo-titulo">Idiomas</p>
        <div className="idioma-item">
          <span className="idioma-nome">Português</span>
          <span className="idioma-nivel">Nativo</span>
        </div>
        <div className="idioma-item">
          <span className="idioma-nome">Inglês</span>
          <span className="idioma-nivel">Técnico</span>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="pagina">
      <div className="folha">
        <Header />
        <div className="folha-corpo">
          <SobreMim />
          <div className="conteudo-principal">
            <MapaCarreira />
            <Skills />
          </div>
        </div>
      </div>
    </div>
  );
}
