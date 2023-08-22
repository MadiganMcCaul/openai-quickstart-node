const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const prompt = req.body.prompt || "";
  if (prompt.trim().length === 0) {
    console.log("prompt attempt");
    res.status(400).json({
      error: {
        message: "Please enter a valid prompt",
      },
    });
    return;
  }

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
        content: prompt,
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.status(200).json({ result: response.data.choices[0].message.content });
  console.log(response.data);
  console.log(response.data.choices);
}
// --------------------------------------------------

// export default async function (req, res) {
//   if (!configuration.apiKey) {
//     res.status(500).json({
//       error: {
//         message:
//           "OpenAI API key not configured, please follow instructions in README.md",
//       },
//     });
//     return;
//   }

//   const animal = req.body.animal || "";
//   if (animal.trim().length === 0) {
//     res.status(400).json({
//       error: {
//         message: "Please enter a valid animal",
//       },
//     });
//     return;
//   }

//   try {
//     const completion = await openai.createCompletion({
//       model: "text-davinci-003",
//       prompt: generatePrompt(animal),
//       temperature: 0.6,
//       messages: [role],
//     });
//     res.status(200).json({ result: completion.data.choices[0].text });
//   } catch (error) {
//     // Consider adjusting the error handling logic for your use case
//     if (error.response) {
//       console.error(error.response.status, error.response.data);
//       res.status(error.response.status).json(error.response.data);
//     } else {
//       console.error(`Error with OpenAI API request: ${error.message}`);
//       res.status(500).json({
//         error: {
//           message: "An error occurred during your request.",
//         },
//       });
//     }
//   }
// }

// function generatePrompt(animal) {
//   const capitalizedAnimal =
//     animal[0].toUpperCase() + animal.slice(1).toLowerCase();
//   return `Suggest three names for an animal.

// Animal: Cat
// Names: Sully, Fluffy, Momo
// Animal: Dog
// Names: Elly, Loki, Astro
// Animal: ${capitalizedAnimal}
// Names:`;
// }
