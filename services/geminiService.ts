import { GoogleGenAI } from "@google/genai";
import competenciesByFunction from "../data/competencias_por_funcao_uneb.json";

type FunctionMap = Record<string, { eixo_prioritario: string; competencias: Record<string, number> }>;
const functionMap = competenciesByFunction as FunctionMap;
const knownFunctions = Object.keys(functionMap);

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const getClosestSuggestions = (value: string, limit = 5): string[] => {
  const search = value.toLowerCase();
  return knownFunctions
    .map((fn) => ({ fn, score: fn.toLowerCase().includes(search) ? 1 : 0 }))
    .sort((a, b) => b.score - a.score || a.fn.localeCompare(b.fn))
    .slice(0, limit)
    .map((item) => item.fn);
};

export const generateRefinedSuggestions = async (
  userInput: string,
  profile?: { function?: string },
): Promise<string> => {
  if (!apiKey) {
    console.warn("API Key is missing. Returning raw input.");
    return "API Key not configured. Unable to generate AI suggestions.";
  }

  const profileFunction = profile?.function;
  if (!profileFunction || !functionMap[profileFunction]) {
    const suggestions = getClosestSuggestions(profileFunction || '').slice(0, 5);
    return `Função inválida para recomendação. Use uma das opções oficiais: ${suggestions.join(', ')}.`;
  }

  const functionSlice = functionMap[profileFunction];
  const competenciesSlice = Object.entries(functionSlice.competencias)
    .map(([competencia, nivel]) => `- ${competencia}: nível esperado ${nivel}`)
    .join('\n');

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Você é um consultor especialista em T&D para universidades públicas.
      Função UNEB do servidor: "${profileFunction}".
      Eixo prioritário da função: ${functionSlice.eixo_prioritario}.
      Competências esperadas para a função (não invente outras):
${competenciesSlice}

      O servidor informou o tema/necessidade: "${userInput}".

      Gere exatamente 3 sugestões de cursos/tópicos PRÁTICOS estritamente dentro do mapeamento acima.
      Regras obrigatórias:
      1) Não inventar competências fora do mapeamento da função.
      2) Priorizar o eixo prioritário da função quando possível.
      3) Responder somente em bullet points.
    `;

    const response = await ai.models.generateContent({
      model,
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
      contents: `Analise a seguinte sugestão de curso e classifique-a em uma das seguintes categorias: 'Técnico', 'Comportamental', 'Gestão' ou 'Tecnológico'. Responda apenas com a palavra da categoria. Texto: "${text}"`,
    });
    return response.text?.trim() || "Geral";
  } catch (e) {
    return "Geral";
  }
};
