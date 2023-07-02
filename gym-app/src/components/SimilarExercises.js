
import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SimilarExercises = ({ targetMuscleExercises, equipmentExercise }) => {
    return (
        <Box sx={{ mt:"100px", xs:"0" }}>
            <Typography variant="h3">Exercises that target the same muscle group</Typography>
            <Stack direction="row" sx={{ p:"2", position:"relative" }} >
                {targetMuscleExercises.length && <HorizontalScrollbar />}
            </Stack>
        </Box>
    )
}

export default SimilarExercises;