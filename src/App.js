import $ from "jquery";
import "turn.js";

import "./styles.css";
import Turn from "./Turn.js";
import { useEffect, useState } from "react";

const options = {
  width: 800,
  height: 600,
  autoCenter: true,
  display: "double",
  acceleration: true,
  elevation: 50,
  gradients: !$.isTouch,
  when: {
    turned: function (e, page) {
      console.log("Current view: ", $(this).turn("view"));
    }
  }
};

// const pages = [
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/01.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/02.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/03.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/04.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/05.jpg",
//   "https://raw.github.com/blasten/turn.js/master/demos/magazine/pages/06.jpg"
// ];

function App() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const getImages = async () => {
      const response = await fetch('http://localhost:3000/getPDF', {
        method: 'GET'
      })
      const data = await response.json()
      setPages(data.images)
    }
    getImages()
  }, [])

  return (<>{pages.length > 0 &&
    <div className="magHolder">
      <Turn options={options} className="magazine">
        {pages?.map((page, index) => {
          return <div key={index} className="page">
            <img src={'http://localhost:3000/output/pdf.pdf/' + page} alt="" />
          </div>
        })}
      </Turn>
    </div>
  }
  </>
  );
}

export default App;
