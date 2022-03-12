import { useEffect, useMemo, useState } from "react";
import "./styles.css";

export default function App() {
  const Carousel = ({ delay, children }) => {
    const [index, setIndex] = useState(0);
    const [manual, setManual] = useState(false);

    const myChildren = useMemo(() => children, [children]);

    useEffect(() => {
      const interval = setInterval(
        () => setIndex(index < myChildren.length - 1 ? index + 1 : 0),
        delay
      );

      if (manual) clearInterval(interval);

      return () => clearInterval(interval);
    });

    const clickHandler = (e) => {
      switch (e.target.name) {
        case "prev":
          setManual(true);
          setIndex(index > 0 ? index - 1 : myChildren.length - 1);
          break;

        case "next":
          setManual(true);
          setIndex(index < myChildren.length - 1 ? index + 1 : 0);
          break;

        case "play":
          setManual(false);
          break;

        default:
          break;
      }
    };

    return (
      myChildren.length > 0 && (
        <div>
          {myChildren[index]}
          {myChildren.length > 1 && (
            <div style={{ marginTop: 20 }}>
              <button
                className="button"
                name="prev"
                style={{ margin: "0 10px" }}
                onClick={clickHandler}
              >
                {"<< Previous"}
              </button>

              <button
                className="button"
                name="next"
                style={{ margin: "0 10px" }}
                onClick={clickHandler}
              >
                {"Next >>"}
              </button>

              <button
                className="button"
                name="play"
                style={{ margin: "0 10px" }}
                disabled={!manual}
                hidden={!manual}
                onClick={clickHandler}
              >
                {"Play ||>"}
              </button>
            </div>
          )}
        </div>
      )
    );
  };

  const children = [];
  let fn = 1;
  while (fn <= 10 && fn++)
    children.push(
      <img
        key={fn}
        width={200}
        height={200}
        style={{
          border: "2px solid",
          borderRadius: 8,
          padding: 5,
          objectFit: "contain"
        }}
        src={`images/product-${fn - 1}.png`}
        alt={`Loading... pic ${fn - 1}`}
      />
    );

  return (
    <div className="App">
      <h1>Pic carousel</h1>
      <Carousel delay={2500} children={children} />
    </div>
  );
}
