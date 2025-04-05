import { faEyeDropper, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import { HexColorPicker, HexColorInput } from "react-colorful";
import OutputItem from "./OutputItem";

const App = () => {
    const [color, setColor] = useState<string>('#000000');
    const [history, setHistory] = useState<string[]>([]);
    const isAPIAvailable: boolean = 'EyeDropper' in window;

    const sampleColorFromScreen = async (): Promise<string | null> => {
        // @ts-ignore
        const eyeDropper = new EyeDropper();
        try {
            const result = await eyeDropper.open();
            return result.sRGBHex;
        } catch (err) {
            console.error('Error handling response:', err);
            return null;
        }
    }

    const pickColor = async () => {
        const color = await sampleColorFromScreen();
        if (color) {
            setColor(color);
            setHistory(prevValues => [color, ...prevValues]);
        }
    }

    const removeItem = (clrToDelete: string): void => {
        setHistory(prevValues => prevValues.filter(color => color !== clrToDelete))
    }

    const clearHistory = (): void => {
        setHistory([]);
    }

    return (
        <main>
            <h1>Pick a Color</h1>
            {isAPIAvailable ?
                <button className="btn-primary" onClick={pickColor}>
                    From Web Page <FontAwesomeIcon icon={faEyeDropper} />
                </button>
                : <span className="error-msg">Your browser does not support the EyeDropper API</span>
            }
            <div className="color-picker">
                <HexColorPicker color={color} onChange={setColor} />
                <HexColorInput color={color} onChange={setColor} prefixed />
            </div>
            <div className="history">
                {history.length > 0 ? (
                    <>
                        <button onClick={clearHistory} className="btn-transparent">
                            Clear All <FontAwesomeIcon icon={faTrash} />
                        </button>
                        {history.map((color, i) => (
                            <OutputItem 
                                color={color}
                                keyValue={i}
                                onDelete={() => removeItem(color)}
                            />
                        ))}
                    </>
                ) : (
                    <p className="history__info">Your results will show up here</p>
                )}
            </div>
        </main>
    )
}

export default App
