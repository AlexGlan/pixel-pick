import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type OutputItemProps = {
    color: string,
    keyValue: number | string,
    onDelete: () => void
}

const OutputItem = ({ color, keyValue, onDelete }: OutputItemProps) => {
    return (
        <div className="output-container" key={keyValue}>
            <span
                style={{backgroundColor: color}}
                className="output__preview"
                aria-label="Picked color preview"
            ></span>
            <p className="output__value">{color}</p>
            <button
                onClick={onDelete}
                className="output__delete btn-transparent"
                aria-label="Delete item"
            >
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    )
}

export default OutputItem