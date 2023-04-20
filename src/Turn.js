import React, { useRef, useEffect } from "react";
import $ from "jquery";
import "turn.js";

const Turn = props => {
    let fadeClass = useRef("");
    const effectRef = useRef(false);

    const handleKeyDown = event => {

        if (event.keyCode === 37) {
            $(fadeClass).turn("previous");
        }
        if (event.keyCode === 39) {
            $(fadeClass).turn("next");
        }
    };

    useEffect(() => {
        if (effectRef.current === false) {
            console.log(fadeClass)
            if (fadeClass) {
                console.log($(fadeClass).turn)
                $(fadeClass).turn(Object.assign({}, props.options));
            }
            document.addEventListener("keydown", handleKeyDown, false);
            return () => {
                effectRef.current = true;
            }
        }
    }, [props.options]);

    return (
        <div
            className={props.className}
            style={Object.assign({}, props.style)}
            ref={el => {
                fadeClass = el;
            }}
        >
            {props.children}
        </div>
    );
};

export default Turn;
