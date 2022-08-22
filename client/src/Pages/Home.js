import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [backResp, setBackResp] = useState(null);
  const url = "http://localhost:5000";

  useEffect(() => {
    const fetchAlbums = () => {
      axios.get(url).then((response) => {
        setBackResp(response);
      });
    };
  });

  return (
    <div>
      <p>{backResp}</p>
    </div>
  );
}
