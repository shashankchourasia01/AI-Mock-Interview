const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});

const generativeConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const chatSession = model.startChat({
  generativeConfig,
  safetySettings,
});

async function generateInterviewQA(jobInfo = {}) {
  const {
    position = "Full Stack Developer",
    stack = "React, Node, MySQL",
    experience = "2",
  } = jobInfo;

  const prompt = `Job Position: ${position}, Job Description: ${stack}, Year of experience: ${experience}, Based on this, please generate 5 interview questions with answers in JSON format (fields: "question", "answer").`;

  try {
    const response = await chatSession.sendMessage(prompt);
    const text = response.response.text();
    return text;
  } catch (error) {
    console.error("Error generating interview Q&A:", error);
    throw error;
  }
}

module.exports = { generateInterviewQA };

//const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, } = require("@google/generative-ai"); const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY; const genAI = new GoogleGenerativeAI(apiKey); const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", }); const generativeConfig = { temperature: 1, topP: 0.95, topK: 64, maxOutputTokens: 8192, responseMimeType: "text/plain", }; const safetySettings = [ { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, }, { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, }, { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, }, { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, }, ]; export const chatSession = model.startChat({ generativeConfig, safetySettings, }); async function generateInterviewQA(jobInfo = {}) { const { position = 'Full Stack Developer', stack = 'React, Node, MySQL', experience = '2', } = jobInfo; const prompt = Job Position: ${position}, Job Description: ${stack}, Year of experience: ${experience}, Based on this, please generate 5 interview questions with answers in JSON format (fields: "question", "answer").; const contents = [ { role: 'user', parts: [{ text: prompt }], }, ]; try { const response = await ai.models.generateContent({ model, contents, tools, thinkingConfig: { thinkingBudget: -1 }, }); let result = ''; for await (const chunk of response) { if (chunk && chunk.text) result += chunk.text; } return result; } catch (error) { console.error('Error generating interview Q&A:', error); throw error; } } module.exports = { generateInterviewQA };

// const { GoogleGenAI } = require('@google/genai');

// const ai = new GoogleGenAI({
//   apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
// });

// const tools = [{ googleSearch: {} }];

// const config = {
//   thinkingConfig: {
//     thinkingBudget: -1,
//   },
//   tools,
// };

// const model = 'gemini-2.5-flash';

// async function generateInterviewQA(jobInfo = {}) {
//   const {
//     position = 'Full Stack Developer',
//     stack = 'React, Node, MySQL',
//     experience = '2',
//   } = jobInfo;

//   const prompt = `Job Position: ${position}, Job Description: ${stack}, Year of experience: ${experience}, Based on this, please generate 5 interview questions with answers in JSON format (fields: "question", "answer").`;

//   const contents = [
//     {
//       role: 'user',
//       parts: [{ text: prompt }],
//     },
//   ];

//   try {
//     const response = await ai.models.generateContent({
//       model,
//       contents,
//       tools,
//       thinkingConfig: { thinkingBudget: -1 },
//     });
//     let result = '';
//     for await (const chunk of response) {
//       if (chunk && chunk.text) result += chunk.text;
//     }

//     return result;
//   } catch (error) {
//     console.error('Error generating interview Q&A:', error);
//     throw error;
//   }
// }

// module.exports = { generateInterviewQA };
