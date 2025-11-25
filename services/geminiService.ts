import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const generateRefinedSuggestions = async (userInput: string): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning raw input.");
    return "API Key not configured. Unable to generate AI suggestions.";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Você é um consultor especialista em T&D (Treinamento e Desenvolvimento) para universidades públicas.
      O usuário (um servidor da UNEB) sugeriu o seguinte tema para capacitação: "${userInput}".
      
      Por favor, sugira 3 tópicos específicos, práticos e modernos relacionados a esse tema que poderiam compor um curso.
      Foque em inovação, eficiência administrativa e melhoria da qualidade do serviço público.
      
      Retorne APENAS os 3 tópicos em formato de lista (bullet points), sem introdução ou conclusão.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Não foi possível gerar sugestões no momento.";
  } catch (error) {
    console.error("Error generating suggestions:", error);
    return "Erro ao conectar com o assistente inteligente.";
  }
};

export const analyzeSentiment = async (text: string): Promise<string> => {
   if (!apiKey) return "N/A";
   
   try {
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analise a seguinte sugestão de curso e classifique-a em uma das seguintes categorias: 'Técnico', 'Comportamental', 'Gestão' ou 'Tecnológico'. Responda apenas com a palavra da categoria. Texto: "${text}"`
     });
     return response.text?.trim() || "Geral";
   } catch (e) {
     return "Geral";
   }
}