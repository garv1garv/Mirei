import { callGemini, callGeminiWithHistory, setApiKey as setGeminiApiKey, getApiKey as getGeminiApiKey } from './gemini';
import { callAnthropic, callAnthropicWithHistory, setAnthropicApiKey, getAnthropicApiKey } from './anthropic';

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
  }
  return callGemini(systemPrompt, userMessage);
}

export async function callAiWithHistory(systemPrompt, messages) {
  if (currentProvider === 'anthropic') {
    return callAnthropicWithHistory(systemPrompt, messages);
  }
  return callGeminiWithHistory(systemPrompt, messages);
}

export { setGeminiApiKey, setAnthropicApiKey, getGeminiApiKey, getAnthropicApiKey };
