const sendMsgToNvidia = async (message) => {
    const apiUrl = "/api"; 

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            // {
            //   content: "  ```language_name       code      ``` , language_name must be cpp if its c++",
            //   role: "system",
            // },
            {
              content: message,
              role: "user",
            }
           
          ],
          temperature: 0.2,
          top_p: 0.7,
          max_tokens: 1024,
          seed: 42,
          stream: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send message. Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Nvidia Assistant Response:", responseData);

      return responseData;
    } catch (error) {
      console.error("Error sending message to Nvidia API:", error);
      throw error; 
    }
  };

  export default sendMsgToNvidia;