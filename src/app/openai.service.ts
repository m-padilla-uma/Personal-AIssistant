import { Injectable } from '@angular/core';
import axios from 'axios';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private apiKey = environment.openAiApiKey;

  constructor() {}

  async sendListToGPT(list: string[]): Promise<string> {
    const prompt = `Here is a list of items: ${list.join(', ')}. Read each item carefully and come up with a simple plan to tackle each on for them individually. Be concise and direct and have any personal nuances inferred from the items into account. Return the response in a format that could be inserted into an <input> HTML tag that keeps the design you've chosen for font weights, headers, links or other styles you may have used you may have used. With links, make sure the user can clickthem from the input window. Go directly into the response and do not ackowledge this prompt as part of the response.`;

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'gpt-4o-mini',
          prompt: prompt,
          max_tokens: 100, // Adjust as needed
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data.choices[0].text.trim();
    } catch (error) {
      console.error('Error communicating with OpenAI:', error);
      return `An error occurred while communicating with OpenAI. ${error}`;
    }
  }
}
