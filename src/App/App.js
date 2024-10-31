import React, { useState, useEffect } from "react";
import "./AppStyle.scss";

const App = () => {
    const [ID, setID] = useState("");
    const [FirstNumber, setFirstNumber] = useState("");
    const [SecondNumber, setSecondNumber] = useState("");
    const [MakedID, setMakedID] = useState([]);

    useEffect(() => {
        const savedID = localStorage.getItem("ID");
        const savedFirstNumber = localStorage.getItem("FirstNumber");
        const savedSecondNumber = localStorage.getItem("SecondNumber");
        const savedMakedID = localStorage.getItem("MakedID");

        if (savedID) setID(savedID);
        if (savedFirstNumber) setFirstNumber(savedFirstNumber);
        if (savedSecondNumber) setSecondNumber(savedSecondNumber);
        if (savedMakedID) setMakedID(JSON.parse(savedMakedID));
    }, []);
    

    useEffect(() => {
        localStorage.setItem("ID", ID);
        localStorage.setItem("FirstNumber", FirstNumber);
        localStorage.setItem("SecondNumber", SecondNumber);
        localStorage.setItem("MakedID", JSON.stringify(MakedID));
    }, [ID, FirstNumber, SecondNumber, MakedID]);

    const CreateID = () => {
        const start = parseInt(FirstNumber, 10);
        const end = parseInt(SecondNumber, 10);

        if (isNaN(start) || isNaN(end) || start > end) {
            alert("لطفا بازه‌ی معتبر وارد کنید.");
            return;
        }

        const newIDs = Array.from({ length: end - start + 1 }, (_, i) => `${ID}${start + i}`);
        setMakedID(newIDs);
    };

    const DeleteInfo = () => {
        setID("");
        setFirstNumber("");
        setSecondNumber("");
        localStorage.removeItem("ID");
        localStorage.removeItem("FirstNumber");
        localStorage.removeItem("SecondNumber");
    };

    const DeleteTable = () => {
        setMakedID([]);
        localStorage.removeItem("MakedID");
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("آیدی کپی شد!"))
            .catch(() => alert("مشکلی در کپی کردن آیدی وجود دارد"));
    };

    const copyAllIDsToClipboard = () => {
        if (MakedID.length === 0) {
            alert("آیدی‌ای برای کپی کردن موجود نیست.");
            return;
        }

        const formattedIDs = MakedID.map((id) => `@${id}`).join("\n");
        navigator.clipboard.writeText(formattedIDs)
            .then(() => alert("تمام آیدی‌ها کپی شدند!"))
            .catch(() => alert("مشکلی در کپی کردن آیدی‌ها وجود دارد"));
    };

    return (
        <div className="App-Background">
            <div className="User-Input">
                <input
                    type="text"
                    placeholder="آیدی مورد نظر را وارد کنید"
                    onChange={(e) => setID(e.target.value)}
                    value={ID}
                />
            </div>
            <div className="User-Filter">
                <div className="User-Filter-Number">
                    <input
                        type="number"
                        placeholder="شروع"
                        onChange={(e) => setFirstNumber(e.target.value)}
                        value={FirstNumber}
                        min="0"
                    />
                    <input
                        type="number"
                        placeholder="پایان"
                        onChange={(e) => setSecondNumber(e.target.value)}
                        value={SecondNumber}
                        min="0"
                    />
                </div>
            </div>
            <div className="User-Submit">
                <button onClick={CreateID}>ایجاد آیدی</button>
            </div>
            <div className="User-delete-info">
                <button onClick={DeleteInfo}>پاک کردن ورودی</button>
                <button onClick={DeleteTable}>پاک کردن آیدی ها</button>
            </div>
            <div className="User-Copy-All-Id">
                <button onClick={copyAllIDsToClipboard}>کپی تمامی آیدی ها</button>
            </div>
            <div className="Show-Info">
                <table>
                    <thead>
                        <tr>
                            <th>انتقال</th>
                            <th>کپی</th>
                            <th>آیدی</th>
                        </tr>
                    </thead>
                    <tbody>
                        {MakedID.map((value, index) => (
                            <tr key={index}>
                                <td>
                                    <a target="_blank" rel="noopener noreferrer" href={`https://t.me/${value}`}>
                                        <button>ورود به تلگرام</button>
                                    </a>
                                </td>
                                <td>
                                    <button onClick={() => copyToClipboard(`@${value}`)}>کپی متن</button>
                                </td>
                                <td>
                                    <span>{`@${value}`}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default App;
