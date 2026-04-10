/**
 * Google Gemini API wrapper for AI features.
 */

let apiKey = '';

/**
 * Sets the Gemini API key.
 * @param {string} key 
 */
export function setApiKey(key) {
  apiKey = key;
}

/**
 * Gets the current Gemini API key.
 * @returns {string}
 */
export function getApiKey() {
  return apiKey;
}

const MODEL_NAME = 'gemini-2.5-flash';

/**
 * Calls Gemini API for single turn generation.
 */
export async function callGemini(systemPrompt, userMessage) {
  if (!apiKey) {
    return "Please set your Gemini API key in Settings (gear icon in sidebar) to use AI features.";
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

  try {
    const combinedPrompt = `${systemPrompt}\n\nUser Question: ${userMessage}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: combinedPrompt }]
          }
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("No valid response from Gemini:", data);
      return "I'm sorry, I couldn't generate a response. Please check your API key or try again later.";
    }
  } catch (e) {
    return `Error calling Gemini: ${e.message}`;
  }
}

/**
 * Calls Gemini API with conversation history.
 */
export async function callGeminiWithHistory(systemPrompt, messages) {
  if (!apiKey) {
    return "Please set your Gemini API key in Settings to use AI features.";
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

  try {
    // Map Claude messages to Gemini format
    // Claude format: [{ role: 'user'|'assistant', content: string }]
    // Gemini format: [{ role: 'user'|'model', parts: [{ text: string }] }]
    
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // For simplicity, we prepend the system prompt to the first user message if possible
    if (contents.length > 0 && contents[0].role === 'user') {
      contents[0].parts[0].text = `System Instruction: ${systemPrompt}\n\n${contents[0].parts[0].text}`;
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: contents,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        }
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "I encountered an error generating a response with history.";
    }
  } catch (e) {
    return `Error calling Gemini with history: ${e.message}`;
  }
}
