import RequestException from "./exceptions/request-exception.js";

export async function getJson(url) {
    try{
        const result = await fetch(url);
        const jsonBody = await result.json();
        return jsonBody;
    }
   catch (e) {
       throw new RequestException("Erro ao realizar requisição!");
   }
} 