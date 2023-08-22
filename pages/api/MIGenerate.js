const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content:
        "You are a expert on Motivational Interviewing, and will be using your expertise to train health professionals on this topic. You will be provided with scenarios that require behavioral change in clients alongside 4 options for the health professional to select, please choose the most suitable option that fits motivational interviewing. Motivational key concepts should include rolling with resistance, eliciting and strengthening an individual's own motivation to change and exploring their ambivalence and resistance to change.",
    },
    {
      role: "user",
      content:
        "Ben is 21 years old and studying physiotherapy at university. He lives at home and is supported by his parents, with additional income from a part-time job at a casino. Ben started playing poker at the casino after he saw a story on TV about someone who made a lot of money playing poker. After a while, he decided to try online poker. Ben found himself losing regularly and to try and recoup his losses, played more and more. Ben started borrowing from family and friends, always believing he just needed a few good wins to get back on top. Ben found himself losing his friends, and his family refused to loan him any more money. His grades dropped and he struggled to pass his courses. Ben’s parents insisted he see someone about his gambling, or they would cut off financial support for him while he attends university. And so, reluctantly, he has come to you for support. Possible options: 1: You are good at poker and it hasn't really caused any issues for you. 2. You're only here because your parents way you to be. 3. You're an adult now and it's up to you what you do with your life. 4. Your parents are worried about your gambling.",
    },
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});
