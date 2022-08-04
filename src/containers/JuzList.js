import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import JuzCard from "../components/JuzCard";
import Navbar from "./Navbar";
import { auth, db, logout } from "../configs/Firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

const JuzList = () => {

    const jumlahJuz = [1,2,3,4,5,6,7,8,9,10,
                        11,12,13,14,15,16,17,18,19,20,
                        21,22,23,24,25,26,27,28,29,30
                      ];

    const [user, loading, error] = useAuthState(auth);
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const fetchUserName = async () => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", user?.uid));
        const doc = await getDocs(q);
        const data = doc.docs[0].data();
        setName(data.name);
    } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
    }
    };
    useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
    }, [user, loading]);

    
    return (
        <div className="App" style={{ backgroundImage: 'url("../assets/images/5540822.jpg")', backgroundSize: 'contain' }}>
                
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                mt: 5,
            }}>
                    {
                        jumlahJuz.map(jus => 
                            <JuzCard jus={jus} />
                        )
                    }
                    
            </Box>
            <Navbar userName={name} userEmail={user?.email} />
        </div>
    );
}

export default JuzList;