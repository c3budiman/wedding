import { FaEnvelopeOpen } from "react-icons/fa";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

const LetterAnimation = () => {
    const [position, setPosition] = useState(30);

    useEffect(() => {
        const interval = setInterval(() => {
            setPosition(prevPosition => {
                if (prevPosition > 0) {
                    return prevPosition - 1;
                } else {
                    clearInterval(interval); // Stop the interval when position reaches 0
                    return 0;
                }
            });
        }, 21); // Decrement every 1 second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
    return (<>
        {
            position > 0 && (
                <FaEnvelopeOpen style={{
                    position: "absolute",
                    top: `${position}vh`
                }} size={"200px"} />
            )
        }
        <div style={{backgroundImage: "https://placehold.co/1980x1068", width: "100%", height: "100%"}}>
            
        </div>
    </>);
}

export default LetterAnimation;