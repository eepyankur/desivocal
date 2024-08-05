export async function getCharacterAudio(text: string) {
  const response = await fetch(
    "https://ezmh9t6vbvhitgly.us-east-1.aws.endpoints.huggingface.cloud",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: {
          text: text,
          language: "en",
          model_id: "3ccb64b4-8a8b-4abe-ab73-40a2ea307b08",
        },
      }),
    },
  );
  const data = await response.json();
  return data.s3_path;
}
