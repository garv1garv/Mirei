/**
 * Anthropic API wrapper for AI features.
 */

let apiKey = '';

/**
 * Sets the Anthropic API key.
 * @param {string} key 
 */
export function setAnthropicApiKey(key) {
  apiKey = key;
}

/**
 * Gets the current Anthropic API key.
 * @returns {string}
 */
export function getAnthropicApiKey() {
  return apiKey;
}

const MODEL_NAME = 'claude-3-haiku-20240307';

/**
 * Calls Anthropic API for single turn generation.
 */
export async function callAnthropic(systemPrompt, userMessage) {
  if (!apiKey) {
    return "Please set your Anthropic API key in Settings (gear icon in sidebar) to use AI features.";
  }

  const endpoint = `https://api.anthropic.com/v1/messages`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          { role: 'user', content: userMessage }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.content && data.content.length > 0) {
      return data.content[0].text;
    } else {
      console.error("No valid response from Anthropic:", data);
      return "I'm sorry, I couldn't generate a response. Please check your API key or try again later.";
    }
  } catch (e) {
    return `Error calling Anthropic: ${e.message}`;
  }
}

/**
 * Calls Anthropic API with conversation history.
 */
export async function callAnthropicWithHistory(systemPrompt, messages) {
  if (!apiKey) {
    return "Please set your Anthropic API key in Settings to use AI features.";
  }

  const endpoint = `https://api.anthropic.com/v1/messages`;

  try {
    // Claude format: [{ role: 'user'|'assistant', content: string }]
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content
    }));

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: MODEL_NAME,
        max_tokens: 1000,
        system: systemPrompt,
        messages: contents
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.content && data.content.length > 0) {
      return data.content[0].text;
    } else {
      return "I encountered an error generating a response with history.";
    }
  } catch (e) {
    return `Error calling Anthropic with history: ${e.message}`;
  }
}
