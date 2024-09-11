import React, { useState } from 'react';
import "./Mines.css";

const Mines = () => {
    const [mines, setMines] = useState([]);
    const [diamonds, setDiamonds] = useState([]);
    const [gameOver, setGameOver] = useState(false);
    const [revealedTiles, setRevealedTiles] = useState(Array.from({ length: 25 }).fill(false));
    const [betButtonDisabled, setBetButtonDisabled] = useState(false);

    const distributeMines = (numMines) => {
        const tiles = Array.from({ length: 25 }).map((_, index) => index);
        const shuffledTiles = tiles.sort(() => Math.random() - 0.5);
        const minesArray = shuffledTiles.slice(0, numMines);
        const diamondsArray = shuffledTiles.slice(numMines);
        setMines(minesArray);
        setDiamonds(diamondsArray);
    };

    const handleMinesSelection = (event) => {
        const selectedMines = parseInt(event.target.value);
        distributeMines(selectedMines);
    };

    const handleTileClick = (index) => {
        if (!gameOver && !revealedTiles[index]) {
            if (mines.includes(index)) {
                setGameOver(true);
                setRevealedTiles(Array.from({ length: 25 }).fill(true));
            } else {
                const updatedRevealedTiles = [...revealedTiles];
                updatedRevealedTiles[index] = true;
                setRevealedTiles(updatedRevealedTiles);
                if (diamonds.includes(index)) {
                    const allDiamondsRevealed = diamonds.every((diamondIndex) => updatedRevealedTiles[diamondIndex]);
                    if (allDiamondsRevealed) {
                        setGameOver(true);
                    }
                }
            }
        }
    };


    const renderTileContent = (index) => {
        if (revealedTiles[index]) {
            if (mines.includes(index)) {
                return <img src="https://cdn.pixabay.com/photo/2020/10/02/09/40/bomb-5620656_960_720.png" alt="Mine" />;
            } else if (diamonds.includes(index)) {
                return <img src="https://images.vexels.com/content/157265/preview/blue-diamond-stone-vector-617e18.png" alt="Diamond" />;
            }
        }
        return null;
    };
    const handleBetButtonClick = (numMines) => {
        distributeMines(numMines);
        setBetButtonDisabled(true);
    };

    const handleTryAgainButtonClick = () => {
        setRevealedTiles(Array.from({ length: 25 }).fill(false));
        setGameOver(false);
        setBetButtonDisabled(false);
    };

    return (
        <>
        <h2 className='mainHeading'>Mines Game by Wasiullah Khalique | Websultanate</h2>
        <div className='mainDiv'>
            <div className='sidebar'>
                <div className='buttonDiv'>
                    <button disabled>Manual</button>
                </div>
                <div className='betAmount'>
                    <div>
                        <span>Bet Amount</span>
                        <span>-$0.00</span>
                    </div>
                    <div className='betAmountInner'>
                        <input type="number" min='0' step='0.000001' placeholder='0.00000' />
                        <button>1/2</button>
                        <button>2x</button>
                    </div>
                </div>
                <div className='mines'>
                    <label>Mines</label>
                    <select onChange={handleMinesSelection}>
                        {[...Array(24)].map((_, index) => (
                            <option key={index + 1} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                </div>

                <button className='betButton' onClick={() => handleBetButtonClick(document.querySelector('.mines select').value)} disabled={betButtonDisabled}>Bet</button>

            </div>
            <div className='gameuicontainer'>
                <div className='gameui'>
                    {Array.from({ length: 25 }).map((_, index) => (
                        <div
                            key={index}
                            className={`tile ${revealedTiles[index] ? 'revealed' : ''}`}
                            onClick={() => handleTileClick(index)}
                        >
                            {renderTileContent(index)}
                        </div>
                    ))}
                </div>
            </div>
            {gameOver && (
                <div className="gameOverMessage">
                    <h2>{mines.length === 0 ? "Congratulations! You won the game!" : "Game Over! You lost the game!"}</h2>
                    <button className="tryAgainButton" onClick={handleTryAgainButtonClick}>Try Again</button>
                </div>
            )}
        </div>
        </>
    )
}

export default Mines;

