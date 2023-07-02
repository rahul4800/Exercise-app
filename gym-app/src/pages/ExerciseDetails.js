import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Box} from "@mui/material"

import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos"
import SimilarExercises  from "../components/SimilarExercises";

import { exerciseOptions, fetchData, youtubeOptions } from "../utils/fetchData";

const ExerciseDetails = () => {
    const [exerciseDetail, setExerciseDetail] = useState ({});
    const [exerciseVideos, setExerciseVideos] = useState ([]);
    const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
    const [equipmentExercises, setEquipmentExercises] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        const fetchExerciseData = async () => {
            const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
            const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';

            const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercis/${id}`,exerciseOptions);
            setExerciseDetail(exerciseDetailData);

            const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?q=$
            {exerciseDetailData.name}exercise`, youtubeOptions );
            setExerciseVideos(exerciseVideosData.contents);

            const targetMuscleExerciseData = await fetchData(`{exerciseDbUrl}/exercises/target/$
            {exerciseDetailData.target}`,exerciseOptions);
            setTargetMuscleExercises(targetMuscleExerciseData);

            const equipmentExerciseData = await fetchData(`{youtubeSearchUrl}/exercises/equipment/$
            {exerciseDetailData.equipment}`,exerciseOptions);
            setEquipmentExercises(equipmentExerciseData);

        }

        fetchExerciseData();
    },[id]);

    return (
        <Box>
            <Detail exerciseDetail={exerciseDetail} />
            <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetail.name} />
            <SimilarExercises targetMuscleExercises={targetMuscleExercises}
            equipmentExerciseData={equipmentExercises} />
            
        </Box>
    );
}

export default ExerciseDetails;