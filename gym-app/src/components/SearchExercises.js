import React, { useEffect, useState } from "react";
import { Box, Stack, Button, TextFeild, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";


const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
    const [search, setSearch] = useState("");
    
    const [bodyParts, setBodyParts] = useState([]);

    useEffect(() => {
        const fetchExercisesData = async () => {
            const bodyPartsData = await fetchData('https://exercisedb.p.rapidapi.com/exercises/bodyPartList'
            , exerciseOptions );
            setBodyParts(['all', ...bodyPartsData]);
        };

        fetchExercisesData();
    }, []);

    const handleSearch = async () => {
        if(search){
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',
            exerciseOptions);
           // console.log(exercisesData);

            const SearchedExercises = exercisesData.filter(
                (item) => item.name.toLowerCase().includes(search)
                       || item.target.toLowerCase().includes(search)
                       || item.equipment.toLowerCase().includes(search)
                       || item.bodyPart.toLowerCase().includes(search),
            );

            window.scrollTo({ top: 1800, left: 100, behavior: 'smooth' });
            setSearch("");
            setExercises(SearchedExercises);
        }
    };

    return (
        <Stack alignItems="center" mt="37px"
            justifyContent="center" p="20px" >
            <Typography fontWeight={700} sx={{
                fontSize: { lg: "44px", xs: "30px" }
            }} mb="50px" textAlign="center" >
                Awesome Exercises You <br />
                Should Know
            </Typography>
            <Box position="relative" mb="72px" >
                <input
                    sx={{
                        input: {
                            fontWeight: "700",
                            border: "none",
                            borderRadius: "4px"
                        },
                        width: { lg: "1100px", xs: "350px" },
                        backgroundColor: "#fff",
                        borderRadius: "40px"
                    }}
                    height="76px"
                    value={search}
                    onChange={(e) => setSearch(e.target.value.toLowerCase())}
                    placeholder="Search Exercises"
                    type="text"
                    
                />
                <Button className="search-btn"
                 sx={{
                     bgcolor:"#FF2625",
                     color:"#fff",
                     textTransform:"none",
                    // width:{lg:"175px", xs:"80px" },
                    // fontSize:{lg:"20px", xs:"14px"},
                    // height:"56px",
                    // position:"absolute"
                    width:{lg:"80px", xs:"40px"},
                    height:"28px",
                    right:"0"
                 }}
                 onClick={handleSearch}
                >
                    Search
                </Button>
            </Box>
            <Box sx={{ position:"relative", width:"100%", p:"20px" }} >
                 <HorizontalScrollbar data={bodyParts} 
                 bodyPart={bodyPart} setBodyPart={setBodyPart} />
                
            </Box>
        </Stack>
    )
}

export default SearchExercises;