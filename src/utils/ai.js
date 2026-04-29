import { callGemini, callGeminiWithHistory, setApiKey as setGeminiApiKey, getApiKey as getGeminiApiKey } from './gemini';
import { callAnthropic, callAnthropicWithHistory, setAnthropicApiKey, getAnthropicApiKey } from './anthropic';
import { callOllama, callOllamaWithHistory, setOllamaUrl, getOllamaUrl, setOllamaModel, getOllamaModel } from './ollama';

let currentProvider = 'gemini';

export function setAiProvider(provider) {
  currentProvider = provider;
}

export function getAiProvider() {
  return currentProvider;
}

export async function callAi(systemPrompt, userMessage) {
  if (currentProvider === 'anthropic') {
    return callAnthropic(systemPrompt, userMessage);
  } else if (currentProvider === 'ollama') {
    return callOllama(systemPrompt, userMessage);
  }
  return callGemini(systemPrompt, userMessage);
}

export async function callAiWithHistory(systemPrompt, messages) {
  if (currentProvider === 'anthropic') {
    return callAnthropicWithHistory(systemPrompt, messages);
  } else if (currentProvider === 'ollama') {
    return callOllamaWithHistory(systemPrompt, messages);
  }
  return callGeminiWithHistory(systemPrompt, messages);
}

export { setGeminiApiKey, setAnthropicApiKey, getGeminiApiKey, getAnthropicApiKey, setOllamaUrl, getOllamaUrl, setOllamaModel, getOllamaModel };
