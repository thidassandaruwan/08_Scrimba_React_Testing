import trollFace from "../assets/troll-face.png"

function Header(){
    return (
        <header className="header">
            <img className="logo-img" src={trollFace} alt="image of famous troll face"/>
            <span className="logo-text">Meme Generator</span>
        </header>
    )
}

export default Header;