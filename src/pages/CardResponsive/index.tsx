import React from "react";
import CardResponsive from "./CardResponsive";
import { useMediaQuery } from "react-responsive";

const App: React.FC = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });

    return (
        <div>
            <CardResponsive
                ten="Trịnh Duy Tuyên"
                anh="https://tse1.mm.bing.net/th/id/OIP.8Q1AIWlAfc6tyNYvB3WuOwHaFi?pid=Api&P=0&h=220"
                mota={
                    isMobile
                        ? "mobile"
                        : "laptop"
                }
            />
        </div>
    );
};

export default App;