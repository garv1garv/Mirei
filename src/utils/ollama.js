/**
 * Ollama API wrapper for local AI features.
 */

let baseUrl = 'http://localhost:11434';
let modelName = 'llama3';

/**
 * Sets the local Ollama API URL.
 * @param {string} url 
 */
export function setOllamaUrl(url) {
  if (url) baseUrl = url;
}

/**
 * Gets the current Ollama API URL.
 * @returns {string}
 */
export function getOllamaUrl() {
  return baseUrl;
}

/**
 * Sets the Ollama model to use.
 * @param {string} model 
 */
export function setOllamaModel(model) {
  if (model) modelName = model;
}

/**
 * Gets the current Ollama model.
 * @returns {string}
 */
export function getOllamaModel() {
  return modelName;
}

/**
 * Calls Ollama API for single turn generation.
 */
export async function callOllama(systemPrompt, userMessage) {
  const endpoint = `${baseUrl}/api/chat`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        stream: false
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.message && data.message.content) {
      return data.message.content;
    } else {
      console.error("No valid response from Ollama:", data);
      return "I'm sorry, I couldn't generate a response. Please check your Ollama server.";
    }
  } catch (e) {
    return `Error calling Ollama at ${baseUrl}: ${e.message}. Is Ollama running?`;
  }
}

/**
 * Calls Ollama API with conversation history.
 */
export async function callOllamaWithHistory(systemPrompt, messages) {
  const endpoint = `${baseUrl}/api/chat`;

  try {
    const contents = [
      { role: 'system', content: systemPrompt },
      ...messages.map(msg => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))
    ];

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modelName,
        messages: contents,
        stream: false
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.message && data.message.content) {
      return data.message.content;
    } else {
      return "I encountered an error generating a response with history.";
    }
  } catch (e) {
    return `Error calling Ollama with history: ${e.message}. Is Ollama running at ${baseUrl}?`;
  }
}
