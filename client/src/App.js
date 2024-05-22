import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/openai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: "Translate the following English text to French: {}",
            max_tokens: 60,
          }),
        });

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return <div className="App"></div>;
}

export default App;
