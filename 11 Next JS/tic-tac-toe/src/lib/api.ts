import { Game, Move, Player } from "./model"

const callServer = async <Return>(url: string, init: RequestInit = {}): Promise<Return> => {
  try {
    const response = await fetch(url, { ...init, headers: {...init.headers, 'Accept': 'application/json', 'Content-Type': 'application/json'}})
    if (response.ok) {
      return response.json()
    } else {
      console.log(new Error().stack)
      console.log(response)
      return Promise.reject<Return>(response.statusText)
    }
  } catch (e: any) {
    console.error(e.stack)
    throw e
  }
}

const read = async <Return>(url: string): Promise<Return> => callServer<Return>(url)
const create = async <Body,Return>(url: string, body: Body): Promise<Return> => callServer<Return>(url, {method: 'POST', body: JSON.stringify(body)})
const patchGame = async (gameNumber: number, body: Partial<Game>): Promise<Game> => callServer<Game>(`http://localhost:8080/games/${gameNumber}`, {method: 'PATCH', body: JSON.stringify(body)})

export type GetMoveResponse = { moves: Move[], inTurn: Player, winState: { winner: Player, row?: any }, stalemate: boolean }

export const readGamesList = () => read<Game[]>('http://localhost:8080/games/')
export const readGame = (gameNumber: number) => read<Game>('http://localhost:8080/games/' + gameNumber)

export const createGame = (gameName: string) => create<{gameName: string}, Game>('http://localhost:8080/games', { gameName })
export const createMove = (gameNumber: number, move: Move) => create<Move, {move: Move} & Partial<Game>>(`http://localhost:8080/games/${gameNumber}/moves`, move)

export const joinGame = (gameNumber: number) => patchGame(gameNumber, {ongoing: true})
export const concede = (gameNumber: number) => create<{conceded: boolean}, Game>(`http://localhost:8080/games/${gameNumber}/moves`, { conceded: true})

