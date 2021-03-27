import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.pokemontcg.io/v1/cards"
})

export default instance;