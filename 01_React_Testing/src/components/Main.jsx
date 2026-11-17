import { useEffect, useState } from "react";

function Main(){
    const [meme, setMeme] = useState({
        topText : "Shup up",
        bottomText : "And take my money",
        imgName: "One Does Not Simply",
        imgUrl: "https://i.imgflip.com/1bij.jpg",
    })
    const [memes, setMemes] = useState([]);
    const [isLoading, setIsLoading] = useState(false)


    function updateText(event){
        const {name, value} = event.currentTarget;
        setMeme( prev => ({...prev, [name] : value}))
    }

    useEffect(() => {
        async function getMemeImages(){
            try{
                // disable generate button
                setIsLoading(true)
                
                // request images
                const response = await fetch("https://api.imgflip.com/get_memes");
                if (!response.ok){
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                if (!data.success){
                    throw new Error(data.error_message || "Failed to load memes from Imgflip");
                }

                // set the memes
                setMemes(data.data.memes);  
            }
            catch(error){
                console.error("Error when getting meme images", error);
                alert("Error when getting meme images")
            }
            finally{
                setIsLoading(false)
            }        
        }

        getMemeImages();
    }, [])
    

    function setNewImage(){
        if (memes.length === 0){
            return;
        }
        
        // choose one image
        const image = memes[Math.floor(Math.random() * memes.length)]
        // set a new image
        setMeme(prev => ({
            ...prev, 
            "imgUrl" : image.url,
            "imgName" : image.name
        }))
    }

    return(
        <main className="main-section">
            <div className="meme-gen-form">
                <label className="form-label" htmlFor="top-text-input">
                    Top Text
                    
                    <input
                        type="text"
                        value={meme.topText}
                        id="top-text-input"
                        maxLength={20}
                        name="topText"
                        onChange={(e) => updateText(e)}
                    />
                </label>

                <label className="form-label" htmlFor="bottom-text-input">
                    Top Text
                    <input
                        type="text"
                        value={meme.bottomText}
                        id="bottom-text-input"
                        maxLength={20}
                        name="bottomText"
                        onChange={e => updateText(e)}
                    />
                </label>

                <button 
                    type="submit" 
                    className="form-btn" 
                    onClick={setNewImage}
                    disabled={isLoading}
                >Get a new meme image 🖼</button>
            </div>

            <div className="generated-meme">
                <img className="meme-image" src={meme.imgUrl} alt={meme.name}/>
                <span className="meme-top-text">{meme.topText}</span>
                <span className="meme-bottom-text">{meme.bottomText}</span>
            </div>
        </main>
    )
}

export default Main;