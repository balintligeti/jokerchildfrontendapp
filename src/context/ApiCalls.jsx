import axios from "axios";


//const BASE_URL="https://joker-child-spring.herokuapp.com";
const BASE_URL="https://joker-child-spring.herokuapp.com";

const POST_CONFIG={"Content-Type": "application/json"}

const getCardByIdentificationId = async (identificationId) =>{
    return await axios.get(BASE_URL+"/card/byIdentificationId?identificationId="+identificationId)
    ;
}

const getSessionByUserId = async (userId) =>{
    return await axios.get(BASE_URL+"/gameSession/?userId="+userId);
}

const createSession = async (session) =>{
    return await axios.post(BASE_URL+"/gameSession/",session,POST_CONFIG);
}

const deleteSessionByUserId = async (userId) =>{
    return await axios.delete(BASE_URL+"/gameSession/?userId="+userId);
}

const getSessionsCardByUserId = async (userId) =>{
    return await axios.get(BASE_URL+"/gameSession/card/?userId="+userId);
}

const getExperienceByExerciseIdAndUserId = async (exerciseId,userId) =>{
    return await axios.get(BASE_URL+"/gameHistory/getExperienceByExerciseIdAndMemberId?exerciseId="+exerciseId+"&userId="+userId);
    }

const getSumXpByMemberIdAndCardId = async (userId,cardId) =>{
    return await axios.get(BASE_URL+"/gameHistory/getSumXpByCardIdAndMemberId?cardId="+cardId+"&memberId="+userId);
}

const getXpByMemberId = async (userId) =>{
    return await axios.get(BASE_URL+"/member/getXpByMemberId?id="+userId);
}

const getPlayedExercisesCountByMemberId = async (userId) =>{
    return await axios.get(BASE_URL+"/gameHistory/getPlayedExercisesCountByMemberId?memberId="+userId);
}

const getIsSessionActiveByUserId = async (userId) =>{
    return await axios.get(BASE_URL+"/gameSession/isActive?userId="+userId);
}


const createGameHistory = async (gameHistory) =>{
    return await axios.post(BASE_URL+"/gameHistory/",gameHistory);
}


const getIsGameHistoryActiveByExerciseIdAndUserId = async (exerciseId,userId) =>{
    return await axios.get(BASE_URL+"/gameHistory/getIsGameHistoryExistByExerciseIdAndUserId?exerciseId="+exerciseId+"&userId="+userId);
}

const validateAnswer = async (userId,exerciseId,isPassed) =>{
    return await axios.put(BASE_URL+"/gameHistory/validateExercise?exerciseId="+exerciseId+"&memberId="+userId+"&passed="+isPassed);
}

const deleteAllGameHistoryByUserId = async (userId) =>{
    return await axios.delete(BASE_URL+"/gameHistory/allGameHistoryByUserId?userId="+userId);
}


const createCard = async (card) =>{
    return await axios.post(BASE_URL+"/card/",card);
}





export {
    getCardByIdentificationId,
    getSessionByUserId,
    createSession,
    deleteSessionByUserId,
    getSessionsCardByUserId,
    getExperienceByExerciseIdAndUserId,
    getSumXpByMemberIdAndCardId,
    getXpByMemberId,
    getPlayedExercisesCountByMemberId,
    getIsSessionActiveByUserId,
    createGameHistory,
    getIsGameHistoryActiveByExerciseIdAndUserId,
    validateAnswer,
    deleteAllGameHistoryByUserId,
    createCard

};