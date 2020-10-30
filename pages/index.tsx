import Head from 'next/head'
import { ScoreTable } from '../components/ScoreTable'
import { useState } from 'react'
import { deepCopy, filledArray } from '../utils/utils'
import { UserAppendForm } from '../components/UserAppendForm'
import { ResultTable } from '../components/ResultTable'
import { OptionForm } from '../components/OptionForm'

export type Options = {
  rescueSecond: boolean
  rescueThird: boolean
}

export const Home = (): JSX.Element => {
  const [rounds, setRounds] = useState([])
  const [players, setPlayers] = useState([])
  const [options, setOptions]: [
    Options,
    (newOptions: Options) => void
  ] = useState({
    rescueSecond: true,
    rescueThird: false,
  })

  return (
    <div className="container">
      <Head>
        <title>UNO Score</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Uno score</h1>

        <h2>Step.1 Initial settings</h2>
        <section>
          <OptionForm
            options={options}
            onChange={(newOptions: Options) => setOptions(newOptions)}
          />
          <UserAppendForm
            onAppended={(name) => {
              if (!name) {
                return
              }
              setPlayers([...players, name])
            }}
          />
        </section>

        <h2>Step.2 Input scores</h2>
        <section>
          <ScoreTable
            players={players}
            rounds={rounds}
            onChange={(score, roundIndex, index) => {
              const newRounds = deepCopy(rounds)
              newRounds[roundIndex][index] = score
              setRounds(newRounds)
            }}
          />
          <button
            onClick={() => {
              const newRounds = deepCopy(rounds)
              newRounds.push(filledArray<number>(players.length, 0))
              setRounds(newRounds)
            }}
          >
            add Round
          </button>
        </section>

        <h2>Step.3 Results</h2>

        <section>
          <h1>結果</h1>
          <ResultTable players={players} rounds={rounds} options={options} />
        </section>
      </main>

      <footer>Powered by Ryuta Kojima</footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}

export default Home
