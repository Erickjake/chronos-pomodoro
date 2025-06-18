import { PlayCircleIcon } from "lucide-react";
import DefaultButton from "../DefaultButton";
import Cycles from "../Cycles";
import DefaultInput from "../DefaultInput";

export default function MainForm() {
    return (
        <form action="" className="form">
            <div className="formRow">
                <DefaultInput placeholder='Digite Algo' id='meuInput' labelText='Task' type='text' />
            </div>

            <div className="formRow">
                <p>
                    Lorem ipsum dolor sit amet.
                </p>
            </div>

            <div className="formRow">
                <Cycles />
            </div>

            <div className="formRow">
                <DefaultButton icon={<PlayCircleIcon />} />
            </div>
        </form>)
}