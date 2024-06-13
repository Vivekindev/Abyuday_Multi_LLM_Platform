const sendMsgToNvidia = async (message,age) => {
    const apiUrl = `/api/${age}`; 

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
          messages: [
            {
              content: message,
              role: "user",
            }
           
          ],
          temperature: 0.6,
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
      console.log("Abyuday Server Response:", responseData);

      return responseData;
    } catch (error) {
      console.error("Error sending message to Abyuday Server:", error);
      throw error; 
    }
  };

  export default sendMsgToNvidia;