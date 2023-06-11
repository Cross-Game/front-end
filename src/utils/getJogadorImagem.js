import axios from "axios";
import { TOKEN } from "../data/constants";

export const getJogadorImagem = async (jogadorId) => {
  try {
    const response = await axios.get(`/users/${jogadorId}/picture`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      },
    });
    console.log(response)
    const imageData =  response.data;
    const imageUrl = `data:image/png;base64,${imageData}`;
    console.log(imageUrl)
    return imageUrl;
  } catch (error) {
    console.log(error);
    return null;
  }
};





