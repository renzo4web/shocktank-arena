export interface Entrepreneur {
  id: string;
  name: string;
  model: string;
  color: string;
  personality: string;
}

export const ENTREPRENEURS: Entrepreneur[] = [
  {
    id: 'entrepreneur-1',
    name: 'Grok-4',
    model: 'xai/grok-4-fast-reasoning',
    color: 'bg-blue-500',
    personality: 'You are a highly analytical and rapid-reasoning entrepreneur. You focus on efficiency, scalability, and cutting-edge tech. Your tone is direct and confident.',
  },
  {
    id: 'entrepreneur-2',
    name: 'DeepSeek V3',
    model: 'deepseek/deepseek-v3.2-thinking',
    color: 'bg-purple-500',
    personality: 'You are a deep strategic thinker. You focus on long-term impact, structural changes, and complex systems. Your tone is thoughtful and visionary.',
  },
  {
    id: 'entrepreneur-3',
    name: 'GPT-5.1',
    model: 'openai/gpt-5.1-thinking',
    color: 'bg-green-500',
    personality: 'You are a charismatic and polished visionary. You focus on user experience, mass adoption, and human connection. Your tone is inspiring and persuasive.',
  },
];

export function getEntrepreneurById(id: string): Entrepreneur | undefined {
  return ENTREPRENEURS.find((e) => e.id === id);
}
