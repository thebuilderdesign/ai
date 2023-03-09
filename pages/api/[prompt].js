require("dotenv").config({path: "/.env.local"});
const { Configuration, OpenAIApi } = require("openai");

export default async function imageGenerator (req, res) {

    const { OPEN_AI_API } = process.env;

  const prompt = req.query.prompt;

  console.log("Prompt --> ", prompt);

    const configuration = new Configuration({
        apiKey: OPEN_AI_API,
      });
      const openai = new OpenAIApi(configuration);


    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 4,
            size: "256x256",
            response_format: "b64_json"
          });
        const arr = response.data.data;

        


    res.status(200).json({
        success: true,
        imageData: arr
    })
    return ;
      } catch (error) {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      }

      res.status(404).json( {
        success: false
      })

}