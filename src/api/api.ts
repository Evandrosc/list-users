import axios from 'axios'
import { User } from '../Tipagem/User'

const BASE_URL = 'https://randomuser.me/api/'

export let usersCache: User[] = [] // Array para armazenar os resultados de getUsers

/**
 * Obtém um ou mais usuários da API randomuser.me e armazena em cache.
 * @param results - O número de resultados a serem obtidos da API.
 * @returns Uma promessa que resolve com os resultados dos usuários.
 * @throws Se ocorrer um erro ao buscar os usuários.
 */
export async function getUsers(results = 1): Promise<User[]> {
    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: {
                results,
            },
        })
        if (response.status !== 200) {
            throw new Error('Erro na solicitação à API')
        }
        usersCache = response.data.results
        
        return usersCache
    } catch (error) {
        throw new Error('Erro ao buscar usuários: ' + (error as Error).message)
    }
}

/**
 * Obtém um usuário pelo username a partir do cache.
 * @param username - O username do usuário a ser buscado.
 * @returns Uma promessa que resolve com o usuário encontrado.
 * @throws Se o usuário não for encontrado no cache ou ocorrer um erro.
 */
export async function getUserByUserName(username: string): Promise<User> {
    try {
        const user = usersCache.find((u) => u.login.username === username)
        if (!user) {
            throw new Error('Usuário não encontrado no cache')
        }
        return user
    } catch (error) {
        throw new Error('Erro ao buscar usuário por username: ' + (error as Error).message)
    }
}