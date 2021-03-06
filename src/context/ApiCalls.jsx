import axios from "axios";

//const BASE_URL="https://joker-child-spring.herokuapp.com";
const BASE_URL="https://joker-child-spring.herokuapp.com";

const POST_CONFIG={"Content-Type": "application/json"}

const getClassesById = async (schoolName) => {
    return await axios.get(BASE_URL + '/school/classesBySchoolName?name=' + schoolName);
}
const getAllSchool = async () => {
    return await axios.get(BASE_URL + '/school/all');
}
const deleteCard = async (id) => {
    return await axios.delete(BASE_URL+"/card/?id="+id);
}

const getAllCards = async () => {
    return await axios.get(BASE_URL + '/card/all');
}

const getCardByIdentificationId = async (identificationId) =>{
    return await axios.get(BASE_URL+"/card/byIdentificationId?identificationId="+identificationId);
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
    return await axios.get(BASE_URL+"/gameHistory/getPlayedExercisesCountByMemberId?memberId="+userId,{withCredentials:true});
}

const getIsSessionActiveByUserId = async (userId) =>{
    return await axios.get(BASE_URL+"/gameSession/isActive?userId="+userId,{withCredentials:true});
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


const createCard = async (card,professionId) =>{
    return await axios.post(BASE_URL+"/card/?professionId="+professionId,card);
}

const updateCard = async (card,professionId) =>{
    return await axios.put(BASE_URL+"/card/?professionId="+professionId,card);
}


const createProfession = async (profession) =>{
    return await axios.post(BASE_URL+"/profession/",profession);
}


const getAllProfessions = async () =>{
    return await axios.get(BASE_URL+"/profession/all");
}

const getCardById = async (cardId) =>{
    return await axios.get(BASE_URL+"/card/?id="+cardId);
}

const deleteProfession = async (professionId) =>{
    return await axios.delete(BASE_URL+"/profession/?id="+professionId);
}

const getProfessionById = async (professionId) =>{
    return await axios.get(BASE_URL+"/profession/?id="+professionId);
}

const updateProfession = async (profession) =>{
    return await axios.put(BASE_URL+"/profession/",profession);
}

const register = async (user) =>{
    return await axios.post(BASE_URL+"/auth/register",user,{withCredentials:true});
}

const login = async (user) =>{
    return await axios.post(BASE_URL+"/auth/login",user);
}

const getUsernameFromToken = async () =>{
    let token=localStorage.getItem("token");
    console.log("token: "+token);
    return await axios.get(BASE_URL+"/auth/me");
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
    createCard,
    createProfession,
    getAllProfessions,
    getAllCards,
    deleteCard,
    getCardById,
    updateCard,
    deleteProfession,
    getProfessionById,
    updateProfession,
    register,
    login,
    getUsernameFromToken,
    getAllSchool,
    getClassesById,
};