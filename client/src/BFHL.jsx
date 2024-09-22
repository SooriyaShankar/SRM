import React, { useState, useEffect } from "react";


export default function Home()
{
    useEffect(() => {
        fetch("https://localhost:3000", {
          method: "GET",
          
        })
          .then((response) => response.json())
          .then((data) => {
            setJoke(data[0].joke);
            console.log(data);
          })
          .catch((error) => console.log(error));
      }, []);
    
    return(
        <>
        </>
    )
}